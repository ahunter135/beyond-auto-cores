namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class AlertDto : BaseModelDto
    {
        public long PhotoGradeId { get; set; }
        public long PhotoGradeUserId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime DateSent { get; set; }
        public int Status { get; set; }
    }
}
