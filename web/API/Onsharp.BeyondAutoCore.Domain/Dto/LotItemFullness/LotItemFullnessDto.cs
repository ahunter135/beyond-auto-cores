
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class LotItemFullnessDto : BaseModelDto
    {
        public long LotItemId { get; set; }
        public int FullnessPercentage { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Qty { get; set; }
    }
}
