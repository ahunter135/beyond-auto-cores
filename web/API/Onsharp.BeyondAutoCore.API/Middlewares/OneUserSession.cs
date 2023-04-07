using Onsharp.BeyondAutoCore.Domain.Interface;
using Onsharp.BeyondAutoCore.Infrastructure.Repository;
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

		public OneUserSessionHandler(
			IRefreshTokensRepository refreshTokenRepo,
			IHttpContextAccessor contextAccessor
			) 
		{ 
			_refreshTokensRepository= refreshTokenRepo;
			_contextAccessor= contextAccessor;
		}

		protected async override Task<Task> HandleRequirementAsync(AuthorizationHandlerContext context, OneUserSessionRequirement requirement)
		{
			var jwtCreatedOnString = _contextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "nbf").Value;
			if (jwtCreatedOnString != null )
			{
				var userIdString = _contextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "id").Value;
				if (userIdString == null)
				{
					context.Fail();
					return Task.CompletedTask;
				}
				long jwtCreatedOn = long.Parse( jwtCreatedOnString );
				long userId = long.Parse( userIdString );

				var refreshToken = await _refreshTokensRepository.Get( userId );
				if ( refreshToken == null )
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

			context.Succeed(requirement);
			return Task.CompletedTask;
		}
	}
}
