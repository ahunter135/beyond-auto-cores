
namespace Onsharp.BeyondAutoCore.Hangfire.Service.Services
{
    public class AffiliateService
    {
        private readonly string service = "affiliates";
        public AffiliateService()
        {

        }

        public async Task<bool> ProcessPayouts()
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;

            var apiConfig = new ApiConfig();
            var apiClient = new ApiClient(apiConfig.Host, apiConfig.Port, service, apiConfig.EnableSSL, apiConfig.Token);
            var data = await apiClient.PostRequest(apiParameters, "process-payouts");
            return true;
        }

        public async Task<bool> DisableCancelledAccounts()
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;

            var apiConfig = new ApiConfig();
            var apiClient = new ApiClient(apiConfig.Host, apiConfig.Port, service, apiConfig.EnableSSL, apiConfig.Token);
            var data = await apiClient.PostRequest(apiParameters, "disable-cancelled-accounts");
            return true;
        }
    }


}
