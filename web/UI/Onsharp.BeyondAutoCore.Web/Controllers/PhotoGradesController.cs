
namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    [Authorize]
    public class PhotoGradesController : BaseController
    {
        
        private readonly ILogger<CodesController> _logger;
        private readonly PhotoGradesClient _photoGradesClient;
        private readonly CodesClient _codesClient;

        public PhotoGradesController(IHttpContextAccessor httpContextAccessor, ILogger<CodesController> logger) : base(httpContextAccessor)
        {
            _logger = logger;
            _photoGradesClient = new PhotoGradesClient(Host, Port, EnableSSL, token);
            _codesClient = new CodesClient(Host, Port, EnableSSL, token);
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var data = await _photoGradesClient.GetAll();
            return View(data);
        }

        [HttpGet]
        [Route("photogrades/{id}")]
        public async Task<IActionResult> Detail(long id)
        {
            var response = await _photoGradesClient.GetById(id);
            if (response != null && response.Data != null && response.Data.CodeId.HasValue &&  response.Data.CodeId != 0)
            {
                var codeInfo = await _codesClient.GetById(response.Data.CodeId.Value);
                if (codeInfo != null && codeInfo.Data != null)
                    response.Data.ConverterName = codeInfo.Data.ConverterName;
                else
                    response.Data.ConverterName = String.Empty;
            }

            return Json(response.Data);
        }

        [HttpPut]
        public async Task<IActionResult> Update(UpdatePhotoGradeCommand model)
        {
            var response = await _photoGradesClient.Update(model);
            return Json(new { success = response.Success, data = response.Data });
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteByStatusUpdate(long id)
        {
            var photogridDetail = await _photoGradesClient.GetById(id);
            var model = new UpdatePhotoGradeCommand();

            if (photogridDetail.Success && photogridDetail.Data != null)
            {
                model.Id = id;
                model.PhotoGradeStatus = 2;
                model.Comments = photogridDetail.Data.Comments ?? "";
                model.Price = photogridDetail.Data.Price;
            }

            var response = await _photoGradesClient.Update(model);
            return Json(new { success = response.Success, data = response.Data });
        }

    }
}
