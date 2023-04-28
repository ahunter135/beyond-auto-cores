using Hangfire;
using Microsoft.AspNetCore.Mvc;


namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [ApiController]
    [Route("api/v1/hangfire/")]
    public class HangfireJobsController : BaseController
    {
        private readonly IHangfireJobService _hangfireJobService;
        public HangfireJobsController(IHangfireJobService hangfireJobService)
        {
            _hangfireJobService = hangfireJobService;
        }

        [HttpPost]
        [Route("jobs")]
        public IActionResult CreateJobs()
        {

            RecurringJob.AddOrUpdate(() => _hangfireJobService.UpdateMetalPrices(), Cron.Minutely);
            RecurringJob.AddOrUpdate(() => _hangfireJobService.ProcessPayouts(), "00 01 */01 * *"); // At 01:00 AM, everyday
            RecurringJob.AddOrUpdate(() => _hangfireJobService.UpdateAffiliatesSummary(), "00 01 */02 * *");
            RecurringJob.AddOrUpdate(() => _hangfireJobService.DisableCancelledAccounts(), Cron.Minutely);

            return Json(new { success = true });
        }
    }
}
