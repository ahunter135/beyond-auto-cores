namespace Onsharp.BeyondAutoCore.Domain.Model;

public class PhotoGradeModel : BaseModel
{
    public long? CodeId { get; set; }
    public long RequesterId { get; set; }
    public int Fullness { get; set; }
    public DateTime DateRequested { get; set; }
    public int PhotoGradeStatus { get; set; }
    public decimal Price { get; set; }
    public string? Comments { get; set; }

}
