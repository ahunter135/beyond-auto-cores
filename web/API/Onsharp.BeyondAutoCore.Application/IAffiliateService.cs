using Onsharp.BeyondAutoCore.Domain.Dto.Affiliates;

namespace Onsharp.BeyondAutoCore.Application
{
    public interface IAffiliateService
    {
        // read
        Task<bool> IsAffiliateCodeEnable(string affiliateCode);
        Task<AffiliateDto> GetAffiliateLink(long userId);
        Task<ResponseDto> Enable(long id, bool enable);
        Task<AffiliateDto> GetLink(long userId);
        Task<AffiliateSummaryDto> AffiliatesSummary();

        // write
        Task<ResponseDto> ConfirmJoinAffiliate(string stripeAccountId);
        Task<UserAffiliateDto> JoinAffiliate(long id);
        Task<bool> ProcessPayouts();
        Task<bool> UpdateAffiliatesSummary();

    }
}
