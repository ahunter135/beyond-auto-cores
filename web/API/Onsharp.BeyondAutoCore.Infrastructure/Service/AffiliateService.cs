using Onsharp.BeyondAutoCore.Domain.Dto.Affiliates;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class AffiliateService : BaseService, IAffiliateService
    {
        private readonly IMapper _mapper;
        private readonly IUsersRepository _usersRepository;
        private readonly IPaymentService _paymentService;
        private readonly ICommissionService _commissionService;
        private readonly ISubscriptionsRepository _subscriptionsRepository;
        private readonly IAffiliatesSummaryRepository _affiliatesSummaryRepository;
        
        public AffiliateService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           IPaymentService paymentService, ICommissionService commissionService,
                           IUsersRepository usersRepository, ISubscriptionsRepository subscriptionsRepository,
                           IAffiliatesSummaryRepository affiliatesSummaryRepository)
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _usersRepository = usersRepository;
            _commissionService = commissionService;
            _paymentService = paymentService;
            _subscriptionsRepository = subscriptionsRepository;
            _affiliatesSummaryRepository = affiliatesSummaryRepository;
        }

        public async Task<UserAffiliateDto> JoinAffiliate(long id)
        {
            var userInfo = await _usersRepository.GetByIdAsync(id);
            if (!string.IsNullOrWhiteSpace(userInfo.UUID))
                return new UserAffiliateDto() { Success = false, Message = "User already joined." };

            var accountId = await _paymentService.CreateAccount();
            var accountLink = await _paymentService.CreateAccountLink(accountId);

            userInfo.AffiliateEnable = true;
            userInfo.StripeAccountId = accountId;
            _usersRepository.Update(userInfo);
            _usersRepository.SaveChanges();

            return new UserAffiliateDto()
            {
                Success = true,
                Url = accountLink
            };

        }

        public async Task<ResponseDto> ConfirmJoinAffiliate(string stripeAccountId)
        {
            var userInfo = await _usersRepository.GetUserByStripeAccountId(stripeAccountId);
            if (userInfo == null)
                return new ResponseDto() { Success = 0, Message = "Invalid stripe account Id." };

            userInfo.UUID = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Replace("=", "").Replace("/", "").Replace(@"\", "");

            _usersRepository.Update(userInfo);
            _usersRepository.SaveChanges();

            return new ResponseDto() { Success = 1, Message = "" };
        }

        public async Task<AffiliateDto> GetAffiliateLink(long userId)
        {
            return await GetLink(userId);
        }

        public async Task<ResponseDto> Enable(long id, bool enable)
        {
            var userInfo = await _usersRepository.GetByIdAsync(id);
            if (userInfo == null)
                return new ResponseDto() { Success = 0, Message = "Invalid user" };

            userInfo.AffiliateEnable = enable;
            _usersRepository.Update(userInfo);
            _usersRepository.SaveChanges();

            string action = enable ? "enabled" : "disabled";

            return new ResponseDto() { Success = 1, Message = $"Affiliate successfully {action}." };

        }

        public async Task<bool> IsAffiliateCodeEnable(string affiliateCode)
        {
            var userInfo = await _usersRepository.GetUserByAffiliateCode(affiliateCode);

            if (userInfo != null)
                return true;
            else
                return false;
        }

        public async Task<AffiliateDto> GetLink(long userId)
        {
            var userInfo = await _usersRepository.GetByIdAsync(userId);
            if (userInfo == null && userInfo.AffiliateEnable == true)
                return new AffiliateDto() { Success = 0, Message = "Invalid user" };

            //if (string.IsNullOrWhiteSpace(userInfo.UUID))
            //    return new AffiliateDto() { Success = 0, Message = "User not yet join affiliate" };

            if (userInfo.AffiliateEnable != true)
                return new AffiliateDto() { Success = 0, Message = "Affiliate is disabled" };

            var affiliateConfig = new AffiliateConfig();
            long subTypeValue = 0;
            var subcription = _subscriptionsRepository.GetAllIQueryable().FirstOrDefault(c => c.UserId == userInfo.Id);
            if(subcription != null)
            {
                subTypeValue = subcription.SubscriptionTypeId;
            }
            string link = string.Format(affiliateConfig.Site, subTypeValue, userInfo?.UUID?.ToString());

            return new AffiliateDto() { Success = 1, Link = link };
        }

        public async Task<bool> ProcessPayouts()
        {
            //var parameters = new List<SqlParameter>();
            //parameters.Add(new SqlParameter("@dateFrom", System.Data.SqlDbType.DateTime) { Direction = System.Data.ParameterDirection.Input, Value = processCommand.DateFrom });
            //parameters.Add(new SqlParameter("@dateTo", System.Data.SqlDbType.DateTime) { Direction = System.Data.ParameterDirection.Input, Value = processCommand.DateTo });

            
            var listData = await _usersRepository.GetCommissions();
            foreach (var data in listData)
            {
                // Commission History
                var createCommand = _mapper.Map<CommissionDto, CreateCommissionCommand>(data);

                var payoutResponse = await _paymentService.SendPayouts(data.StripeAccountId, data.AmountCommission);

                createCommand.StripeTransferId = payoutResponse.StripeTransferId;
                createCommand.IsPayoutSuccess = (payoutResponse.Success == 1) ? true : false;
                createCommand.Message = payoutResponse.Message;

                await _commissionService.Create(createCommand);

            }

            return true;
        }

        public async Task<AffiliateSummaryDto> AffiliatesSummary()
        {
            var affiliateSummaryModels = await _affiliatesSummaryRepository.GetByAllAsync();
            AffiliateSummaryModel? affiliateSummaryModel = null;
            if (affiliateSummaryModels != null)
            {
                affiliateSummaryModel = affiliateSummaryModels.FirstOrDefault();
            }
            if (affiliateSummaryModel == null)
            {
                return new AffiliateSummaryDto()
                {
                    Success = 0,
                    Message = "No affiliate summary found."
                };
            }

            AffiliateSummaryDto returnVal = _mapper.Map<AffiliateSummaryModel, AffiliateSummaryDto>(affiliateSummaryModel);
            returnVal.Success = 1;
            returnVal.Message = "Success";

            return returnVal;

        }

        public async Task<bool> UpdateAffiliatesSummary()
        {
            var numOfRowsEffected = _affiliatesSummaryRepository.Update();
            // Should update 1 row
            return numOfRowsEffected >= 0 ? true : false;
        }

    }
}
