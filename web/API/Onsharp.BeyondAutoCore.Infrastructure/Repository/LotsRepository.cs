
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class LotsRepository : BaseRepository<LotModel>, ILotsRepository
    {

        private BacDBContext _context = null;

        public LotsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<InventoryDto>> GetInventories(List<SqlParameter> parameters)
        {
            return await _context.Set<InventoryDto>().FromSqlRaw("SProc_GetInventory @lotId, @lotName, @isSubmitted", parameters.ToArray()).ToListAsync();
        }

        public async Task<List<InventorySummaryDto>> GetInventorySummary(List<SqlParameter> parameters)
        {
            return await _context.Set<InventorySummaryDto>().FromSqlRaw("SProc_GetInventorySummary @lotId, @lotName, @isSubmitted", parameters.ToArray()).ToListAsync();
        }

        public async Task<List<InvoiceDto>> GetLotInvoices(List<SqlParameter> parameters)
        {
            return await _context.Set<InvoiceDto>().FromSqlRaw("SProc_GetLotInvoice @lotId", parameters.ToArray()).ToListAsync();
        }


    }
}
