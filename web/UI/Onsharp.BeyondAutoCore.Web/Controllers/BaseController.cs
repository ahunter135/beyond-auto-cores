namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    public class BaseController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ApiConfig _apiConfig;

        public BaseController(IHttpContextAccessor httpContextAccessor)
        {
            _apiConfig = new ApiConfig();
            _httpContextAccessor = httpContextAccessor;
        }

        public string Host
        {
            get
            {
                return _apiConfig.Host;
            }

        }

        public int Port
        {
            get
            {
                return _apiConfig.Port;
            }
        }

        public bool EnableSSL
        {
            get
            {
                return _apiConfig.EnableSSL;
            }
        }

        const string sessionUserToken = "userToken";
        public string token
        {
            get
            {
                //var claimValue = "";

                //var currentUser = _httpContextAccessor.HttpContext.User;

                //if (currentUser != null)
                //    claimValue = currentUser.Claims.Where(w => w.Type == "token").FirstOrDefault()?.Value;

                //return claimValue;

                return UserHelper.GetAccessToken();
            }
        }

        public long userId
        {
            get
            {
                //var claimValue = "";

                //var currentUser = _httpContextAccessor.HttpContext.User;

                //if (currentUser != null)
                //    claimValue = currentUser.Claims.Where(w => w.Type == "id").FirstOrDefault()?.Value;

                //long id = 0;
                //if (long.TryParse(claimValue, out id))
                //    return id;
                //else
                //    return 0;

                return UserHelper.GetUserId();

            }
        }

    }
}
