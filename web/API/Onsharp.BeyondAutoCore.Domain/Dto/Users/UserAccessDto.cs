namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class UserAccessDto
    {
        public long Id { get; set; }
        public long RegistrationId { get; set; }

        public string AccessCode { get; set; }
        public string SecurityKey { get; set; }

        public string Username { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? ContactNo { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }

        public bool Success { get; set; }
        public string Message { get; set; }

    }
}
