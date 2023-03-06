
namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    [Authorize]
    public class PartnersController : BaseController
    {
        private readonly ILogger<PartnersController> _logger;
        private readonly PartnersClient _partnersClient;

        public PartnersController(IHttpContextAccessor httpContextAccessor, ILogger<PartnersController> logger) : base(httpContextAccessor)
        {
            _logger = logger;
            _partnersClient = new PartnersClient(Host, Port, EnableSSL, token);
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var data = await _partnersClient.GetAll().GetData();
            return View(data);
        }

        [HttpGet]
        [Route("partners/{id}")]
        public async Task<IActionResult> Detail(long id)
        {
            var response = await _partnersClient.GetById(id);

            return Json(response.Data);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUpdate(CreateUpdatePartnerCommand model)
        {

            bool response = false;
            if (model.Id == 0)
                response = await _partnersClient.Create(model, Request.Form.Files);
            else
                response = await _partnersClient.Update(model, Request.Form.Files);

            return Json(new { success = response });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long id)
        {
            var data = await _partnersClient.DeletePartner(id);

            return Ok(data);
        }

    }
}
