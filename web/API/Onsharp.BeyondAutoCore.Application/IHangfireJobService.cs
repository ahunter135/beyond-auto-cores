
namespace Onsharp.BeyondAutoCore.Application
{
    public interface IHangfireJobService
    {
        // read

        // write 
        Task<bool> UpdateMetalPrices();
        Task<bool> UpdateAffiliatesSummary();
        Task<bool> ProcessPayouts();
    }
}
