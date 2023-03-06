

namespace Onsharp.BeyondAutoCore.Domain.Command
{
	public class SubmitLotCommand
	{
		public long LotId { get; set; }
		public string Email { get; set;}
		public string? BusinessName { get; set; }

		public IFormFile? PhotoAttachment { get; set; }

	}
}
