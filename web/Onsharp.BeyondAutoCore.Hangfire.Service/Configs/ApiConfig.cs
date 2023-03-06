namespace Onsharp.BeyondAutoCore.Hangfire.Service.Configs
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
            get { return configuration.GetValue<string>("BacApi:Host"); }
        }

        public int Port
        {
            get { return configuration.GetValue<int>("BacApi:Port"); }
        }

        public bool EnableSSL
        {
            get { return configuration.GetValue<bool>("BacApi:EnableSSL"); }
        }

        public string Token
        {
            get { return configuration.GetValue<string>("BacApi:Token"); }
        }
    }
}
