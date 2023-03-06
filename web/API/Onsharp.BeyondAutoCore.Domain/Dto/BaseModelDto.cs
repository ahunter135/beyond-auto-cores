
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class BaseModelDto
    {
        public BaseModelDto()
        {
            Success = true;
            Message = "";
        }

        public long Id { get; set; }
        public bool IsDeleted { get; set; }

        public long CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }

        [NotMapped]
        public bool Success { get; set; }
        [NotMapped]
        public string Message { get; set; }

    }
}
