namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class RolesRepository : BaseRepository<RoleModel>, IRolesRepository
    {
        private BacDBContext _context = null;

        public RolesRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
