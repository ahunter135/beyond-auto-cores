namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class LotItemModel: BaseModel
    {
        public long LotId { get; set; }
        public long? CodeId { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}
