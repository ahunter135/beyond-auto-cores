
namespace Onsharp.BeyondAutoCore.Web.Model.Command
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
        
    }
}
