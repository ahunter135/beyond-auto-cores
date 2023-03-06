namespace Onsharp.BeyondAutoCore.Hangfire.Service.Services
{
    public class MetalPriceService
    {
        private readonly string service = "metalprices";
        public MetalPriceService()
        {
        
        }

        public async Task<bool> UpdateMetalPrices()
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;

            var apiConfig = new ApiConfig();
            var apiClient = new ApiClient(apiConfig.Host, apiConfig.Port, service, apiConfig.EnableSSL, apiConfig.Token);
            var data = await apiClient.PutRequest(apiParameters);
            return true;
        }

    }
}
