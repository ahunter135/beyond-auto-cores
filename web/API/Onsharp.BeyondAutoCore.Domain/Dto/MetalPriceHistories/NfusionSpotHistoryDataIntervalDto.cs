namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class NfusionSpotHistoryDataIntervalDto
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public decimal? Open { get; set; }
        public decimal? High { get; set; }
        public decimal? Low { get; set; }
        public decimal? Last { get; set; }
    }
}
