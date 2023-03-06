

namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    [Authorize]
    public class LotsController : BaseController
    {
        private readonly ILogger<LotsController> _logger;
        private readonly LotsClient _lotsClient;
        private readonly LotItemFullnessClient _lotItemFullnessClient;

        public LotsController(IHttpContextAccessor httpContextAccessor, ILogger<LotsController> logger) : base(httpContextAccessor)
        {
            _logger = logger;
            _lotsClient = new LotsClient(Host, Port, EnableSSL, token);
            _lotItemFullnessClient = new LotItemFullnessClient(Host, Port, EnableSSL, token);
        }

        public async Task<IActionResult> Index(ParametersCommand command)
        {
            var data = await _lotsClient.GetInventory(command).GetData();
            return View(data);
        }

        [HttpGet]
        [Route("lots/invoice")]
        public async Task<IActionResult> GetInvoice(long lotId)
        {
            var data = await _lotsClient.GetInvoice(lotId).GetData();
            foreach (var d in data)
            {
                d.Total = d.Quantity * d.UnitPrice;
            }

            return Json(data.ToList());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long id)
        {
            var data = await _lotsClient.DeleteLot(id);

            return Ok(data);
        }

        [HttpDelete]
        [Route("lots/itemfullness")]
        public async Task<IActionResult> DeleteLotItemFullness(long id)
        {
            var data = await _lotItemFullnessClient.DeleteLotItemFullness(id);
            return Ok(data);
        }

    }
}
