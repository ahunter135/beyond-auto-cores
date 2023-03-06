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
        Task<PaymentIntent> CreatePaymentIntent(decimal amount, string currency, string description, string stripeCustomerId);
        Task<Subscription> CreateSubscription(PriceDto priceInfo, string stripeCustomerId);
        Task<Subscription> UpdateSubscription(string subscriptionId, PriceDto newPriceInfo);
        Task<Customer> CreateStripeCustomer(string email, string firstName, string lastName);
        Task<PayoutDto> SendPayouts(string stripeAccountId, decimal amount);

        Task<bool> Delete(long id);
        Task<string> CreateAccount();
        Task<string> CreateAccountLink(string accountId);

    }
}
