
namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class AuthClient : ApiClient
    {
        protected override string Service { get { return "auth"; } }

        public AuthClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {
        }

        public async Task<Result<AuthenticateResponse>> GetRefreshToken(RefreshTokenCommand refreshCommand)
        {
            return await Post<AuthenticateResponse>(refreshCommand, "refresh-token");
        }

    }
}
