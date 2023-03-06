
namespace Onsharp.BeyondAutoCore.Domain.Model 
{
    public class PriceModel : BaseModel
    {
        public string StripePriceId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int GradeCredit { get; set; }
        public decimal Amount { get; set; }
        public string UnitType { get; set; }
        public string Currency { get; set; }
    }
}
