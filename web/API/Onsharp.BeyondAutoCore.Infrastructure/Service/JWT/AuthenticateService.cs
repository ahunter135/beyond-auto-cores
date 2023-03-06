namespace Onsharp.BeyondAutoCore.Infrastructure.Service;

public class AuthenticateService : IAuthenticateService
{
    private readonly IAccessTokenService _accessTokenService;
    private readonly IRefreshTokenService _refreshTokenService;
    private readonly IUsersRepository _userRepository;
    public AuthenticateService(IAccessTokenService accessTokenService, 
        IRefreshTokenService refreshTokenService,  
        IUsersRepository userRepository)
    {
        _accessTokenService = accessTokenService;
        _refreshTokenService = refreshTokenService;
        _userRepository = userRepository;
    }

    public async Task<AuthenticateResponse> Authenticate(long userId, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        var refreshToken = await _refreshTokenService.Generate(user);
        if (String.IsNullOrEmpty(refreshToken))
        {
            return new AuthenticateResponse
            {
                AccessToken = "",
                RefreshToken = "",
                Id = user.Id,
                Role = (int)user.Role
            };
        }

        return new AuthenticateResponse
        {
            AccessToken = _accessTokenService.GenerateToken(user),
            RefreshToken = refreshToken,
            Id = user.Id,
            Role = (int)user.Role
        };
    }

}
