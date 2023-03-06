
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class InventorySummaryDto
    {
        public long LotId { get; set; }
        public bool IsSubmitted { get; set; }
        public string LotName { get; set; }
        public string InvoiceNo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Average { get; set; }
        public decimal? Total { get; set; }

        public long CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
