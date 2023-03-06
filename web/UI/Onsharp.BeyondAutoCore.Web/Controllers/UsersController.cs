namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {

        private readonly ILogger<UsersController> _logger;
        private readonly UsersClient _usersClient;

        public UsersController(IHttpContextAccessor httpContextAccessor, ILogger<UsersController> logger) : base(httpContextAccessor)
        {
            _logger = logger;
            _usersClient = new UsersClient(Host, Port, EnableSSL, token);
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var data = await _usersClient.GetAll().GetData();
            return View(data);
        }

        [HttpGet]
        [Route("users/{id}")]
        public async Task<IActionResult> Detail(long id)
        {
            var response = await _usersClient.GetById(id);

            return Json(response.Data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateUserCommand model)
        {
            var response = await _usersClient.Update(model, Request.Form.Files);
            
            return Json(new { success = response });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long id)
        {
            var data = await _usersClient.DeleteUser(id);

            return Ok(data);
        }

        [HttpPost]
        [Route("users/update-password")]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordCommand model)
        {

            if (model.NewPassword != model.ConfirmPassword)
                return Json(new { success = false, message = "New and confirm password is not equal." });

            model.Id = this.userId;
            var response = await _usersClient.UpdatePassword(model);

            return Json(response);
        }

        [HttpPost]
        [Route("users/signout")]
        public async Task<ActionResult> SignOut()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Session.Clear();

            return Json(new { redirectToUrl = Url.Action("Index", "account") });
        }
    }
}
