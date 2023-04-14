
namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IAffiliatesSummaryRepository : IBaseRepository<AffiliateSummaryModel>
    {
        public int Update();
    }
}
