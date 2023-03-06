using Microsoft.AspNetCore.Mvc;
using Onsharp.BeyondAutoCore.Domain.Command.Devices;

namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/device/")]
    public class DeviceController : Controller
    {
        private readonly IDeviceService _deviceService;
        public DeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterDevice([FromBody] CreateDeviceCommand createDeviceCommand)
        {
            var response = await _deviceService.Create(createDeviceCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully created device." : response.Message,
                Data = response.Success ? response : null
            });
        }
    }
}
