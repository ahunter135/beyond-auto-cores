namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/lotitems/")]
    public class LotItemsController : BaseController
    {
        private readonly ILotItemService _lotItemService;
        private readonly ILotItemFullnessService _lotItemFullnessService;
        public LotItemsController(ILotItemService lotItemService, ILotItemFullnessService lotItemFullnessService)
        {
            _lotItemService = lotItemService;
            _lotItemFullnessService = lotItemFullnessService;
        }

        #region CRUD

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateLotItemCommand createLotItemCommand)
        {
            var response = await _lotItemService.Create(createLotItemCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully created lot item." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateLotItemCommand updateLotItemCommand)
        {
            if (updateLotItemCommand == null || updateLotItemCommand.Id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on update." });

            var response = await _lotItemService.Update(updateLotItemCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully updated lot item." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var response = await _lotItemService.GetById(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully get the data." : "Failed generating the data. Message - " + response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        [Route("{id}/fullness", Name = "GetAllLotItemsFullness")]
        public async Task<IActionResult> GetAllLotItemsFullness(long id, int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "")
        {
            var parametersCommand = new ParametersCommand();
            if (pageNumber != null && pageNumber.Value > 0)
                parametersCommand.PageNumber = pageNumber.Value;
            if (pageSize != null && pageSize.Value > 0)
                parametersCommand.PageSize = pageSize.Value;

            if (!string.IsNullOrEmpty(searchCategory) && !string.IsNullOrEmpty(searchQuery))
            {
                parametersCommand.SearchCategory = searchCategory;
                parametersCommand.SearchQuery = searchQuery;
            }

            var response = await _lotItemFullnessService.GetAllByLotItemId(id, parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri(parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri(parametersCommand, ResourceUriTypeEnum.NextPage) : null;

            var paginationMetaData = new
            {
                totalCount = response.TotalCount,
                pageSize = response.PageSize,
                currentPage = response.CurrentPage,
                totalPages = response.TotalPages,
                previousPageLink,
                nextPageLink
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetaData));

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully get the list." : "Failed generating the data.",
                Data = response
            });
        }


        [HttpGet]
        [Route("", Name = "GetAllLotItems")]
        public async Task<IActionResult> GetAll(int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "")
        {
            var parametersCommand = new ParametersCommand();
            if (pageNumber != null && pageNumber.Value > 0)
                parametersCommand.PageNumber = pageNumber.Value;
            if (pageSize != null && pageSize.Value > 0)
                parametersCommand.PageSize = pageSize.Value;

            if (!string.IsNullOrEmpty(searchCategory) && !string.IsNullOrEmpty(searchQuery))
            {
                parametersCommand.SearchCategory = searchCategory;
                parametersCommand.SearchQuery = searchQuery;
            }

            var response = await _lotItemService.GetAllFromRepo(parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri(parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri(parametersCommand, ResourceUriTypeEnum.NextPage) : null;

            var paginationMetaData = new
            {
                totalCount = response.TotalCount,
                pageSize = response.PageSize,
                currentPage = response.CurrentPage,
                totalPages = response.TotalPages,
                previousPageLink,
                nextPageLink
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetaData));

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully get the list." : "Failed generating the data.",
                Data = response
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on delete." });

            var response = await _lotItemService.Delete(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Successfully deleted." : "Deletion failed.",
                Data = response
            });
        }

        #endregion

        private string CreateResourceUri(ParametersCommand parametersCommand, ResourceUriTypeEnum resourceUriType)
        {
            switch (resourceUriType)
            {
                case ResourceUriTypeEnum.PreviousPage:
                    return Url.Link("GetAllLotItems", new
                    {
                        pageNumber = parametersCommand.PageNumber - 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });

                case ResourceUriTypeEnum.NextPage:
                    return Url.Link("GetAllLotItems", new
                    {
                        pageNumber = parametersCommand.PageNumber + 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });
                default:
                    return Url.Link("GetAllLotItems", new
                    {
                        pageNumber = parametersCommand.PageNumber,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });
            }

        }

    }
}
