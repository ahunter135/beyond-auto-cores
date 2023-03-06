
namespace Onsharp.BeyondAutoCore.Web.Model.Dto
{
    public class BaseModelDto
    {
        public BaseModelDto()
        {
            Success = true;
            Message = "";
        }

        public long Id { get; set; }

        public long CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }

        public bool Success { get; set; }
        public string Message { get; set; }

    }
}
