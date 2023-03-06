
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IGradeCreditService
    {
        // Read
        Task<GradeCreditDto> GetById(long id);
        Task<Decimal> GetTotalByUserId(long userId);
        Task<PageList<GradeCreditDto>> GetAllByUserId(long userId, ParametersCommand parametersCommand);

        // Write
        Task<GradeCreditDto> Create(CreateGradeCreditCommand createCommand);
        Task<bool> Delete(long id);

    }
}
