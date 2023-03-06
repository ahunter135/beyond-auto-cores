
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class SubscriptionDto : BaseModelDto
    {
        public long UserId { get; set; }
        public int Qty { get; set; }
        public decimal Amount { get; set; }
    }
}
