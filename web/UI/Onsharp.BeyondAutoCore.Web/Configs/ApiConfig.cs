namespace Onsharp.BeyondAutoCore.Web.Configs
{
    public class ApiConfig
    {
        private readonly IConfiguration configuration;

        public ApiConfig()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json")
                                                     .Build();
        }

        public string Host
        {
            get { return configuration.GetValue<string>("Config:Host"); }
        }

        public int Port
        {
            get { return configuration.GetValue<int>("Config:Port"); }
        }

        public bool EnableSSL
        {
            get { return configuration.GetValue<bool>("Config:EnableSSL"); }
        }

    }
}
