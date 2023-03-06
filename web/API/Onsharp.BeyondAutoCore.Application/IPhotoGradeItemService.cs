using Microsoft.AspNetCore.Http;

namespace Onsharp.BeyondAutoCore.Application
{
    public interface IPhotoGradeItemService
    {
        // Read
        Task<PhotoGradeItemDto> GetById(long id);
        Task<List<PhotoGradeItemDto>> GetAllByPhotoGradeId(long photoGradeId);
        Task<string> GetPreSignedUrlAsync(string fileKey);

        // Write
        Task<List<PhotoGradeItemDto>> Create(long photoGradeId, List<IFormFile> PhotoGrades, List<long> listItemsToDelete = null);
        Task<bool> Delete(long id);
        Task<bool> DeleteAllByPhotoGradeId(long photoGradeId);
    }
}
