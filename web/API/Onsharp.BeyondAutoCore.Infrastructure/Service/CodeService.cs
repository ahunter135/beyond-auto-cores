
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class CodeService : BaseService, ICodeService
    {

        private readonly BacDBContext _bacDBContext;
        private readonly ICodesRepository _codesRepository;
        private readonly IMaterialOriginalPriceService _materialOriginalPriceService;
        private readonly IMetalPriceSummaryService _metalPriceSummaryService;
        private readonly IMasterMarginService _masterMarginService;
        private readonly IMetalCustomPriceService _metalCustomPriceService;

        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        private readonly IOptions<AWSSettingDto> _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        private readonly AwsS3Helper _awsS3Helper;

        public CodeService(BacDBContext bacDBContext, IHttpContextAccessor httpContextAccessor,
                           IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client, IUserService userService,
                           IMaterialOriginalPriceService materialOriginalPriceService, IMetalPriceSummaryService metalPriceSummaryService,
                           IMetalCustomPriceService metalCustomPriceService, IMasterMarginService masterMarginService,
                           IMapper mapper, ICodesRepository codesRepository)
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _bacDBContext = bacDBContext;
            _codesRepository = codesRepository;
            _materialOriginalPriceService = materialOriginalPriceService;
            _masterMarginService = masterMarginService;
            _metalCustomPriceService = metalCustomPriceService;
            _metalPriceSummaryService = metalPriceSummaryService;
            _userService = userService;

            _awsSettings = awsSettings;
            _aws3Client = aws3Client;
            _awsS3Helper = new AwsS3Helper(_awsSettings, _aws3Client);

        }

        #region CRUD

        public async Task<CodeDto> Create(CreateCodeCommand createCommand)
        {

            var newCode = _mapper.Map<CreateCodeCommand, CodeModel>(createCommand);

            newCode.CreatedBy = this.CurrentUserId();
            newCode.CreatedOn = DateTime.UtcNow;

            _codesRepository.Add(newCode);
            _codesRepository.SaveChanges();

            return _mapper.Map<CodeModel, CodeDto>(newCode);

        }

        public async Task<CodeDto> Update(UpdateCodeCommand updateCommand)
        {
            var currenData = await _codesRepository.GetByIdAsync(updateCommand.Id);
            if (currenData == null)
                return new CodeDto() { Success = false, Message = "Code does not exist." };

            currenData.ConverterName = updateCommand.ConverterName;
            currenData.CodeType = updateCommand.IsCustom ? CodeTypeEnum.Converter : CodeTypeEnum.Generic;
            currenData.PalladiumPrice = updateCommand.PalladiumPrice;
            currenData.PlatinumPrice = updateCommand.PlatinumPrice;
            currenData.RhodiumPrice = updateCommand.RhodiumPrice;
            currenData.OriginalPrice = updateCommand.OriginalPrice;
            currenData.Margin = updateCommand.Margin;
            currenData.Make = updateCommand.Make;

            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _codesRepository.Update(currenData);
            _codesRepository.SaveChanges();

            var mapData = _mapper.Map<CodeModel, CodeDto>(currenData);
            var photoGradeData = _bacDBContext.PhotoGrades.Where(w => w.CodeId == mapData.Id).FirstOrDefault();
            if (photoGradeData != null)
            {
                mapData.PhotoGradeId = photoGradeData.Id;
            }

            return mapData;
        }

        public async Task<CodeDto> GetById(long id)
        {
            var singleData = await _codesRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new CodeDto() { Success = false, Message = "Code does not exist." };

            var mapData = _mapper.Map<CodeModel, CodeDto>(singleData);
            var photoGradeData = _bacDBContext.PhotoGrades.Where(w => w.CodeId == singleData.Id).FirstOrDefault();
            if (photoGradeData != null)
            {
                mapData.PhotoGradeId = photoGradeData.Id;
            }

            decimal margin = 0;
            var userMarginInfo = await _userService.GetUserMargin(this.CurrentUserId());

            if (userMarginInfo != null && userMarginInfo.Margin != null && userMarginInfo.Margin.Value > 0)
                margin = userMarginInfo.Margin.Value;
            else
                margin = userMarginInfo.MasterMargin ?? 0;

            decimal tier = 0;
            var userInfo = await _userService.GetById(this.CurrentUserId());
            if (userInfo != null && userInfo.Tier1AdminEnabled && userInfo.Tier1UserEnabled && userInfo.Tier1PercentLevel > 0)
                tier = userInfo.Tier1PercentLevel;

            var livePrices = await GetLivePrice();
            var dataOriginalPrice = await _materialOriginalPriceService.GetSingleRecord();
            
            var pageItem = new CodeListDto();
            pageItem.ConverterName = mapData.ConverterName;
            pageItem.OriginalPrice = mapData.OriginalPrice;
            pageItem.PlatinumPrice = mapData.PlatinumPrice;
            pageItem.PalladiumPrice = mapData.PalladiumPrice;
            pageItem.RhodiumPrice = mapData.RhodiumPrice;
            pageItem.Margin = mapData.Margin;

            mapData.FinalUnitPrice = await GetFinalUnitPrice(pageItem, dataOriginalPrice, livePrices, margin, tier, userInfo);
            mapData.AdminUnitPrice = await GetAdminUnitPrice(pageItem, dataOriginalPrice, livePrices, margin, tier, userInfo);

            return mapData;
        }

        public async Task<PageList<CodeListDto>> GetAll(ParametersCommand parametersCommand, bool? isAdmin, bool? isCustom, bool? notIncludePGItem)
        {
            
            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var userInfo = await _userService.GetById(this.CurrentUserId());
            if (isAdmin == null || isAdmin == false)
            {
                if (userInfo.Role == RoleEnum.Admin)
                    isAdmin = true;
            }

            var parameters = new List<SqlParameter>();

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "convertername" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
                parameters.Add(new SqlParameter("@convertername", System.Data.SqlDbType.Text) { Direction = System.Data.ParameterDirection.Input, Value = parametersCommand.SearchQuery });
            else
                parameters.Add(new SqlParameter("@convertername", System.Data.SqlDbType.Text) { Direction = System.Data.ParameterDirection.Input, Value = DBNull.Value });

            if (isCustom != null)
            {
                parameters.Add(new SqlParameter("@iscustom", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = isCustom });
            }
            else
                parameters.Add(new SqlParameter("@iscustom", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = DBNull.Value });

            if (isAdmin != null)
            {
                parameters.Add(new SqlParameter("@isadmin", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = isAdmin });
            }
            else
                parameters.Add(new SqlParameter("@isadmin", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = DBNull.Value });

            if (notIncludePGItem != null)
            {
                parameters.Add(new SqlParameter("@notIncludePGItem", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = notIncludePGItem });
            }
            else
                parameters.Add(new SqlParameter("@notIncludePGItem", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = false });

            var listData = await _codesRepository.GetCodes(parameters);

            listData = listData.Where(x => x.Id != 9999).ToList(); //Remove No Code Item in the results

            decimal margin = 0;
            var userMarginInfo = await _userService.GetUserMargin(this.CurrentUserId());

            if (userMarginInfo != null && userMarginInfo.Margin != null && userMarginInfo.Margin.Value > 0)
                margin = userMarginInfo.Margin.Value;
            else
                margin = userMarginInfo.MasterMargin ?? 0;

            decimal tier = 0;
            
            if (userInfo != null && userInfo.Tier1AdminEnabled && userInfo.Tier1UserEnabled && userInfo.Tier1PercentLevel > 0)
                tier = userInfo.Tier1PercentLevel;

            var livePrices = await GetLivePrice();
            var dataOriginalPrice = await _materialOriginalPriceService.GetSingleRecord();
            var pageListData = PageList<CodeListDto>.Create(listData, parametersCommand.PageNumber, parametersCommand.PageSize);
            foreach (var pageItem in pageListData)
            {
                if (!string.IsNullOrWhiteSpace(pageItem.FileKey))
                    pageItem.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(pageItem.FileKey);

                pageItem.FinalUnitPrice = await GetFinalUnitPrice(pageItem, dataOriginalPrice, livePrices, margin, tier, userInfo);
                pageItem.AdminUnitPrice = await GetAdminUnitPrice(pageItem, dataOriginalPrice, livePrices, margin, tier, userInfo);
            }

            return pageListData;
        }

        #region GetLivePrice
        private async Task<MetalLivePriceDto> GetLivePrice()
        {
            decimal livePTPrice = 0;
            decimal livePDPrice = 0;
            decimal liveRHPrice = 0;

            var customPrice = await _metalCustomPriceService.GetCustomPrices();
            if (customPrice != null && customPrice.Platinum > 0)
                livePTPrice = customPrice.Platinum;
            else
            {
                var metalPTSummary = await _metalPriceSummaryService.GetLatestSummary(MetalEnum.Platinum);
                if (metalPTSummary != null)
                    livePTPrice = metalPTSummary.Bid ?? 0;
            }

            if (customPrice != null && customPrice.Palladium > 0)
                livePDPrice = customPrice.Palladium;
            else
            {
                var metalPDSummary = await _metalPriceSummaryService.GetLatestSummary(MetalEnum.Palladium);
                if (metalPDSummary != null)
                    livePDPrice = metalPDSummary.Bid ?? 0;
            }

            if (customPrice != null && customPrice.Rhodium > 0)
                liveRHPrice = customPrice.Rhodium;
            else
            {
                var metalRHSummary = await _metalPriceSummaryService.GetLatestSummary(MetalEnum.Rhodium);
                if (metalRHSummary != null)
                    liveRHPrice = metalRHSummary.Bid ?? 0;
            }

            var result = new MetalLivePriceDto();
            result.LivePlatinumPrice = livePTPrice;
            result.LivePalladiumPrice = livePDPrice;
            result.LiveRhodiumPrice = liveRHPrice;

            return result;
        }
        #endregion GetLivePrice

        #region GetFinalUnitPrice
        private async Task<decimal> GetFinalUnitPrice(CodeListDto codeInfo, MaterialOriginalPriceDto dataOriginalPrice, MetalLivePriceDto livePrices, decimal margin, decimal tier, UserDto user)
        {
            decimal orginalPrice = codeInfo.OriginalPrice ?? 0; // 361.84m;
            decimal priceOfPt = codeInfo.PlatinumPrice ?? 0; //361.33m;
            decimal priceOfPd = codeInfo.PalladiumPrice ?? 0; //360.71m;
            decimal priceOfRh = codeInfo.RhodiumPrice ?? 0; // 359.84m;

            decimal originalPtPrice = 0;
            decimal originalPDPrice = 0;
            decimal originalRHPrice = 0;
            
            if (dataOriginalPrice != null)
            {
                originalPtPrice = dataOriginalPrice.Platinum;
                originalPDPrice = dataOriginalPrice.Palladium;
                originalRHPrice = dataOriginalPrice.Rhodium;
            }

            decimal livePTPrice = livePrices.LivePlatinumPrice;
            decimal livePDPrice = livePrices.LivePalladiumPrice;
            decimal liveRHPrice = livePrices.LiveRhodiumPrice;

            decimal A = (((livePTPrice / originalPtPrice) - 1) * 100) * (orginalPrice - priceOfPt);
            decimal B = (((livePDPrice / originalPDPrice) - 1) * 100) * (orginalPrice - priceOfPd);
            decimal C = (((liveRHPrice / originalRHPrice) - 1) * 100) * (orginalPrice - priceOfRh);

            decimal finalUnitPrice = orginalPrice + A + B + C;

            decimal masterMarginValue = 0;
            var masterMarginData = await _masterMarginService.Get();
            if (masterMarginData != null && masterMarginData.Margin > 0)
                masterMarginValue = (finalUnitPrice * (masterMarginData.Margin / 100m));

            decimal codeMargin = 0;
            if (codeInfo.Margin != null && codeInfo.Margin.HasValue)
                codeMargin = (finalUnitPrice * (codeInfo.Margin.Value / 100m));

            decimal userMargin = 0;
            if (user.Margin != null && user.Margin.HasValue && user.Margin.Value > 0)
                userMargin = (finalUnitPrice * (user.Margin.Value / 100m));

            decimal tierValue = 0;
            if (user.Tier1AdminEnabled && user.Tier1UserEnabled && user.Tier1PercentLevel > 0)
                tierValue = (finalUnitPrice * (user.Tier1PercentLevel / 100m));

            finalUnitPrice = finalUnitPrice - masterMarginValue + codeMargin - userMargin + tierValue;

            return decimal.Round(finalUnitPrice, 2, MidpointRounding.AwayFromZero); ;
        }
        #endregion GetFinalUnitPrice

        #region GetAdminUnitPrice
        /// <summary>
        /// Similar with GetFinalUnitPrice but only use master and code margin
        /// </summary>
        /// <param name="codeInfo"></param>
        /// <param name="dataOriginalPrice"></param>
        /// <param name="livePrices"></param>
        /// <param name="margin"></param>
        /// <param name="tier"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        private async Task<decimal> GetAdminUnitPrice(CodeListDto codeInfo, MaterialOriginalPriceDto dataOriginalPrice, MetalLivePriceDto livePrices, decimal margin, decimal tier, UserDto user)
        {
            decimal orginalPrice = codeInfo.OriginalPrice ?? 0;
            decimal priceOfPt = codeInfo.PlatinumPrice ?? 0;
            decimal priceOfPd = codeInfo.PalladiumPrice ?? 0;
            decimal priceOfRh = codeInfo.RhodiumPrice ?? 0;

            decimal originalPtPrice = 0;
            decimal originalPDPrice = 0;
            decimal originalRHPrice = 0;

            if (dataOriginalPrice != null)
            {
                originalPtPrice = dataOriginalPrice.Platinum;
                originalPDPrice = dataOriginalPrice.Palladium;
                originalRHPrice = dataOriginalPrice.Rhodium;
            }

            decimal livePTPrice = livePrices.LivePlatinumPrice;
            decimal livePDPrice = livePrices.LivePalladiumPrice;
            decimal liveRHPrice = livePrices.LiveRhodiumPrice;

            decimal A = (((livePTPrice / originalPtPrice) - 1) * 100) * (orginalPrice - priceOfPt);
            decimal B = (((livePDPrice / originalPDPrice) - 1) * 100) * (orginalPrice - priceOfPd);
            decimal C = (((liveRHPrice / originalRHPrice) - 1) * 100) * (orginalPrice - priceOfRh);

            decimal adminUnitPrice = orginalPrice + A + B + C;

            decimal masterMarginValue = 0;
            var masterMarginData = await _masterMarginService.Get();
            if (masterMarginData != null && masterMarginData.Margin > 0)
                masterMarginValue = (adminUnitPrice * (masterMarginData.Margin / 100m));

            decimal codeMargin = 0;
            if (codeInfo.Margin != null && codeInfo.Margin.HasValue && codeInfo.Margin.Value > 0)
                codeMargin = (adminUnitPrice * (codeInfo.Margin.Value / 100m));

            adminUnitPrice = adminUnitPrice - masterMarginValue + codeMargin;

            return decimal.Round(adminUnitPrice, 2, MidpointRounding.AwayFromZero); ;
        }
        
        #endregion GetAdminUnitPrice

        public async Task<ResponseDto> Delete(long id)
        {
            var singleData = await _codesRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted == true)
                return new ResponseDto() { Success = 0, Message = "Code does not exist." };

            await _codesRepository.DeleteRelatedTableData(id);

            singleData.IsDeleted = true;
            _codesRepository.Update(singleData);
            _codesRepository.SaveChanges();

            return new ResponseDto() { Success = 1, Message = "Codes succesfully deleted" };

        }
        #endregion CRUD


    }
}
