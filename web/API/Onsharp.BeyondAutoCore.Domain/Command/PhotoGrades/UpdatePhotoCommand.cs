
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class UpdatePhotoCommand
    {
        public UpdatePhotoCommand()
        {
            PhotoGrades = new List<IFormFile>();
            PhotoGradeItemsToDelete = new List<long>();
        }

        public long Id { get; set; }
       
        public List<IFormFile> PhotoGrades { get; set; }
        public List<long> PhotoGradeItemsToDelete { get; set; }
    }
}
