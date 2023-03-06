using Microsoft.AspNetCore.Http;
using Onsharp.BeyondAutoCore.Infrastructure.Core.ServiceClient;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class BaseService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BaseService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public long CurrentUserId()
        {
            var claimValue = "";

            var currentUser = _httpContextAccessor.HttpContext.User;
            
            if (currentUser != null)
                claimValue = currentUser.Claims.Where(w => w.Type == "id").FirstOrDefault()?.Value;

            long currentUserId = 0;
            long.TryParse(claimValue, out currentUserId);

            return currentUserId;
        }

    }
}
