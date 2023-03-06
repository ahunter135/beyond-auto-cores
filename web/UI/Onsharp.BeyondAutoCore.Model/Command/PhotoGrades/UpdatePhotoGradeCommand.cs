
namespace Onsharp.BeyondAutoCore.Web.Model.Command
{
    public class UpdatePhotoGradeCommand
    {
        public long Id { get; set; }
        public long CodeId { get; set; }
        public int PhotoGradeStatus { get; set; }
        public decimal Price { get; set; }
        public string Comments { get; set; }
    }
}
