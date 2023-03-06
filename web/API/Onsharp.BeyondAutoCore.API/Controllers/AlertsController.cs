namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/alerts/")]
    public class AlertsController : BaseController
    {
        private readonly IAlertService _alertService;
        public AlertsController(IAlertService alertService)
        {
            _alertService = alertService;
        }

        [HttpGet]
        [Route("{userId}", Name = "GetAllAlerts")]
        public async Task<IActionResult> GetAll(long userId, int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "")
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

            var response = await _alertService.GetAllByUserId(userId, parametersCommand);
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
        [Route("{userId}/unreadcount", Name = "GetAllAlertsCount")]
        public async Task<IActionResult> GetAll(long userId)
        {
            var response = await _alertService.GetUnReadCountByUserId(userId);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully get the data." : "Failed generating the data.",
                Data = response
            });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateAlertCommand updateAlertCommand)
        {
            if (updateAlertCommand == null || updateAlertCommand.Id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on update." });

            var response = await _alertService.Update(updateAlertCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully updated alert." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpPut]
        [Route("{id}/read")]
        public async Task<IActionResult> Read(long id)
        {
            if (id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on unread." });

            var response = await _alertService.Read(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Successfully deleted." : "Read failed.",
                Data = response
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on delete." });

            var response = await _alertService.Delete(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Successfully deleted." : "Deletion failed.",
                Data = response
            });
        }

        private string CreateResourceUri(ParametersCommand parametersCommand, ResourceUriTypeEnum resourceUriType)
        {
            switch (resourceUriType)
            {
                case ResourceUriTypeEnum.PreviousPage:
                    return Url.Link("GetAllAlerts", new
                    {
                        pageNumber = parametersCommand.PageNumber - 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });

                case ResourceUriTypeEnum.NextPage:
                    return Url.Link("GetAllAlerts", new
                    {
                        pageNumber = parametersCommand.PageNumber + 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });
                default:
                    return Url.Link("GetAllAlerts", new
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
