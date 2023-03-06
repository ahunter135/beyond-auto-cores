
namespace Onsharp.BeyondAutoCore.Web.Model.Dto
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
        public RoleEnum Role { get; set; }
        public SubscriptionEnum Subscription { get; set; }
        public bool Tier1AdminEnabled { get; set; }
        public int Tier1PercentLevel { get; set; }
        public bool Tier1UserEnabled { get; set; }
        public decimal? Margin { get; set; }

        public string? Photo { get; set; }
        public string? PhotoFileKey { get; set; }
        public string? FileUrl { get; set; }

    }
}
