using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Diagnostics.Eventing.Reader;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class PaymentService : BaseService, IPaymentService
    {
        private readonly IMapper _mapper;
        private readonly ISubscriptionService _subscriptionCreditService;
        private readonly IRegistrationsRepository _userRegistrationRepository;
        private readonly IPaymentsRepository _paymentsRepository;
        private readonly IPriceService _priceService;

        public PaymentService(IHttpContextAccessor httpContextAccessor, ISubscriptionService subscriptionCreditService,
                              IPaymentsRepository paymentsRepository, IRegistrationsRepository userRegistrationRepository,
                              IMapper mapper, IPriceService priceService)
            : base(httpContextAccessor)
        {
            _mapper = mapper;
            _paymentsRepository = paymentsRepository;
            _subscriptionCreditService = subscriptionCreditService;
            _userRegistrationRepository = userRegistrationRepository;
            _priceService = priceService;

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

        public async Task<PaymentIntent> CreatePaymentIntent(decimal amount, string currency, string description, string stripeCustomerId, string paymentMethodId)
        {
            try
            {
                var paymentIntentOptions = new PaymentIntentCreateOptions
                {
                    Amount = long.Parse((amount * 100).ToString("#.#").Replace(".", "")),
                    Currency = currency,
                    Customer = stripeCustomerId,
                    Description = description,
                    CaptureMethod = "manual",
                    PaymentMethod = paymentMethodId
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

                var service = new PaymentIntentService();
                paymentIntentResponse = service.Confirm(
                  paymentIntentResponse.Id);
                Console.WriteLine(paymentIntentResponse.Status);
                return paymentIntentResponse;
            }
            catch (System.Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }

        }

        public async Task<Subscription> CreateSubscription(PriceDto priceInfo, string stripeCustomerId, bool allowTrial, string paymentMethodId)
        {
            var paymentSettings = new SubscriptionPaymentSettingsOptions
            {
                SaveDefaultPaymentMethod = "on_subscription",
            };
            var subscriptionOptions = new SubscriptionCreateOptions { };
            if (allowTrial)
            {
                var paymentIntentResponse = await CreatePaymentIntent(priceInfo.Amount, priceInfo.Currency, priceInfo.Description, stripeCustomerId, paymentMethodId);

                if (paymentIntentResponse == null)
                {
                    return null;
                }
                else
                {
                    var paymentIntentService = new Stripe.PaymentIntentService();
                    paymentIntentResponse = paymentIntentService.Cancel(paymentIntentResponse.Id);
                }
                subscriptionOptions = new SubscriptionCreateOptions
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
            }
            else
            {
                subscriptionOptions = new SubscriptionCreateOptions
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
                    PaymentBehavior = "allow_incomplete",
                    CollectionMethod = "charge_automatically"
                };
            }

            subscriptionOptions.AddExpand("latest_invoice.payment_intent");
            var subscriptionService = new Stripe.SubscriptionService();
            Subscription subscription = subscriptionService.Create(subscriptionOptions);

            return subscription;
        }

        public async Task<Subscription> UpdateSubscription(string subscriptionId, PriceDto newPriceInfo, string stripeCustomerId)
        {
            try
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
            catch (System.Exception e)
            {
                return await CreateSubscription(newPriceInfo, stripeCustomerId, false, "");
            }

        }

        public async Task<Subscription> CancelSubscription(string subscriptionId)
        {
            var options = new SubscriptionUpdateOptions { CancelAtPeriodEnd = true };
            var service = new Stripe.SubscriptionService();
            Subscription subscription = service.Update(subscriptionId, options);

            return subscription;
        }

        public async Task<Customer> CreateStripeCustomer(string email, string firstName, string lastName, string token)
        {
            try
            {
                var customerOptions = new CustomerCreateOptions
                {
                    Email = email,
                    Name = firstName + " " + lastName,
                    Source = token
                };
                var customerService = new CustomerService();
                var customerReponse = customerService.Create(customerOptions);

                return customerReponse;
            }
            catch (System.Exception)
            {
                return null;
            }

        }

        public async Task<bool> PaymentConfirm(PaymentConfirmCommand confirmCommand)
        {
            if (confirmCommand.PaymentIntentId != null)
            {
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
            }
            else
            {
                try
                {
                    //  var options = new CardCreateOptions
                    //  {
                    //      Source = confirmCommand.Token,
                    // };
                    // var service = new CardService();
                    //service.Create(confirmCommand.Customer, options);

                    return true;
                }
                catch (System.Exception)
                {
                    var service = new CustomerService();
                    service.Delete(confirmCommand.Customer);
                    return false;
                }

            }

            return false;
        }

        public async Task<bool> OnSubscriptionChange(OnSubscriptionChangeCommand subscriptionChange)
        {
            var stripeConfig = new StripeConfig();
            string secret = stripeConfig.SubscriptionChangeSecret;
            if (secret == null) throw new Exception("Secret not found in Stripe config");
            if (subscriptionChange.Json == null || subscriptionChange.StripeSignature == null)
                return false;

            var stripeEvent = EventUtility.ConstructEvent(subscriptionChange.Json, subscriptionChange.StripeSignature, secret);
            if (stripeEvent == null) return false;
            // I think these are all the event types that change the subscription
            if (stripeEvent.Type == Events.SubscriptionScheduleCanceled || 
                stripeEvent.Type == Events.SubscriptionScheduleAborted ||
                stripeEvent.Type == Events.SubscriptionScheduleCompleted ||
				stripeEvent.Type == Events.SubscriptionScheduleReleased) 
            {
                return await OnSubcriptionChangeHandler(stripeEvent);
            }
            else if (stripeEvent.Type == Events.SubscriptionScheduleCreated ||
				stripeEvent.Type == Events.SubscriptionScheduleUpdated)
            {
                return await OnSubcriptionChangeHandler(stripeEvent, true);
            }
            else
            {
                return false;
            }
        }

        private async Task<bool> OnSubcriptionChangeHandler(Event stripeEvent, bool isCreateorUpdate = false)
        {
            var data = stripeEvent.Data.Object as SubscriptionSchedule;
            if (data == null) return false;

            var customerId = data.Customer.Id;
            var subscriptionId = data.Subscription.Id;
            var status = data.Status;
            if (customerId == null || status == null) throw new Exception("CustomerId and status not in event data"); // Throw for testing, probably just return in prod

            var dataSet = this._userRegistrationRepository.GetAllIQueryable();
            var user = await dataSet.Where(r => r.StripeCustomerId == customerId).FirstOrDefaultAsync(); // Query registration table for customerId

            if (user == null) throw new Exception($"No user found with stripe customer id {customerId}"); // Throw for testing, probably just return in prod

            // If the subscription is being created or updated, change the Subscription and SubscriptionId to ones provided
			if (isCreateorUpdate)
            {
				// This looks stupid but kinda have to do something like this
				// Check here for obj def https://stripe.com/docs/api/subscription_schedules/object
				var phase = data.Phases.FirstOrDefault();
                if (phase != null && phase.Items.FirstOrDefault() != null && phase.Items.FirstOrDefault().PriceId != null)
                {
					user.Subscription = (await this.InterpretStripePriceString(phase.Items.FirstOrDefault().PriceId));
				}
				if (subscriptionId != null) user.SubscriptionId = subscriptionId;
			}

			// I did not find a status for trialing. I would double check this
			if (status == "active")
            {
                user.SubscriptionIsCancel = false;
            }
            // Other possible status are not_started, completed, released, canceled. They get handled here
            else
            {
				user.SubscriptionIsCancel = true;
			}
			user.UpdatedOn = DateTime.UtcNow;
			_userRegistrationRepository.Update(user); // Update table
            return true;
        }

        private async Task<SubscriptionTypeEnum> InterpretStripePriceString(string price)
        {
            var prices = await _priceService.GetSubscriptionPricesFull();

            if (prices == null) throw new Exception("Prices could not be fetched");

            foreach (var p in prices)
            {
                if (p.StripePriceId == price)
                {
                    if (p.Name == "Premium") return SubscriptionTypeEnum.Premium;
                    else if (p.Name == "Platinum") return SubscriptionTypeEnum.Platinum;
                    else if (p.Name == "Elite") return SubscriptionTypeEnum.Elite;

				}
            }
			throw new Exception("Not a valid price");
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
            var optAccount = new AccountCreateOptions
            {
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
