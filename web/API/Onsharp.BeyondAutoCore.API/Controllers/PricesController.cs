namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [ApiController]
    [Route("api/v1/prices/")]
    public class PricesController : BaseController
    {
        private readonly IPriceService _priceService;
        public PricesController(IPriceService priceService)
        {
            _priceService = priceService;
        }

        [HttpGet]
        [Route("subscriptions", Name = "GetSubscriptionPrices")]
        public async Task<IActionResult> GetSubscriptionPrices()
        {
            var response = await _priceService.GetSubscriptionPrices();
            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully get subscription price list." : "Failed generating subscription price list.",
                Data = response
            });
        }
    }
}
