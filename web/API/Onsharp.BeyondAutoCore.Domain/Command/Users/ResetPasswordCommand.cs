
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class ResetPasswordCommand
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
