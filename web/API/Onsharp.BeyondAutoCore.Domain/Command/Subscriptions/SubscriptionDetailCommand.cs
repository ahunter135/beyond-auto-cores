
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class SubscriptionDetailCommand
    {
        public long UserId { get; set; }
        public long SubscriptionTypeId { get; set; }
        public DateTime SubscriptionDate { get; set; }

    }
}
