
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class CreatePhotoGradeItemCommand
    {
        public long PhotoGradeId { get; set; }
        public string FileKey { get; set; }
        public string FileName { get; set; }
        public bool IsUploaded { get; set; }
    }
}
