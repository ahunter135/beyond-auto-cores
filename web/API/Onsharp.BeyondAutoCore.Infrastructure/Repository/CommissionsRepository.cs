
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class CommissionsRepository : BaseRepository<CommissionModel>, ICommissionsRepository
    {
        private BacDBContext _context = null;

        public CommissionsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
