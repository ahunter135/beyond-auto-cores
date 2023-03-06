
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class MetalPriceSummaryService : BaseService, IMetalPriceSummaryService
    {
        private readonly IMapper _mapper;
        private readonly IMetalPriceSummariesRepository _metalPriceSummariesRepository;

        public MetalPriceSummaryService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client,
                           IMetalPriceSummariesRepository metalPriceSummariesRepository
                           )
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _metalPriceSummariesRepository = metalPriceSummariesRepository;

        }

        public async Task<MetalPriceSummaryDto> Create(CreateMetalPriceSummaryCommand createCommand)
        {

            var newMetalPriceSummary = _mapper.Map<CreateMetalPriceSummaryCommand, MetalPriceSummaryModel>(createCommand);

            newMetalPriceSummary.CreatedBy = this.CurrentUserId();
            newMetalPriceSummary.CreatedOn = DateTime.UtcNow;

            _metalPriceSummariesRepository.Add(newMetalPriceSummary);
            _metalPriceSummariesRepository.SaveChanges();

            return _mapper.Map<MetalPriceSummaryModel, MetalPriceSummaryDto>(newMetalPriceSummary);
        }

        public async Task<MetalPriceSummaryDto> GetLatestSummary(MetalEnum metal)
        {

            var response = await _metalPriceSummariesRepository.GetLatestMetalPriceSummary(metal);
            if (response != null)
            {
                var mapData = _mapper.Map<MetalPriceSummaryModel, MetalPriceSummaryDto>(response);
                mapData.Success = true;
                mapData.Message = "";

                return mapData;
            }
            else
            {
                return new MetalPriceSummaryDto() { Success = true, Message = "Metal Price does not exists." };
            }
        }

    }
}
