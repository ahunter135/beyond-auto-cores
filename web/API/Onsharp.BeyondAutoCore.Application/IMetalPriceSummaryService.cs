
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IMetalPriceSummaryService
    {
        // read
        Task<MetalPriceSummaryDto> GetLatestSummary(MetalEnum metal);

        // write
        Task<MetalPriceSummaryDto> Create(CreateMetalPriceSummaryCommand createCommand);
    }
}
