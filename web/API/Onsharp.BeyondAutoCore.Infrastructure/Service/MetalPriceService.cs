using Onsharp.BeyondAutoCore.Infrastructure.Core.ServiceClient;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class MetalPriceService : BaseService, IMetalPriceService
    {
        private readonly IMapper _mapper;
        private readonly IMetalPriceHistoryService _metalPriceHistoryService;
        private readonly IMetalPriceSummaryService _metalPriceSummaryService;
        private readonly IMetalCustomPriceService _metalCustomPriceService;

        public MetalPriceService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           IMetalPriceHistoryService metalPriceHistoryService, IMetalPriceSummaryService metalPriceSummaryService,
                           IMetalCustomPriceService metalCustomPriceService
                           )
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _metalPriceHistoryService = metalPriceHistoryService;
            _metalPriceSummaryService = metalPriceSummaryService;
            _metalCustomPriceService = metalCustomPriceService;
        }

        public async Task<ResponseDto> UpdatePrices()
        {
            var dataList = new List<MetalPriceSpotSummaryDto>();
            string service = "Metals";
            var metalPricesConfig = new MetalPricesConfig();
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;
            apiParameters.Add("metals", "platinum,palladium,rhodium"); //"platinum,palladium,rhodium"
            apiParameters.Add("currency", "usd");
            apiParameters.Add("format", "json");
            apiParameters.Add("token", metalPricesConfig.Token);

            var apiClient = new ApiClient(metalPricesConfig.Host, metalPricesConfig.Port, service, metalPricesConfig.EnableSSL, metalPricesConfig.Token);
            var data = await apiClient.Get<List<NfusionSpotSummaryDto>>("spot/summary", apiParameters);
            foreach (var dataDto in data)
            {
                if (dataDto.Data != null)
                {
                    var newSummary = new CreateMetalPriceSummaryCommand();
                    newSummary.Symbol = ((NfusionSpotSummaryDto)dataDto).Data.Symbol ?? "";
                    newSummary.BaseCurrency = ((NfusionSpotSummaryDto)dataDto).Data.BaseCurrency ?? "";
                    newSummary.Last = ((NfusionSpotSummaryDto)dataDto).Data.Last ?? 0;
                    newSummary.Bid = ((NfusionSpotSummaryDto)dataDto).Data.Bid ?? 0;
                    newSummary.Ask = ((NfusionSpotSummaryDto)dataDto).Data.Ask ?? 0;
                    newSummary.High = ((NfusionSpotSummaryDto)dataDto).Data.High ?? 0;
                    newSummary.Low = ((NfusionSpotSummaryDto)dataDto).Data.Low ?? 0;
                    newSummary.Open = ((NfusionSpotSummaryDto)dataDto).Data.Open ?? 0;
                    newSummary.OneDayValue = ((NfusionSpotSummaryDto)dataDto).Data.OneDayValue ?? 0;
                    newSummary.OneDayChange = ((NfusionSpotSummaryDto)dataDto).Data.OneDayChange ?? 0;
                    newSummary.OneDayPercentChange = ((NfusionSpotSummaryDto)dataDto).Data.OneDayPercentChange ?? 0;
                    newSummary.TimeStamp = ((NfusionSpotSummaryDto)dataDto).Data.TimeStamp ?? DateTime.Now;

                    await _metalPriceSummaryService.Create(newSummary);

                    var createMetalPriceCommand = new CreateMetalPriceHistoryCommand();
                    createMetalPriceCommand.Symbol = dataDto.Data.Symbol;
                    createMetalPriceCommand.Name = dataDto.Data.Symbol;
                    createMetalPriceCommand.BaseCurrency = dataDto.Data.BaseCurrency;

                    createMetalPriceCommand.Last = dataDto.Data.Last;
                    createMetalPriceCommand.Bid = dataDto.Data.Bid;
                    createMetalPriceCommand.Open = dataDto.Data.Open;
                    createMetalPriceCommand.High = dataDto.Data.High;
                    createMetalPriceCommand.Low = dataDto.Data.Low;
                    createMetalPriceCommand.TimeStamp = dataDto.Data.TimeStamp;

                    await _metalPriceHistoryService.CreateUpdate(createMetalPriceCommand);
                }
            }

            return new ResponseDto() { Success = 1, Message = "Prices successfully updated." };

        }

        public async Task<MetalPriceGraphDto> GetMetalPrices(MetalEnum metal, MetalPriceReportTypeEnum reportType)
        {
            DateTime dateTo = DateTime.UtcNow;
            DateTime dateFrom = dateTo.AddMonths(-1);
            if (reportType == MetalPriceReportTypeEnum.Yearly)
                dateFrom = dateTo.AddYears(-1);

            var graphData = new MetalPriceGraphDto();
            var metalPriceSummary = await _metalPriceSummaryService.GetLatestSummary(metal);
            if (!metalPriceSummary.Success)
                return new MetalPriceGraphDto() { Success = false, Message = "Metal Price does not exist" };

            graphData.Name = metalPriceSummary.Symbol.Trim();
            graphData.Symbol = metalPriceSummary.Symbol.Trim();
            graphData.BaseCurrency = metalPriceSummary.BaseCurrency.Trim();
            graphData.BidPrice = metalPriceSummary.Bid ?? 0;
            graphData.LastPrice = metalPriceSummary.Last ?? 0;

            var customPrice = await _metalCustomPriceService.GetCustomPrices();
            if (customPrice != null)
            {
                if (customPrice.Platinum > 0 && metal == MetalEnum.Platinum)
                {
                    graphData.BidPrice = customPrice.Platinum;
                    graphData.LastPrice = customPrice.Platinum;
                }
                else if (customPrice.Palladium > 0 && metal == MetalEnum.Palladium)
                {
                    graphData.BidPrice = customPrice.Palladium;
                    graphData.LastPrice = customPrice.Palladium;
                }
                else if (customPrice.Rhodium > 0 && metal == MetalEnum.Rhodium)
                {
                    graphData.BidPrice = customPrice.Rhodium;
                    graphData.LastPrice = customPrice.Rhodium;
                }
            }

            graphData.OneDayPercentChange = metalPriceSummary.OneDayPercentChange ?? 0;
            graphData.LastUpdate = metalPriceSummary.CreatedOn;
            graphData.PriceHistory = await _metalPriceHistoryService.GetMetalPriceHistories(metal, dateFrom, dateTo);

            return graphData;
        }

        ///// <summary>
        ///// API Sample Call: 
        ///// https://api.nfusionsolutions.biz:443/api/v1/Metals/spot/history?metals=platinum,palladium,rhodium&start=2022-11-08&end=2022-11-08&token=936bcdbc-459c-478c-889e-7f1040d5a8a4
        ///// </summary>
        ///// <param name="generateDate"></param>
        public async Task<bool> UpdateSpotHistory(DateTime fromDate, DateTime toDate)
        {
            string service = "Metals";
            var metalPricesConfig = new MetalPricesConfig();
            Dictionary<string, string> apiParameters = new Dictionary<string, string>(); ;
            apiParameters.Add("metals", "platinum,palladium,rhodium");
            apiParameters.Add("start", fromDate.ToString("yyyy-MM-dd"));
            apiParameters.Add("end", toDate.ToString("yyyy-MM-dd"));
            apiParameters.Add("token", metalPricesConfig.Token);

            var apiClient = new ApiClient(metalPricesConfig.Host, metalPricesConfig.Port, service, metalPricesConfig.EnableSSL, metalPricesConfig.Token);

            var dataList = new List<MetalPriceHistoryModel>();
            var data = await apiClient.Get<List<NfusionSpotHistoryDto>>("spot/history", apiParameters);

            if (data != null)
            {
                foreach (var dataDto in data)
                {
                    if (dataDto.Data != null && dataDto.Data.Intervals != null)
                    {
                        foreach (var interval in dataDto.Data.Intervals)
                        {
                            var createMetalPriceCommand = new CreateMetalPriceHistoryCommand();
                            createMetalPriceCommand.Symbol = dataDto.Data.Symbol;
                            createMetalPriceCommand.Name = dataDto.Data.Name;
                            createMetalPriceCommand.BaseCurrency = dataDto.Data.BaseCurrency;

                            createMetalPriceCommand.Last = interval.Last;
                            createMetalPriceCommand.Bid = interval.Last;  // no bid in history
                            createMetalPriceCommand.Open = interval.Open;
                            createMetalPriceCommand.High = interval.High;
                            createMetalPriceCommand.Low = interval.Low;
                            createMetalPriceCommand.TimeStamp = interval.End;

                            await _metalPriceHistoryService.CreateUpdate(createMetalPriceCommand);
                        }
                    }
                }
            }

            return true;
        }

    }
}
