
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IRegistrationService
    {

        // Read 
        Task<RegistrationDto> GetById(long id);
        Task<RegistrationDto> GetUserRegistrationByCode(string registrationCode);

        //Write
        Task<RegistrationDto> CreateRegistration(CreateRegCommand userCreateCommand);
        Task<ResponseDto> EnableSubscription(long userId, bool enable);
        Task<AuthenticateResponse> ConfirmRegistration(ConfirmRegCommand confirmRegistrationCommand);
        Task<bool> ConfirmRegistrationPayment(ConfirmRegPaymentCommand confirmCommand);
        Task<RegistrationDto> UpdateSubscription(int newSubscription);
        Task<RegistrationDto> ConfirmOneTimeSubscription(ConfirmRegOnetimeSubscriptionCommand confirmCommand);
    }
}
