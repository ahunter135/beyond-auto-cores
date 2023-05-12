using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Onsharp.BeyondAutoCore.Domain.Interface;
using Onsharp.BeyondAutoCore.Infrastructure.Repository;
using System.Net;
using System.Security.Claims;

namespace Onsharp.BeyondAutoCore.API.Middlewares
{
	public class OneUserSessionRequirement : IAuthorizationRequirement
	{
		public OneUserSessionRequirement() { }
	}

	public class OneUserSessionHandler : AuthorizationHandler<OneUserSessionRequirement>
	{
		private readonly IRefreshTokensRepository _refreshTokensRepository;
		private readonly IHttpContextAccessor _contextAccessor;
		private readonly IRegistrationsRepository _registrationRepository;

		public OneUserSessionHandler(
			IRefreshTokensRepository refreshTokenRepo,
			IHttpContextAccessor contextAccessor,
			IRegistrationsRepository registrationRepository
			) 
		{ 
			_refreshTokensRepository= refreshTokenRepo;
			_contextAccessor= contextAccessor;
			_registrationRepository = registrationRepository;
		}


		protected async override Task<Task> HandleRequirementAsync(AuthorizationHandlerContext context, OneUserSessionRequirement requirement)
		{
            try
			{
				var jwtCreatedOnString = _contextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "nbf").Value;
				if (jwtCreatedOnString != null)
				{
					var userIdString = _contextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "id").Value;

					if (userIdString == null)
					{
						context.Fail();
						return Task.CompletedTask;
					}
					long jwtCreatedOn = long.Parse(jwtCreatedOnString);
					long userId = long.Parse(userIdString);

					// OK this looks lazy but another db call here is expensive so it is much faster to just allow first 5 users (all admins) manually
					if (userId <= 5)
					{
						context.Succeed(requirement);
						_contextAccessor.HttpContext.Response.StatusCode = 200;
						return Task.CompletedTask;
					}

					var registration = await _registrationRepository.GetSubscriptionStatusByUserId(userId);

					if (registration.SubscriptionIsCancel)
					{
						context.Fail();
						return Task.CompletedTask;
					}

					var refreshToken = await _refreshTokensRepository.Get(userId);
					if (refreshToken == null)
					{
						context.Fail();
						return Task.CompletedTask;
					}
					var epoch = new DateTime(1970, 1, 1);

					// Represents differential from time the requester user was authenticated - the latest login time
					// If another device logged in, a new refresh token is created. So if the refresh token creation time > the
					// JWT creation time, someone logged in so requesting user's JWT needs to be "invalidated"
					var timeDifferential = (long)jwtCreatedOn - (refreshToken.CreatedOn - epoch).TotalSeconds;

					// There can be a small margin between time so set to 2 seconds to prevent false positives
					if (timeDifferential < -2)
					{
						context.Fail();
						return Task.CompletedTask;
					}
				}
			} catch (Exception ex)
			{
				context.Fail();
				return Task.CompletedTask;
			}

			context.Succeed(requirement);
			_contextAccessor.HttpContext.Response.StatusCode = 200;
			return Task.CompletedTask;
		}

	}

	public class OneUserSessionAuthorizationMiddlewareResultHandler : IAuthorizationMiddlewareResultHandler
	{
		private readonly AuthorizationMiddlewareResultHandler
			 DefaultHandler = new AuthorizationMiddlewareResultHandler();

		public async Task HandleAsync(
			RequestDelegate requestDelegate,
			HttpContext httpContext,
			AuthorizationPolicy authorizationPolicy,
			PolicyAuthorizationResult policyAuthorizationResult)
		{
			var errorResponse = new ResponseDto
			{
				Success = 0
			};

			if (!policyAuthorizationResult.Succeeded)
			{
				httpContext.Response.StatusCode = 403;
				errorResponse.Message = "Unauthorized";
				errorResponse.ErrorCode = 403;
				var result = JsonSerializer.Serialize(errorResponse);
				await httpContext.Response.WriteAsync(result);
				return;
			}

			// Fallback to the default implementation.
			await DefaultHandler.HandleAsync(requestDelegate, httpContext, authorizationPolicy,
								   policyAuthorizationResult);
			return;
		}
	}
}
