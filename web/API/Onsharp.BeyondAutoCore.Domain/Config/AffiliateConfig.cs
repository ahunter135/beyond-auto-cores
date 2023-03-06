namespace Onsharp.BeyondAutoCore.Domain.Config
{
    public class AffiliateConfig
    {
        private readonly IConfiguration configuration;

        public AffiliateConfig()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json")
                                                     .Build();
        }

        public string Site
        {
            get { return configuration.GetValue<string>("Affiliate:Site"); }
        }

        public string StripeAccountLinkRefreshUrl
        {
            get { return configuration.GetValue<string>("Affiliate:StripeAccountLinkRefreshUrl"); }
        }

        public string StripeAccountLinkReturnUrl
        {
            get { return configuration.GetValue<string>("Affiliate:StripeAccountLinkReturnUrl"); }
        }

    }
}
