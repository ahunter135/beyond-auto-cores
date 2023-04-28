using Stripe;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class PaymentService: BaseService, IPaymentService
    {
        private readonly IMapper _mapper;
        private readonly ISubscriptionService _subscriptionCreditService;
        private readonly IRegistrationsRepository _userRegistrationRepository;
        private readonly IPaymentsRepository _paymentsRepository;

        public PaymentService(IHttpContextAccessor httpContextAccessor, ISubscriptionService subscriptionCreditService,
                              IPaymentsRepository paymentsRepository, IRegistrationsRepository userRegistrationRepository,    
                              IMapper mapper)
            : base(httpContextAccessor)
        {
            _mapper = mapper;
            _paymentsRepository = paymentsRepository;
            _subscriptionCreditService = subscriptionCreditService;
            _userRegistrationRepository = userRegistrationRepository;

            var stripeConfig = new StripeConfig();
            StripeConfiguration.ApiKey = stripeConfig.ApiKey;

        }

        public async Task<PaymentDto> Create(CreatePaymentCommand createCommand)
        {

            var newPayment = _mapper.Map<CreatePaymentCommand, PaymentModel>(createCommand);

            newPayment.CreatedBy = this.CurrentUserId();
            newPayment.CreatedOn = DateTime.UtcNow;

            _paymentsRepository.Add(newPayment);
            _paymentsRepository.SaveChanges();

            return _mapper.Map<PaymentModel, PaymentDto>(newPayment);

        }

        public async Task<PaymentDto> GetPaymentByLinkId(long linkId, PaymentTypeEnum paymentType)
        {
            var paymentRepoInfo = await _paymentsRepository.GetPaymentByLinkId(linkId, paymentType);

            return _mapper.Map<PaymentModel, PaymentDto>(paymentRepoInfo);
        }

        public async Task<PaymentIntent> CreatePaymentIntent(decimal amount, string currency, string description, string stripeCustomerId)
        {
            var paymentIntentOptions = new PaymentIntentCreateOptions
            {
                Amount = long.Parse((amount * 100).ToString("#.#").Replace(".", "")),
                Currency = currency,
                Customer = stripeCustomerId,
                Description = description
            };

            //var paymentIntentOptions = new PaymentIntentCreateOptions
            //{
            //    Amount = long.Parse((priceInfo.Amount * 100).ToString("#.#").Replace(".", "")),
            //    Currency = priceInfo.Currency,
            //    Customer = stripeCustomerId,
            //    Description = priceInfo.Description
            //};

            var paymentIntentService = new Stripe.PaymentIntentService();
            var paymentIntentResponse = paymentIntentService.Create(paymentIntentOptions);

            return paymentIntentResponse;
        }

        public async Task<Subscription> CreateSubscription(PriceDto priceInfo, string stripeCustomerId)
        {
            var paymentSettings = new SubscriptionPaymentSettingsOptions
            {
                SaveDefaultPaymentMethod = "on_subscription",
            };

            var subscriptionOptions = new SubscriptionCreateOptions
            {
                Customer = stripeCustomerId,
                Items = new List<SubscriptionItemOptions>
                        {
                            new SubscriptionItemOptions
                            {
                                Quantity = 1,
                                Price = priceInfo.StripePriceId,
                            },
                        },
                PaymentSettings = paymentSettings,
                PaymentBehavior = "default_incomplete",
                TrialEnd = DateTime.UtcNow.AddDays(5),
            };

            subscriptionOptions.AddExpand("latest_invoice.payment_intent");
            var subscriptionService = new Stripe.SubscriptionService();
            Subscription subscription = subscriptionService.Create(subscriptionOptions);

            return subscription;
        }

        public async Task<Subscription> UpdateSubscription(string subscriptionId, PriceDto newPriceInfo)
        {
            var getService = new Stripe.SubscriptionService();
            Subscription getSubscription = getService.Get(subscriptionId);
            var itemToDelete = getSubscription.Items.FirstOrDefault();

            var paymentSettings = new SubscriptionPaymentSettingsOptions
            {
                SaveDefaultPaymentMethod = "on_subscription",
            };

            var subscriptionOptions = new SubscriptionUpdateOptions();
            subscriptionOptions.PaymentSettings = paymentSettings;
            subscriptionOptions.PaymentBehavior = "default_incomplete";
            subscriptionOptions.Items = new List<SubscriptionItemOptions>();

            subscriptionOptions.Items.Add(new SubscriptionItemOptions
            {
                Quantity = 1,
                Price = newPriceInfo.StripePriceId
            });

            if (itemToDelete != null)
            {
                subscriptionOptions.Items.Add(new SubscriptionItemOptions
                {
                    Id = itemToDelete.Id,
                    Deleted = true
                });
            }

            subscriptionOptions.AddExpand("latest_invoice.payment_intent");
            var subscriptionService = new Stripe.SubscriptionService();
            Subscription subscription = subscriptionService.Update(subscriptionId, subscriptionOptions);

            return subscription;
        }

        public async Task<Subscription> CancelSubscription(string subscriptionId)
        {
            var options = new SubscriptionUpdateOptions { CancelAtPeriodEnd = true };
            var service = new Stripe.SubscriptionService();
            Console.WriteLine(subscriptionId);
            Subscription subscription = service.Update(subscriptionId, options);

            return subscription;
        }

        public async Task<Customer> CreateStripeCustomer(string email, string firstName, string lastName)
        {
            var customerOptions = new CustomerCreateOptions
            {
                Email = email,
                Name = firstName + " " + lastName
            };
            var customerService = new CustomerService();
            var customerReponse = customerService.Create(customerOptions);

            return customerReponse;
        }

        public async Task<bool> PaymentConfirm(PaymentConfirmCommand confirmCommand)
        {
            if (confirmCommand.PaymentIntentId != null) {
                var paymentInfo = await _paymentsRepository.GetPaymentByIntent(confirmCommand.PaymentIntentId);
                if (paymentInfo != null)
                {
                    paymentInfo.Status = confirmCommand.Status;
                    paymentInfo.PaymentIntentId = confirmCommand.PaymentIntentId;
                    _paymentsRepository.Update(paymentInfo);
                    _paymentsRepository.SaveChanges();

                    return true;
                }

                return false;
            } else {
                var options = new CardCreateOptions
                {
                    Source = confirmCommand.Token,
                };
                var service = new CardService();
                service.Create(confirmCommand.Customer, options);

                return true;
            }

            return false;
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _paymentsRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _paymentsRepository.Update(singleData);
            _paymentsRepository.SaveChanges();

            return true;
        }

        public async Task<string> CreateAccount()
        {
            var optAccount = new AccountCreateOptions {
                Type = "express",
                Capabilities = new AccountCapabilitiesOptions
                {
                    CardPayments = new AccountCapabilitiesCardPaymentsOptions { Requested = true },
                    Transfers = new AccountCapabilitiesTransfersOptions { Requested = true },
                },
            };
            var service = new AccountService();
            var account = service.Create(optAccount);

             return account.Id;
        }

        public async Task<string> CreateAccountLink(string accountId)
        {
            var affiliateConfig = new AffiliateConfig();

            // Stripe Reference: https://stripe.com/docs/connect/enable-payment-acceptance-guide
            var optAccountLink = new AccountLinkCreateOptions
            {
                Account = accountId, // "acct_1032D82eZvKYlo2C",
                RefreshUrl = string.Format(affiliateConfig.StripeAccountLinkRefreshUrl, accountId),
                ReturnUrl = string.Format(affiliateConfig.StripeAccountLinkReturnUrl, accountId),
                Type = "account_onboarding",
            };
            var serviceAccountLink = new AccountLinkService();
            var accountLink = serviceAccountLink.Create(optAccountLink);

            return accountLink.Url;
        }

        public async Task<PayoutDto> SendPayouts(string stripeAccountId, decimal amount)
        {
            if (string.IsNullOrWhiteSpace(stripeAccountId))
                return new PayoutDto() { Success = 0, Message = "Stripe AccountId is empty." };

            if (amount <= 0)
                return new PayoutDto() { Success = 0, Message = "Amount should be greater than zero." };

            try
            {
                var options = new TransferCreateOptions 
                {
                    Amount = long.Parse((amount * 100).ToString("#")),
                    Currency = "usd",
                    Destination = stripeAccountId
                };

                var service = new TransferService(); 
                var transferResponse = service.Create(options);

                return new PayoutDto() { Success = 1, Message = "Successfully sent payout.", StripeTransferId = transferResponse.Id };
            }
            catch (Exception ex)
            {
                return new PayoutDto() { Success = 0, Message = "Throw exception. Message: " + ex.Message };
            }
        }

    }
}
