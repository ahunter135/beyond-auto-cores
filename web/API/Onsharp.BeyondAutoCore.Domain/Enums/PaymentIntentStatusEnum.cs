
namespace Onsharp.BeyondAutoCore.Domain.Enums
{
    public enum PaymentIntentStatusEnum
    {
        canceled, 
        processing, 
        requires_action,
        requires_capture, 
        requires_confirmation, 
        requires_payment_method,
        succeeded
    }
}
