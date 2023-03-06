using Microsoft.Extensions.Configuration;

namespace Onsharp.BeyondAutoCore.Domain.Config
{
    public class PdfConfig
    {

        private readonly IConfiguration configuration;

        public PdfConfig()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json")
                                                     .Build();
        }

        public string SaveLocation
        {
            get { return configuration.GetValue<string>("PDF:SaveLocation"); }
        }

    }
}
