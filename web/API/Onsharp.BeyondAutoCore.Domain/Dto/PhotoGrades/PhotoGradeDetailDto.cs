
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class PhotoGradeDetailDto: BaseModelDto
    {
        public long? CodeId { get; set; }
        public string? RequestorName { get; set; }
        public string? Notes { get; set; }
        public int Fullness { get; set; }
        public DateTime DateRequested { get; set; }
        public PhotoGradeStatusEnum PhotoGradeStatus { get; set; }
        public decimal Price { get; set; }
        public string? Comments { get; set; }
    }
}
