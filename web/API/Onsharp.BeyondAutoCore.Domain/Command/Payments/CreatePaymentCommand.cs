namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class CreatePaymentCommand
    {
        public long LinkId { get; set; }
        public PaymentTypeEnum PaymentType { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }

        public string CustomerId { get; set; }
        public string SubscriptionId { get; set; }
        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
        public string Status { get; set; }

    }
}
