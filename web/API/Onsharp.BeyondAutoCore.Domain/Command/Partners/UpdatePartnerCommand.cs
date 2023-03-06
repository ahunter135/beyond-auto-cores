
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class UpdatePartnerCommand: PartnerDetailCommand
    {
        public long Id { get; set; }
        public bool IsUpdatelogo { get; set; }
    }
}
