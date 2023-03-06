
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class MasterMarginsRepository : BaseRepository<MasterMarginModel>, IMarginsRepository
    {
        private BacDBContext _context = null;

        public MasterMarginsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
