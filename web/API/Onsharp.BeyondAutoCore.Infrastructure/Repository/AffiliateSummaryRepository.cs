namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class AffiliateSummaryRepository : BaseRepository<AffiliateSummaryModel>, IAffiliatesSummaryRepository
    {
        public AffiliateSummaryRepository(
                BacDBContext dbContext            
            ) : base( dbContext )
        {
        }

        public bool Add(AffiliateSummaryModel entity)
        {
            throw new NotSupportedException("This table only has one row");
        }

        public bool AddRange(List<AffiliateSummaryModel> entity)
        {
            throw new NotSupportedException("This table only has one row");
        }

        public void Delete(AffiliateSummaryModel entity)
        {
            throw new NotSupportedException("This table only has one row");
        }

        public void DeleteRange(IQueryable<AffiliateSummaryModel> entity)
        {
            throw new NotSupportedException("This table only has one row");
        }

        public int Update()
        {
            return dBContext.Database.ExecuteSqlRaw("SProc_UpdateAffiliateSummary");
        }
    }
}
