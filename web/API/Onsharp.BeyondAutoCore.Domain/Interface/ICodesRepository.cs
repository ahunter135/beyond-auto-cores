namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface ICodesRepository : IBaseRepository<CodeModel>
    {


        // read
        Task<List<CodeListDto>> GetCodes(List<SqlParameter> parameters);
        Task<List<CodeListDto>> GetCodes(List<SqlParameter> parameters, bool isPage = false);
        Task<int> GetCodesLength(List<SqlParameter> parameters, bool isPage = false);
        Task<bool> IsUsed(long codeId);
        Task DeleteRelatedTableData(long codeId);

    }
}
