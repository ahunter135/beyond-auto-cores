

namespace Onsharp.BeyondAutoCore.Web.Model.Command
{
    public class UpdateUserCommand
    {
        public long Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public int Subscription { get; set; }
        //public string Tier { get; set; }
        public bool Tier1AdminEnabled { get; set; }
        public int Tier1PercentLevel { get; set; }
        public bool Tier1UserEnabled { get; set; }
        public int Margin { get; set; }
        public bool IsUpdatePhoto { get; set; }
    }
}
