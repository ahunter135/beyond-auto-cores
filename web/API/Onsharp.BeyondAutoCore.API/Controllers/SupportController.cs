namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [ApiController]
    [Route("api/v1/supports/")]
    public class SupportController : BaseController
    {
        private readonly ISupportService _supportService;

        public SupportController(ISupportService supportService)
        {
            _supportService = supportService;
        }

        [HttpPost]
        [Route("send-message")]
        public async Task<IActionResult> GetReport(SendMessageCommand command)
        {

            var response = await _supportService.SendMessage(command);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success == 1 ? 0 : 1000,
                Message = response.Success == 1 ? "Message sent." : "Failed sending message.",
                Data = response.Success == 1 ? response : null
            });
        }
    }
}
