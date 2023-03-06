
namespace Onsharp.BeyondAutoCore.Application
{
    public interface ILotItemFullnessService
    {
        // Read
        Task<LotItemFullnessDto> GetById(long id);
        Task<PageList<LotItemFullnessModel>> GetAllFromRepo(ParametersCommand parametersCommand);
        Task<PageList<LotItemFullnessDto>> GetAllByLotItemId(long lotItemId, ParametersCommand parametersCommand);

        // Write
        Task<LotItemFullnessDto> Create(CreateLotItemFullnessCommand createLotItemFullnessCommand);
        Task<LotItemFullnessDto> Update(UpdateLotItemFullnessCommand updateLotItemFullnessCommand);
        Task<bool> Delete(long id);
    }
}
