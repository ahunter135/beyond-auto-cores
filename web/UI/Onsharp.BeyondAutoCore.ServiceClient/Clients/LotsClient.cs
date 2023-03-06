
namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class LotsClient : ApiClient
    {
        protected override string Service { get { return "lots"; } }

        public LotsClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {
        }

        public async Task<Result<List<InventoryDto>>> GetInventory(ParametersCommand parametersCommand)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            apiParameters.Add("searchCategory", "isSubmitted");
            apiParameters.Add("searchQuery", "true");
            return await Get<List<InventoryDto>>("inventorysummary", apiParameters);
        }

        public async Task<Result<List<InvoiceDto>>> GetInvoice(long lotId)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            apiParameters.Add("id", lotId.ToString());
            apiParameters.Add("pageNumber", "1");
            apiParameters.Add("pageSize", int.MaxValue.ToString());

            return await Get<List<InvoiceDto>>($"{lotId}/invoice", apiParameters);
        }

        public async Task<Result<bool>> DeleteLot(long id)
        {
            return await Delete<bool>(id);
        }

       

    }
}
