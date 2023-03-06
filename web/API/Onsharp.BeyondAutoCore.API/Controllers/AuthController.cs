
namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Route("api/v1/auth/")]
    public class AuthController : ControllerBase
    {
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IAuthenticateService _authenticateService;
        public AuthController(
            IRefreshTokenService refreshTokenService, 
            IAuthenticateService authenticateService)
        {
            _refreshTokenService = refreshTokenService;
            _authenticateService = authenticateService;
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> GetRefreshTokenAsync([FromBody] RefreshTokenCommand refreshTokenCommand)
        {
            var result = await _refreshTokenService.ValidateRefreshTokenAsync(refreshTokenCommand.UserId, refreshTokenCommand.RefreshToken);
            if (result.Success)
            {
                var authResponse = await _authenticateService.Authenticate(refreshTokenCommand.UserId, CancellationToken.None);
                if (String.IsNullOrEmpty(authResponse.AccessToken))
                {
                    return BadRequest("The system encountered error upon generating token.");
                }

                return Ok(new ResponseRecordDto<object>() { Success = 1, ErrorCode = 0, Data = authResponse});
            }

            return BadRequest("Invalid refresh token.");
        }
    }
}
