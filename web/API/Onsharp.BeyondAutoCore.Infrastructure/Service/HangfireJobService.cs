using Onsharp.BeyondAutoCore.Infrastructure.Core.ServiceClient;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class HangfireJobService : BaseService, IHangfireJobService
    {
        

        public HangfireJobService(IHttpContextAccessor httpContextAccessor)
           : base(httpContextAccessor)
        {

        }

        public async Task<bool> UpdateMetalPrices()
        {
            string service = "metalprices";
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;

            var apiConfig = new HangfireApiConfig();
            var apiClient = new ApiClient(apiConfig.Host, apiConfig.Port, service, apiConfig.EnableSSL, apiConfig.Token);
            var data = await apiClient.PutRequest(apiParameters);
            return true;
        }

        public async Task<bool> UpdateAffiliatesSummary()
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();

            string service = "affiliates";
            var apiConfig = new HangfireApiConfig();
            var apiClient = new ApiClient(apiConfig.Host, apiConfig.Port, service, apiConfig.EnableSSL, apiConfig.Token);
            var data = await apiClient.PostRequest(apiParameters, "update-affiliates-summary");
            return true;

        }

        public async Task<bool> ProcessPayouts()
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;

            string service = "affiliates";
            var apiConfig = new HangfireApiConfig();
            var apiClient = new ApiClient(apiConfig.Host, apiConfig.Port, service, apiConfig.EnableSSL, apiConfig.Token);
            var data = await apiClient.PostRequest(apiParameters, "process-payouts");
            return true;
        }

        public async Task<bool> DisableCancelledAccounts() 
        {
             Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;

            string service = "affiliates";
            var apiConfig = new HangfireApiConfig();
            var apiClient = new ApiClient(apiConfig.Host, apiConfig.Port, service, apiConfig.EnableSSL, apiConfig.Token);
            var data = await apiClient.PostRequest(apiParameters, "disable-cancelled-accounts");
            return true;
        }

    }
}
