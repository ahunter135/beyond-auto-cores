namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class DetailLotItemFullnessCommand
    {
        public long LotItemId { get; set; }
        public int FullnessPercentage { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Qty { get; set; }
    }
}
