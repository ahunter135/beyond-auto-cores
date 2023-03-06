
namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IPhotoGradesRepository : IBaseRepository<PhotoGradeModel>
    {

        // read 
        Task<List<PhotoGradeListDto>> GetPhotoGrades(List<SqlParameter> parameters);

    }
}
