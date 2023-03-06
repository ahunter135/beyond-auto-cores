
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class MaterialOriginalPricesRepository : BaseRepository<MaterialOriginalPriceModel>, IMaterialOriginalPricesRepository
    {

        private BacDBContext _context = null;

        public MaterialOriginalPricesRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
