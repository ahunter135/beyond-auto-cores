namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class MetalPriceGraphDto
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
        public string BaseCurrency { get; set; }
        public decimal BidPrice { get; set; }
        public decimal LastPrice { get; set; }
        public decimal OneDayPercentChange { get; set; }
        public DateTime? LastUpdate { get; set; }
        public List<MetalPriceHistoryListDto> PriceHistory { get; set; }

        public bool Success { get; set; }
        public string Message { get; set; }

    }
}
