
namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class UserModel: BaseModel
    {
        public long RegistrationId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNo { get; set; }
        public string Email { get; set; }
        public string? Company { get; set; }
        public int? ResetPasswordCode { get; set; }
        public bool AffiliateEnable { get; set; }
        public string? UUID { get; set; }
        public string? StripeAccountId { get; set; }
        
        public RoleEnum Role { get; set; }

        public TierEnum Tier { get; set; }
        public bool Tier1AdminEnabled { get; set; }
        public int Tier1PercentLevel { get; set; }
        public bool Tier1UserEnabled { get; set; }
        public decimal? Margin { get; set; }
        public string? Photo { get; set; }
        public string? PhotoFileKey { get; set; }

    }
}
