
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class PaymentConfirmCommand
    {
        public string PaymentIntentId { get; set; }

        public string Status { get; set; }

    }
}
