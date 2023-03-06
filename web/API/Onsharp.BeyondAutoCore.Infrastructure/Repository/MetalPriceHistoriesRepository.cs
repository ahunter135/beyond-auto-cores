
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class MetalPriceHistoriesRepository : BaseRepository<MetalPriceHistoryModel>, IMetalPriceHistoriesRepository
    {
        private BacDBContext _context = null;

        public MetalPriceHistoriesRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<MetalPriceHistoryModel> GetDataByTimeStamp(DateTime timeStamp, MetalEnum metal)
        {
            var startTime = new DateTime(timeStamp.Year, timeStamp.Month, timeStamp.Day, timeStamp.Hour, 0, 0); //timeStamp.Date  new TimeSpan(6, 30, 0);
            var endTime = startTime.AddHours(1);

            return await _context.MetalPriceHistories.Where(w => w.TimeStamp >= startTime && w.TimeStamp <= endTime && w.Name.ToLower() == metal.ToString().ToLower()).FirstOrDefaultAsync();
        }

        public async Task<List<MetalPriceHistoryListDto>> GetMetalPriceHistories(List<SqlParameter> parameters)
        {
            return await _context.Set<MetalPriceHistoryListDto>().FromSqlRaw("SProc_GetMetalPriceHistories @metalsymbol, @dateFrom, @dateTo", parameters.ToArray()).ToListAsync();
        }
    }
}
