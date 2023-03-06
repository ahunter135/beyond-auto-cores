namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class SubscriptionModel : BaseModel
    {
        public long UserId { get; set; }
        public long SubscriptionTypeId { get; set; }
        public DateTime SubscriptionDate { get; set; }
    }
}
