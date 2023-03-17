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

        public CodesController(IHttpContextAccessor httpContextAccessor, ILogger<CodesController> logger) : base(httpContextAccessor)
        {
            _logger = logger;
            _photoGradesClient = new PhotoGradesClient(Host, Port, EnableSSL, token);
            _codesClient = new CodesClient(Host, Port, EnableSSL, token);
        }

        [HttpGet]
        public async Task<IActionResult> Index(bool isGeneric = true)
        {

            // Here we get query params that specify the part of table that will be displayed
            string? pageNumberS = Request.Query["page"];
            string? pageSizeS = Request.Query["size"];
            string? lengthS = Request.Query["length"];
            string? searchQuery = Request.Query["search"];
            string? sortColumn = Request.Query["sortCol"];
            string? direction = Request.Query["direction"];
            int pageNumberI = 1;
            int pageSizeI = 10;
            int lengthI = -1;

            bool needLength = false;
            try
            {
                pageNumberI = pageNumberS == null ? 1 : Int32.Parse(pageNumberS);
                pageSizeI = pageSizeS == null ? 10 : Int32.Parse(pageSizeS);
                lengthI = lengthS == null ? -1 : Int32.Parse(lengthS);
                searchQuery = searchQuery == null ? "" : searchQuery;
                sortColumn = sortColumn == null ? "0" : sortColumn;
                direction = direction == null ? "0" : direction;
            }
            catch (FormatException e)
            {

            }
            finally
            {
                needLength = lengthI < 0;
                pageNumberI = (pageNumberI <= 0) ? 1 : pageNumberI;
                pageSizeI = (pageSizeI <= 0) ? 10 : pageSizeI;
                if (sortColumn != "0" && sortColumn != "1" && sortColumn != "2" && sortColumn != "3") sortColumn = "0";
                if (direction != "0" && direction != "1") direction = "0";
            }
            
            Console.WriteLine($"PageNumber: {pageNumberS}. PageSize: {pageSizeS}. Search: {searchQuery}. Direction: {direction}. SortCol: {sortColumn}");

            var res = await _codesClient.GetPage(isGeneric, searchQuery, pageNumberI, pageSizeI, true, sortColumn, direction);
            var data = res.GetData();
            if (needLength == true)
                ViewBag.Length = Int32.Parse(res.Message);
            else
                ViewBag.Length = lengthI;
            ViewBag.CurrentPage = pageNumberI;
            ViewBag.PageSize = pageSizeI;
            ViewBag.IsGeneric = isGeneric;
            ViewBag.Search = searchQuery;
            ViewBag.SortColumn = sortColumn;
            ViewBag.Direction = direction;
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