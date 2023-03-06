using Hangfire.Dashboard;

namespace Onsharp.BeyondAutoCore.API.Middlewares
{
    public class DashboardNoAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext dashboardContext)
        {
            return true;
        }
    }
}
