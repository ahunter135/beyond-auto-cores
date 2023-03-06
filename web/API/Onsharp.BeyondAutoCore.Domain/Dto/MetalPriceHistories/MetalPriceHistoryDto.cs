
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class MetalPriceHistoryDto: BaseModelDto
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
        public string BaseCurrency { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public decimal? Open { get; set; }
        public decimal? High { get; set; }
        public decimal? Low { get; set; }
        public decimal? Last { get; set; }
    }
}
