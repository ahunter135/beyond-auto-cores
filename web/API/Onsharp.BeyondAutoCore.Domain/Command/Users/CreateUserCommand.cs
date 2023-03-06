
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class CreateUserCommand: DetailUserCommand
    {
        public long RegistrationId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string? Company { get; set; }
        public string? ContactNo { get; set; }
        public int? ResetPasswordCode { get; set; }
    }

}
