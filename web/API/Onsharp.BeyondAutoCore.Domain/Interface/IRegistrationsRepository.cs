namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IRegistrationsRepository : IBaseRepository<RegistrationModel>
    {
        Task<RegistrationModel> GetRegistrationByCode(string registrationCode);
        Task<SubscriptionStatusDto> GetSubscriptionStatusByUserId(long userId);
    }
}
