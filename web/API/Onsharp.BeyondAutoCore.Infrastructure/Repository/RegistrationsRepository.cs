
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class RegistrationsRepository : BaseRepository<RegistrationModel>, IRegistrationsRepository
    {
        private BacDBContext _context = null;

        public RegistrationsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<RegistrationModel> GetRegistrationByCode(string registrationCode)
        {
            return await _context.Registrations.Where(c => c.RegistrationCode == registrationCode).FirstOrDefaultAsync();
        }

    }
}
