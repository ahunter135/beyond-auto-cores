
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class CommissionService : BaseService, ICommissionService
    {
        private readonly IMapper _mapper;
        private readonly ICommissionsRepository _commissionRepository;

        public CommissionService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           ICommissionsRepository commissionRepository)
           : base(httpContextAccessor)
        {
            _mapper = mapper;
            _commissionRepository = commissionRepository;
        }

        public async Task<CommissionDto> Create(CreateCommissionCommand createCommand)
        {
            var newCommission = _mapper.Map<CreateCommissionCommand, CommissionModel>(createCommand);

            newCommission.CreatedBy = this.CurrentUserId();
            newCommission.CreatedOn = DateTime.UtcNow;

            _commissionRepository.Add(newCommission);
            _commissionRepository.SaveChanges();

            return _mapper.Map<CommissionModel, CommissionDto>(newCommission);

        }

    }
}
