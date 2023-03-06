
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class CodeDto: BaseModelDto
    {
        public string ConverterName { get; set; }
        public bool IsCustom { get; set; }
        public decimal? OriginalPrice { get; set; }
        public decimal? PlatinumPrice { get; set; }
        public decimal? PalladiumPrice { get; set; }
        public decimal? RhodiumPrice { get; set; }
        public decimal? Margin { get; set; }
        public string? Make { get; set; }

        public long? PhotoGradeId { get; set; }

        public decimal FinalUnitPrice { get; set; }
        public decimal AdminUnitPrice { get; set; }

    }
}
