
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class LotItemsRepository : BaseRepository<LotItemModel>, ILotItemsRepository
    {
        private BacDBContext _context = null;

        public LotItemsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<LotCodeItemDto>> GetLotItemList(List<SqlParameter> parameters)
        {
            return await _context.Set<LotCodeItemDto>().FromSqlRaw("SProc_GetLotItems @lotId", parameters.ToArray()).ToListAsync();
        }

        public async Task<LotItemModel> GetLotItemByLotIdAndCodeId(long lotId, long codeId)
        {
            return await _context.LotItems.Where(w => w.LotId == lotId && w.CodeId == codeId).FirstOrDefaultAsync();
        }

    }
}
