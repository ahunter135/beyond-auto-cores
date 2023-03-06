
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class InvoiceDto
    {
        public long LotItemFullnessId { get; set; }
        public long LotItemId { get; set; }
        public long LotId { get; set; }
        public string InvoiceNo { get; set; }
        public string LotName { get; set; }
        public string ConverterName { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? Quantity { get; set; }
    }
}
