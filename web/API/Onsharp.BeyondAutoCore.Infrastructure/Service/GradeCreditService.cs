namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class GradeCreditService : BaseService, IGradeCreditService
    {
        private readonly IMapper _mapper;

        private readonly IOptions<AWSSettingDto> _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        private readonly AwsS3Helper _awsS3Helper;

        private readonly IGradeCreditsRepository _gradeCreditsRepository;

        public GradeCreditService(IHttpContextAccessor httpContextAccessor, IMapper mapper,
                           IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client,
                           IGradeCreditsRepository gradeCreditsRepository
                           )
           : base(httpContextAccessor)
        {
            _mapper = mapper;

            _awsSettings = awsSettings;
            _aws3Client = aws3Client;
            _awsS3Helper = new AwsS3Helper(_awsSettings, _aws3Client);

            _gradeCreditsRepository = gradeCreditsRepository;

        }

        #region CRUD

        public async Task<GradeCreditDto> Create(CreateGradeCreditCommand createCommand)
        {
            var newGradeCredit = _mapper.Map<CreateGradeCreditCommand, GradeCreditModel>(createCommand);

            newGradeCredit.CreatedBy = this.CurrentUserId();
            newGradeCredit.CreatedOn = DateTime.UtcNow;

            _gradeCreditsRepository.Add(newGradeCredit);
            _gradeCreditsRepository.SaveChanges();

            return _mapper.Map<GradeCreditModel, GradeCreditDto>(newGradeCredit);

        }

        public async Task<GradeCreditDto> GetById(long id)
        {
            var singleData = await _gradeCreditsRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new GradeCreditDto() { Success = false, Message = "GradeCredit does not exist." };

            return _mapper.Map<GradeCreditModel, GradeCreditDto>(singleData); ;
        }

        public async Task<PageList<GradeCreditDto>> GetAllByUserId(long userId, ParametersCommand parametersCommand)
        {

            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var collection = _gradeCreditsRepository.GetAllIQueryable().Where(w => w.UserId == userId);
            collection = collection.Where(w => w.IsDeleted == false);

            int sourceCount = collection.Count();
            var filteredData = collection.Skip((parametersCommand.PageNumber - 1) * parametersCommand.PageSize).Take(parametersCommand.PageSize).ToList();

            var mappedData = _mapper.Map<List<GradeCreditModel>, List<GradeCreditDto>>(filteredData);

            return PageList<GradeCreditDto>.Create(mappedData, sourceCount, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

        public async Task<Decimal> GetTotalByUserId(long userId)
        {

            var collection = _gradeCreditsRepository.GetAllIQueryable().Where(w => w.UserId == userId);
            collection = collection.Where(w => w.IsDeleted == false);

            decimal totalGradeCredits = collection.Sum(s => s.Credit);
           
            return totalGradeCredits;
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _gradeCreditsRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _gradeCreditsRepository.Update(singleData);
            _gradeCreditsRepository.SaveChanges();

            return true;
        }
        #endregion CRUD


    }
}
