namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IUsersRepository : IBaseRepository<UserModel>
    {

        // read
        Task<UserModel> GetByRegistationId(long registrationId);
        Task<UserModel> GetUserByName(string userName);
        Task<UserModel> GetUserByEmail(string email);
        Task<UserModel> GetUserByResetCode(int code);
        Task<UserModel> GetUserByStripeAccountId(string stripeAccountId);
        Task<UserModel> GetUserByAffiliateCode(string affiliateCode);
        Task<List<UserListDto>> GetUserList();
        Task<List<CommissionDto>> GetCommissions();
    }
}
