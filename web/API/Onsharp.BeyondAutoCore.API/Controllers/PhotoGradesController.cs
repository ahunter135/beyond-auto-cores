namespace Onsharp.BeyondAutoCore.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/v1/photogrades/")]
    public class PhotoGradesController : BaseController
    {
        private readonly IPhotoGradeService _photoGradeService;
        private readonly IPhotoGradeItemService _photoGradeItemService;
        
        public PhotoGradesController(IPhotoGradeService photoGradeService, IPhotoGradeItemService photoGradeItemService)
        {
            _photoGradeService = photoGradeService;
            _photoGradeItemService = photoGradeItemService;
        }

        #region CRUD

        [HttpPost]
        public async Task<IActionResult> Upload(List<IFormFile> photoGrades, int fullNess = 0, string? comments = "", long? codeId = 0, bool? sendEmailNotification = true)
        {
            var command = new CreatePhotoGradeCommand();
            command.PhotoGrades = photoGrades;
            command.Fullness = fullNess;
            command.Comments = comments ?? "";
            command.CodeId = codeId ?? 0;
            command.SendNotification = sendEmailNotification ?? true;

            var response = await _photoGradeService.Create(command);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully uploaded PhotoGrade." : response.Message,
                Data = response
            });
        }

        [HttpPut]
        public async Task<IActionResult> UploadPhoto(long id, string? photoGradeItemsToDelete = "", List<IFormFile>? photoGrades = null)
        {
            List<long> photoGradeItems = new List<long>();
            if (!string.IsNullOrWhiteSpace(photoGradeItemsToDelete))
            {
                List<string> stringListItems = new List<String>(photoGradeItemsToDelete.Split(','));

                foreach (string item in stringListItems)
                {
                    long itemId = 0;
                    if (long.TryParse(item, out itemId))
                        photoGradeItems.Add(itemId);
                }
            }

            var command = new UpdatePhotoCommand();
            command.Id = id;
            command.PhotoGrades = photoGrades;
            command.PhotoGradeItemsToDelete = photoGradeItems;

            var response = await _photoGradeService.UpdatePhoto(command);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response != null ? 1 : 0,
                ErrorCode = response != null ? 0 : 1000,
                Message = response != null ? "Successfully uploaded PhotoGrade." : "Failed uploading photos.",
                Data = response
            });
        }

        [HttpPut]
        [Route("converter")]
        public async Task<IActionResult> GradeConverter(GradeConverterCommand updateCommand)
        {
            if (updateCommand == null || updateCommand.Id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on update." });

            var response = await _photoGradeService.UpdateGrade(updateCommand);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "PhotoGrade successfully updated." : response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpGet]
        [Route("", Name = "GetAllPhotoGrades")]
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

            var response = await _photoGradeService.GetAll(parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri("GetAllPhotoGrades", parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri("GetAllPhotoGrades", parametersCommand, ResourceUriTypeEnum.NextPage) : null;

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
        [Route("completed", Name = "GetAllPhotoGradesCompleted")]
        public async Task<IActionResult> GetAllPhotoGradesCompleted(int? pageNumber, int? pageSize, string? searchCategory = "", string? searchQuery = "")
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

            var response = await _photoGradeService.GetAllCompleted(parametersCommand);
            var previousPageLink = response.HasPrevious ? CreateResourceUri("GetAllPhotoGradesCompleted", parametersCommand, ResourceUriTypeEnum.PreviousPage) : null;
            var nextPageLink = response.HasNext ? CreateResourceUri("GetAllPhotoGradesCompleted", parametersCommand, ResourceUriTypeEnum.NextPage) : null;

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
        [Route("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var response = await _photoGradeService.GetById(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response.Success ? 1 : 0,
                ErrorCode = response.Success ? 0 : 1000,
                Message = response.Success ? "Successfully get the data." : "Failed generating the data. Message - " + response.Message,
                Data = response.Success ? response : null
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            if (id == 0)
                return Ok(new ResponseRecordDto<object> { Success = 0, Message = "Id is required on delete." });

            var response = await _photoGradeService.Delete(id);

            return Ok(new ResponseRecordDto<object>
            {
                Success = response ? 1 : 0,
                ErrorCode = response ? 0 : 1000,
                Message = response ? "Successfully deleted." : "Deletion failed.",
                Data = response
            });
        }

        #endregion CRUD

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPublicUrlAsync(string fileKey)
        {
            var result = await _photoGradeItemService.GetPreSignedUrlAsync(fileKey);

            return Ok(result);
        }

        private string CreateResourceUri(string routename, ParametersCommand parametersCommand, ResourceUriTypeEnum resourceUriType)
        {
            switch (resourceUriType)
            {
                case ResourceUriTypeEnum.PreviousPage:
                    return Url.Link(routename, new
                    {
                        pageNumber = parametersCommand.PageNumber - 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });

                case ResourceUriTypeEnum.NextPage:
                    return Url.Link(routename, new
                    {
                        pageNumber = parametersCommand.PageNumber + 1,
                        pageSize = parametersCommand.PageSize,
                        searchCategory = parametersCommand.SearchCategory ?? "",
                        searchQuery = parametersCommand.SearchQuery ?? ""
                    });
                default:
                    return Url.Link(routename, new
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
