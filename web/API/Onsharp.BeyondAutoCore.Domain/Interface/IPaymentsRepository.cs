
namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IPaymentsRepository : IBaseRepository<PaymentModel>
    {
        Task<PaymentModel> GetPaymentByIntent(string paymentIntentId);

        Task<PaymentModel> GetPaymentByLinkId(long linkId, PaymentTypeEnum paymentType);

    }
}
