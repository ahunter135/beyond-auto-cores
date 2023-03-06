
namespace Onsharp.BeyondAutoCore.Application
{
    public interface ILotService
    {

        // Read
        Task<LotDto> GetById(long id);
        Task<PageList<LotModel>> GetAllFromRepo(ParametersCommand parametersCommand);
        Task<PageList<InventoryDto>> GetInventory(ParametersCommand parametersCommand);
        Task<PageList<InventorySummaryDto>> GetInventorySummary(ParametersCommand parametersCommand);
        Task<PageList<InvoiceDto>> GetLotInvoice(long lotId, ParametersCommand parametersCommand);

        // Write
        Task<LotDto> Create(CreateLotCommand createCommand);
        Task<LotDto> Update(UpdateLotCommand updateCommand);
        Task<bool> Delete(long id);
        Task<ResponseDto> SubmitLot(SubmitLotCommand submitLotCommand);

    }
}
