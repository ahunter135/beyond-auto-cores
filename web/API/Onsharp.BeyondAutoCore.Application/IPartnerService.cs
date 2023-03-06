
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IPartnerService
    {
        // Read
        Task<PartnerDto> GetById(long id);
        Task<PageList<PartnerDto>> GetAll(ParametersCommand parametersCommand, bool includeLogoUrl = false);

        // Write
        Task<PartnerDto> Create(CreatePartnerCommand createCommand, IFormFile logo);
        Task<PartnerDto> Update(UpdatePartnerCommand createCommand, IFormFile logo);
        Task<bool> Delete(long id);
    }
}
