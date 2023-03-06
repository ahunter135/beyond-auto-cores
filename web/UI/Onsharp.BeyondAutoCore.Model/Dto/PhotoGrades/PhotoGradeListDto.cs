
namespace Onsharp.BeyondAutoCore.Web.Model.Dto
{
    public class PhotoGradeListDto
    {

        public string? RequestorName { get; set; }
        public int Fullness { get; set; }
        public DateTime DateRequested { get; set; }
        public PhotoGradeStatusEnum PhotoGradeStatus { get; set; }
        public decimal Price { get; set; }
        public string? Comments { get; set; }
        public long? CodeId { get; set; }

        public long? PhotoGradeId { get; set; }
        public long? PhotoGradeItemId { get; set; }
        public string? FileKey { get; set; }

    }

}
