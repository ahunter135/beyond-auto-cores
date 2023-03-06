
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class SubscriptionService : BaseService, ISubscriptionService
    {
        private readonly IMapper _mapper;
        private readonly ISubscriptionsRepository _subscriptionCreditsRepository;

        public SubscriptionService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           ISubscriptionsRepository subscriptionCreditsRepository
                           )
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _subscriptionCreditsRepository = subscriptionCreditsRepository;
        }

        #region CRUD

        public async Task<SubscriptionDto> Create(CreateSubscriptionCommand createCommand)
        {

            var newCredit = _mapper.Map<CreateSubscriptionCommand, SubscriptionModel>(createCommand);

            newCredit.CreatedBy = this.CurrentUserId();
            newCredit.CreatedOn = DateTime.UtcNow;

            _subscriptionCreditsRepository.Add(newCredit);
            _subscriptionCreditsRepository.SaveChanges();

            return _mapper.Map<SubscriptionModel, SubscriptionDto>(newCredit);

        }

        public async Task<SubscriptionDto> Update(UpdateSubscriptionCommand updateCommand)
        {
            var currenData = await _subscriptionCreditsRepository.GetByIdAsync(updateCommand.Id);

            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _subscriptionCreditsRepository.Update(currenData);
            _subscriptionCreditsRepository.SaveChanges();

            return _mapper.Map<SubscriptionModel, SubscriptionDto>(currenData);
        }

        public async Task<SubscriptionDto> GetById(long id)
        {
            var singleData = await _subscriptionCreditsRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new SubscriptionDto() { Success = false, Message = "Subscription credit does not exist." };

            var mapData = _mapper.Map<SubscriptionModel, SubscriptionDto>(singleData);

            return mapData;
        }

        public async Task<PageList<SubscriptionDto>> GetAllByUserId(long userId, ParametersCommand parametersCommand)
        {

            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var collection = _subscriptionCreditsRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false && w.UserId == userId);

            int sourceCount = collection.Count();
            var filteredData = collection.Skip((parametersCommand.PageNumber - 1) * parametersCommand.PageSize).Take(parametersCommand.PageSize).ToList();

            var mappedData = _mapper.Map<List<SubscriptionModel>, List<SubscriptionDto>>(filteredData);

            return PageList<SubscriptionDto>.Create(mappedData, sourceCount, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _subscriptionCreditsRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _subscriptionCreditsRepository.Update(singleData);
            _subscriptionCreditsRepository.SaveChanges();

            return true;
        }
        #endregion CRUD


    }
}
