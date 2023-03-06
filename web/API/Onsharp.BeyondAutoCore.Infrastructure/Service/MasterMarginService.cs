namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class MasterMarginService : BaseService, IMasterMarginService
    {
        private readonly BacDBContext _bacDBContext;
        private readonly IMarginsRepository _marginsRepository;
        private readonly IRefreshTokensRepository _refreshTokenRepository;
        private readonly IMapper _mapper;

        public MasterMarginService(BacDBContext bacDBContext, IHttpContextAccessor httpContextAccessor, 
                             IMapper mapper, IMarginsRepository marginsRepository)
            : base(httpContextAccessor)
        {
            _marginsRepository = marginsRepository;
            _bacDBContext = bacDBContext;
            _mapper = mapper;
        }

        public async Task<MarginDto> Get()
        {
            var marginInfo = await _bacDBContext.MasterMargins.Where(w => w.IsDeleted == false).FirstOrDefaultAsync();
            if (marginInfo == null)
                return null;

            return _mapper.Map<MasterMarginModel, MarginDto>(marginInfo);
        }

        public async Task<MarginDto> Create(CreateMarginCommand createCommand)
        {

            long currentUser = this.CurrentUserId();

            var checkUserMargin = await _bacDBContext.MasterMargins.Where(w => w.IsDeleted == false).FirstOrDefaultAsync();
            if (checkUserMargin != null)
                return new MarginDto() { Success = false, Message = "Master margin already exist." };

            var newMargin = new MasterMarginModel();

            newMargin.Margin = createCommand.Margin ?? 0;
            newMargin.CreatedBy = currentUser;
            newMargin.CreatedOn = DateTime.UtcNow;

            _marginsRepository.Add(newMargin);
            _marginsRepository.SaveChanges();

            return _mapper.Map<MasterMarginModel, MarginDto>(newMargin);

        }

        public async Task<MarginDto> Update(UpdateMarginCommand updateCommand)
        {
            var currenData = await _bacDBContext.MasterMargins.FirstOrDefaultAsync();
            
            if (currenData == null)
                return new MarginDto() { Success = false, Message = "Master margin does not exist." };

            currenData.Margin = updateCommand.Margin ?? 0;
            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _marginsRepository.Update(currenData);
            _marginsRepository.SaveChanges();

            return _mapper.Map<MasterMarginModel, MarginDto>(currenData);
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _marginsRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _marginsRepository.Update(singleData);
            _marginsRepository.SaveChanges();

            return true;
        }

    }
}
