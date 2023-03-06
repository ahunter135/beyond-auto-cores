
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class ConfirmRegOnetimeSubscriptionCommand
    {
        public int NewSubscription { get; set; }

        public string PaymentIntentId { get; set; }

        public string Status { get; set; }

    }
}
