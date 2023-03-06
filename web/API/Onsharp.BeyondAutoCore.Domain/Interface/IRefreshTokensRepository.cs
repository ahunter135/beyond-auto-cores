
namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IRefreshTokensRepository : IBaseRepository<RefreshTokenModel>
    {
        Task<bool> DeleteRefreshTokenByUserIdAsync(long userId);
        Task<RefreshTokenModel> Get(long userId);
    }
}
