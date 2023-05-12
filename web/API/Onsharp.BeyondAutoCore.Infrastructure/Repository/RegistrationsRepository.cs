
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

        public async Task<SubscriptionStatusDto> GetSubscriptionStatusByUserId(long userId)
        {
            var p1 = new SqlParameter("@userId", userId);

            return _context.Set<SubscriptionStatusDto>().FromSqlRaw("SProc_GetUserSubscriptionStatus @userId", p1).AsEnumerable().First();
        }

    }
}
