
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IMetalCustomPriceService
    {
        // read
        Task<MetalCustomPriceDto> GetCustomPrices();


        // write
        Task<MetalCustomPriceDto> Create(CreateMetalCustomPriceCommand createCommand);
        Task<MetalCustomPriceDto> Update(UpdateMetalCustomPriceCommand updateCommand);

    }
}
