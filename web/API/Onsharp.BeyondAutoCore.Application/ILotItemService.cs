
namespace Onsharp.BeyondAutoCore.Application
{
    public interface ILotItemService
    {
        // Read
        Task<LotItemDto> GetById(long id);
        Task<PageList<LotItemModel>> GetAllFromRepo(ParametersCommand parametersCommand);
        Task<PageList<LotCodeItemDto>> GetAllByLotId(long lotId, ParametersCommand parametersCommand);

        // Write
        Task<LotItemDto> Create(CreateLotItemCommand createCommand);
        Task<LotItemDto> Update(UpdateLotItemCommand createCommand);
        Task<bool> Delete(long id);

    }
}
