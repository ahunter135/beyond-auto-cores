
namespace Onsharp.BeyondAutoCore.Application
{
    public interface ISubscriptionService
    {
        // Read
        Task<SubscriptionDto> GetById(long id);
        Task<PageList<SubscriptionDto>> GetAllByUserId(long userId, ParametersCommand parametersCommand);

        // Write
        Task<SubscriptionDto> Create(CreateSubscriptionCommand createCommand);
        Task<SubscriptionDto> Update(UpdateSubscriptionCommand createCommand);
        Task<bool> Delete(long id);
    }
}
