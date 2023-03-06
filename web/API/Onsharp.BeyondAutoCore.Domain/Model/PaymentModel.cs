
namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class PaymentModel : BaseModel
    {
        public long LinkId { get; set; }
        public int PaymentType { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }

        public string CustomerId { get; set; }
        public string? SubscriptionId { get; set; }
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
        public string Status { get; set; }
    }
}
