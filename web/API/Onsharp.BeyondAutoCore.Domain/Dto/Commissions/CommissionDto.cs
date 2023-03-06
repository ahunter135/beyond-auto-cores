namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class CommissionDto
    {
        public long RegistrationId { get; set; }
        public long AffiliateId { get; set; }
        public long ReferredId { get; set; }
        public string Email { get; set; }
        public string StripeAccountId { get; set; }
        public string AffiliateCode { get; set; }
        public string SubscriptionName { get; set; }
        public decimal AmountTotal { get; set; }
        public decimal AmountCommission { get; set; }

        [NotMapped]
        public string? Message { get; set; }
    }
}
