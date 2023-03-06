using Microsoft.AspNetCore.Mvc;

namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/metalcustomprices/")]
    public class MetalCustomPricesController : BaseController
    {
        private readonly IMetalCustomPriceService _metalCustomPriceService;
        public MetalCustomPricesController(IMetalCustomPriceService metalCustomPriceService)
        {
            _metalCustomPriceService = metalCustomPriceService;
        }

        #region CRUD
        [HttpGet]
        public async Task<IActionResult> GetCustomPrices(long id)
        {
            var response = await _metalCustomPriceService.GetCustomPrices();

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully get the data." : "Unable to retrieve custom prices. Message - " + response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateMetalCustomPriceCommand model)
        {
            var response = await _metalCustomPriceService.Create(model);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully created metal custom prices." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdateMetalCustomPriceCommand model)
        {
            var response = await _metalCustomPriceService.Update(model);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully created metal custom prices." : response.Message,
                Data = response.Success ? response : null
            });
        }

        #endregion 


    }
}
