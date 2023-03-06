namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface ILotItemsRepository : IBaseRepository<LotItemModel>
    {

        // read 
        Task<List<LotCodeItemDto>> GetLotItemList(List<SqlParameter> parameters);
        Task<LotItemModel> GetLotItemByLotIdAndCodeId(long lotId, long codeId);
    }
}
