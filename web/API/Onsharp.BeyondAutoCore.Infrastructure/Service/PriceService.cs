
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class PriceService : BaseService, IPriceService
    {
        private readonly IMapper _mapper;

        private readonly IPricesRepository _pricesRepository;

        public PriceService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           IPricesRepository pricesRepository
                           )
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _pricesRepository = pricesRepository;

        }

        public async Task<PriceDto> GetPriceByName(PriceEnum subscriptionType)
        {
            var singleData = await _pricesRepository.GetPriceByName(subscriptionType);
            if (singleData == null || singleData.IsDeleted)
                return new PriceDto() { Success = false, Message = "Subscription type does not exist." };

            var mapData = _mapper.Map<PriceModel, PriceDto>(singleData);

            return mapData;
        }

        public async Task<List<PriceLiteDto>> GetSubscriptionPrices()
        {
            var subscriptionPriceList = await _pricesRepository.GetSubscriptionPrices();
            var mapData = _mapper.Map<List<PriceModel>, List<PriceLiteDto>>(subscriptionPriceList);

            return mapData;
        }

        public async Task<List<PriceModel>> GetSubscriptionPricesFull()
        {
            return await _pricesRepository.GetSubscriptionPrices();
        }
    }
}
