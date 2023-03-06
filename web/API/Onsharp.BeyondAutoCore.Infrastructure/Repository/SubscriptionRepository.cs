

namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class SubscriptionsRepository : BaseRepository<SubscriptionModel>, ISubscriptionsRepository
    {
        private BacDBContext _context = null;

        public SubscriptionsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
