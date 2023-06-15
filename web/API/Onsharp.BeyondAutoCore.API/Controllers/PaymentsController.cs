
namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Route("api/v1/payments")]
    [ApiController]
    public class PaymentsController : BaseController
    {
        private readonly IAuthenticateService _authenticateService;
        private readonly IPaymentService _paymentService;
        public PaymentsController(IPaymentService paymentService, IAuthenticateService authenticateService)
        {
            _authenticateService = authenticateService;
            _paymentService = paymentService;
        }

        
        [HttpPost]
        [AllowAnonymous]
        [Route("confirm")]
        public async Task<IActionResult> Confirm(PaymentConfirmCommand paymentConfirm)
        {
            var response = await _paymentService.PaymentConfirm(paymentConfirm);

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
        [Route("subscription-webhook")]
        public async Task<bool> OnSubscriptionChange()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            OnSubscriptionChangeCommand subscriptionChangeCommand = new OnSubscriptionChangeCommand
			{
				StripeSignature = Request.Headers["Stripe-Signature"],
                Json = json
            };
            try
            {
                Console.WriteLine("HEREEE");
                return await this._paymentService.OnSubscriptionChange(subscriptionChangeCommand);
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
