using System.Xml.Serialization;
using Onsharp.BeyondAutoCore.Web.Helpers;

namespace Onsharp.BeyondAutoCore.Web.Controllers
{
    [Authorize]
    public class CodesController : BaseController
    {
        private readonly ILogger<CodesController> _logger;
        private readonly PhotoGradesClient _photoGradesClient;
        private readonly CodesClient _codesClient;
        private Pager _pager;

        public CodesController(IHttpContextAccessor httpContextAccessor, ILogger<CodesController> logger) : base(httpContextAccessor)
        {
            _logger = logger;
            _photoGradesClient = new PhotoGradesClient(Host, Port, EnableSSL, token);
            _codesClient = new CodesClient(Host, Port, EnableSSL, token);
            _pager = new Pager();
        }

        [HttpGet]
        public async Task<IActionResult> Index(bool isGeneric = true)
        {
            var data = await _codesClient.GetPage(isGeneric, "").GetData();
            int length = 5;
            ViewBag.IsGeneric = isGeneric;
            ViewBag.Length = length;
            //return View(data.Where( x=> x.Id != 9999).ToList());
            
            //var data  = await _codesClient.GetAll(isGeneric,"").GetData();
            return View(data.Where( x=> x.Id != 9999).ToList());
        }

        [HttpGet]
        [Route("codes/{id}")]
        public async Task<IActionResult> Detail(long id)
        {
            var response = await _codesClient.GetById(id);

            return Json(response.Data);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUpdate(CreateUpdateCodeCommand model)
        {
            CodeDto response = model.Id == 0 ? await _codesClient.Create(model).GetData() : await _codesClient.Update(model).GetData();

            return Json(new { success = response, id = response.Id, photoGradeId = response.PhotoGradeId });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(long id)
        {
            var data = await _codesClient.DeleteCode(id);

            return Ok(data);
        }

        [HttpGet]
        [Route("codes/jsonlist")]
        public async Task<IActionResult> GetCodesJsonList(string search)
        {
            var data = await _codesClient.GetAll(null, search).GetData();
            return Json((from d in data
                         select new
                         {
                             Id = d.Id,
                             ConverterName = d.ConverterName,
                             Price = d.AdminUnitPrice
                         }).OrderBy(o => o.ConverterName).ToList());                
        }

        [HttpPost]
        [Route("codes/{id}/create-update-photo-grade")]
        public async Task<IActionResult> CreateUpdateCodePhotoGrade(long? id = 0, long? photoGradeId = 0, string? photoGradeItemsToDelete = "")
        {

            try
            {
                bool response = false;

                if (Request.Form != null && Request.Form.Files != null && Request.Form.Files.Count > 0 && (photoGradeId ?? 0) <= 0)
                    response = await _photoGradesClient.CreatePhotoGrade((id ?? 0), false, Request.Form.Files);
                else
                {
                    photoGradeItemsToDelete = photoGradeItemsToDelete ?? "";
                    response = await _photoGradesClient.UpdatePhoto((photoGradeId ?? 0), photoGradeItemsToDelete, Request.Form.Files);
                }
                    
                return Json(new { success = response });

            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }

        }

    }
}