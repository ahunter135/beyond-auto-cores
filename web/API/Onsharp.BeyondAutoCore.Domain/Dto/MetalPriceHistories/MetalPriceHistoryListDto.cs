namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class MetalPriceHistoryListDto
    {
        public DateTime? DateInterval { get; set; }
        public decimal LastPrice { get; set; }
        public decimal BidPrice { get; set; }
        public DateTime? CreatedOn { get; set; }
        
    }
}