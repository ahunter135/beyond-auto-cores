namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class AlertModel : BaseModel
    {
        public long PhotoGradeId { get; set; }
        public long PhotoGradeUserId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime DateSent { get; set; }
        public AlertStatusEnum Status { get; set; }
        public AlertTypeEnum AlertType { get; set; }
    }
}
