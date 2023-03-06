
namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class CodesClient : ApiClient
    {
        protected override string Service { get { return "codes"; } }

        public CodesClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {
        }

        public async Task<Result<List<CodeDto>>> GetAll(bool? isGeneric = true, string query = "")
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            
            apiParameters.Add("searchCategory", String.IsNullOrEmpty(query) ? "iscustom" : "convertername");
            if (isGeneric.HasValue)
            {
                if (isGeneric == true)
                    apiParameters.Add("isCustom", "false");
                else
                    apiParameters.Add("isCustom", "true");
            }

            apiParameters.Add("pageNumber", "1");
            apiParameters.Add("pageSize", int.MaxValue.ToString());
            apiParameters.Add("searchQuery", query);

            return await Get<List<CodeDto>>("", apiParameters);
        }

        public async Task<Result<CodeDto>> GetById(long codeId)
        {
            return await GetById<CodeDto>(codeId);
        }

        public async Task<Result<CodeDto>> Create(CreateUpdateCodeCommand createCommand)
        {
            return await Post<CodeDto>(createCommand);
        }

        public async Task<Result<CodeDto>> Update(CreateUpdateCodeCommand updateCodeCommand)
        {
            return await Update<CodeDto>("", updateCodeCommand, true);
        }

        public async Task<Result<ResponseDto>> DeleteCode(long id)
        {
            return await Delete<ResponseDto>(id);
        }

    }
}
