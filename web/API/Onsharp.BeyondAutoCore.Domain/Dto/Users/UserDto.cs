
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class UserDto : BaseModelDto
    {
        public long RegistrationId { get; set; }
        public string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNo { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }
        public int? ResetPasswordCode { get; set; }

        public bool AffiliateEnable { get; set; }
        public string? UUID { get; set; }
        public string? StripeAccountId { get; set; }

        public RoleEnum Role { get; set; }
        public bool Tier1AdminEnabled { get; set; }
        public int Tier1PercentLevel { get; set; }
        public bool Tier1UserEnabled { get; set; }
        public decimal? Margin { get; set; }

        public string? Photo { get; set; }
        public string? PhotoFileKey { get; set; }

        [NotMapped]
        public bool SubscriptionIsCancel { get; set; }

        [NotMapped]
        public SubscriptionTypeEnum Subscription { get; set; }

        [NotMapped]
        public string FileUrl { get; set; }

        [NotMapped]
        public string AffiliateLink { get; set; }

        [NotMapped]
        public decimal GradeCredits { get; set; }

    }
}
