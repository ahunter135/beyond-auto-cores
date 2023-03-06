namespace Onsharp.BeyondAutoCore.Web.Model.Dto
{
    public class InventoryDto
    {
        public long LotId { get; set; }
        public string LotName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Average { get; set; }
        public decimal? Total { get; set; }
    }
}
