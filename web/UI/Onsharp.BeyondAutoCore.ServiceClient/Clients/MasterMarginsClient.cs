
namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class MasterMarginsClient : ApiClient
    {
        protected override string Service { get { return "margins"; } }

        public MasterMarginsClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {

        }

        public async Task<Result<MarginDto>> Get()
        {
            return await Get<MarginDto>("");
        }

        public async Task<Result<MarginDto>> Create(CreateUpdateMarginCommand createCommand)
        {
            return await Post<MarginDto>(createCommand);
        }

        public async Task<Result<MarginDto>> Update(CreateUpdateMarginCommand updateCommand)
        {
            return await Update<MarginDto>("", updateCommand, true);
        }


    }
}
