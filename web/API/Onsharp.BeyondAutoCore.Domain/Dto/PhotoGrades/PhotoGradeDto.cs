
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class PhotoGradeDto : PhotoGradeDetailDto
    {
        public PhotoGradeDto()
        {
            PhotoGradeItems = new List<PhotoGradeItemDto>();
        }

        public List<PhotoGradeItemDto> PhotoGradeItems { get; set; }

        [NotMapped]
        public decimal GradeCredits { get; set; }

    }
}
