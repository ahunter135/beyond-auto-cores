
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class CodeDetailCommand
    {
        public CodeDetailCommand()
        {
            IsCustom = false;
        }

        public string ConverterName { get; set; }
        public bool IsCustom { get; set; }
        public decimal? OriginalPrice { get; set; }
        public decimal? PlatinumPrice { get; set; }
        public decimal? PalladiumPrice { get; set; }
        public decimal? RhodiumPrice { get; set; }
        public decimal? Margin { get; set; }
        public string? Make { get; set; }

    }
}
