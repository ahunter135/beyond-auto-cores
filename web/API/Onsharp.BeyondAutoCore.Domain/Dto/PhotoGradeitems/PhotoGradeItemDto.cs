namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class PhotoGradeItemDto: BaseModelDto
    {
        public long PhotoGradeId { get; set; }
        public string FileKey { get; set; }

        [NotMapped]
        public string FileUrl { get; set; }
        public string FileName { get; set; }
        public bool IsUploaded { get; set; }
    }
}
