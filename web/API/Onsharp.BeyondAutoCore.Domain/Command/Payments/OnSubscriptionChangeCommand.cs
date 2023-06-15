
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class OnSubscriptionChangeCommand
    {
        public string StripeSignature { get; set; }
        public string Json { get; set; }
    }
}