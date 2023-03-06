

namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IMetalCustomPricesRepository : IBaseRepository<MetalCustomPriceModel>
    {
        // read
        Task<MetalCustomPriceModel> GetSingleRecord();

    }
}
