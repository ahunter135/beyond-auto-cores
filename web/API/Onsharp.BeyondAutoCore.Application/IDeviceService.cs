using Onsharp.BeyondAutoCore.Domain.Command.Devices;
using Onsharp.BeyondAutoCore.Domain.Dto.Devices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Application
{
    public interface IDeviceService
    {
        Task<DeviceDto> Create(CreateDeviceCommand createCommand);
        Task<bool> NotifyAsync(string margin);
    }
}
