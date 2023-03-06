namespace Onsharp.BeyondAutoCore.Web.Model.Command
{
    public class RefreshTokenCommand
    {
        public long UserId { get; set; }
        public string RefreshToken { get; set; }
    }
}
