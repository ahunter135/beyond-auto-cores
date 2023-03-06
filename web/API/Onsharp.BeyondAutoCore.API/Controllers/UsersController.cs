using System.Drawing.Printing;

namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/users/")]
    public class UsersController : BaseController
    {
        private readonly IAuthenticateService _authenticateService;
        private readonly IUserService _userService;
        private readonly IRegistrationService _registrationService;

        public UsersController(IUserService userService, IRegistrationService registrationService, IAuthenticateService authenticateService)
        {
            _userService = userService;
            _authenticateService = authenticateService;
            _registrationService = registrationService;
        }

        [HttpPut]
        public async Task<IActionResult> Update(IFormFile? photo, long id, string firstName, string lastName, string email, int subscription, int role, decimal? margin, bool isUpdatePhoto = false, bool tier1AdminEnabled = false, int tier1PercentLevel = 0, bool tier1UserEnabled = false)
        {
            UpdateUserCommand updateUserCommand = new UpdateUserCommand();
            updateUserCommand.Id = id;
            updateUserCommand.FirstName = firstName;
            updateUserCommand.LastName = lastName;
            updateUserCommand.Email = email;
            updateUserCommand.Role = (RoleEnum)role;
            updateUserCommand.Tier1AdminEnabled = tier1AdminEnabled;
            updateUserCommand.Tier1PercentLevel = tier1PercentLevel;
            updateUserCommand.Tier1UserEnabled = tier1UserEnabled;
            updateUserCommand.Margin = margin;
            updateUserCommand.IsUpdatePhoto = isUpdatePhoto;

            Enum.TryParse(subscription.ToString(), out SubscriptionTypeEnum subscriptionEnum);
            updateUserCommand.Subscription = subscriptionEnum;

            if (updateUserCommand == null || updateUserCommand.Id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on update." });

            var response = await _userService.UpdateUser(updateUserCommand, photo);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully updated user." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpPost]
        [Route("uploadphoto")]
        public async Task<IActionResult> Upload(IFormFile? photo, long userId)
        {
            if (userId <= 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on update." });

            var response = await _userService.UploadPhoto(photo, userId);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully updated user." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand userLoginCommand)
        {

            var userInfo = await _userService.UserLogin(userLoginCommand);
            if (userInfo != null)
            {
                if (userLoginCommand.ValidateSubscription)
                {
                    var registrationInfo = await _registrationService.GetById(userInfo.RegistrationId);
                    if (registrationInfo == null)
                    {
                        return Ok(new ResponseRecordDto<object>
                        {
                            Success = 0, ErrorCode = 100,
                            Message = "Invalid registration or subscription.",
                            Data = null
                        });
                    }
                    if (registrationInfo != null && registrationInfo.SubscriptionIsCancel)
                    {
                        return Ok(new ResponseRecordDto<object>
                        {
                            Success = 0,
                            ErrorCode = 100,
                            Message = "Unable to login, cancelled subscription.",
                            Data = null
                        });
                    }

                }
                 

                var response = await _authenticateService.Authenticate(userInfo.Id, CancellationToken.None);
                response.Name = (userInfo.FirstName ?? "") + " " + (userInfo.LastName ?? "");

                return Ok(new ResponseRecordDto<object> {
                           Success = 1, ErrorCode = 0, Message = "Login successful.",
                           Data = response
                       });
            }
            else
            {
                return Ok(new ResponseRecordDto<object> {
                           Success = 0, ErrorCode = 1000, Message = "Login failed.",
                           Data = null
                       });
            }

        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout([FromBody] long userId)
        {
            var response = await _userService.ExpireUserTokenByUserId(userId);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1: 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Successfully expired token." : "Failed expired token"
            });

        }


        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var response = await _userService.GetById(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully get the data." : "Failed generating the data. Message - " + response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _userService.GetAll();

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully generating the data." : "Failed generating the data.",
                Data = response
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on delete." });

            var response = await _userService.Delete(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success == 1 ? 1 : 0,
                ErrorCode = response.Success == 0 ? 0 : 1000,
                Message = response.Success == 1 ? "Successfully deleted." : response.Message,
                Data = response.Success == 1 ? response: null
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("validate-email")]
        public async Task<IActionResult> ValidateEmail([FromBody] string email)
        {
            var response = await _userService.ValidateEmail(email);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response.HasValue ? 1 : 0,
                ErrorCode = response.HasValue ? 0 : 1000,
                Message = response.HasValue ? "A code sent to your email. Please enter the code to reset your password." : "Failed validating the email.",
                Data = response.HasValue ? response.Value : DBNull.Value
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("validate-reset-code")]
        public async Task<IActionResult> ValidateResetPasswordCode([FromBody] int code)
        {
            var response = await _userService.ValidateResetPasswordCode(code);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Entered code is valid. Please enter new password." : "Failed validating the code.",
                Data = response
            });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand resetPasswordCommand)
        {
            var response = await _userService.ResetPassword(resetPasswordCommand.Email, resetPasswordCommand.Password);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Password reset successfully." : "Failed resetting the password.",
                Data = response
            });
        }

        [HttpPut]
        [Route("update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordCommand updatePasswordCommand)
        {

            if (updatePasswordCommand.NewPassword != updatePasswordCommand.ConfirmPassword)
            {
                return Ok(new ResponseRecordDto<object>
                {
                    Success = 0,
                    ErrorCode = 1000,
                    Message = "New and confirmed password is not equal.",
                    Data = null
                });
            }

            var response = await _userService.UpdatePassword(updatePasswordCommand);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success == 1 ? 0 : 1000,
                Message = response.Success == 1 ? "Password updated successfully." : "Failed updating the password.",
                Data = response
            });
        }

        [HttpPost]
        [Route("grade-credit")]
        public async Task<IActionResult> CreateGradeCredit([FromBody] decimal numberOfGradeCredit)
        {
            var response = await _userService.PurchaseGradeCredit(numberOfGradeCredit);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = !response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully join affiliate." : "Failed join affiliate.",
                Data = response
            });
        }

        [HttpPost]
        [Route("confirm-grade-credit")]
        public async Task<IActionResult> ConfirmGradeCredit(ConfirmGradeCreditCommand confirmCommand)
        {
            var response = await _userService.PurchaseGradeCreditConfirm(confirmCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = !response ? 0 : 1000,
                Message = response ? "Successfully purchase grade credits." : "Failed purchase grade credits.",
                Data = response
            });
        }
        [HttpPut]
        [Route("enable-tier")]
        public async Task<IActionResult> EnableTier(long id, bool tier1AdminEnabled = false, bool tier1UserEnabled = false)
        {
            UpdateUserCommand updateUserCommand = new UpdateUserCommand();
            updateUserCommand.Id = id;
            updateUserCommand.Tier1AdminEnabled = tier1AdminEnabled;
            updateUserCommand.Tier1UserEnabled = tier1UserEnabled;
            var response = await _userService.UpdateTierEnabled(updateUserCommand);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully updated the tier." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpPut]
        [Route("set-margin")]
        public async Task<IActionResult> SetMargin(long id, decimal? margin )
        {
            UpdateUserCommand updateUserCommand = new UpdateUserCommand();
            updateUserCommand.Id = id;
            updateUserCommand.Margin = margin;
            var response = await _userService.UpdateSetMargin(updateUserCommand);
            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully updated the margin." : response.Message,
                Data = response.Success ? response : null
            });
        }

    }
}
