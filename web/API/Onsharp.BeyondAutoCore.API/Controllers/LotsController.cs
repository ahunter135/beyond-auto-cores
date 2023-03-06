namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/lots/")]
    public class LotsController : BaseController
    {
        private readonly ILotService _lotService;
        private readonly ILotItemService _lotItemService;
        public LotsController(ILotService lotService, ILotItemService lotItemService)
        {
            _lotService = lotService;
            _lotItemService = lotItemService;
        }


        #region CRUD

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateLotCommand createLotCommand)
        {
            var response = await _lotService.Create(createLotCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully created lot." : response.Message,
                Data = response
            });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateLotCommand updateLotCommand)
        {
            try
            {
                if (updateLotCommand == null || updateLotCommand.Id == 0)
                    return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on update." });

                var response = await _lotService.Update(updateLotCommand);

                return Ok(new ResponseRecordDto<object>
                {
                    Success = response.Success ? 1 : 0,
                    ErrorCode = response.Success ? 0 : 1000,
                    Message = response.Success ? "Successfully updated lot." : response.Message,
                    Data = response
                });
            }
            catch (Exception ex)
            {
                return Ok(new ResponseRecordDto<object>
                {
                    Success = 0,
                    ErrorCode = 1000,
                    Message = "Lots creation failed. Error: " + ex.Message,
                    Data = null
                });
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var response = await _lotService.GetById(id);


            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully get the data." : "Failed generating the data. Message - " + response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        [Route("{id}/items", Name = "GetLotItems")]
        public async Task<IActionResult> GetLotItems(long id, int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "")
        {
            var parametersCommand = new ParametersCommand();
            if (pageNumber != null && pageNumber.Value > 0 )
                parametersCommand.PageNumber = pageNumber.Value;
            if (pageSize != null && pageSize.Value > 0)
                parametersCommand.PageSize = pageSize.Value;

            if (!string.IsNullOrEmpty(searchCategory) && !string.IsNullOrEmpty(searchQuery))
            {
                parametersCommand.SearchCategory = searchCategory;
                parametersCommand.SearchQuery = searchQuery;
            }

            var response = await _lotItemService.GetAllByLotId(id, parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri("GetLotItems", parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri("GetLotItems", parametersCommand, ResourceUriTypeEnum.NextPage) : null;

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
        [Route("", Name = "GetAllLots")]
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

            var response = await _lotService.GetAllFromRepo(parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri("GetAllLots", parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri("GetAllLots", parametersCommand, ResourceUriTypeEnum.NextPage) : null;

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

            var response = await _lotService.Delete(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Successfully deleted." : "Deletion failed.",
                Data = response
            });
        }

        #endregion CRUD

        [HttpGet]
        [Route("inventorysummary", Name = "GetInventorySummary")]
        public async Task<IActionResult> GetInventoryList(int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "")
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

            var response = await _lotService.GetInventorySummary(parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri("GetInventorySummary", parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri("GetInventorySummary", parametersCommand, ResourceUriTypeEnum.NextPage) : null;

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
        [Route("inventory", Name = "GetInventory")]
        public async Task<IActionResult> GetInventory(int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "")
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

            var response = await _lotService.GetInventory(parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri("GetInventory", parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri("GetInventory", parametersCommand, ResourceUriTypeEnum.NextPage) : null;

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

        [HttpPost]
        [Route("submit")]
        public async Task<IActionResult> Submit(IFormFile? attachment, long lotId, string email, string? businessName)
        {
            var submitLotCommand = new SubmitLotCommand();
            submitLotCommand.LotId = lotId;
            submitLotCommand.Email = email;
            submitLotCommand.BusinessName = businessName;
            submitLotCommand.PhotoAttachment = attachment;

            var response = await _lotService.SubmitLot(submitLotCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success,
                ErrorCode = response.Success,
                Message = response.Success == 1 ? "Successfully submitted lot." : response.Message,
                Data = response.Success == 1 ? response : null
            });
        }

        [HttpGet]
        [Route("{id}/invoice", Name = "GetInvoice")]
        public async Task<IActionResult> GetInvoice(long id, int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "")
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

            var response = await _lotService.GetLotInvoice(id, parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri("GetInvoice", parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri("GetInvoice", parametersCommand, ResourceUriTypeEnum.NextPage) : null;
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

        private string CreateResourceUri(string routeName, ParametersCommand parametersCommand, ResourceUriTypeEnum resourceUriType)
        {
            switch (resourceUriType)
            {
                case ResourceUriTypeEnum.PreviousPage:
                    return Url.Link(routeName, new
                    {
                        pageNumber = parametersCommand.PageNumber - 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });

                case ResourceUriTypeEnum.NextPage:
                    return Url.Link(routeName, new
                    {
                        pageNumber = parametersCommand.PageNumber + 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });
                default:
                    return Url.Link(routeName, new
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
