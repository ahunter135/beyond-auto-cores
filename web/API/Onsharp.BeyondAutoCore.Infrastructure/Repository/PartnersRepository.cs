

namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class PartnersRepository : BaseRepository<PartnerModel>, IPartnersRepository
    {

        private BacDBContext _context = null;

        public PartnersRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
