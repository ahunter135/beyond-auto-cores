
namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/metalprices/")]
    public class MetalPricesController : BaseController
    {
        private readonly IMetalPriceService _metalPriceService;
        
        public MetalPricesController(IMetalPriceService metalPriceService)
        {
            _metalPriceService = metalPriceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetReport(MetalEnum metal, MetalPriceReportTypeEnum reportType)
        {

            var response = await _metalPriceService.GetMetalPrices(metal, reportType);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully generated metal report." : "Failed generating report.",
                Data = response != null ? response : null
            });
        }

        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> Update()
        {
           
            var response = await _metalPriceService.UpdatePrices();

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ,
                ErrorCode = response.Success == 1 ? 0 : 1000,
                Message = response.Success == 1 ? "Successfully updated metal prices." : response.Message,
                Data = response.Success == 1 ? response : null
            });
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("spot-histories")]
        public async Task<IActionResult> UpdateSpotHistory(DateTime dateFrom, DateTime dateTo)
        {

            var response = await _metalPriceService.UpdateSpotHistory(dateFrom, dateTo);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Successfully updated metal prices history." : "Successful",
                Data = response ? response : null
            });
        }
        
    }

}
