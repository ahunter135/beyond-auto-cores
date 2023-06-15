using Stripe;

namespace Onsharp.BeyondAutoCore.Application
{
    public interface IPaymentService
    {

        // Read
        Task<PaymentDto> GetPaymentByLinkId(long linkId, PaymentTypeEnum paymentType);

        // Write
        Task<bool> PaymentConfirm(PaymentConfirmCommand successCommand);
        Task<PaymentDto> Create(CreatePaymentCommand createCommand);
        Task<Subscription> CancelSubscription(string subscriptionId);
        Task<PaymentIntent> CreatePaymentIntent(decimal amount, string currency, string description, string stripeCustomerId, string paymentMethodId);
        Task<Subscription> CreateSubscription(PriceDto priceInfo, string stripeCustomerId, bool allowTrial, string paymentMethodId);
        Task<Subscription> UpdateSubscription(string subscriptionId, PriceDto newPriceInfo, string stripeCustomerId);
        Task<Customer> CreateStripeCustomer(string email, string firstName, string lastName, string token);
        Task<PayoutDto> SendPayouts(string stripeAccountId, decimal amount);

        Task<bool> Delete(long id);
        Task<string> CreateAccount();
        Task<string> CreateAccountLink(string accountId);

        Task<bool> OnSubscriptionChange(OnSubscriptionChangeCommand subscriptionChange);


	}
}
