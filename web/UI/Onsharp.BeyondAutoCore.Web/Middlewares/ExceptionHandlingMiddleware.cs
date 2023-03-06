namespace Onsharp.BeyondAutoCore.Web.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(
            IHttpContextAccessor httpContextAccessor, 
            RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var response = context.Response;

            var errorResponse = new ResponseDto
            {
                Success = 0
            };
            switch (exception)
            {
                case ApplicationException ex:
                    if (ex.Message.Contains("Unauthorized"))
                    {
                        // If refresh token successful, signOut and signIn to apply the claim changes, else, Logout
                        var newIdentity = await UserHelper.RefreshApiToken();
                        await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                        context.Session.Clear();

                        if (newIdentity != null)
                        {
                            var authProperties = new AuthenticationProperties
                            {
                                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(15),
                            };

                            await context.SignInAsync(
                                CookieAuthenticationDefaults.AuthenticationScheme,
                                new ClaimsPrincipal(newIdentity),
                                authProperties);
                            response.Redirect(context.Request.Path); // reload the page
                        }
                        else
                        {
                            _logger.LogInformation("ExceptionHandlingMiddleware -> HandleExceptionAsync: newIdentity is null");
                            response.Redirect("account");
                        }
                        break;
                    }

                    throw exception;

                default:
                    throw exception;
            }
            _logger.LogError(exception.Message);
            var result = System.Text.Json.JsonSerializer.Serialize(errorResponse);
            await context.Response.WriteAsync(result);
        }
    }
}
