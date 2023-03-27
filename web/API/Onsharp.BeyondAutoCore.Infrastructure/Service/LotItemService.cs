
using Onsharp.BeyondAutoCore.Application;
using Onsharp.BeyondAutoCore.Infrastructure.Repository;
using Stripe;
using System.Xml.Linq;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class LotItemService : BaseService, ILotItemService
    {

        private readonly IMapper _mapper;
        private readonly ILotItemPhotoGradeRepository _lotPhotoItemGradeRepository;
        private readonly ILotItemsRepository _lotItemsRepository;
        private readonly ICodesRepository _codesRepository;
        private readonly ICodeService _codeService;
        private readonly ILotsRepository _lotsRepository;
        private readonly ILotItemFullnessService _lotItemFullnessService;
        private readonly IUserService _userService;
        private readonly IPhotoGradeService _photoGradeService;

        private readonly IOptions<AWSSettingDto> _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        private readonly AwsS3Helper _awsS3Helper;

        public LotItemService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                              ILotItemsRepository lotItemsRepository, ICodesRepository codesRepository,
                              IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client,
                              ICodeService codeService, ILotsRepository lotsRepository, ILotItemFullnessService lotItemFullnessService,
                              IUserService userService, IPhotoGradeService photoGradeService, ILotItemPhotoGradeRepository lotPhotoItemGradeRepository)
            : base(httpContextAccessor)
        {
            _mapper = mapper;
            _lotItemsRepository = lotItemsRepository;
            _codeService = codeService;
            _codesRepository = codesRepository;
            _lotsRepository = lotsRepository;
            _lotItemFullnessService = lotItemFullnessService;
            _userService = userService;
            _photoGradeService = photoGradeService;
            _lotPhotoItemGradeRepository = lotPhotoItemGradeRepository;

            _awsSettings = awsSettings;
            _aws3Client = aws3Client;
            _awsS3Helper = new AwsS3Helper(_awsSettings, _aws3Client);
        }

        #region CRUD

        public async Task<LotItemDto> Create(CreateLotItemCommand createCommand)
        {
            var result = new LotItemDto();
            var newLotItem = _mapper.Map<CreateLotItemCommand, LotItemModel>(createCommand);

            #region validation

            if (newLotItem == null)
            {
                result.Success = false;
                result.Message = "Invalid null code lot.";
                return result;
            }

            var lotInfo = await _lotsRepository.GetByIdAsync(newLotItem.LotId);
            if (lotInfo == null || lotInfo.Id == 0 || lotInfo.IsDeleted)
            {
                result.Success = false;
                result.Message = "Invalid lot Id.";
                return result;
            }

            long codeId = 0;
            if (newLotItem.CodeId != null && newLotItem.CodeId != 0)
            {
                var codeInfo = await _codesRepository.GetByIdAsync(newLotItem.CodeId.Value);
                if (codeInfo == null || codeInfo.Id == 0)
                {
                    result.Success = false;
                    result.Message = "Invalid code Id.";
                    return result;
                }

                codeId = newLotItem.CodeId.Value;
            }
            else if (!string.IsNullOrWhiteSpace(createCommand.ConverterName))
            {
                var newCodeCommand = new CreateCodeCommand();

                newCodeCommand.ConverterName = createCommand.ConverterName;
                newCodeCommand.OriginalPrice = createCommand.OriginalPrice;

                var newCode = await _codeService.Create(newCodeCommand);

                codeId = newCode.Id;
            }
            else if (newLotItem.CodeId == 0)
            {
                // 66244 new lot items with a code id of 0 need to pass validation.
                codeId = 0;
            }
            else
            {
                result.Success = false;
                result.Message = "Invalid code Id.";
                return result;

            }

            #endregion validation

            //photograde
            if (createCommand.PhotoGradeId.HasValue)
            {
                var lotPhotoItemGrade = _lotPhotoItemGradeRepository.GetAllIQueryable().FirstOrDefault(c => c.PhotoGradeId == createCommand.PhotoGradeId.Value
                && c.LotId == newLotItem.LotId);
                if (lotPhotoItemGrade == null)
                {
                    // hit if photograde add
                    var newLotItemDto = await CommonCreateLotItemModel(newLotItem, createCommand, codeId);
                    var new_lotPhotoItemGrade = new LotItemPhotoGradeModel
                    {
                        LotId = newLotItemDto.LotId,
                        PhotoGradeId = createCommand.PhotoGradeId.Value,
                        CreatedBy = this.CurrentUserId(),
                        CreatedOn = DateTime.UtcNow,
                        UpdatedBy = this.CurrentUserId(),
                        UpdatedOn = DateTime.UtcNow,
                        IsDeleted = false,
                        LotItemId = newLotItemDto.Id
                    };
                    _lotPhotoItemGradeRepository.Add(new_lotPhotoItemGrade);
                    _lotPhotoItemGradeRepository.SaveChanges();

                    return newLotItemDto;
                }
                else
                {
                    //update
                    return await CommonUpdateLotItemModel(lotPhotoItemGrade.LotItemId, createCommand.FullnessPercentage, createCommand.OriginalPrice);
                }
            }
            else
            {
                //normal
                var checkLotExistingCode = await _lotItemsRepository.GetLotItemByLotIdAndCodeId(newLotItem.LotId, newLotItem.CodeId ?? 0);
                if (checkLotExistingCode != null)  // add fullness to existing lotItem
                {
                    return await CommonUpdateLotItemModel(checkLotExistingCode.Id, createCommand.FullnessPercentage, createCommand.OriginalPrice);
                }
                else
                {
                    return await CommonCreateLotItemModel(newLotItem, createCommand, codeId);

                }
            }
        }

        private async Task<LotItemDto> CommonUpdateLotItemModel(long lotItemId, int? fullnessPercentage, decimal? originalPrice)
        {
            var createLotItemFullnessCommand = new CreateLotItemFullnessCommand();
            createLotItemFullnessCommand.LotItemId = lotItemId;
            createLotItemFullnessCommand.FullnessPercentage = fullnessPercentage ?? 0;
            createLotItemFullnessCommand.UnitPrice = originalPrice ?? 0;
            createLotItemFullnessCommand.Qty = 1;

            await _lotItemFullnessService.Create(createLotItemFullnessCommand);

            var existingLotItem = await _lotItemsRepository.GetByIdAsync(lotItemId);
            return _mapper.Map<LotItemModel, LotItemDto>(existingLotItem);
        }

        private async Task<LotItemDto> CommonCreateLotItemModel(LotItemModel newLotItem, CreateLotItemCommand createCommand, long codeId)
        {
            newLotItem.CodeId = codeId;
            newLotItem.CreatedBy = this.CurrentUserId();
            newLotItem.CreatedOn = DateTime.UtcNow;

            _lotItemsRepository.Add(newLotItem);
            _lotItemsRepository.SaveChanges();

            var createLotItemFullnessCommand = new CreateLotItemFullnessCommand();
            createLotItemFullnessCommand.FullnessPercentage = createCommand.FullnessPercentage ?? 0;
            createLotItemFullnessCommand.LotItemId = newLotItem.Id;
            createLotItemFullnessCommand.UnitPrice = createCommand.OriginalPrice ?? 0;
            createLotItemFullnessCommand.Qty = 1;
            await _lotItemFullnessService.Create(createLotItemFullnessCommand);

            return _mapper.Map<LotItemModel, LotItemDto>(newLotItem);
        }

        public async Task<LotItemDto> Update(UpdateLotItemCommand updateCommand)
        {
            var result = new LotItemDto();

            var currenData = await _lotItemsRepository.GetByIdAsync(updateCommand.Id);

            #region validation

            if (updateCommand == null)
            {
                result.Success = false;
                result.Message = "Invalid null code lot.";
                return result;
            }
            if (updateCommand.CodeId != null)
            {
                var codeInfo = await _codesRepository.GetByIdAsync(updateCommand.CodeId.Value);
                if (codeInfo == null || codeInfo.Id == 0)
                {
                    result.Success = false;
                    result.Message = "Invalid code Id.";
                    return result;
                }
            }

            var lotInfo = await _lotsRepository.GetByIdAsync(updateCommand.LotId);
            if (lotInfo == null || lotInfo.Id == 0)
            {
                result.Success = false;
                result.Message = "Invalid lot Id.";
                return result;
            }

            #endregion validation

            currenData.LotId = updateCommand.LotId;
            currenData.CodeId = updateCommand.CodeId;

            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _lotItemsRepository.Update(currenData);
            _lotItemsRepository.SaveChanges();

            return _mapper.Map<LotItemModel, LotItemDto>(currenData);
        }

        public async Task<LotItemDto> GetById(long id)
        {
            var singleData = await _lotItemsRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new LotItemDto() { Success = false, Message = "Lot item does not exists." };

            return _mapper.Map<LotItemModel, LotItemDto>(singleData);
        }

        public async Task<PageList<LotItemModel>> GetAllFromRepo(ParametersCommand parametersCommand)
        {
            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var collection = _lotItemsRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false);

            var currentUser = await _userService.GetById(this.CurrentUserId());
            if (currentUser != null && currentUser.Role == RoleEnum.User)
                collection = collection.Where(w => w.CreatedBy == this.CurrentUserId());

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "codeid" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                long searchCodeId = 0;
                if (long.TryParse(parametersCommand.SearchQuery, out searchCodeId))
                    collection = collection.Where(w => w.CodeId == searchCodeId);
            }

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "lotid" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                long searchLotId = 0;
                if (long.TryParse(parametersCommand.SearchQuery, out searchLotId))
                    collection = collection.Where(w => w.LotId == searchLotId);
            }

            var pagedCollection = new List<CodeModel>();

            return PageList<LotItemModel>.Create(collection, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _lotItemsRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _lotItemsRepository.Update(singleData);
            _lotItemsRepository.SaveChanges();

            return true;
        }
        #endregion CRUD

        public async Task<PageList<LotCodeItemDto>> GetAllByLotId(long lotId, ParametersCommand parametersCommand)
        {
            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@lotId", System.Data.SqlDbType.BigInt) { Direction = System.Data.ParameterDirection.Input, Value = lotId });

            var listData = await _lotItemsRepository.GetLotItemList(parameters);
            var pageListData = PageList<LotCodeItemDto>.Create(listData, parametersCommand.PageNumber, parametersCommand.PageSize);
            foreach (var pageItem in pageListData)
            {
                if (!string.IsNullOrWhiteSpace(pageItem.FileKey))
                    pageItem.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(pageItem.FileKey);
            }

            return pageListData;
        }

    }
}
