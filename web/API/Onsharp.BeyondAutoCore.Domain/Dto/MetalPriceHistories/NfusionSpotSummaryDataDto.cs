namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class NfusionSpotSummaryDataDto
    {
        public string Symbol { get; set; }
        public string BaseCurrency { get; set; }
        public decimal? Last { get; set; }
        public decimal? Bid { get; set; }
        public decimal? Ask { get; set; }
        public decimal? High { get; set; }
        public decimal? Low { get; set; }
        public decimal? Open { get; set; }
        public decimal? OneDayValue { get; set; }
        public decimal? OneDayChange { get; set; }
        public decimal? OneDayPercentChange { get; set; }
        public DateTime? TimeStamp { get; set; }
    }
}
