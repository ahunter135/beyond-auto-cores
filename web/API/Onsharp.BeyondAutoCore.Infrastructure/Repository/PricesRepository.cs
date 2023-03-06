using Onsharp.BeyondAutoCore.Domain.Enums;

namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class PricesRepository : BaseRepository<PriceModel>, IPricesRepository
    {
        private BacDBContext _context = null;

        public PricesRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<PriceModel> GetPriceByName(PriceEnum subscriptionType)
        {
                return await _context.Prices.Where(w => w.Name == subscriptionType.ToString()).FirstOrDefaultAsync();
        }

        public async Task<List<PriceModel>> GetSubscriptionPrices()
        {
            var subscrptionTypes = new List<string>();
            subscrptionTypes.Add(SubscriptionTypeEnum.Premium.ToString());
            subscrptionTypes.Add(SubscriptionTypeEnum.Elite.ToString());
            subscrptionTypes.Add(SubscriptionTypeEnum.Lifetime.ToString());

            return await _context.Prices.Where(w => subscrptionTypes.Contains(w.Name)).ToListAsync();
        }

        
    }
}
