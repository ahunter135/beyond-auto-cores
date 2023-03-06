using Microsoft.AspNetCore.Mvc;

namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    [Authorize]
    public class MetalCustomPricesController : BaseController
    {
        private readonly ILogger<MetalCustomPricesController> _logger;
        private readonly MetalCustomPricesClient _metalCustomPricesClient;

        public MetalCustomPricesController(IHttpContextAccessor httpContextAccessor, ILogger<MetalCustomPricesController> logger) : base(httpContextAccessor)
        {
            _logger = logger;
            _metalCustomPricesClient = new MetalCustomPricesClient(Host, Port, EnableSSL, token);
        }

        [HttpGet]
        [Route("metalcustomprice")]
        public async Task<IActionResult> Detail()
        {
            var response = await _metalCustomPricesClient.Get();

            return Json(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUpdate(CreateUpdateCustomMetalPriceCommand model)
        {
            MetalCustomPriceDto response = null;

            if (model.Id == 0)
                response = await _metalCustomPricesClient.Create(model).GetData();
            else
                response = await _metalCustomPricesClient.Update(model).GetData();


            return Json(new { success = (response != null ? true : false) });
        }


    }
}
