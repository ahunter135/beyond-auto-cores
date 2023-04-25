
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class ConfirmRegPaymentCommand
    {
        public string RegistrationCode { get; set; }

        public string PaymentIntentId { get; set; }

        public string Status { get; set; }

        public string Customer { get; set; }

        public string Token { get; set; }
    }
}
