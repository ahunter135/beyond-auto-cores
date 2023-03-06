namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class DetailUserCommand
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Email { get; set; }
        public SubscriptionTypeEnum Subscription { get; set; }
        public RoleEnum Role { get; set; }
        public bool Tier1AdminEnabled { get; set; }
        public int Tier1PercentLevel { get; set; }
        public bool Tier1UserEnabled { get; set; }
        public decimal? Margin { get; set; }
        public bool IsUpdatePhoto { get; set; }
    }
}
