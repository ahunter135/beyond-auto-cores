namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class PhotoGradesRepository : BaseRepository<PhotoGradeModel>, IPhotoGradesRepository
    {
        private BacDBContext _context = null;

        public PhotoGradesRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<PhotoGradeListDto>> GetPhotoGrades(List<SqlParameter> parameters)
        {
            return await _context.Set<PhotoGradeListDto>().FromSqlRaw("SProc_GetPhotoGrades @photoGradeStatus, @userId", parameters.ToArray()).ToListAsync();
        }

    }
}
