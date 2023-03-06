
namespace Onsharp.BeyondAutoCore.Domain.Config
{
    public class SMTPConfig
    {
        private readonly IConfiguration configuration;

        public SMTPConfig()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json")
                                                     .Build();
        }

        public string Email { 
            get { return configuration.GetValue<string>("SMTP:FromEmail"); } 
        }

        public string FromPassword
        {
            get { return configuration.GetValue<string>("SMTP:FromPassword"); }
        }

        public string NameOfProject
        {
            get { return configuration.GetValue<string>("SMTP:NameOfProject"); }
        }

        public int OutgoingEmailPort
        {
            get { return configuration.GetValue<int>("SMTP:OutgoingEmailPort"); }
        }

        public string Host
        {
            get { return configuration.GetValue<string>("SMTP:Host"); }
        }

        public string SiteDomain
        {
            get { return configuration.GetValue<string>("SMTP:SiteDomain"); }
        }

        public string SiteDomainRegistration
        {
            get { return configuration.GetValue<string>("SMTP:SiteDomainRegistration"); }
        }

        public string Username
        {
            get { return configuration.GetValue<string>("SMTP:Username"); }
        }

        public string Password
        {
            get { return configuration.GetValue<string>("SMTP:Password"); }
        }

        public string LogoName
        {
            get { return configuration.GetValue<string>("SMTP:LogoName"); }
        }

        public string AdminEmail
        {
            get { return configuration.GetValue<string>("SMTP:AdminEmail"); }
        }

        public string SupportEmail
        {
            get { return configuration.GetValue<string>("SMTP:SupportEmail"); }
        }

    }
}
