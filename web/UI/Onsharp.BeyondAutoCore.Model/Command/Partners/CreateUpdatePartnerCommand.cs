namespace Onsharp.BeyondAutoCore.Web.Model.Command
{
    public class CreateUpdatePartnerCommand
    {
        public long Id { get; set; }
        public string PartnerName { get; set; }
        public string Website { get; set; }
        public bool IsUpdateLogo { get; set; }
    }
}
