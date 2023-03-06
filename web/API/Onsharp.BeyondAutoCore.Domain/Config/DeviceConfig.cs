
namespace Onsharp.BeyondAutoCore.Domain.Config
{
    public class DeviceConfig
    {
        private readonly IConfiguration configuration;

        public DeviceConfig()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json")
                                                     .Build();
        }

        public string ServerKey
        {
            get { return configuration.GetValue<string>("FCM:ServerKey"); }
        }

        public string SenderId
        {
            get { return configuration.GetValue<string>("FCM:SenderId"); }
        }
    }
}
