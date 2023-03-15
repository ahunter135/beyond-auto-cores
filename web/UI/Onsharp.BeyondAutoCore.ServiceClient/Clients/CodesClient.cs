
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

        // Want this method to take in a page number - fetch page number data from API - return all entries from that page
        public async Task<Result<List<CodeDto>>> GetPage(bool? isGeneric = true, string query = "", int pageNumber = 1, int pageSize = 10)
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
            apiParameters.Add("pageNumber", $"{pageNumber}");
            apiParameters.Add("pageSize", $"{pageSize}");
            apiParameters.Add("searchQuery", query);

            return await Get<List<CodeDto>>("page", apiParameters);
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
