using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class SMTPConfigurationDto
    {
        public string FromEmail { get; set; }
        public string FromPassword { get; set; }
        public string NameOfProject { get; set; }
        public string OutgoingEmailPort { get; set; }
        public string Host { get; set; }
        public string SiteDomain { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
