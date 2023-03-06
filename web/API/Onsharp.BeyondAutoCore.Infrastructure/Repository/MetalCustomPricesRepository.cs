
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class MetalCustomPricesRepository : BaseRepository<MetalCustomPriceModel>, IMetalCustomPricesRepository
    {
        private BacDBContext _context;

        public MetalCustomPricesRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<MetalCustomPriceModel?> GetSingleRecord()
        {
            return await _context.MetalCustomPrices.Where(w => w.IsDeleted != true).FirstOrDefaultAsync();
        }

    }
}
