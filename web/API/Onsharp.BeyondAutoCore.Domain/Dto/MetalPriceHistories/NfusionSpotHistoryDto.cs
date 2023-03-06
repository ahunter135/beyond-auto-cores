
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class NfusionSpotHistoryDto
    {
        public string RequestedSymbol { get; set; }
        public string RequestedCurrency { get; set; }
        public string RequestedUnitOfMeasure { get; set; }
        public string Success { get; set; }

        public NfusionSpotHistoryDataDto Data { get; set; }
    }

}
