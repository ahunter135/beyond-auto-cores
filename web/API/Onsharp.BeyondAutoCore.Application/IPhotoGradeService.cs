
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IPhotoGradeService
    {
        // Read
        Task<PhotoGradeDto> GetById(long id);
        Task<PageList<PhotoGradeListDto>> GetAll(ParametersCommand parametersCommand);
        Task<PageList<PhotoGradeListDto>> GetAllCompleted(ParametersCommand parametersCommand);

        // Write
        Task<PhotoGradeDto> Create(CreatePhotoGradeCommand createCommand);
        Task<PageList<PhotoGradeItemDto>> UpdatePhoto(UpdatePhotoCommand updatePhotoCommand);
        Task<PhotoGradeDto> UpdateGrade(GradeConverterCommand updateCommand);
        Task<bool> Delete(long id);

    }
}
