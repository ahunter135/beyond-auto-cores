namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class LotItemFullnessModel : BaseModel
    {
        public long LotItemId { get; set; }
        public int FullnessPercentage { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Qty { get; set; }

    }
}
