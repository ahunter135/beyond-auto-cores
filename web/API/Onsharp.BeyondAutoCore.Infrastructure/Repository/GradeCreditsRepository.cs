namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class GradeCreditsRepository : BaseRepository<GradeCreditModel>, IGradeCreditsRepository
    {
        private BacDBContext _context = null;

        public GradeCreditsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
