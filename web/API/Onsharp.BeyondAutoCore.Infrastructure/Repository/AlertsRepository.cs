
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class AlertsRepository : BaseRepository<AlertModel>, IAlertsRepository
    {
        private BacDBContext _context = null;

        public AlertsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
