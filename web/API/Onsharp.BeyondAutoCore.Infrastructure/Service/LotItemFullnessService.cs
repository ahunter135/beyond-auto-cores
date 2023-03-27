
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class LotItemFullnessService : BaseService, ILotItemFullnessService
    {
        private readonly ILotItemsRepository _lotItemsRepository;
        private readonly ILotItemFullnessRepository _lotItemFullnessRepository;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public LotItemFullnessService(BacDBContext bacDBContext, IHttpContextAccessor httpContextAccessor, IMapper mapper, 
                                      ILotItemsRepository lotItemsRepository, ILotItemFullnessRepository lotItemFullnessRepository,
                                      IUserService userService)
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _lotItemFullnessRepository = lotItemFullnessRepository;
            _lotItemsRepository = lotItemsRepository;
            _userService = userService;

        }

        #region CRUD

        public async Task<LotItemFullnessDto> Create(CreateLotItemFullnessCommand createCommand)
        {

            var result = new LotItemFullnessDto();

            var newLotItemFullness = _mapper.Map<CreateLotItemFullnessCommand, LotItemFullnessModel>(createCommand);

            #region validation

            if (newLotItemFullness == null)
            {
                result.Success = false;
                result.Message = "Invalid null lot item fullness.";
                return result;
            }

            var lotItemInfo = await _lotItemsRepository.GetByIdAsync(newLotItemFullness.LotItemId);
            if (lotItemInfo == null || lotItemInfo.Id == 0)
            {
                result.Success = false;
                result.Message = "Invalid lot item Id.";
                return result;
            }

            #endregion validation

            Console.WriteLine("In LotItemFullness service creating");

            newLotItemFullness.CreatedBy = this.CurrentUserId();
            newLotItemFullness.CreatedOn = DateTime.UtcNow;

            _lotItemFullnessRepository.Add(newLotItemFullness);
            _lotItemFullnessRepository.SaveChanges();

            return _mapper.Map<LotItemFullnessModel, LotItemFullnessDto>(newLotItemFullness);

        }

        public async Task<LotItemFullnessDto> Update(UpdateLotItemFullnessCommand updateCommand)
        {

            var result = new LotItemFullnessDto();
            var currenData = await _lotItemFullnessRepository.GetByIdAsync(updateCommand.Id);

            if (currenData == null)
            {
                result.Success = false;
                result.Message = "Invalid null lot item fullness.";
                return result;
            }

            var lotItemInfo = await _lotItemsRepository.GetByIdAsync(currenData.LotItemId);
            if (lotItemInfo == null || lotItemInfo.Id == 0)
            {
                result.Success = false;
                result.Message = "Invalid lot item Id.";
                return result;
            }

            currenData.LotItemId = updateCommand.LotItemId;
            currenData.FullnessPercentage = updateCommand.FullnessPercentage;
            currenData.UnitPrice = updateCommand.UnitPrice;
            currenData.Qty = updateCommand.Qty;

            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _lotItemFullnessRepository.Update(currenData);
            _lotItemFullnessRepository.SaveChanges();

            return _mapper.Map<LotItemFullnessModel, LotItemFullnessDto>(currenData);
        }

        public async Task<LotItemFullnessDto> GetById(long id)
        {
            
            var singleData = await _lotItemFullnessRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
            {
                return new LotItemFullnessDto() { Success = false, Message = "Lot item fullness does not exist." };
            }

            return _mapper.Map<LotItemFullnessModel, LotItemFullnessDto>(singleData);
        }

        public async Task<PageList<LotItemFullnessModel>> GetAllFromRepo(ParametersCommand parametersCommand)
        {

            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var collection = _lotItemFullnessRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false);

            var currentUser = await _userService.GetById(this.CurrentUserId());
            if (currentUser != null && currentUser.Role == RoleEnum.User)
                collection = collection.Where(w => w.CreatedBy == this.CurrentUserId());

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "lotitemid" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                long searchLotItemId = 0;
                if (long.TryParse(parametersCommand.SearchQuery, out searchLotItemId))
                {
                    collection = collection.Where(w => w.LotItemId == searchLotItemId);
                }

            }

            return PageList<LotItemFullnessModel>.Create(collection, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

        public async Task<PageList<LotItemFullnessDto>> GetAllByLotItemId(long lotItemId, ParametersCommand parametersCommand)
        {
            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var collection = _lotItemFullnessRepository.GetAllIQueryable().Where(w => w.LotItemId == lotItemId);
            collection = collection.Where(w => w.IsDeleted == false);

            int sourceCount = collection.Count();
            var filteredData = collection.Skip((parametersCommand.PageNumber - 1) * parametersCommand.PageSize).Take(parametersCommand.PageSize).ToList();

            var mappedData = _mapper.Map<List<LotItemFullnessModel>, List<LotItemFullnessDto>>(filteredData);

            return PageList<LotItemFullnessDto>.Create(mappedData, sourceCount, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _lotItemFullnessRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _lotItemFullnessRepository.Update(singleData);
            _lotItemFullnessRepository.SaveChanges();

            return true;
        }
        #endregion CRUD


    }
}
