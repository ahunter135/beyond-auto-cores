
namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class PartnerDto: BaseModelDto
    {
        public string PartnerName { get; set; }
        public string? Website { get; set; }
        public string? Logo { get; set; }
        public string? LogoFileKey { get; set; }

        [NotMapped]
        public string FileUrl { get; set; }
    }
}
