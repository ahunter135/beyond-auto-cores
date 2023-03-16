namespace Onsharp.BeyondAutoCore.Application
{
    public interface ICodeService
    {

        // Read
        Task<CodeDto> GetById(long id);
        Task<PageList<CodeListDto>> GetAll(ParametersCommand parametersCommand, bool? isAdmin, bool? isCustom, bool? notIncludePGItem);
        Task<PageList<CodeListDto>> GetPage(ParametersCommand parametersCommand, bool? isAdmin, bool? isCustom, bool? notIncludePGItem, bool needLength = true, string sortCol = "0", string direction = "0");

        // Write
        Task<CodeDto> Create(CreateCodeCommand createCommand);
        Task<CodeDto> Update(UpdateCodeCommand createCommand);
        Task<ResponseDto> Delete(long id);


    }
}
