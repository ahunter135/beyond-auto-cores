
namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class LotItemFullnessClient : ApiClient
    {
        protected override string Service { get { return "lotitemfullness"; } }

        public LotItemFullnessClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {
        }

        public async Task<Result<bool>> DeleteLotItemFullness(long id)
        {
            return await Delete<bool>(id);
        }

    }
}
