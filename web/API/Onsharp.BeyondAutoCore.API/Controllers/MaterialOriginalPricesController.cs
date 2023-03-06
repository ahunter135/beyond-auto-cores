
namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/materialoriginalprices/")]
    public class MaterialOriginalPricesController : BaseController
    {
        private readonly IMaterialOriginalPriceService _materialOriginalPriceService;
        public MaterialOriginalPricesController(IMaterialOriginalPriceService materialOriginalPriceService)
        {
            _materialOriginalPriceService = materialOriginalPriceService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetSingleRecord()
        {
            var response = await _materialOriginalPriceService.GetSingleRecord();

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully get the data." : "Failed generating the data.",
                Data = response
            });
        }

    }
}
