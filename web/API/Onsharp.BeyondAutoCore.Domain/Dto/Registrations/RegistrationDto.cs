namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class RegistrationDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNo { get; set; }
        public string Email { get; set; }
        public string? RegistrationCode { get; set; }
        public string StripeCustomerId { get; set; }
        public string? Company { get; set; }
        public bool SubscriptionIsCancel { get; set; }

        public string ClientSecret { get; set; }

        public bool Success { get; set; }
        public string Message { get; set; }

        
    }
}
