﻿namespace Onsharp.BeyondAutoCore.Application
{
    public interface ICodeService
    {

        // Read
        Task<CodeDto> GetById(long id);
        Task<PageList<CodeListDto>> GetAll(ParametersCommand parametersCommand, bool? isAdmin, bool? isCustom, bool? notIncludePGItem);

        // Write
        Task<CodeDto> Create(CreateCodeCommand createCommand);
        Task<CodeDto> Update(UpdateCodeCommand createCommand);
        Task<ResponseDto> Delete(long id);

    }
}
