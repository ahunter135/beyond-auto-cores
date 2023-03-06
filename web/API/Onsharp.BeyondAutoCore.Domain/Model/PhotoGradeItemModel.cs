namespace Onsharp.BeyondAutoCore.Domain.Model;

public class PhotoGradeItemModel : BaseModel
{
    public long PhotoGradeId { get; set; }
    public string FileKey { get; set; }
    public string FileName { get; set; }
    public bool IsUploaded { get; set; }
}