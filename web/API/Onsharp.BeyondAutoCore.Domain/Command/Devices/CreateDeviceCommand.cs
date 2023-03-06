using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Domain.Command.Devices
{
    public class CreateDeviceCommand
    {
        public string AppUserId { get; set; }
        public string DeviceToken { get; set; }
        public string? DeviceType { get; set; }
    }
}
