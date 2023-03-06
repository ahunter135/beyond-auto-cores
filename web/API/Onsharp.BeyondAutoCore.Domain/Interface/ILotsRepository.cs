
namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface ILotsRepository: IBaseRepository<LotModel>
    {

        // read
        Task<List<InventoryDto>> GetInventories(List<SqlParameter> parameters);
        Task<List<InventorySummaryDto>> GetInventorySummary(List<SqlParameter> parameters);
        Task<List<InvoiceDto>> GetLotInvoices(List<SqlParameter> parameters);

    }
}
