
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IMetalPriceHistoryService
    {
        // read
        Task<List<MetalPriceHistoryListDto>> GetMetalPriceHistories(MetalEnum metal, DateTime dateFrom, DateTime dateTo);

        //// write
        Task<MetalPriceHistoryDto> CreateUpdate(CreateMetalPriceHistoryCommand createCommand);

    }
}
