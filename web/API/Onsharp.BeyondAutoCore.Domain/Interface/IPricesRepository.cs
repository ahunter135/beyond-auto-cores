
namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IPricesRepository : IBaseRepository<PriceModel>
    {
        // read
        Task<PriceModel> GetPriceByName(PriceEnum subscriptionType);
        Task<List<PriceModel>> GetSubscriptionPrices();

    }
}
