
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class CreateRegCommand
    {
        public string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNo { get; set; }
        public string Email { get; set; }
        public SubscriptionTypeEnum Subscription { get; set; }
        public string? AffiliateCode { get; set; }
        public string? Token { get; set; }
    }

}
