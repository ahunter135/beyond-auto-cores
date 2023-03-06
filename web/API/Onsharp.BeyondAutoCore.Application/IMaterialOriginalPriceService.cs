
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IMaterialOriginalPriceService
    {
        // Read
        Task<MaterialOriginalPriceDto> GetSingleRecord();
        Task<PageList<MaterialOriginalPriceDto>> GetAll(ParametersCommand parametersCommand);
    }
}
