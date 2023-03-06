
namespace Onsharp.BeyondAutoCore.Web.Model.Dto
{
    public class PhotoGradeDto: BaseModelDto
    {
        public PhotoGradeDto()
        {
            PhotoGradeItems = new List<PhotoGradeItemDto>();
        }

        public long? CodeId { get; set; }
        public string? ConverterName { get; set; }
        public string? RequestorName { get; set; }
        public string? Notes { get; set; }
        public int Fullness { get; set; }
        public DateTime DateRequested { get; set; }
        public PhotoGradeStatusEnum PhotoGradeStatus { get; set; }
        public decimal Price { get; set; }
        public string? Comments { get; set; }

        public List<PhotoGradeItemDto> PhotoGradeItems { get; set; }

    }
}
