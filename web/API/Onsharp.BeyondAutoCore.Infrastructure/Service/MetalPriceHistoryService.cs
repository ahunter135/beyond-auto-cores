using Onsharp.BeyondAutoCore.Infrastructure.Core.ServiceClient;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class MetalPriceHistoryService : BaseService, IMetalPriceHistoryService
    {
        private readonly IMapper _mapper;
        private readonly BacDBContext _bacDBContext;
        private readonly IMetalPriceHistoriesRepository _metalPriceHistoriesRepository;

        public MetalPriceHistoryService(BacDBContext bacDBContext, IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client,
                           IMetalPriceHistoriesRepository metalPriceHistoriesRepository
                           )
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _bacDBContext = bacDBContext;
            _metalPriceHistoriesRepository = metalPriceHistoriesRepository;

        }

        #region CRUD

        public async Task<MetalPriceHistoryDto> CreateUpdate(CreateMetalPriceHistoryCommand createCommand)
        {

            var currentDate = DateTime.UtcNow;

            var newMetalPrice = _mapper.Map<CreateMetalPriceHistoryCommand, MetalPriceHistoryModel>(createCommand);

            MetalEnum metal = MetalEnum.Platinum;
            if (newMetalPrice.Name.ToLower() == MetalEnum.Palladium.ToString().ToLower())
                metal = MetalEnum.Palladium;
            else if (newMetalPrice.Name.ToLower() == MetalEnum.Rhodium.ToString().ToLower())
                metal = MetalEnum.Rhodium;

            var currentDateData = await _metalPriceHistoriesRepository.GetDataByTimeStamp(newMetalPrice.TimeStamp, metal);
            if (currentDateData != null)
            {
                currentDateData.Last = newMetalPrice.Last;
                currentDateData.Bid = newMetalPrice.Bid;
                currentDateData.Open = newMetalPrice.Open;
                currentDateData.High = newMetalPrice.High;
                currentDateData.Low = newMetalPrice.Low;
                currentDateData.TimeStamp = newMetalPrice.TimeStamp;

                currentDateData.UpdatedBy = this.CurrentUserId();
                currentDateData.UpdatedOn = currentDate;
                _metalPriceHistoriesRepository.Update(currentDateData);
            }
            else
            {
                newMetalPrice.CreatedBy = this.CurrentUserId();
                newMetalPrice.CreatedOn = currentDate;
                _metalPriceHistoriesRepository.Add(newMetalPrice);
            }

            _metalPriceHistoriesRepository.SaveChanges();

            return _mapper.Map<MetalPriceHistoryModel, MetalPriceHistoryDto>(newMetalPrice);

        }

        public async Task<List<MetalPriceHistoryListDto>> GetMetalPriceHistories(MetalEnum metal, DateTime dateFrom, DateTime dateTo)
        {
            var parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@metalsymbol", System.Data.SqlDbType.NVarChar) { Direction = System.Data.ParameterDirection.Input, Value = metal.ToString().ToLower() });
            parameters.Add(new SqlParameter("@dateFrom", System.Data.SqlDbType.DateTime) { Direction = System.Data.ParameterDirection.Input, Value = dateFrom.ToString("yyyy-MM-dd") + " 00:00:00" });  //dateFrom.ToString("yyyy-MM-dd") + " 00:00:00"
            parameters.Add(new SqlParameter("@dateTo", System.Data.SqlDbType.DateTime) { Direction = System.Data.ParameterDirection.Input, Value = dateTo.ToString("yyyy-MM-dd") + " 23:59:59" });  //dateTo.ToString("yyyy-MM-dd") + " 23:59:59"

            return await _metalPriceHistoriesRepository.GetMetalPriceHistories(parameters);
        }

        public async Task<MetalPriceHistoryDto> GetById(long id)
        {
            var singleData = await _metalPriceHistoriesRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new MetalPriceHistoryDto() { Success = false, Message = "Metal price history does not exist." };

            return _mapper.Map<MetalPriceHistoryModel, MetalPriceHistoryDto>(singleData);
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _metalPriceHistoriesRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _metalPriceHistoriesRepository.Update(singleData);
            _metalPriceHistoriesRepository.SaveChanges();

            return true;
        }
        #endregion CRUD


    }
}
