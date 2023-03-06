
namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IMetalPriceHistoriesRepository : IBaseRepository<MetalPriceHistoryModel>
    {
        // read
        Task<MetalPriceHistoryModel> GetDataByTimeStamp(DateTime timeStamp, MetalEnum metal);
        Task<List<MetalPriceHistoryListDto>> GetMetalPriceHistories(List<SqlParameter> parameters);

    }
}
