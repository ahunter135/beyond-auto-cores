
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class PartnerService : BaseService, IPartnerService
    {
        private readonly IMapper _mapper;

        private readonly IOptions<AWSSettingDto> _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        private readonly AwsS3Helper _awsS3Helper;

        private readonly IPartnersRepository _partnerRepository;

        public PartnerService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client,
                           IPartnersRepository partnerRepository
                           )
           : base(httpContextAccessor)
        {
            _mapper = mapper;

            _awsSettings = awsSettings;
            _aws3Client = aws3Client;
            _awsS3Helper = new AwsS3Helper(_awsSettings, _aws3Client);

            _partnerRepository = partnerRepository;

        }


        #region CRUD

        public async Task<PartnerDto> Create(CreatePartnerCommand createCommand, IFormFile? logo)
        {

            var newPartner = _mapper.Map<CreatePartnerCommand, PartnerModel>(createCommand);
            
            string fileKey = "";
            string logoFileName = "";

            bool uploadResult = false;
            if (logo != null && logo.FileName != "none")
            {
                try
                {
                    logoFileName = logo.FileName;
                    fileKey = "partner_logo_" + DateTime.Now.ToString("yyyyMMddhhmmssfff") + "_" + logo.FileName;
                    uploadResult = await _awsS3Helper.UploadFileAsync(logo, _awsSettings.Value.Bucket, fileKey);
                    uploadResult = true;
                }
                catch (Exception ex)
                {
                    uploadResult = false;
                }
            }


            newPartner.LogoFileKey = fileKey;
            newPartner.Logo = logoFileName;

            newPartner.CreatedBy = this.CurrentUserId();
            newPartner.CreatedOn = DateTime.UtcNow;
            
            _partnerRepository.Add(newPartner);
            _partnerRepository.SaveChanges();

            return _mapper.Map<PartnerModel, PartnerDto>(newPartner);

        }

        public async Task<PartnerDto> Update(UpdatePartnerCommand updateCommand, IFormFile? logo)
        {
            var currenData = await _partnerRepository.GetByIdAsync(updateCommand.Id);

            currenData.PartnerName = updateCommand.PartnerName;
            currenData.Website = updateCommand.Website;
            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            string fileKey = "";
            string logoFileName = "";

            bool uploadResult = false;
            if (logo != null && logo.FileName != "none")
            {
                try
                {
                    logoFileName = logo.FileName;
                    fileKey = "partner_logo_" + DateTime.Now.ToString("yyyyMMddhhmmssfff") + "_" + logo.FileName;
                    uploadResult = await _awsS3Helper.UploadFileAsync(logo, _awsSettings.Value.Bucket, fileKey);
                    uploadResult = true;
                }
                catch (Exception ex)
                {
                    uploadResult = false;
                }
            }

            if (!uploadResult)
            {
                fileKey = "";
                logoFileName = "";
            }

            if (!string.IsNullOrWhiteSpace(logoFileName) || updateCommand.IsUpdatelogo)
            {
                currenData.LogoFileKey = fileKey;
                currenData.Logo = logoFileName;
            }

            _partnerRepository.Update(currenData);
            _partnerRepository.SaveChanges();

            return _mapper.Map<PartnerModel, PartnerDto>(currenData);
        }

        public async Task<PartnerDto> GetById(long id)
        {
            var singleData = await _partnerRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new PartnerDto() { Success = false, Message = "Partner does not exist." };

            var mapData = _mapper.Map<PartnerModel, PartnerDto>(singleData);
            if (!string.IsNullOrWhiteSpace(mapData.LogoFileKey))
                mapData.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(mapData.LogoFileKey);

            return mapData;
        }

        public async Task<PageList<PartnerDto>> GetAll(ParametersCommand parametersCommand, bool includeLogoUrl = false)
        {

            if(parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");


            var collection = _partnerRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false);
            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "partnername" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                collection = collection.Where(w => w.PartnerName.ToLower().Contains(parametersCommand.SearchQuery.ToLower()));
            }

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "website" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                collection = collection.Where(w => w.Website.ToLower().Contains(parametersCommand.SearchQuery.ToLower()));
            }

            int sourceCount = collection.Count();
            var filteredData = collection.Skip((parametersCommand.PageNumber - 1) * parametersCommand.PageSize).Take(parametersCommand.PageSize).ToList();

            var mappedData = _mapper.Map<List<PartnerModel>, List<PartnerDto>>(filteredData);
            if (includeLogoUrl)
            {
                foreach (var partner in mappedData)
                {
                    if (!string.IsNullOrWhiteSpace(partner.LogoFileKey)) {
                        partner.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(partner.LogoFileKey);
                    }
                }
            }
            return PageList<PartnerDto>.Create(mappedData, sourceCount, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _partnerRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _partnerRepository.Update(singleData);
            _partnerRepository.SaveChanges();

            return true;
        }
        #endregion CRUD

    }
}
