namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class LotCodeItemDto
    {
		public long Id { get; set; }
		public long LotId { get; set; }
        public long CodeId { get; set; }
		public string LotName { get; set; }
		public string? ConverterName { get; set; }
		public decimal MinUnitPrice { get; set; }
		public decimal MaxUnitPrice { get; set; }

		public long? PhotoGradeId { get; set; }
		public long? PhotoGradeItemId { get; set; }
		public string? FileKey { get; set; }

		[NotMapped]
		public string? FileUrl { get; set; }
		public DateTime CreatedOn { get; set; }
	}
}
