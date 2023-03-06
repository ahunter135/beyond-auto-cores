using DinkToPdf;
using DinkToPdf.Contracts;

namespace Onsharp.BeyondAutoCore.Infrastructure.Core.Helpers
{
	public  class PdfCreatorHelper
	{

        private IConverter _converter;

        public PdfCreatorHelper(IConverter converter)
        {
            _converter = converter;
        }

        /// <summary>
        /// Return the filename
        /// </summary>
        /// <returns></returns>
        public string CreatePDF(string htmlString, string location, string filename = "")
        {

            string newFileName = filename;
            if (string.IsNullOrWhiteSpace(filename))
                newFileName = "pdfFile_" + DateTime.Now.ToString("MMddyyyyhhmmss") + ".pdf";

            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 20 },
                DocumentTitle = "Invoice PDF",
                Out = location + newFileName
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = htmlString,
                WebSettings = { DefaultEncoding = "utf-8" //, 
                    //UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "assets", "styles.css") 
                },
                HeaderSettings = { },
                FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Right = "Page [page] of [toPage]" }
            };

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            var file = _converter.Convert(pdf);

            //return Ok("Successfully created PDF document.");
            //return File(file, "application/pdf", "EmployeeReport.pdf");
            //return File(file, "application/pdf");

            return globalSettings.Out;
        }

    }
}
