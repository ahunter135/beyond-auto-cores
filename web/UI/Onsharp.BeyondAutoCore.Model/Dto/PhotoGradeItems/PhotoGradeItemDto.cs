
namespace Onsharp.BeyondAutoCore.Web.Model.Dto
{

    public class PhotoGradeItemDto: BaseModelDto
    {
        public long PhotoGradeId { get; set; }
        public string FileKey { get; set; }

        public string FileUrl { get; set; }
        public string FileName { get; set; }
        public bool IsUploaded { get; set; }
    }

}
