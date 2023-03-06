namespace Onsharp.BeyondAutoCore.Application
{
    public interface IMetalPriceService
    {

        // read 
        Task<MetalPriceGraphDto> GetMetalPrices(MetalEnum metal, MetalPriceReportTypeEnum reportType);

        // write
        Task<ResponseDto> UpdatePrices();
        Task<bool> UpdateSpotHistory(DateTime fromDate, DateTime toDate);
    }
}
