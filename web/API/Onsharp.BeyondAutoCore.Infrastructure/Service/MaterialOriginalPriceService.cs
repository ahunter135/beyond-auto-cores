namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class MaterialOriginalPriceService : BaseService, IMaterialOriginalPriceService
    {
        private readonly BacDBContext _bacDBContext;
        private readonly IMaterialOriginalPricesRepository _materialOriginalPriceRepository;
        private readonly IMapper _mapper;

        public MaterialOriginalPriceService(BacDBContext bacDBContext, IHttpContextAccessor httpContextAccessor, IMapper mapper, IMaterialOriginalPricesRepository materialOriginalPriceRepository)
            : base(httpContextAccessor)
        {

            _mapper = mapper;
            _bacDBContext = bacDBContext;
            _materialOriginalPriceRepository = materialOriginalPriceRepository;
        }

        // Expected to have single record on this table only. 
        public async Task<MaterialOriginalPriceDto> GetSingleRecord()
        {
            var singleData = await _bacDBContext.MaterialOriginalPrices.FirstOrDefaultAsync();
            if (singleData == null)
                return null;

            return _mapper.Map<MaterialOriginalPriceModel, MaterialOriginalPriceDto>(singleData);
        }

        public async Task<PageList<MaterialOriginalPriceDto>> GetAll(ParametersCommand parametersCommand)
        {

            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var collection = _materialOriginalPriceRepository.GetAllIQueryable();

            int sourceCount = collection.Count();
            var items = collection.Skip((parametersCommand.PageNumber - 1) * parametersCommand.PageSize).Take(parametersCommand.PageSize).ToList();

            var mappedData = _mapper.Map<List<MaterialOriginalPriceModel>, List<MaterialOriginalPriceDto>>(items);


            return PageList<MaterialOriginalPriceDto>.Create(mappedData, sourceCount, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

    }
}
