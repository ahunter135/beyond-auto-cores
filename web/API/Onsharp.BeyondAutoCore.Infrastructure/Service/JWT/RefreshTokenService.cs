
using Onsharp.BeyondAutoCore.Application.JWT;
using System.Security.Cryptography;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service;

public class RefreshTokenService : IRefreshTokenService
{
    private readonly JwtSettingModel _jwtSettings;
    private readonly IRefreshTokensRepository _refreshTokenRepository;
    private readonly ITokenHashService _tokenHasher;

    public RefreshTokenService( 
        JwtSettingModel jwtSettings,
        IRefreshTokensRepository refreshTokenRepository,
        ITokenHashService tokenHasher) =>
        (_jwtSettings, _refreshTokenRepository, _tokenHasher) = (jwtSettings, refreshTokenRepository, tokenHasher);

    public async Task<string> Generate(UserModel user)
    {
        bool isDeleteSuccess = await _refreshTokenRepository.DeleteRefreshTokenByUserIdAsync(user.Id);
        if (!isDeleteSuccess)
        {
            return "";
        }

        var secureRandomBytes = new byte[32];
        using var randomNumberGenerator = RandomNumberGenerator.Create();
        await Task.Run(() => randomNumberGenerator.GetBytes(secureRandomBytes));

        var refreshToken = Convert.ToBase64String(secureRandomBytes);
        var salt = _tokenHasher.GetSecureSalt();
        var base64Salt = Convert.ToBase64String(salt);

        var tokenHashed = _tokenHasher.HashUsingPbkdf2(refreshToken, salt);
        var refreshTokenModel = new RefreshTokenModel(
            user.Id,
            tokenHashed, 
            base64Salt, 
            DateTime.Now.AddMinutes(_jwtSettings.RefreshTokenExpirationMinutes)) { 
        };
        refreshTokenModel.CreatedOn = DateTime.UtcNow;

        _refreshTokenRepository.Add(refreshTokenModel);
        _refreshTokenRepository.SaveChanges();

        return refreshToken;
    }

    public async Task<ValidateRefreshTokenResponse> ValidateRefreshTokenAsync(long userId, string refreshToken)
    {
        var refreshTokenRecord = await _refreshTokenRepository.Get(userId);

        var response = new ValidateRefreshTokenResponse();
        if (refreshTokenRecord == null)
        {
            response.Success = false;
            response.Message = "Invalid session or user is already logged out";
            return response;
        }

        var refreshTokenToValidateHash = _tokenHasher.HashUsingPbkdf2(refreshToken, Convert.FromBase64String(refreshTokenRecord.TokenSalt));

        if (refreshTokenRecord.Token != refreshTokenToValidateHash)
        {
            response.Success = false;
            response.Message = "Invalid refresh token";
            return response;
        }

        if (refreshTokenRecord.ExpiryDate < DateTime.Now)
        {
            response.Success = false;
            response.Message = "Refresh token has expired";
            return response;
        }

        response.Success = true;
        response.Message = "Refresh Token is valid.";

        return response;
    }

}
