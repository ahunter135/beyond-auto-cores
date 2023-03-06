
namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/margins/")]
    public class MasterMarginsController : BaseController
    {
        private readonly IMasterMarginService _marginService;
        private readonly IDeviceService _deviceService;
        public MasterMarginsController(IMasterMarginService marginService, IDeviceService deviceService)
        {
            _marginService = marginService;
            _deviceService = deviceService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMarginCommand createMarginCommand)
        {
            var response = await _marginService.Create(createMarginCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully created margin." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateMarginCommand updateMarginCommand)
        {
            var response = await _marginService.Update(updateMarginCommand);
            if (response.Success)
            {
                var sendNotif = await _deviceService.NotifyAsync(response.Margin.ToString());
            }

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully updated margin." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> Get()
        {
            var response = await _marginService.Get();

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully get the data." : "Failed generating the data.",
                Data = response
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on delete." });

            var response = await _marginService.Delete(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Successfully deleted." : "Deletion failed.",
                Data = response
            });
        }

    }
}
