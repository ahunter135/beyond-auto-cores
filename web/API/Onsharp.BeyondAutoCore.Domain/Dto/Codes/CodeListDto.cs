 
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class CodeListDto : BaseModelDto
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
        public long? PhotoGradeItemId { get; set; }
        public string? FileKey { get; set; }

        [NotMapped]
        public string? FileUrl { get; set; }

        [NotMapped]
        public decimal FinalUnitPrice { get; set; }


        [NotMapped]
        public decimal AdminUnitPrice { get; set; }

    }
}