
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    
    public class MetalPriceSummariesRepository : BaseRepository<MetalPriceSummaryModel>, IMetalPriceSummariesRepository
    {
        private BacDBContext _context = null;

        public MetalPriceSummariesRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<MetalPriceSummaryModel> GetLatestMetalPriceSummary(MetalEnum metal)
        {
            var data = await _context.MetalPriceSummaries.OrderByDescending(d => d.CreatedOn).Where(w => w.IsDeleted != true && w.Symbol.ToLower() == metal.ToString().ToLower()).FirstOrDefaultAsync();

            return data;

        }
    }
}
