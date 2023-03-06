using Stripe;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class UserService : BaseService, IUserService
    {

        private readonly IMapper _mapper;
        private readonly IAffiliateService _affiliateService;
        private readonly IGradeCreditService _gradeCreditService;
        private readonly IPriceService _priceService;
        private readonly IUsersRepository _userRepository;
        private readonly IRefreshTokensRepository _refreshTokenRepository;
        private readonly IRegistrationsRepository _registrationsRepository;
        private readonly IMasterMarginService _masterMarginService;
        private readonly IPaymentService _paymentService;

        private readonly IOptions<AWSSettingDto> _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        private readonly AwsS3Helper _awsS3Helper;

        public UserService(IHttpContextAccessor httpContextAccessor, IMapper mapper, IRefreshTokensRepository refreshTokenRepository,
                           IAffiliateService affiliateService, IPriceService priceService,
                           IUsersRepository userRepository, IMasterMarginService masterMarginService, IGradeCreditService gradeCreditService,
                           IPaymentService paymentService, IRegistrationsRepository registrationsRepository,
                           IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client
                           )
            : base(httpContextAccessor)
        {
            _mapper = mapper;
            _affiliateService = affiliateService;
            _gradeCreditService = gradeCreditService;
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
            _registrationsRepository = registrationsRepository;
            _masterMarginService = masterMarginService;
            _priceService = priceService;
            _paymentService = paymentService;

            _awsSettings = awsSettings;
            _aws3Client = aws3Client;
            _awsS3Helper = new AwsS3Helper(_awsSettings, _aws3Client);

        }

        public async Task<UserAccessDto> UserLogin(LoginCommand userLoginCommand)
        {
            var userInfo = await _userRepository.GetUserByName(userLoginCommand.UserName);
            if (userInfo == null)
                return null;
            if (userInfo.IsDeleted == true)
                return null;

            if (PasswordHasher.Verify(userLoginCommand.Password, userInfo.Password))
            {
                var result = _mapper.Map<UserModel, UserAccessDto>(userInfo);
                return result;
            }

            return null;
        }

        public async Task<UserDto> CreateUser(CreateUserCommand userCreateCommand)
        {

            var result = new UserDto();

            #region validation
            if (userCreateCommand.Password != userCreateCommand.ConfirmPassword)
            {
                result.Success = false;
                result.Message = "Password and Confirm Password does not match.";
                return result;
            }

            var userInfo = await _userRepository.GetUserByName(userCreateCommand.UserName);
            if (userInfo != null)
            {
                result.Success = false;
                result.Message = "UserName already exists.";
                return result;
            }

            var userInfobyEmail = await _userRepository.GetUserByEmail(userCreateCommand.Email);
            if (userInfobyEmail != null)
            {
                result.Success = false;
                result.Message = "User email already exists.";
                return result;
            }

            #endregion validation

            string invitationCode = Guid.NewGuid().ToString();

            var newUserModel = _mapper.Map<CreateUserCommand, UserModel>(userCreateCommand);

            newUserModel.Password = PasswordHasher.Hash(userCreateCommand.Password);
            newUserModel.CreatedBy = this.CurrentUserId();
            newUserModel.CreatedOn = DateTime.UtcNow;

            _userRepository.Add(newUserModel);
            _userRepository.SaveChanges();

            result = _mapper.Map<UserModel, UserDto>(newUserModel);

            result.Success = true;
            result.Message = "User successfully saved.";

            return result;
        }
        public async Task<UserDto> UpdateSetMargin(UpdateUserCommand updateCommand)
        {
            var currenData = await _userRepository.GetByIdAsync(updateCommand.Id);
            if (currenData == null)
                return new UserDto() { Success = false, Message = "Message invalid user Id." };
            currenData.Margin = updateCommand.Margin;
            _userRepository.Update(currenData);
            _userRepository.SaveChanges();

            var mapData = _mapper.Map<UserModel, UserDto>(currenData);
            if (!string.IsNullOrWhiteSpace(mapData.PhotoFileKey))
                mapData.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(mapData.PhotoFileKey);

            return mapData;
        }
        public async Task<UserDto> UpdateTierEnabled(UpdateUserCommand updateCommand)
        {
            var currenData = await _userRepository.GetByIdAsync(updateCommand.Id);
            if (currenData == null)
                return new UserDto() { Success = false, Message = "Message invalid user Id." };

            currenData.Tier1AdminEnabled = updateCommand.Tier1AdminEnabled;
            currenData.Tier1UserEnabled = updateCommand.Tier1UserEnabled;

            _userRepository.Update(currenData);
            _userRepository.SaveChanges();

            var mapData = _mapper.Map<UserModel, UserDto>(currenData);
            if (!string.IsNullOrWhiteSpace(mapData.PhotoFileKey))
                mapData.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(mapData.PhotoFileKey);

            return mapData;
        }
        public async Task<UserDto> UpdateUser(UpdateUserCommand updateCommand, IFormFile? logo)
        {
            var currenData = await _userRepository.GetByIdAsync(updateCommand.Id);
            if (currenData == null)
                return new UserDto() { Success = false, Message = "Message invalid user Id." };
            if (currenData.Email.ToLower().RemoveEmailSpecialChars() != updateCommand.Email.ToLower())
            {
                var emailUser = _userRepository.GetUserByEmail(updateCommand.Email);
                if (emailUser != null && emailUser.Id != updateCommand.Id)
                {
                    return new UserDto() { Success = false, Message = "Email already used by other user." };
                }
            }

            string fileKey = "";
            string logoFileName = "";

            bool uploadResult = false;
            if (logo != null && logo.FileName != "none")
            {
                try
                {
                    logoFileName = logo.FileName;
                    fileKey = "user_photo_" + DateTime.Now.ToString("yyyyMMddhhmmssfff") + "_" + logo.FileName;
                    uploadResult = await _awsS3Helper.UploadFileAsync(logo, _awsSettings.Value.Bucket, fileKey);
                    uploadResult = true;
                }
                catch (Exception ex)
                {
                    uploadResult = false;
                }
            }

            if (!uploadResult)
            {
                fileKey = "";
                logoFileName = "";
            }

            if (!string.IsNullOrWhiteSpace(logoFileName) || updateCommand.IsUpdatePhoto)
            {
                currenData.PhotoFileKey = fileKey;
                currenData.Photo = logoFileName;
            }
            if (currenData.Email.ToLower().RemoveEmailSpecialChars() != updateCommand.Email.ToLower())
            {
                currenData.Email = updateCommand.Email;
                currenData.UserName = updateCommand.Email;
            }

            currenData.FirstName = updateCommand.FirstName;
            currenData.LastName = updateCommand.LastName;
            currenData.Role = updateCommand.Role;
            currenData.Margin = updateCommand.Margin;
            currenData.Tier1AdminEnabled = updateCommand.Tier1AdminEnabled;

            if (currenData.Tier1AdminEnabled)
            {
                currenData.Tier1PercentLevel = updateCommand.Tier1PercentLevel;
                currenData.Tier1UserEnabled = updateCommand.Tier1UserEnabled;
            }

            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _userRepository.Update(currenData);
            _userRepository.SaveChanges();

            var mapData = _mapper.Map<UserModel, UserDto>(currenData);
            if (!string.IsNullOrWhiteSpace(mapData.PhotoFileKey))
                mapData.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(mapData.PhotoFileKey);

            return mapData;
        }

        public async Task<UserDto> UploadPhoto(IFormFile? logo, long userId)
        {
            var currenData = await _userRepository.GetByIdAsync(userId);

            string fileKey = "";
            string logoFileName = "";

            logoFileName = logo.FileName;
            fileKey = "user_photo_" + DateTime.Now.ToString("yyyyMMddhhmmssfff") + "_" + logo.FileName;
            bool uploadResult = await _awsS3Helper.UploadFileAsync(logo, _awsSettings.Value.Bucket, fileKey);
            uploadResult = true;

            if (!uploadResult)
            {
                fileKey = "";
                logoFileName = "";
            }

            if (!string.IsNullOrWhiteSpace(logoFileName))
            {
                currenData.PhotoFileKey = fileKey;
                currenData.Photo = logoFileName;

                currenData.UpdatedBy = this.CurrentUserId();
                currenData.UpdatedOn = DateTime.UtcNow;

                _userRepository.Update(currenData);
                _userRepository.SaveChanges();

            }

            var mapData = _mapper.Map<UserModel, UserDto>(currenData);
            if (!string.IsNullOrWhiteSpace(mapData.PhotoFileKey))
                mapData.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(mapData.PhotoFileKey);

            return mapData;
        }

        public async Task<ResponseDto> Delete(long id)
        {
            var singleData = await _userRepository.GetByIdAsync(id);
            if (singleData == null)
                return new ResponseDto() { Success = 0, Message = "Invalid user." };

            if (singleData.Role == RoleEnum.Admin)
                return new ResponseDto() { Success = 0, Message = "Camnot delete Admin user." };

            singleData.IsDeleted = true;
            _userRepository.Update(singleData);
            _userRepository.SaveChanges();

            return new ResponseDto() { Success = 1, Message = "User successfully deleted." };
        }

        public async Task<bool> ExpireUserTokenByUserId(long userId)
        {
            await _refreshTokenRepository.DeleteRefreshTokenByUserIdAsync(userId);

            return true;
        }

        public async Task<UserDto> GetById(long id)
        {
            var userInfo = await _userRepository.GetByIdAsync(id);
            if (userInfo == null || userInfo.IsDeleted)
                return new UserDto() { Success = false, Message = "User does not exists." };

            var mapData = _mapper.Map<UserModel, UserDto>(userInfo);
            if (!string.IsNullOrWhiteSpace(mapData.PhotoFileKey))
                mapData.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(mapData.PhotoFileKey);

            var registrationInfo = await _registrationsRepository.GetByIdAsync(userInfo.RegistrationId);
            if (registrationInfo != null)
            {
                mapData.Subscription = registrationInfo.Subscription;
                mapData.SubscriptionIsCancel = registrationInfo.SubscriptionIsCancel;
            }

            mapData.GradeCredits = await _gradeCreditService.GetTotalByUserId(id);

            var responseAffiliate = await _affiliateService.GetLink(id);
            if (responseAffiliate != null && responseAffiliate.Success == 1)
                mapData.AffiliateLink = responseAffiliate.Link;

            return mapData;
        }

        public async Task<UserDto> GetByRegistationId(long registrationId)
        {
            var userInfo = await _userRepository.GetByRegistationId(registrationId);
            if (userInfo == null)
                return new UserDto() { Success = false, Message = "User does not exists." };

            var mapData = _mapper.Map<UserModel, UserDto>(userInfo);
            if (!string.IsNullOrWhiteSpace(mapData.PhotoFileKey))
                mapData.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(mapData.PhotoFileKey);

            return mapData;
        }

        public async Task<List<UserListDto>> GetAll()
        {
            return await _userRepository.GetUserList();
        }

        public async Task<bool?> ValidateEmail(string email)
        {
            var userDetail = await _userRepository.GetUserByEmail(email);
            if (userDetail != null)
            {
                userDetail.ResetPasswordCode = new Random().Next(1000, 9999);
                _userRepository.Update(userDetail);
                _userRepository.SaveChanges();

                SendResetPasswordCode(userDetail);

                return true;
            }
            return null;
        }

        public void SendResetPasswordCode(UserModel userModel)
        {
            var smtpSetting = new SMTPConfig();
            string fromEmail = smtpSetting.Email;
            string confirmEmail = $"[{smtpSetting.NameOfProject}] Please reset your password";
            string logoName = smtpSetting.LogoName;

            string emailBody = ComposeResetCodeEmailBody(smtpSetting.SiteDomain, $"{userModel.ResetPasswordCode}", smtpSetting.NameOfProject, logoName, userModel.FirstName);
            EmailHelper.SendEmail(userModel.Email, fromEmail, confirmEmail, emailBody, isBodyHtml: true);
        }

        public async Task<string?> ValidateResetPasswordCode(int code)
        {
            var userDetail = await _userRepository.GetUserByResetCode(code);
            if (userDetail != null)
            {
                userDetail.ResetPasswordCode = null;
                _userRepository.Update(userDetail);
                _userRepository.SaveChanges();
                return userDetail.Email;
            }
            return null;
        }
        public async Task<bool?> ResetPassword(string email, string password)
        {
            var userDetail = await _userRepository.GetUserByEmail(email);
            if (userDetail != null)
            {
                userDetail.Password = PasswordHasher.Hash(password);
                _userRepository.Update(userDetail);
                _userRepository.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<ResponseDto> UpdatePassword(UpdatePasswordCommand updatePasswordCommand)
        {
            var result = new ResponseDto();

            var userDetail = await _userRepository.GetByIdAsync(updatePasswordCommand.Id);
            if (userDetail == null)
            {
                result.Success = 0;
                result.Message = "Cannot find user.";
                return result;
            }

            if (!PasswordHasher.Verify(updatePasswordCommand.OldPassword, userDetail.Password))
            {
                result.Success = 0;
                result.Message = "Invalid old password.";
                return result;
            }

            userDetail.Password = PasswordHasher.Hash(updatePasswordCommand.NewPassword);
            _userRepository.Update(userDetail);
            _userRepository.SaveChanges();

            result.Message = "Successfully updated password.";
            return result;
        }

        public async Task<UserMarginDto> GetUserMargin(long id)
        {
            var userInfo = await _userRepository.GetByIdAsync(id);
            if (userInfo == null)
                return null;

            var masterMargin = await _masterMarginService.Get();

            var result = new UserMarginDto();
            result.Margin = userInfo.Margin;
            result.MasterMargin = masterMargin.Margin;

            return result;
        }

        private string ComposeResetCodeEmailBody(string siteDomain, string code, string nameOfProject, string logoName, string fName)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append($"Hi {fName}<br/><br/>");
            sb.Append($"Here's the verification code to reset your password.<br/> <br/>");
            sb.Append($"To reset your password, enter this verification code when prompted: <span style='font-weight:bold'>{code}</span><br/> <br/>");
            return sb.ToString();

        }

        public async Task<UserPurchaseGradeCreditDto> PurchaseGradeCredit(decimal numberOfGradeCredit)
        {
            long id = this.CurrentUserId();

            var userInfo = await _userRepository.GetByIdAsync(id);

            if (numberOfGradeCredit <= 0)
                return new UserPurchaseGradeCreditDto() { Success = false, Message = "Invalid number of grade credit to purchase." };

            var priceInfo = await _priceService.GetPriceByName(PriceEnum.GradeCredit);
            if (priceInfo == null)
                return new UserPurchaseGradeCreditDto() { Success = false, Message = "Invalid payment type." };

            decimal amount = priceInfo.Amount * numberOfGradeCredit;
            var registrationInfo = await _registrationsRepository.GetByIdAsync(userInfo.RegistrationId);
            var paymentIntentResponse = await _paymentService.CreatePaymentIntent(amount, priceInfo.Currency, priceInfo.Description ?? "", registrationInfo.StripeCustomerId);

            string paymentIntentId = paymentIntentResponse.Id;
            string clientSecret = paymentIntentResponse.ClientSecret;
            string paymentStatus = paymentIntentResponse.Status;

            var newPayment = new CreatePaymentCommand();
            newPayment.LinkId = id;
            newPayment.PaymentType = PaymentTypeEnum.GradeCredit;
            newPayment.Amount = amount;
            newPayment.Currency = priceInfo.Currency;

            newPayment.CustomerId = registrationInfo.StripeCustomerId;
            newPayment.PaymentIntentId = paymentIntentId;
            newPayment.ClientSecret = clientSecret;
            newPayment.Status = paymentStatus;

            await _paymentService.Create(newPayment);

            return new UserPurchaseGradeCreditDto()
            {
                Success = true,
                PaymentIntentId = paymentIntentId,
                ClientSecret = clientSecret
            };
        }

        public async Task<bool> PurchaseGradeCreditConfirm(ConfirmGradeCreditCommand confirmCommand)
        {
            long id = this.CurrentUserId();
            var userInfo = await _userRepository.GetByIdAsync(id);

            var confirmPaymentCommand = new PaymentConfirmCommand();
            confirmPaymentCommand.Status = confirmCommand.Status;
            confirmPaymentCommand.PaymentIntentId = confirmCommand.PaymentIntentId;

            var paymentResponse = await _paymentService.PaymentConfirm(confirmPaymentCommand);

            if (paymentResponse == true)
            {
                var createCommand = new CreateGradeCreditCommand();
                createCommand.Credit = confirmCommand.NumberOfGradeCredit;
                createCommand.UserId = id;

                await _gradeCreditService.Create(createCommand);

                #region send email confirmation
                var smtpSetting = new SMTPConfig();
                string fromEmail = smtpSetting.Email;
                string confirmEmail = $"Thank You For Purchasing Grade Credits";
                string logoName = smtpSetting.LogoName;
                string emailBody = ComposePurchaseConfirmationEmailBody(smtpSetting.SiteDomain, logoName, confirmCommand.NumberOfGradeCredit);
                await EmailHelper.SendEmail(userInfo.Email, fromEmail, confirmEmail, emailBody, isBodyHtml: true);
                #endregion send email confirmation
            }

            return true;
        }

        private string ComposePurchaseConfirmationEmailBody(string siteDomain, string logoName, decimal numberOfGradeCredit)
        {
            string siteLogo = siteDomain + $"/media/brand/{logoName}";

            string htmlFullBody = System.IO.File.ReadAllText(@"HtmlTemplates\GradeCreditConfirmation.html");
            htmlFullBody = String.Format(@htmlFullBody, siteLogo, numberOfGradeCredit.ToString());

            return htmlFullBody;

        }

    }

}
