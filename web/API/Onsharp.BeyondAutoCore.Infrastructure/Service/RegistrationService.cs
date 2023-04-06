using Stripe;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class RegistrationService : BaseService, IRegistrationService
    {
        private readonly IAuthenticateService _authenticateService;
        private readonly IUsersRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IRegistrationsRepository _userRegistrationRepository;
        private readonly IPriceService _priceService;
        private readonly ISubscriptionService _subscriptionService;
        private readonly IGradeCreditService _gradeCreditService;
        private readonly IPaymentService _paymentService;

        private readonly IMapper _mapper;

        public RegistrationService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                                    IAuthenticateService authenticateService,
                                    IRegistrationsRepository userRegistrationRepository, IUsersRepository userRepository,
                                    ISubscriptionService subscriptionService, IGradeCreditService gradeCreditService,
                                    IPaymentService paymentService,
                                    IUserService userService, IPriceService priceService)
        : base(httpContextAccessor)
        {
            _mapper = mapper;
            _authenticateService = authenticateService;
            _userRepository = userRepository;
            _userService = userService;
            _userRegistrationRepository = userRegistrationRepository;
            _priceService = priceService;
            _subscriptionService = subscriptionService;
            _gradeCreditService = gradeCreditService;
            _paymentService = paymentService;
        }

        public async Task<RegistrationDto> CreateRegistration(CreateRegCommand userCreateCommand)
        {
            var userInfo = await _userRepository.GetUserByName(userCreateCommand.UserName);
            if (userInfo != null)
                return new RegistrationDto() { Success = false, Message = "User already exists." };

            Enum.TryParse(userCreateCommand.Subscription.ToString(), out PriceEnum priceEnum);
            var priceInfo = await _priceService.GetPriceByName(priceEnum);
            if (priceInfo == null)
                return new RegistrationDto() { Success = false, Message = "Invalid subscription." };

            string invitationCode = Guid.NewGuid().ToString();

            var customerReponse = await _paymentService.CreateStripeCustomer(userCreateCommand.Email, userCreateCommand.FirstName, userCreateCommand.LastName);

            var userRegistrationModel = _mapper.Map<CreateRegCommand, RegistrationModel>(userCreateCommand);
            userRegistrationModel.RegistrationCode = invitationCode;
            userRegistrationModel.StripeCustomerId = customerReponse.Id;
            userRegistrationModel.CreatedBy = this.CurrentUserId();
            userRegistrationModel.CreatedOn = DateTime.UtcNow;

            _userRegistrationRepository.Add(userRegistrationModel);
            _userRegistrationRepository.SaveChanges();

            string subscriptionId = "";
            string paymentIntentId = "";
            string clientSecret = "";
            string paymentStatus = "";

            if (priceInfo.UnitType.ToLower() == UnitTypeEnum.monthly.ToString().ToLower())
            {
                var subscription = await _paymentService.CreateSubscription(priceInfo, customerReponse.Id);

                subscriptionId = subscription.Id;
                paymentIntentId = subscription.LatestInvoice.PaymentIntent.Id;
                clientSecret = subscription.LatestInvoice.PaymentIntent.ClientSecret;
                paymentStatus = subscription.LatestInvoice.PaymentIntent.Status;
            }
            else
            {
                var paymentIntentResponse = await _paymentService.CreatePaymentIntent(priceInfo.Amount, priceInfo.Currency, priceInfo.Description, customerReponse.Id);

                paymentIntentId = paymentIntentResponse.Id;
                clientSecret = paymentIntentResponse.ClientSecret;
                paymentStatus = paymentIntentResponse.Status;
            }

            var newPayment = new CreatePaymentCommand();

            if (!string.IsNullOrWhiteSpace(subscriptionId))
                newPayment.SubscriptionId = subscriptionId;

            newPayment.LinkId = userRegistrationModel.Id;
            newPayment.PaymentType = PaymentTypeEnum.Registration;
            newPayment.Amount = priceInfo.Amount;
            newPayment.Currency = priceInfo.Currency;

            newPayment.CustomerId = customerReponse.Id;
            newPayment.PaymentIntentId = paymentIntentId;
            newPayment.ClientSecret = clientSecret;
            newPayment.Status = paymentStatus;

            await _paymentService.Create(newPayment);

            var result = _mapper.Map<RegistrationModel, RegistrationDto>(userRegistrationModel);

            result.ClientSecret = clientSecret;

            result.Success = true;
            result.Message = "Registration successfully saved.";

            return result;
        }

        public async Task<RegistrationDto> UpdateSubscription(int newSubscription)
        {
            long id = this.CurrentUserId();
            var userInfo = await _userService.GetById(id);
            var userRegistration = await _userRegistrationRepository.GetByIdAsync(userInfo.RegistrationId);
            if (userRegistration != null && userRegistration.Subscription == SubscriptionTypeEnum.Lifetime)
            {
                return new RegistrationDto() { Success = false, Message = "Unable to change subscription since it was already set to lifetime." };
            }

            var paymentInfo = await _paymentService.GetPaymentByLinkId(userInfo.RegistrationId, PaymentTypeEnum.Registration);

            if ((int)userRegistration.Subscription != newSubscription)
            {
                var result = new RegistrationDto();
                PriceEnum newPriceEnum = (PriceEnum)newSubscription;
                var newPriceInfo = await _priceService.GetPriceByName(newPriceEnum);

                if (newPriceInfo.UnitType.ToLower() == "onetime")
                {

                    // To changed subscription from recurring to onetime payment,
                    // We should delete the current subscription then create new paymentIntent
                    // Update of registration is in ConfirmOneTimeSubscription() method. 

                    await _paymentService.CancelSubscription(paymentInfo.SubscriptionId);
                    await _paymentService.Delete(paymentInfo.Id);

                    var paymentIntentResponse = await _paymentService.CreatePaymentIntent(newPriceInfo.Amount, newPriceInfo.Currency, newPriceInfo.Description, paymentInfo.CustomerId);

                    string paymentIntentId = paymentIntentResponse.Id;
                    string clientSecret = paymentIntentResponse.ClientSecret;
                    string paymentStatus = paymentIntentResponse.Status;

                    var newPayment = new CreatePaymentCommand();

                    newPayment.LinkId = userRegistration.Id;
                    newPayment.PaymentType = PaymentTypeEnum.Registration;
                    newPayment.Amount = newPriceInfo.Amount;
                    newPayment.Currency = newPriceInfo.Currency;

                    newPayment.CustomerId = paymentInfo.CustomerId;
                    newPayment.PaymentIntentId = paymentIntentId;
                    newPayment.ClientSecret = clientSecret;
                    newPayment.Status = paymentStatus;

                    await _paymentService.Create(newPayment);

                    result = _mapper.Map<RegistrationModel, RegistrationDto>(userRegistration);
                    result.ClientSecret = clientSecret;

                }
                else
                {

                    // If payment still recurring or subscription
                    await _paymentService.UpdateSubscription(paymentInfo.SubscriptionId, newPriceInfo);

                    userRegistration.Subscription = (SubscriptionTypeEnum)newSubscription;
                    _userRegistrationRepository.Update(userRegistration);
                    _userRegistrationRepository.SaveChanges();

                    result = _mapper.Map<RegistrationModel, RegistrationDto>(userRegistration);

                }

                result.Success = true;
                result.Message = "Subscription successfully updated.";
                return result;
            }

            return new RegistrationDto() { Success = false, Message = "No changes on subscription" };
        }

        public async Task<RegistrationDto> ConfirmOneTimeSubscription(ConfirmRegOnetimeSubscriptionCommand confirmCommand)
        {
            long id = this.CurrentUserId();
            var userInfo = await _userService.GetById(id);

            var userRegistration = await _userRegistrationRepository.GetByIdAsync(userInfo.RegistrationId);
            if (userRegistration == null)
            {
                return new RegistrationDto() { Success = false, Message = "Unable to found registration." };
            }
            var confirmPaymentCommand = new PaymentConfirmCommand();
            confirmPaymentCommand.Status = confirmCommand.Status;
            confirmPaymentCommand.PaymentIntentId = confirmCommand.PaymentIntentId;

            await _paymentService.PaymentConfirm(confirmPaymentCommand);

            userRegistration.Subscription = (SubscriptionTypeEnum)confirmCommand.NewSubscription;
            _userRegistrationRepository.Update(userRegistration);
            _userRegistrationRepository.SaveChanges();

            var result = _mapper.Map<RegistrationModel, RegistrationDto>(userRegistration);

            result.Success = true;
            result.Message = "Subscription successfully updated.";
            return result;
        }


        public async Task<ResponseDto> EnableSubscription(long userId, bool enable)
        {
            var userInfo = await _userService.GetById(userId);
            var userRegistration = await _userRegistrationRepository.GetByIdAsync(userInfo.RegistrationId);
            if (userRegistration == null)
            {
                return new ResponseDto() { Success = 0, Message = "Unable to find registration." };
            }

            var paymentInfo = await _paymentService.GetPaymentByLinkId(userInfo.RegistrationId, PaymentTypeEnum.Registration);
            if (paymentInfo != null && !string.IsNullOrWhiteSpace(paymentInfo.SubscriptionId))
                await _paymentService.CancelSubscription(paymentInfo.SubscriptionId);

            userRegistration.SubscriptionIsCancel = !enable;
            _userRegistrationRepository.Update(userRegistration);
            _userRegistrationRepository.SaveChanges();

            return new ResponseDto() { Success = 1, Message = "Successfully updated subscription." };
        }


        public async Task<RegistrationDto> GetById(long id)
        {
            var userRegistration = await _userRegistrationRepository.GetByIdAsync(id);
            if (userRegistration != null)
            {
                var result = _mapper.Map<RegistrationModel, RegistrationDto>(userRegistration);
                result.Success = true;

                return result;
            }

            return null;
        }

        public async Task<RegistrationDto> GetUserRegistrationByCode(string registrationCode)
        {
            var userRegistration = await _userRegistrationRepository.GetRegistrationByCode(registrationCode);
            if (userRegistration != null)
            {
                var result = _mapper.Map<RegistrationModel, RegistrationDto>(userRegistration);
                result.Success = true;

                return result;
            }

            return null;
        }

        public async Task<bool> ConfirmRegistrationPayment(ConfirmRegPaymentCommand confirmCommand)
        {
            var userRegistration = await _userRegistrationRepository.GetRegistrationByCode(confirmCommand.RegistrationCode);
            if (userRegistration != null)
            {
                var confirmPaymentCommand = new PaymentConfirmCommand();
                confirmPaymentCommand.Status = confirmCommand.Status;
                confirmPaymentCommand.PaymentIntentId = confirmCommand.PaymentIntentId;

                await _paymentService.PaymentConfirm(confirmPaymentCommand);

                #region send email confirmation
                var smtpSetting = new SMTPConfig();
                string fromEmail = smtpSetting.Email;
                string confirmEmail = $"Welcome to the {smtpSetting.NameOfProject}";
                string logoName = smtpSetting.LogoName;
                string emailBody = ComposeRegistrationEmailBody(smtpSetting.SiteDomain, smtpSetting.SiteDomainRegistration, userRegistration.RegistrationCode, smtpSetting.NameOfProject, logoName);
                await EmailHelper.SendEmail(userRegistration.Email, fromEmail, confirmEmail, emailBody, isBodyHtml: true);
                #endregion send email confirmation

                return true;
            }

            return false;
        }

        public async Task<AuthenticateResponse> ConfirmRegistration(ConfirmRegCommand confirmRegistrationCommand)
        {
            var result = new AuthenticateResponse();
            if (confirmRegistrationCommand.Password != confirmRegistrationCommand.ConfirmPassword)
            {
                result.Success = false;
                result.Message = "Password and Confirm Password does not match.";
                return result;
            }

            var userRegistration = await _userRegistrationRepository.GetRegistrationByCode(confirmRegistrationCommand.RegistrationCode);
            if (userRegistration != null)
            {

                var checkRegisteredUser = await _userService.GetByRegistationId(userRegistration.Id);
                if (checkRegisteredUser.Success && checkRegisteredUser.Id != 0)
                {
                    result.Success = false;
                    result.Message = "Registration code already confirmed.";
                    return result;
                }

                var newUser = _mapper.Map<RegistrationModel, CreateUserCommand>(userRegistration);
                newUser.RegistrationId = userRegistration.Id;
                newUser.Password = confirmRegistrationCommand.ConfirmPassword;
                newUser.ConfirmPassword = confirmRegistrationCommand.ConfirmPassword;
                newUser.Role = RoleEnum.User;
                newUser.Subscription = userRegistration.Subscription;

                var response = await _userService.CreateUser(newUser);
                if (response.Success)
                {
                    Enum.TryParse(userRegistration.Subscription.ToString(), out PriceEnum priceEnumFromSubEnum);
                    var subscriptionTypeInfo = await _priceService.GetPriceByName(priceEnumFromSubEnum);
                    await CreateSubscription(response.Id, subscriptionTypeInfo);


                    var userLoginCommand = new LoginCommand();
                    userLoginCommand.UserName = newUser.UserName;
                    userLoginCommand.Password = confirmRegistrationCommand.ConfirmPassword;

                    // Login automatically the user so we can redirect it to its profile.
                    var userLoginInfo = await _userService.UserLogin(userLoginCommand);

                    if (userLoginInfo != null)
                    {
                        var responseAuthenticate = await _authenticateService.Authenticate(userLoginInfo.Id, CancellationToken.None);
                        responseAuthenticate.Name = (userLoginInfo.FirstName ?? "") + " " + (userLoginInfo.LastName ?? "");

                        responseAuthenticate.Success = true;
                        responseAuthenticate.Message = " User successfully login.";

                        return responseAuthenticate;
                    }

                }
                else
                {
                    result.Success = response.Success;
                    result.Message = response.Message;
                }
            }
            else
            {
                result.Success = false;
                result.Message = "Registration info does not exists.";
            }

            return result;
        }

        private async Task<bool> CreateSubscription(long userId, PriceDto subscriptionTypeInfo)
        {

            var createCommand = new CreateSubscriptionCommand();
            createCommand.UserId = userId;
            createCommand.SubscriptionTypeId = subscriptionTypeInfo.Id;
            createCommand.SubscriptionDate = DateTime.UtcNow;

            var newSubscription = await _subscriptionService.Create(createCommand);

            await CreateGradeCredits(userId, newSubscription.Id, subscriptionTypeInfo);

            return true;
        }

        private async Task<bool> CreateGradeCredits(long userId, long subscriptionId, PriceDto subscriptionTypeInfo)
        {
            if (subscriptionTypeInfo == null)
                return false;

            var createCommand = new CreateGradeCreditCommand();
            createCommand.Credit = subscriptionTypeInfo.GradeCredit;
            createCommand.UserId = userId;

            await _gradeCreditService.Create(createCommand);

            return true;
        }

        private string ComposeRegistrationEmailBody(string siteDomain, string siteDomainRegistration, string confirmationCode, string nameOfProject, string logoName)
        {
            string siteLogo = siteDomain + $"/media/brand/{logoName}";
            string acceptBtn = $"<a target=\"_blank\" href=\"{siteDomainRegistration}/confirm-subscription?registrationCode={confirmationCode}\" style=\"color: #ffffff; text-decoration: none; " +
                               $"font-family: Segoe UI Semibold, SegoeUISemibold, Segoe UI, SegoeUI, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-weight: 600; " +
                               $"padding: 12px 16px 12px 16px; text-align: left; line-height: 1; text-underline: none; mso-text-underline: none; font-size: 16px; display: inline-block; " +
                               $"border: 0; border-radius: 2px; mso-border-alt: 8px solid #8661C5; mso-padding-alt: 0; background-color: #212540\" rel=\"noopener\">Accept Invitation</a>";

            string htmlFullBody = System.IO.File.ReadAllText(@"HtmlTemplates/SignUpWelcome.html");
            htmlFullBody = String.Format(@htmlFullBody, siteLogo, nameOfProject, acceptBtn);

            return htmlFullBody;

        }

    }
}
