using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class DeviceRepository : BaseRepository<DeviceModel>, IDeviceRepository
    {
        private BacDBContext _context = null;
        public DeviceRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
