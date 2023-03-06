namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class ConfirmRegCommand
    {
        public string RegistrationCode { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
