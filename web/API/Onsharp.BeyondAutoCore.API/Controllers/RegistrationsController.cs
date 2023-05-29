namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Route("api/v1/registrations")]
    [ApiController]
    public class RegistrationsController : BaseController
    {
        private readonly IAuthenticateService _authenticateService;
        private readonly IRegistrationService _userRegistrationService;
        public RegistrationsController(IRegistrationService userRegistrationService, IAuthenticateService authenticateService)
        {
            _authenticateService = authenticateService;
            _userRegistrationService = userRegistrationService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateRegistration([FromBody] CreateRegCommand userRegistrationCreateCommand)
        {
            var response = await _userRegistrationService.CreateRegistration(userRegistrationCreateCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("{code}")]
        public async Task<IActionResult> GetByRegistrationCode(string code)
        {
            var response = await _userRegistrationService.GetUserRegistrationByCode(code);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully get the data." : "Failed getting the data.",
                Data = response
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("confirm-payment")]
        public async Task<IActionResult> ConfirmPayment(ConfirmRegPaymentCommand confirmRegPayment)
        {
            var response = await _userRegistrationService.ConfirmRegistrationPayment(confirmRegPayment);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Payment confirmed." : "Failed confirm payment.",
                Data = response
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("confirm")]
        public async Task<IActionResult> ConfirmRegistration(ConfirmRegCommand confirmRegistrationCommand)
        {
            var response = await _userRegistrationService.ConfirmRegistration(confirmRegistrationCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully confirm registration." : "Failed confirm registration.",
                Data = response
            });
        }

        [HttpPut]
        [Route("subscription")]
        public async Task<IActionResult> UpdateSubscription([FromBody] int newSubscription)
        {

            var response = await _userRegistrationService.UpdateSubscription(newSubscription);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success? "Subscription updated successfully." : "Failed updating the subscription.",
                Data = response
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("confirm-onetime-subscription")]
        public async Task<IActionResult> ConfirmOneTimeSubscription(ConfirmRegOnetimeSubscriptionCommand confirmRegPayment)
        {
            var response = await _userRegistrationService.ConfirmOneTimeSubscription(confirmRegPayment);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Payment confirmed." : "Failed confirm payment.",
                Data = response
            });
        }

        [HttpPut]
        [Route("{userId}/enable-subscription")]
        public async Task<IActionResult> EnableSubscription(long userId, bool enable)
        {

            var response = await _userRegistrationService.EnableSubscription(userId, enable);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success == 1 ? 0 : 1000,
                Message = response.Success == 1 ? "Subscription cancel successfully." : "Failed cancelling the subscription.",
                Data = response
            });
        }

    }
}
