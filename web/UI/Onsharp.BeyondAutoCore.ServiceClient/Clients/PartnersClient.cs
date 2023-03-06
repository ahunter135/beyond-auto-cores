
namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class PartnersClient : ApiClient
    {
        protected override string Service { get { return "partners"; } }

        public PartnersClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {

        }

        public async Task<Result<List<PartnerDto>>> GetAll(bool isGeneric = true)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;

            return await Get<List<PartnerDto>>("", apiParameters);
        }

        public async Task<Result<PartnerDto>> GetById(long id)
        {
            return await GetById<PartnerDto>(id);
        }

        public async Task<bool> Create(CreateUpdatePartnerCommand createCommand, IFormFileCollection files)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            apiParameters.Add("partnerName", createCommand.PartnerName);
            apiParameters.Add("website", createCommand.Website);

            return await CreateBinaryRequest<bool>("", apiParameters, "logo", files);
        }

        public async Task<bool> Update(CreateUpdatePartnerCommand updateCommand, IFormFileCollection files)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            apiParameters.Add("id", updateCommand.Id.ToString());
            apiParameters.Add("partnerName", updateCommand.PartnerName);
            apiParameters.Add("website", updateCommand.Website);
            apiParameters.Add("isUpdatelogo", updateCommand.IsUpdateLogo.ToString());

            return await UpdateBinaryRequest<bool>("", apiParameters, "logo", files);
        }

        public async Task<bool> DeletePartner(long id)
        {
            return await Delete(id);
        }

    }
}
