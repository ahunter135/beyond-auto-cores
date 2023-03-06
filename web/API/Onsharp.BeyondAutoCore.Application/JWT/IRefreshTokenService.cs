using Netjection;

namespace Onsharp.BeyondAutoCore.Application;

/// <inheritdoc cref="ITokenService"/>
//[InjectAsScoped]
public interface IRefreshTokenService
{
    Task<string> Generate(UserModel user);
    Task<ValidateRefreshTokenResponse> ValidateRefreshTokenAsync(long userId, string refreshToken);
}