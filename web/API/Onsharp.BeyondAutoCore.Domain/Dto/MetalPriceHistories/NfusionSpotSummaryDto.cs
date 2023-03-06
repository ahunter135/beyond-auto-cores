
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class NfusionSpotSummaryDto
    {
        public string RequestedSymbol { get; set; }
        public string RequestedCurrency { get; set; }
        public string RequestedUnitOfMeasure { get; set; }

        public NfusionSpotSummaryDataDto Data { get; set; }

    }
}