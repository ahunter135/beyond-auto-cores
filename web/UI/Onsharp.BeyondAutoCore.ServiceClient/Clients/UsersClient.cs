
namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class UsersClient : ApiClient
    {
        protected override string Service { get { return "users"; } }

        public UsersClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {
        }

        #region CRUD
        public async Task<Result<List<UserDto>>> GetAll(bool isGeneric = true)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;

            return await Get<List<UserDto>>("", apiParameters);
        }

        public async Task<Result<UserDto>> GetById(long id)
        {
            return await GetById<UserDto>(id);
        }

        public async Task<bool> Update(UpdateUserCommand updateCommand, IFormFileCollection photo)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            apiParameters.Add("id", updateCommand.Id.ToString());
            apiParameters.Add("firstName", updateCommand.FirstName.ToString());
            apiParameters.Add("lastName", updateCommand.LastName.ToString());
            apiParameters.Add("email", updateCommand.Email.ToString());
            apiParameters.Add("subscription", updateCommand.Subscription.ToString());
            apiParameters.Add("role", updateCommand.Role.ToString());
            apiParameters.Add("margin", updateCommand.Margin.ToString());
            apiParameters.Add("isUpdatePhoto", updateCommand.IsUpdatePhoto.ToString());

            apiParameters.Add("tier1AdminEnabled", updateCommand.Tier1AdminEnabled.ToString());
            apiParameters.Add("tier1PercentLevel", updateCommand.Tier1PercentLevel.ToString());
            apiParameters.Add("tier1UserEnabled", updateCommand.Tier1UserEnabled.ToString());

            return await UpdateBinaryRequest<bool>("", apiParameters, "photo", photo);
        }

        public async Task<Result<UserDto>> UpdatePassword(UpdatePasswordCommand updateCommand)
        {
            return await Update<UserDto>("update-password", updateCommand, true);
        }

        public async Task<bool> DeleteUser(long id)
        {
            return await Delete(id);
        }
        #endregion

        public async Task<Result<AuthenticateResponse>> Login(LoginCommand loginCommand)
        {
            return await Post<AuthenticateResponse>(loginCommand, "login");
        }

    }
}
