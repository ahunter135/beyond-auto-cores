
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class ConfirmGradeCreditCommand
    {
        public long NumberOfGradeCredit { get; set; }

        public string PaymentIntentId { get; set; }

        public string Status { get; set; }
    }
}
