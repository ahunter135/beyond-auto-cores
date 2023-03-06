
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class UserPurchaseGradeCreditDto
    {

        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }

        public bool Success { get; set; }
        public string Message { get; set; }

    }
}
