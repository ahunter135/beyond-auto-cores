

namespace Onsharp.BeyondAutoCore.Application
{
    public interface IPriceService
    {
        // read
        Task<PriceDto> GetPriceByName(PriceEnum subscriptionType);
        Task<List<PriceLiteDto>> GetSubscriptionPrices();

        // write

    }
}
