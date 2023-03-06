namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class PriceDto : BaseModelDto
    {
        public string StripePriceId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public int GradeCredit { get; set; }
        public string StripeProductId { get; set; }
        public decimal Amount { get; set; }
        public string UnitType { get; set; }
        public string Currency { get; set; }
    }
}
