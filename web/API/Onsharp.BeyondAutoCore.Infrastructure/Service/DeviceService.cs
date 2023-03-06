using AutoMapper;
using Newtonsoft.Json;
using Onsharp.BeyondAutoCore.Domain.Command.Devices;
using Onsharp.BeyondAutoCore.Domain.Dto.Devices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class DeviceService : BaseService, IDeviceService
    {
        private readonly BacDBContext _bacDBContext;
        private readonly IDeviceRepository _deviceRepository;
        private readonly IMapper _mapper;

        public DeviceService(IMapper mapper, BacDBContext bacDBContext, IHttpContextAccessor httpContextAccessor
                            ,IDeviceRepository deviceRepository ) : base(httpContextAccessor)
        {
            _mapper = mapper;
            _bacDBContext = bacDBContext;
            _deviceRepository = deviceRepository;
        }

        public async Task<DeviceDto> Create(CreateDeviceCommand createCommand)
        {
            var getAllDevices = await _deviceRepository.GetByAllAsync();
            var existingDeviceInfo = getAllDevices.Where(x => x.DeviceToken.ToLower() == createCommand.DeviceToken?.ToLower()).FirstOrDefault();
            if (existingDeviceInfo != null)
            {
                return _mapper.Map<DeviceModel, DeviceDto>(existingDeviceInfo);
            }

            var newDevice = _mapper.Map<CreateDeviceCommand, DeviceModel>(createCommand);
            newDevice.DeviceRegistrationDate = DateTime.UtcNow;
            newDevice.CreatedBy = this.CurrentUserId();
            newDevice.CreatedOn = DateTime.UtcNow;

            _deviceRepository.Add(newDevice);
            _deviceRepository.SaveChanges();

            return _mapper.Map<DeviceModel, DeviceDto>(newDevice);

        }

        public async Task<bool> NotifyAsync(string margin)
        {
            if (string.IsNullOrEmpty(margin))
            {
                return false;
            }

            try
            {

                var getAllDevices = await _deviceRepository.GetByAllAsync();
                var allDevices = getAllDevices.Select(x => x.DeviceToken).Distinct().ToList();

                var deviceConfig = new DeviceConfig();

                var serverKey = string.Format("key={0}", deviceConfig.ServerKey);
                var senderId = string.Format("id={0}", deviceConfig.SenderId);

                var data = new
                {
                    registration_ids = allDevices.Select( x=> x).ToArray(), // Recipient device token
                    data = new { margin = margin},
                    topic = "margin"
                };

                // Using Newtonsoft.Json
                var jsonBody = JsonConvert.SerializeObject(data);

                using (var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://fcm.googleapis.com/fcm/send"))
                {
                    httpRequest.Headers.TryAddWithoutValidation("Authorization", serverKey);
                    httpRequest.Headers.TryAddWithoutValidation("Sender", senderId);
                    httpRequest.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    using (var httpClient = new HttpClient())
                    {
                        var result = await httpClient.SendAsync(httpRequest);

                        if (result.IsSuccessStatusCode)
                        {
                            return true;
                        }                       
                    }
                }
            }
            catch (Exception ex)
            {                
            }

            return false;
        }


    }
}
