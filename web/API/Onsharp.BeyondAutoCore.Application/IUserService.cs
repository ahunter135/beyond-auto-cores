
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IUserService
    {

        // Read 
        
        Task<UserAccessDto> UserLogin(LoginCommand userLoginCommand);
        Task<UserDto> GetById(long id);
        Task<UserDto> GetByRegistationId(long registrationId);
        Task<List<UserListDto>> GetAll();
        Task<bool?> ValidateEmail(string email);
        Task<string?> ValidateResetPasswordCode(int code);
        Task<UserMarginDto> GetUserMargin(long id);

        //Write
        Task<UserDto> CreateUser(CreateUserCommand userCreateCommand);
        Task<UserDto> UpdateTierEnabled(UpdateUserCommand updateCommand);
        Task<UserDto> UpdateSetMargin(UpdateUserCommand updateCommand);
        Task<UserDto> UpdateUser(UpdateUserCommand updateCommand, IFormFile photo);
        Task<UserDto> UploadPhoto(IFormFile? logo, long userId);
        Task<ResponseDto> Delete(long id);
        Task<bool> ExpireUserTokenByUserId(long userId);
        Task<bool?> ResetPassword(string email, string password);
        Task<ResponseDto> UpdatePassword(UpdatePasswordCommand updatePasswordCommand);
        Task<UserPurchaseGradeCreditDto> PurchaseGradeCredit(decimal numberOfGradeCredit);
        Task<bool> PurchaseGradeCreditConfirm(ConfirmGradeCreditCommand confirmCommand);
        
    }
}
