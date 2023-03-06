
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class UpdatePasswordCommand
    {
        public long Id { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
