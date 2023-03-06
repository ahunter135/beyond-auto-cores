namespace Onsharp.BeyondAutoCore.Domain.Model;

public class CodeModel : BaseModel
{
    public string ConverterName { get; set; }
    public CodeTypeEnum CodeType { get; set; }
    public decimal? OriginalPrice { get; set; }
    public decimal? PlatinumPrice { get; set; }
    public decimal? PalladiumPrice { get; set; }
    public decimal? RhodiumPrice { get; set; }
    public decimal? Margin { get; set; }
    public string? Make { get; set; }
}
