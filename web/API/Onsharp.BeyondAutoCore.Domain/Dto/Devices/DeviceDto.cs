using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Domain.Dto.Devices
{
    public class DeviceDto : BaseModelDto
    {
        public string AppUserId { get; set; }
        public string DeviceToken { get; set; }
        public string? DeviceType { get; set; }
        public DateTime DeviceRegistrationDate { get; set; }     
    }
}
