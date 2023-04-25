
namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class RegistrationModel : BaseModel
    {
        public string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNo { get; set; }
        public string Email { get; set; }
        public string? RegistrationCode { get; set; }
        public string StripeCustomerId { get; set; }
        public string? Company { get; set; }
        public string? SubscriptionId { get; set; }
        public SubscriptionTypeEnum Subscription { get; set; }
        public bool SubscriptionIsCancel { get; set; }
        public string? AffiliateCode { get; set; }
    }
}
