
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IMasterMarginService
    {
        // Read
        Task<MarginDto> Get();

        // Write
        Task<MarginDto> Create(CreateMarginCommand createCommand);
        Task<MarginDto> Update(UpdateMarginCommand updateCommand);
        Task<bool> Delete(long id);
    }
}
