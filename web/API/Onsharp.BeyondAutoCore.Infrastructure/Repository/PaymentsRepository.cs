
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class PaymentsRepository : BaseRepository<PaymentModel>, IPaymentsRepository
    {
        private BacDBContext _context = null;

        public PaymentsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<PaymentModel> GetPaymentByIntent(string paymentIntentId)
        {
            return await _context.Payments.Where(c => c.PaymentIntentId == paymentIntentId).FirstOrDefaultAsync();
        }

        /// <summary>
        /// LinkId can be RegistrationId, UserId, etc. Depending which payment it came from.
        /// </summary>
        /// <param name="linkId"></param>
        /// <returns></returns>
        public async Task<PaymentModel> GetPaymentByLinkId(long linkId, PaymentTypeEnum paymentType)
        {
            return await _context.Payments.Where(c => c.LinkId == linkId && c.PaymentType == (int)paymentType).FirstOrDefaultAsync();
        }

    }
}
