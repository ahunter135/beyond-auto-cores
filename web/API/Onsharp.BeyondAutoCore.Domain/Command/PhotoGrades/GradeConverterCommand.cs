
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class GradeConverterCommand
    {
        public long Id { get; set; }
        public int PhotoGradeStatus { get; set; }
        public decimal Price { get; set; }
        public string? Comments { get; set; }
        public long CodeId { get; set; }

    }
}
