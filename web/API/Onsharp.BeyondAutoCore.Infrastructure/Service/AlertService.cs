
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class AlertService : BaseService, IAlertService
    {
        private readonly BacDBContext _bacDBContext;
        private readonly IAlertsRepository _alertsRepository;
        private readonly IMapper _mapper;

        public AlertService(BacDBContext bacDBContext, IHttpContextAccessor httpContextAccessor,
                            IMapper mapper, IAlertsRepository alertsRepository)
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _bacDBContext = bacDBContext;
            _alertsRepository = alertsRepository;

        }

        #region CRUD

        public async Task<AlertDto> Create(CreateAlertCommand createCommand)
        {

            var newAlert = _mapper.Map<CreateAlertCommand, AlertModel>(createCommand);

            newAlert.CreatedBy = this.CurrentUserId();
            newAlert.CreatedOn = DateTime.UtcNow;

            _alertsRepository.Add(newAlert);
            _alertsRepository.SaveChanges();

            return _mapper.Map<AlertModel, AlertDto>(newAlert);

        }

        public async Task<AlertDto> Update(UpdateAlertCommand updateCommand)
        {
            var currenData = await _alertsRepository.GetByIdAsync(updateCommand.Id);
            if (currenData == null)
                return new AlertDto() { Success = false, Message = "Code does not exist." };

            currenData.PhotoGradeId = updateCommand.PhotoGradeId;
            currenData.PhotoGradeUserId = updateCommand.PhotoGradeUserId;
            currenData.Title = updateCommand.Title;
            currenData.Message = updateCommand.Message;
            currenData.DateSent = updateCommand.DateSent;
            currenData.Status = (AlertStatusEnum)updateCommand.Status;

            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _alertsRepository.Update(currenData);
            _alertsRepository.SaveChanges();

            return _mapper.Map<AlertModel, AlertDto>(currenData);
        }


        public async Task<AlertDto> GetById(long id)
        {
            var singleData = await _alertsRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new AlertDto() { Success = false, Message = "Alert does not exist." };

            var mapData = _mapper.Map<AlertModel, AlertDto>(singleData);

            return mapData;
        }

        public async Task<PageList<AlertDto>> GetAllByUserId(long userId, ParametersCommand parametersCommand)
        {

            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var collection = _alertsRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false && w.CreatedBy == userId);

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "title" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                collection = collection.Where(w => w.Title.ToLower().Contains(parametersCommand.SearchQuery.ToLower()));
            }

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "status" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                AlertStatusEnum status = AlertStatusEnum.Unread;
                if (int.Parse(parametersCommand.SearchQuery) == 1)
                    status = AlertStatusEnum.Read;

                collection = collection.Where(w => w.Status == status);
            }

            int sourceCount = collection.Count();
            var filteredData = collection.OrderByDescending(o => o.CreatedOn).Skip((parametersCommand.PageNumber - 1) * parametersCommand.PageSize).Take(parametersCommand.PageSize).ToList();

            var mappedData = _mapper.Map<List<AlertModel>, List<AlertDto>>(filteredData);

            return PageList<AlertDto>.Create(mappedData, sourceCount, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

        public async Task<double> GetUnReadCountByUserId(long userId)
        {

            var collection = _alertsRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false && w.CreatedBy == userId && w.Status == AlertStatusEnum.Unread);

            double sourceCount = collection.Count();

            return sourceCount;
        }

        public async Task<bool> Read(long id)
        {
            var singleData = await _alertsRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.Status = AlertStatusEnum.Read;
            _alertsRepository.Update(singleData);
            _alertsRepository.SaveChanges();

            return true;
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _alertsRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _alertsRepository.Update(singleData);
            _alertsRepository.SaveChanges();

            return true;
        }


        #endregion CRUD

    }
}
