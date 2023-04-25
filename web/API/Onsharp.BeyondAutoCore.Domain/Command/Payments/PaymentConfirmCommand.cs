
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class PaymentConfirmCommand
    {
        public string PaymentIntentId { get; set; }

        public string Status { get; set; }

        public string Customer { get; set; }

        public string Token { get; set; }
    }
}
