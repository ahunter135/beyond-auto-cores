
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class CreatePhotoGradeCommand : DetailPhotoGradeCommand
    {
        public bool SendNotification { get; set; }
    }
}
