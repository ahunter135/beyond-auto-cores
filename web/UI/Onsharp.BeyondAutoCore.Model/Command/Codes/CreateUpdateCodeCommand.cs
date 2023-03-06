
namespace Onsharp.BeyondAutoCore.Web.Model.Command
{
    public class CreateUpdateCodeCommand
    {
        public CreateUpdateCodeCommand()
        {
            IsCustom = false;
        }

        public long Id { get; set; }
        public string ConverterName { get; set; }
        public bool IsCustom { get; set; }
        public decimal? OriginalPrice { get; set; }
        public decimal? Margin { get; set; }
        public decimal? PlatinumPrice { get; set; }
        public decimal? PalladiumPrice { get; set; }
        public decimal? RhodiumPrice { get; set; }
        public string Make { get; set; }
    }
}
