
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class LotDto : BaseModelDto
    {
        public string LotName { get; set; }
        public bool IsSubmitted { get; set; }
        public string? Email { get; set; }
        public string? BusinessName { get; set; }
        public long? SubmittedBy { get; set; }
        public DateTime? SubmittedDate { get; set; }

        public string? PhotoAttachment { get; set; }
        public string? PhotoAttachmentFileKey { get; set; }

        [NotMapped]
        public string FileUrl { get; set; }

    }
}
