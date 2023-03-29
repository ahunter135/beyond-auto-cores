//using DinkToPdf;
//using DinkToPdf.Contracts;
using WkHtmlToPdfDotNet;
using WkHtmlToPdfDotNet.Contracts;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class LotService : BaseService, ILotService
    {
        private readonly IMapper _mapper;
        private readonly IConverter _converter;
        private readonly ILotsRepository _lotRepository;
        private readonly IUserService _userService;

        private readonly IOptions<AWSSettingDto> _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        private readonly AwsS3Helper _awsS3Helper;

        public LotService(IHttpContextAccessor httpContextAccessor, IConverter converter,
                          IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client,
                          IMapper mapper, ILotsRepository lotRepository, IUserService userService)
            : base(httpContextAccessor)
        {
            
            _mapper = mapper;
            _converter = converter;
            _lotRepository = lotRepository;
            _userService = userService;

            _awsSettings = awsSettings;
            _aws3Client = aws3Client;
            _awsS3Helper = new AwsS3Helper(_awsSettings, _aws3Client);
        }

        public async Task<LotDto> Create(CreateLotCommand createCommand)
        {

            var newLot = _mapper.Map<CreateLotCommand, LotModel>(createCommand);

            newLot.CreatedBy = this.CurrentUserId();
            newLot.CreatedOn = DateTime.UtcNow;

            _lotRepository.Add(newLot);
            _lotRepository.SaveChanges();

            return _mapper.Map<LotModel, LotDto>(newLot);

        }

        public async Task<LotDto> Update(UpdateLotCommand updateCommand)
        {
            var currenData = await _lotRepository.GetByIdAsync(updateCommand.Id);

            currenData.LotName = updateCommand.LotName;
           
            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _lotRepository.Update(currenData);
            _lotRepository.SaveChanges();

            return _mapper.Map<LotModel, LotDto>(currenData);
        }

        public async Task<LotDto> GetById(long id)
        {
            var singleData = await _lotRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new LotDto() { Success = false, Message = "Lot does not exist." };

            var mapData = _mapper.Map<LotModel, LotDto>(singleData);
            if (!string.IsNullOrWhiteSpace(mapData.PhotoAttachmentFileKey))
                mapData.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(mapData.PhotoAttachmentFileKey);

            return mapData;
        }

        public async Task<PageList<LotModel>> GetAllFromRepo(ParametersCommand parametersCommand)
        {
            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var collection = _lotRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false);

            var currentUser =  await _userService.GetById(this.CurrentUserId());

            if (currentUser != null && currentUser.Role == RoleEnum.User)
                collection = collection.Where(w => w.CreatedBy == this.CurrentUserId());

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "lotname" &&
                !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                collection = collection.Where(w => w.LotName.Contains(parametersCommand.SearchQuery));
            }

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "issubmitted" &&
              !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                bool isSubmittedValue = false;
                bool.TryParse(parametersCommand.SearchQuery, out isSubmittedValue);
                collection = collection.Where(w => w.IsSubmitted == isSubmittedValue);
            }

            collection = collection.OrderBy(o => o.LotName);

            return PageList<LotModel>.Create(collection, parametersCommand.PageNumber, parametersCommand.PageSize);
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _lotRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _lotRepository.Update(singleData);
            _lotRepository.SaveChanges();

            return true;
        }

        public async Task<PageList<InventorySummaryDto>> GetInventorySummary(ParametersCommand parametersCommand)
        {
            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var parameters = await CreateSqlParameter(parametersCommand);
            var listData = await _lotRepository.GetInventorySummary(parameters);
            var currentUser = await _userService.GetById(this.CurrentUserId());

            if (currentUser != null)
                listData = listData.FindAll(w => w.CreatedBy == this.CurrentUserId()).ToList();

            var pageListData = PageList<InventorySummaryDto>.Create(listData, parametersCommand.PageNumber, parametersCommand.PageSize);

            return pageListData;
        }

        public async Task<PageList<InventoryDto>> GetInventory(ParametersCommand parametersCommand)
        {
            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var parameters = await CreateSqlParameter(parametersCommand);
            var listData = await _lotRepository.GetInventories(parameters);

            var currentUser = await _userService.GetById(this.CurrentUserId());
            if (currentUser != null && currentUser.Role == RoleEnum.User)
                listData = listData.Where(w => w.CreatedBy == this.CurrentUserId()).ToList();

            var pageListData = PageList<InventoryDto>.Create(listData, parametersCommand.PageNumber, parametersCommand.PageSize);
            foreach (var pageItem in pageListData)
            {
                if (!string.IsNullOrWhiteSpace(pageItem.FileKey))
                    pageItem.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(pageItem.FileKey);
            }

            return pageListData;
        }

        private async Task<List<SqlParameter>> CreateSqlParameter(ParametersCommand parametersCommand)
        {
            var parameters = new List<SqlParameter>();

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "lotid" &&
               !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                long lotId = 0;
                long.TryParse(parametersCommand.SearchQuery, out lotId);
                parameters.Add(new SqlParameter("@lotId", System.Data.SqlDbType.BigInt) { Direction = System.Data.ParameterDirection.Input, Value = lotId });
            }
            else
                parameters.Add(new SqlParameter("@lotId", System.Data.SqlDbType.BigInt) { Direction = System.Data.ParameterDirection.Input, Value = (long)0 });


            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "lotname" &&
              !string.IsNullOrEmpty(parametersCommand.SearchQuery))
                parameters.Add(new SqlParameter("@lotName", System.Data.SqlDbType.NVarChar) { Direction = System.Data.ParameterDirection.Input, Value = parametersCommand.SearchQuery });
            else
                parameters.Add(new SqlParameter("@lotName", System.Data.SqlDbType.NVarChar) { Direction = System.Data.ParameterDirection.Input, Value = "" });

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "issubmitted" &&
              !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                bool isSubmittedValue = false;
                bool.TryParse(parametersCommand.SearchQuery, out isSubmittedValue);
                parameters.Add(new SqlParameter("@isSubmitted", System.Data.SqlDbType.NVarChar) { Direction = System.Data.ParameterDirection.Input, Value = isSubmittedValue });
            }
            else
                parameters.Add(new SqlParameter("@isSubmitted", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = DBNull.Value });

            return parameters;
        }

        public async Task<ResponseDto> SubmitLot(SubmitLotCommand submitLotCommand)
        {

            var result = new ResponseDto();
            var invoiceNo = DateTime.UtcNow.ToString("yyMMddhhmmssfff"); 

            var currenData = await _lotRepository.GetByIdAsync(submitLotCommand.LotId);
            long userId = this.CurrentUserId();

            #region validation

            if (currenData == null)
            {
                result.Success = 0;
                result.Message = "Invalid Lot.";
                return result;
            }

            if (currenData.IsSubmitted)
            {
                result.Success = 0;
                result.Message = "Lot already submitted.";
                return result;
            }

            var parametersCommand = new ParametersCommand();
            var lotItems = await GetLotInvoice(submitLotCommand.LotId, parametersCommand);
            if (lotItems == null || lotItems.Count <= 0)
            {
                result.Success = 0;
                result.Message = "Invalid Lot items.";
                return result;
            }

            #endregion validation

            bool uploadResult = false;
            string fileKey = "";
            string logoFileName = "";
            if (submitLotCommand.PhotoAttachment != null && submitLotCommand.PhotoAttachment.FileName != "none")
            {
                //try
                //{
                    logoFileName = submitLotCommand.PhotoAttachment.FileName;
                    fileKey = "lotAttachement_" + DateTime.Now.ToString("yyyyMMddhhmmssfff") + "_" + submitLotCommand.PhotoAttachment.FileName;
                    uploadResult = await _awsS3Helper.UploadFileAsync(submitLotCommand.PhotoAttachment, _awsSettings.Value.Bucket, fileKey);
                    uploadResult = true;
                //}
                //catch (Exception ex)
                //{
                    //uploadResult = false;
                //}
            }
            Console.WriteLine($"UploadResult: {uploadResult}");

            if (!uploadResult)
            {
                fileKey = "";
                logoFileName = "";
            }

            if (!string.IsNullOrWhiteSpace(logoFileName))
            {
                currenData.PhotoAttachmentFileKey = fileKey;
                currenData.PhotoAttachment = logoFileName;
            }

            currenData.IsSubmitted = true;
            currenData.InvoiceNo = invoiceNo;
            currenData.Email = submitLotCommand.Email;
            currenData.BusinessName = submitLotCommand.BusinessName;
            currenData.SubmittedBy = userId;
            currenData.SubmittedDate = DateTime.UtcNow;

            currenData.UpdatedBy = userId;
            currenData.UpdatedOn = DateTime.UtcNow;

            _lotRepository.Update(currenData);
            _lotRepository.SaveChanges();

            var fileUrl = !string.IsNullOrEmpty(fileKey) ? await _awsS3Helper.GetPreSignedUrlAsync(fileKey) : string.Empty;
            Console.WriteLine($"This is the url: {fileUrl}");

            return await SendLotItemsInvoice(currenData.LotName, invoiceNo, submitLotCommand, lotItems, fileUrl);
        }

        public async Task<PageList<InvoiceDto>> GetLotInvoice(long lotId, ParametersCommand parametersCommand)
        {
            var parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@lotId", System.Data.SqlDbType.BigInt) { Direction = System.Data.ParameterDirection.Input, Value = lotId });

            var listData = await _lotRepository.GetLotInvoices(parameters);

            var pageListData = PageList<InvoiceDto>.Create(listData, parametersCommand.PageNumber, parametersCommand.PageSize);
            return pageListData;
        }

        decimal _totalUnits = 0;
        decimal _total = 0;
        decimal _averagePrice = 0;
        public async Task<ResponseDto> SendLotItemsInvoice(string lotName, string invoiceNo, SubmitLotCommand submitLotCommand, List<InvoiceDto> lotItems, string fileUrl = "")
        {

            var result = new ResponseDto();
            var smtpSetting = new SMTPConfig();

            if (lotItems == null || lotItems.Count <= 0)
            {
                result.Success = 0;
                result.Message = "Lot items is empty.";
                return result;
            }

            var composedHtml = ComposedInvoiceHtml(smtpSetting.SiteDomain, submitLotCommand.Email, lotName, invoiceNo, lotItems, fileUrl);
            Console.WriteLine($"Composed HTML: {composedHtml}");

            var pdfConfig = new PdfConfig();
            var location = pdfConfig.SaveLocation;
            Console.WriteLine($"Save to: {location}");
            bool exists = System.IO.Directory.Exists(location);
            if (!exists)
                System.IO.Directory.CreateDirectory(location);

            var pdfFileName = "invoice_" + invoiceNo + ".pdf";

            if (!string.IsNullOrWhiteSpace(submitLotCommand.BusinessName))
                pdfFileName = submitLotCommand.BusinessName + " - " + invoiceNo + ".pdf";
            var pdfCreatorHelper = new PdfCreatorHelper(_converter);
            var pdfFilename = pdfCreatorHelper.CreatePDF(composedHtml, location, pdfFileName);
            var pdfFileLocation = location = pdfFilename;
            Console.WriteLine($"PDF file name: {pdfFileName}");
            string fromEmail = smtpSetting.Email;
            string subject = $"{lotName} PDF Copy ";
            string emailbody = ComposedEmailBody(invoiceNo, submitLotCommand.Email, smtpSetting.SiteDomain);

            bool emailResult = await EmailHelper.SendEmail(submitLotCommand.Email, fromEmail, subject, emailbody, isBodyHtml: true, attachmentFileName: pdfFileLocation);

            result.Success = 1;
            if (emailResult)
                result.Message = "Lot submitted and email successfully sent.";
            else
                result.Message = "Lot submitted but email failed.";

            return result;
        }

        private string ComposedEmailBody(string invoice, string email, string siteDomain)
        {
            string htmlFullBody = File.ReadAllText(@"HtmlTemplates/SubmitEmailTemplate.html");
            htmlFullBody = String.Format(@htmlFullBody, invoice, email, _totalUnits.ToString("#,##0.#0"), _averagePrice.ToString("#,##0.#0"), _total.ToString("#,##0.#0"), siteDomain);

            return htmlFullBody;
        }

        private string ComposedInvoiceHtml(string siteDomain, string buyer, string lotName, string invoiceNo, List<InvoiceDto> listItems, string fileUrl = "")
        {

            if (listItems == null || listItems.Count <= 0)
                return "";

            string htmlRow = @"<tr style='border: 1px solid black;'>
			                        <td style='border: 1px solid black; text-align: left; padding: 4 8 4 8;'>{0}</td>
			                        <td style='border: 1px solid black; text-align: center; padding: 4 8 4 8;'>{1}</td>
			                        <td style='border: 1px solid black; text-align: center; padding: 4 8 4 8;'>{2}</td>
			                        <td style='border: 1px solid black; text-align: right; padding: 4 8 4 8;'>{3}</td>
		                        </tr>";

            
            int rowCount = 0;
            decimal totalUnitPrice = 0;
           

            string htmlRowList = string.Empty;
            foreach (var item in listItems)
            {
                rowCount++;

                _totalUnits += (item.Quantity ?? 0);
                totalUnitPrice += (item.UnitPrice ?? 0);

                decimal itemUnitPrice = item.UnitPrice ?? 0;
                decimal currentTotal = (item.UnitPrice ?? 0) * (item.Quantity ?? 0);

                _total += currentTotal;

                htmlRowList = htmlRowList + string.Format(htmlRow, item.ConverterName, item.Quantity, itemUnitPrice.ToString("#,##0.#0"), currentTotal.ToString("#,##0.#0"));
            }
            Console.WriteLine($"HTML row List: {htmlRowList}");

            string htmlFullBody = File.ReadAllText(@"HtmlTemplates/InvoiceTemplate.html");

            if (_total > 0 && _totalUnits > 0)
                _averagePrice = _total / _totalUnits;

            htmlFullBody = String.Format(@htmlFullBody, lotName, invoiceNo, htmlRowList, _totalUnits, _averagePrice.ToString("#,##0.0#"), _total.ToString("#,##0.#0"), buyer, siteDomain);

            if (!string.IsNullOrEmpty(fileUrl))
            {
                htmlFullBody += string.Format("<div><img width=\"250px\" style=\"padding: 25px;\" src=\"{0}\"/></div>", fileUrl);
            }
            Console.WriteLine($"HTML full body: {htmlFullBody}");
            return htmlFullBody;
        }

    }
}
