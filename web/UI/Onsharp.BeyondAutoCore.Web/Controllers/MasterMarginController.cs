namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    [Authorize]
    public class MasterMarginController : BaseController
    {
        private readonly ILogger<MasterMarginController> _logger;
        private readonly MasterMarginsClient _masterMarginsClient;

        public MasterMarginController(IHttpContextAccessor httpContextAccessor, ILogger<MasterMarginController> logger) : base(httpContextAccessor)
        {
            _logger = logger;
            _masterMarginsClient = new MasterMarginsClient(Host, Port, EnableSSL, token);
        }

        [HttpGet]
        [Route("mastermargin")]
        public async Task<IActionResult> Detail()
        {
            var response = await _masterMarginsClient.Get();

            return Json(response.Data);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUpdate(CreateUpdateMarginCommand model)
        {
            MarginDto response = null;
            
            if (model.Id == 0)
                response = await _masterMarginsClient.Create(model).GetData();
            else
                response = await _masterMarginsClient.Update(model).GetData();
            

            return Json(new { success = (response != null ? true: false ) });
        }


    }
}
