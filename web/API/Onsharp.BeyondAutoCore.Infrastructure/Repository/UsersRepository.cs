
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class UsersRepository : BaseRepository<UserModel>, IUsersRepository
    {
        private readonly IMapper _mapper;
        private BacDBContext _context = null;

        public UsersRepository(BacDBContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<UserModel> GetByRegistationId(long registrationId)
        {
            return await _context.Users.Where(c => c.RegistrationId == registrationId && c.IsDeleted == false).FirstOrDefaultAsync();
        }

        public async Task<UserModel> GetUserByName(string userName)
        {
            return await _context.Users.Where(c => c.UserName == userName).FirstOrDefaultAsync();
        }
        
        public async Task<UserModel> GetUserByEmail(string email)
        {
            return await _context.Users.Where(c => c.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
        }       

        public async Task<UserModel> GetUserByResetCode(int code)
        {
            return await _context.Users.Where(c => c.ResetPasswordCode.HasValue && c.ResetPasswordCode.Value == code).FirstOrDefaultAsync();
        }

        public async Task<UserModel> GetUserByStripeAccountId(string stripeAccountId)
        {
            return await _context.Users.Where(c => c.StripeAccountId == stripeAccountId).FirstOrDefaultAsync();
        }

        public async Task<UserModel> GetUserByAffiliateCode(string affiliateCode)
        {
            return await _context.Users.Where(c => c.UUID == affiliateCode && c.IsDeleted != true && c.AffiliateEnable == true).FirstOrDefaultAsync();
        }

        public async Task<List<UserListDto>> GetUserList()
        {
            return await _context.Set<UserListDto>().FromSqlRaw("SProc_GetUsers").ToListAsync();
        }

        public async Task<List<CommissionDto>> GetCommissions()
        {
            return await _context.Set<CommissionDto>().FromSqlRaw("Sproc_GetCommissions").ToListAsync();
        }

    }
}
