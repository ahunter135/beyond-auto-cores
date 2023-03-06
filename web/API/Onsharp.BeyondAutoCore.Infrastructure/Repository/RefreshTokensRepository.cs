namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{

    public class RefreshTokensRepository : BaseRepository<RefreshTokenModel>, IRefreshTokensRepository
    {

        private BacDBContext _context;

        public RefreshTokensRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> DeleteRefreshTokenByUserIdAsync(long userId)
        {
            if (_context == null)
            {
                return false;
            }

            var data = await _context.RefreshTokens.Where(c => c.UserId == userId).ToListAsync();
            if (data.Any())
            {
                _context.RefreshTokens.RemoveRange(data);
                _context.SaveChanges();
            }

            return true;
        }

        public async Task<RefreshTokenModel> Get(long userId)
        {
            return await _context.RefreshTokens.FirstOrDefaultAsync(x => x.UserId == userId);
        }
    }

}
