
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class DetailPhotoGradeCommand
    {
        public DetailPhotoGradeCommand()
        {
            PhotoGrades = new List<IFormFile>();
        }

        public List<IFormFile> PhotoGrades { get; set; }
        public string Comments { get; set; }
        public int Fullness { get; set; }
        public long? CodeId { get; set; }

    }
}
