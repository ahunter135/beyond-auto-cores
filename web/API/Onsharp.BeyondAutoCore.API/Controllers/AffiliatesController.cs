namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/affiliates/")]
    public class AffiliatesController : BaseController
    {
        private readonly IAffiliateService _affiliateService;
        public AffiliatesController(IAffiliateService affiliateService)
        {
            _affiliateService = affiliateService;
        }

        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetAffiliateLink(long userId)
        {
            var response = await _affiliateService.GetAffiliateLink(userId);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success != 1 ? 0 : 1000,
                Message = response.Success == 1 ? "Successfully generating the affiliate link." : "Failed generating the data.",
                Data = new { affiliatelink = response }
            });
        }

        [HttpPost]
        [Route("{userid}/join")]
        public async Task<IActionResult> JoinAffiliate(long userid)
        {
            var response = await _affiliateService.JoinAffiliate(userid);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = !response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully join affiliate." : "Failed join affiliate.",
                Data = response
            });
        }

        [HttpPost]
        [Route("confirm-join")]
        public async Task<IActionResult> ConfirmJoinAffiliate(string stripeAccountId)
        {
            var response = await _affiliateService.ConfirmJoinAffiliate(stripeAccountId);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success == 0 ? 0 : 1000,
                Message = response.Success == 1 ? "Successfully confirmed join affiliate." : "Failed confirming join affiliate.",
                Data = response
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("code")]
        public async Task<IActionResult> IsAffiliateCodeEnable(string code)
        {
            var response = await _affiliateService.IsAffiliateCodeEnable(code);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = !response ? 0 : 1000,
                Message = response ? "Successfully get status." : "Failed getting status.",
                Data = response
            });
        }

        [HttpPost]
        [Route("{userid}/enable")]
        public async Task<IActionResult> EnableAffiliate(long userid, bool isenable)
        {
            var response = await _affiliateService.Enable(userid, isenable);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success == 0 ? 0 : 1000,
                Message = response.Success == 1 ? "Successfully updated affiliate." : "Failed updated affiliate.",
                Data = response
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("process-payouts")]
        public async Task<IActionResult> ProcessPayouts()
        {
            var response = await _affiliateService.ProcessPayouts();

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1: 0,
                ErrorCode = response ? 0 : 1000,
                Message = response == true ? "Successfully process affiliate payout." : "Failed processing payout.",
                Data = response
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("disable-cancelled-accounts")]
        public async Task<IActionResult> DisableCancelledAccounts()
        {
            var response = await _affiliateService.DisableCancelledAccounts();
            
            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1: 0,
                ErrorCode = response ? 0 : 1000,
                Message = response == true ? "Successfully process affiliate payout." : "Failed processing payout.",
                Data = response
            });
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("affiliates-summary")]
        public async Task<IActionResult> AffiliatesSummary()
        {
            var response = await _affiliateService.AffiliatesSummary();

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success == 0 ? 0 : 1000,
                Message = response.Success == 1 ? "Successfully retrieved affiliate summary." : "Failed retrieving affiliate summary.",
                Data = response
            });
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("update-affiliates-summary")]
        public async Task<IActionResult> UpdateAffiliatesSummary()
        {
            var response = await _affiliateService.UpdateAffiliatesSummary();

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response == true ? "Successfully updated affiliate summary." : "Failed updating affiliate summary.",
                Data = response
            });
        }
    }
}
