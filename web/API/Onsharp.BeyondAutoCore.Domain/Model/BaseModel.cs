using System.ComponentModel.DataAnnotations;

namespace Onsharp.BeyondAutoCore.Domain.Model;

public class BaseModel
{
    [Key]
    public long Id { get; set; }

    public long CreatedBy { get; set; }
    public DateTime CreatedOn { get; set; }
    public long? UpdatedBy { get; set; }
    public DateTime? UpdatedOn { get; set; }
    public bool IsDeleted { get; set; }

}