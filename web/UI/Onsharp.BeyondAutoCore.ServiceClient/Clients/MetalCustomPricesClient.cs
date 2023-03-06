
namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class MetalCustomPricesClient : ApiClient
    {
        protected override string Service { get { return "metalcustomprices"; } }

        public MetalCustomPricesClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {

        }

        public async Task<Result<MetalCustomPriceDto>> Get()
        {
            return await Get<MetalCustomPriceDto>("");
        }

        public async Task<Result<MetalCustomPriceDto>> Create(CreateUpdateCustomMetalPriceCommand createCommand)
        {
            return await Post<MetalCustomPriceDto>(createCommand);
        }

        public async Task<Result<MetalCustomPriceDto>> Update(CreateUpdateCustomMetalPriceCommand updateCommand)
        {
            return await Update<MetalCustomPriceDto>("", updateCommand, true);
        }
    }
}
