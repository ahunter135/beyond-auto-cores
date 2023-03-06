
namespace Onsharp.BeyondAutoCore.Web.Model.Dto
{
    public class AuthenticateResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public int Role { get; set; }

    }
}
