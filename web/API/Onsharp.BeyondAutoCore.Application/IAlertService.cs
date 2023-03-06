
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IAlertService
    {
        // Read
        Task<AlertDto> GetById(long id);
        Task<PageList<AlertDto>> GetAllByUserId(long userId, ParametersCommand parametersCommand);
        Task<double> GetUnReadCountByUserId(long userId);

        // Write
        Task<AlertDto> Create(CreateAlertCommand createCommand);
        Task<AlertDto> Update(UpdateAlertCommand updateCommand);
        Task<bool> Read(long id);
        Task<bool> Delete(long id);
    }
}
