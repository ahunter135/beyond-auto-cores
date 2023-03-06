
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class NfusionSpotHistoryDataDto
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
        public string BaseCurrency { get; set; }

        public List<NfusionSpotHistoryDataIntervalDto> Intervals { get; set; }
    }
}
