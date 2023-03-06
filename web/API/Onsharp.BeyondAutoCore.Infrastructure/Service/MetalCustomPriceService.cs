
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class MetalCustomPriceService : BaseService, IMetalCustomPriceService
    {
        private readonly IMapper _mapper;
        private readonly IMetalCustomPricesRepository _metalCustomPricesRepository;

        public MetalCustomPriceService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IMetalCustomPricesRepository metalCustomPricesRepository)
            : base(httpContextAccessor)
        {

            _mapper = mapper;
            _metalCustomPricesRepository = metalCustomPricesRepository;
        }

        public async Task<MetalCustomPriceDto> GetCustomPrices()
        {
            var singleData = await _metalCustomPricesRepository.GetSingleRecord();
            if (singleData == null || singleData.IsDeleted)
                return new MetalCustomPriceDto() { Success = false, Message = "Metal custom price does not exist." };

            var mapData = _mapper.Map<MetalCustomPriceModel, MetalCustomPriceDto>(singleData);

            return mapData;
        }

        public async Task<MetalCustomPriceDto> Create(CreateMetalCustomPriceCommand createCommand)
        {
            var allRecord = await _metalCustomPricesRepository.GetByAllAsync();
            if (allRecord != null && allRecord.Any())
                allRecord = allRecord.Where(w => w.IsDeleted != true);

            if (allRecord == null || allRecord.Count() > 0)
                return new MetalCustomPriceDto() { Success = true, Message = "There should only 1 Metal Custom Price." };

            var newCustomPrice = _mapper.Map<CreateMetalCustomPriceCommand, MetalCustomPriceModel>(createCommand);

            newCustomPrice.CreatedBy = this.CurrentUserId();
            newCustomPrice.CreatedOn = DateTime.UtcNow;

            _metalCustomPricesRepository.Add(newCustomPrice);
            _metalCustomPricesRepository.SaveChanges();

            return _mapper.Map<MetalCustomPriceModel, MetalCustomPriceDto>(newCustomPrice);
        }

        public async Task<MetalCustomPriceDto> Update(UpdateMetalCustomPriceCommand updateCommand)
        {
            var currenData = await _metalCustomPricesRepository.GetByIdAsync(updateCommand.Id);

            currenData.Platinum = updateCommand.Platinum;
            currenData.Palladium = updateCommand.Palladium;
            currenData.Rhodium = updateCommand.Rhodium;
            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _metalCustomPricesRepository.Update(currenData);
            _metalCustomPricesRepository.SaveChanges();

            return _mapper.Map<MetalCustomPriceModel, MetalCustomPriceDto>(currenData);
        }

    }
}
