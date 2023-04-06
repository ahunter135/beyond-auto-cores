using Microsoft.AspNetCore.Mvc;
using Onsharp.BeyondAutoCore.Hangfire.ServiceClient;
using Hangfire;
using Onsharp.BeyondAutoCore.Hangfire.Service.Services;


namespace Onsharp.BeyondAutoCore.Hangfire.Controllers
{
    public class JobsController : Controller
    {

        [HttpPost]
        [Route("api/hangfire/jobs")]
        public IActionResult CreateJobs()
        {
            //Recurring Job - this job is executed many times on the specified cron schedule
            //RecurringJob.AddOrUpdate(() => Console.WriteLine("Sent similar product offer and suuggestions"), Cron.Minutely);
            // RecurringJob.AddOrUpdate<CronServiceDB>("db-poll-metafields-send", a => a.SendMetafields(10, false), "*/5 * * * * *", null, "outprocessing");

            var metalPriceService = new MetalPriceService();
            var affiliateService = new AffiliateService();

            RecurringJob.AddOrUpdate(() =>  metalPriceService.UpdateMetalPrices(), Cron.Minutely);
            RecurringJob.AddOrUpdate(() => affiliateService.ProcessPayouts(), "00 01 */01 * *"); // At 01:00 AM, everyday

            return Json(new { success = true });
        }

        //private bool UpdateMetalPrices()
        //{

        //    var apiClient = new ApiClient(metalPricesConfig.Host, metalPricesConfig.Port, service, metalPricesConfig.EnableSSL, metalPricesConfig.Token);
        //    return true;
        //}

    }
}
