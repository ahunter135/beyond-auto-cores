namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class LotItemFullnessRepository : BaseRepository<LotItemFullnessModel>, ILotItemFullnessRepository
    {

        private BacDBContext _context = null;

        public LotItemFullnessRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
