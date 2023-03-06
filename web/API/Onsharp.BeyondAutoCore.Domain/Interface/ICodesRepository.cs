namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface ICodesRepository : IBaseRepository<CodeModel>
    {


        // read
        Task<List<CodeListDto>> GetCodes(List<SqlParameter> parameters);
        Task<bool> IsUsed(long codeId);
        Task DeleteRelatedTableData(long codeId);

    }
}
