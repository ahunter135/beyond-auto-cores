
namespace Onsharp.BeyondAutoCore.Domain.Config
{
    public class StripeConfig
    {
        private readonly IConfiguration configuration;

        public StripeConfig()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json")
                                                     .Build();
        }

        public string ApiKey
        {
            get { return configuration.GetValue<string>("Stripe:ApiKey"); }
        }

        public string SiteDomain
        {
            get { return configuration.GetValue<string>("Stripe:SiteDomain"); }
        }

        public string SubscriptionChangeSecret
        {
            get { return configuration.GetValue<string>("Stripe:SubscriptionChangeSecret"); }
        }

    }
}
