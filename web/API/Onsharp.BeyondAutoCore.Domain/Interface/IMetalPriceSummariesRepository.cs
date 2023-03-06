
namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IMetalPriceSummariesRepository : IBaseRepository<MetalPriceSummaryModel>
    {

        // read
        Task<MetalPriceSummaryModel> GetLatestMetalPriceSummary(MetalEnum metal);

        // write

    }
}
