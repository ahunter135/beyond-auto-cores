
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class CreatePaymentIntentCommand
    {
        public string Subscription { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}

