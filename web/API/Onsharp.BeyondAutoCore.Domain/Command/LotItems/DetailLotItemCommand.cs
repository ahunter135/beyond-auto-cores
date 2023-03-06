namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class DetailLotItemCommand
    {
        
        public long LotId { get; set; }
        public long? CodeId { get; set; }

        public string ConverterName { get; set; }
        public decimal? OriginalPrice { get; set; }
        public int? FullnessPercentage { get; set; }

        public int? PhotoGradeId { get; set; }

    }
}
