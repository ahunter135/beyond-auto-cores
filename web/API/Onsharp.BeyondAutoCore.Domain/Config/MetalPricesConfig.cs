
namespace Onsharp.BeyondAutoCore.Domain.Config
{
    public class MetalPricesConfig
    {
        private readonly IConfiguration configuration;

        public MetalPricesConfig()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json")
                                                     .Build();
        }

        public string Host
        {
            get { return configuration.GetValue<string>("MetalPrices:Host"); }
        }

        public int Port
        {
            get { return configuration.GetValue<int>("MetalPrices:Port"); }
        }

        public bool EnableSSL
        {
            get { return configuration.GetValue<bool>("MetalPrices:EnableSSL"); }
        }

        public string Token
        {
            get { return configuration.GetValue<string>("MetalPrices:Token"); }
        }

    }
}
