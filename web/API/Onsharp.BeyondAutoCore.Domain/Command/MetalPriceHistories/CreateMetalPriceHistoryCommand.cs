
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class CreateMetalPriceHistoryCommand
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
        public string BaseCurrency { get; set; }
        public decimal? Open { get; set; }
        public decimal? High { get; set; }
        public decimal? Low { get; set; }
        public decimal? Last { get; set; }
        public decimal? Bid { get; set; }
        public DateTime? TimeStamp { get; set; }
    }
}
