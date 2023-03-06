namespace Onsharp.BeyondAutoCore.Application
{
    public interface ICommissionService
    {

        // read

        // write
        Task<CommissionDto> Create(CreateCommissionCommand createCommand);

    }
}
