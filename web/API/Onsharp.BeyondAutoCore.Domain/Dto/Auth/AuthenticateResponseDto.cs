
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.Annotations;

namespace Onsharp.BeyondAutoCore.Domain.Dto;

public class AuthenticateResponse
{
    public long Id { get; set; }
    public int Role { get; set; }
    public string Name { get; set; }
    [SwaggerSchema(Required = new[] { "The access token" })]
    public string AccessToken { get; set; }
    [SwaggerSchema(Required = new[] { "The refresh token" })]
    public string RefreshToken { get; set; }

    public bool Success { get; set; }
    public string Message { get; set; }

}