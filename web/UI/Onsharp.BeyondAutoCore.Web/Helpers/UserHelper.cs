using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Routing;
using Microsoft.Net.Http.Headers;
using System;
using System.IO;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using System.Security.Claims;


namespace Onsharp.BeyondAutoCore.Web.Helpers
{
    public static class UserHelper
    {
        public static long GetUserId()
        {
            var claimValue = "";
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            var currentUser = _httpContextAccessor.HttpContext.User;

            if (currentUser != null)
                claimValue = currentUser.Claims.Where(w => w.Type == "id").FirstOrDefault()?.Value;

            long id = 0;
            if (long.TryParse(claimValue, out id))
                return id;
            else
                return 0;
        }

        public static string GetUserName()
        {
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

            string userName = "";
            var currentUser = _httpContextAccessor.HttpContext.User;
            if (currentUser != null)
                userName = currentUser.Claims.Where(w => w.Type == "name").FirstOrDefault()?.Value;

            return userName;
        }

        public static string GetEmail()
        {
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

            string userName = "";
            var currentUser = _httpContextAccessor.HttpContext.User;
            if (currentUser != null)
                userName = currentUser.Claims.Where(w => w.Type == "username").FirstOrDefault()?.Value;

            return userName;
        }

        public static string GetAccessToken()
        {
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            var currentUser = _httpContextAccessor.HttpContext.User;

            var claimValue = "";
            if (currentUser != null)
                claimValue = currentUser.Claims.Where(w => w.Type == "accesstoken").FirstOrDefault()?.Value;

            return claimValue;
        }

        public static string GetRefreshToken()
        {
            IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
            var currentUser = _httpContextAccessor.HttpContext.User;

            var claimValue = "";
            if (currentUser != null)
                claimValue = currentUser.Claims.Where(w => w.Type == "refreshtoken").FirstOrDefault()?.Value;

            return claimValue;
        }

        public static async Task<ClaimsIdentity> RefreshApiToken()
        {
            var _apiConfig = new ApiConfig();
            var _authClient = new AuthClient(_apiConfig.Host, _apiConfig.Port, _apiConfig.EnableSSL, "");

            var refreshToken = UserHelper.GetRefreshToken();
            long userId = UserHelper.GetUserId(); ;

            var refreshTokenCommand = new RefreshTokenCommand();
            refreshTokenCommand.UserId = userId;
            refreshTokenCommand.RefreshToken = refreshToken;

            var response = await _authClient.GetRefreshToken(refreshTokenCommand);
            if (response != null)
            {
                IHttpContextAccessor _httpContextAccessor = new HttpContextAccessor();
                var currentUser = _httpContextAccessor.HttpContext.User;

                var identity = currentUser.Identity as ClaimsIdentity;
                if (identity == null)
                    return identity;

                var accesTokenClaim = identity.FindFirst("accesstoken");
                if (accesTokenClaim != null)
                {
                    identity.RemoveClaim(accesTokenClaim);
                    identity.AddClaim(new Claim("accesstoken", response.Data.AccessToken));
                }

                var refreshTokenClaim = identity.FindFirst("refreshtoken");
                if (refreshTokenClaim != null)
                {
                    identity.RemoveClaim(refreshTokenClaim);
                    identity.AddClaim(new Claim("refreshtoken", response.Data.RefreshToken));

                }

                return identity;
            }

            return null;
        }

    }
}
