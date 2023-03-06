

namespace Onsharp.BeyondAutoCore.Web.Model.Command
{
    public class CreateUpdateCustomMetalPriceCommand
    {
        public long Id { get; set; }
        public decimal Platinum { get; set; }
        public decimal Palladium { get; set; }
        public decimal Rhodium { get; set; }
    }
}
