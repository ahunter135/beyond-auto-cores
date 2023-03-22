namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/codes/")]
    public class CodesController : BaseController
    {
        private readonly ICodeService _codeService;
        public CodesController(ICodeService codeService)
        {
            _codeService = codeService;
        }
        
        #region CRUD

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCodeCommand createCodeCommand)
        {
            var response = await _codeService.Create(createCodeCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully created code." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateCodeCommand updateCodeCommand)
        {
            if (updateCodeCommand == null || updateCodeCommand.Id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on update." });

            var response = await _codeService.Update(updateCodeCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully updated code." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var response = await _codeService.GetById(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully get the data." : "Failed generating the data. Message - " + response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        [Route("page")]
        public async Task<IActionResult> GetPage(bool? isAdmin, bool? isCustom, int? pageNumber, int? pageSize, string? searchQuery = "", string? searchCategory = "", bool? notIncludePGItem = false, bool needLength = true, string sortCol = "0", string direction = "0")
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

            var response = await _codeService.GetPage(parametersCommand, isAdmin, isCustom, notIncludePGItem, needLength, sortCol, direction);
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
                Message = response != null ? $"{response.TotalEntries}" : "Failed generating the data.",
                Data = response
            });
        }

        
        [HttpGet]
        [Route("", Name = "GetAllCodes")]
        public async Task<IActionResult> GetAll(bool? isAdmin, bool? isCustom, int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "", bool? notIncludePGItem = false)
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

            var response = await _codeService.GetAll(parametersCommand, isAdmin, isCustom, notIncludePGItem);
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

            var response = await _codeService.Delete(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success == 0 ? 0 : 1000,
                Message = response.Success == 1 ? "Successfully deleted." : "Deletion failed.",
                Data = response
            });
        }

        #endregion

        private string CreateResourceUri(ParametersCommand parametersCommand, ResourceUriTypeEnum resourceUriType)
        {
            switch (resourceUriType)
            {
                case ResourceUriTypeEnum.PreviousPage:
                    return Url.Link("GetAllCodes", new
                    {
                        pageNumber = parametersCommand.PageNumber - 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });

                case ResourceUriTypeEnum.NextPage:
                    return Url.Link("GetAllCodes", new
                    {
                        pageNumber = parametersCommand.PageNumber + 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });
                default:
                    return Url.Link("GetAllCodes", new
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
