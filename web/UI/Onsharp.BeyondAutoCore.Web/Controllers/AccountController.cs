
namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    public class AccountController : BaseController
    {

        private readonly ILogger<AccountController> _logger;
        private readonly UsersClient _usersClient;

        public AccountController(IHttpContextAccessor httpContextAccessor, ILogger<AccountController> logger): base(httpContextAccessor)
        {
            _logger = logger;
            _usersClient = new UsersClient(Host, Port, EnableSSL, token);
        }

        public IActionResult Login()
        {
            if(this.HttpContext.User.Identity != null && this.HttpContext.User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Codes");
            }
            
            return View();
        }

        /// <summary>
        /// login post action
        /// </summary>
        /// <param name="model">login model</param>
        /// <param name="returnUrl">return url</param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Index(LoginCommand model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.UserName))
                    ModelState.AddModelError("Email", "Please enter valid Email");

                if (string.IsNullOrEmpty(model.Password))
                    ModelState.AddModelError("Password", "Please enter valid Password");

                if (ModelState.IsValid)
                {
                    model.Password = model.Password.Trim();

                    var response = await _usersClient.Login(model);

                    if (response == null || response.Data == null || string.IsNullOrWhiteSpace(response.Data.AccessToken))
                    {
                        ModelState.AddModelError("", "Login Failed. Invalid username or password.");
                        return View("login", model);
                    }

                    if (response.Data.Role != (int)RoleEnum.Admin)
                    {
                        ModelState.AddModelError("", "Login Failed. Insufficient permission.");
                        return View("login", model);
                    }

                    var claims = new List<Claim>
                    {
                        new Claim("name", response.Data.Name ?? ""),
                        new Claim("username", model.UserName),
                        new Claim("id", response.Data.Id.ToString()),
                        new Claim("accesstoken", response.Data.AccessToken),
                        new Claim("refreshtoken", response.Data.RefreshToken),
                        new Claim(ClaimTypes.Role, ((RoleEnum)response.Data.Role).ToString()),
                    };

                    var claimsIdentity = new ClaimsIdentity(
                        claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    var authProperties = new AuthenticationProperties
                    {
                        //AllowRefresh = <bool>,
                        // Refreshing the authentication session should be allowed.

                        ExpiresUtc = DateTimeOffset.UtcNow.AddDays(15),
                        // The time at which the authentication ticket expires. A 
                        // value set here overrides the ExpireTimeSpan option of 
                        // CookieAuthenticationOptions set with AddCookie.

                        //IsPersistent = true,
                        // Whether the authentication session is persisted across 
                        // multiple requests. When used with cookies, controls
                        // whether the cookie's lifetime is absolute (matching the
                        // lifetime of the authentication ticket) or session-based.

                        //IssuedUtc = <DateTimeOffset>,
                        // The time at which the authentication ticket was issued.

                        //RedirectUri = <string>
                        // The full path or absolute URI to be used as an http 
                        // redirect response value.
                    };

                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity),
                        authProperties);

                    return RedirectToAction("Index", "Codes");
                }

                return View("login", model);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Login Failed. Invalid username or password.");
                return View("", model);
            }
        }

    }
}
