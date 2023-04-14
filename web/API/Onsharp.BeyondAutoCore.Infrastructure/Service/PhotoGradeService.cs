using System.Text;

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class PhotoGradeService : BaseService, IPhotoGradeService
    {
        private readonly IMapper _mapper;
        private readonly IAlertService _alertService;
        private readonly IGradeCreditService _gradeCreditService;
        private readonly IPhotoGradesRepository _photoGradesRepository;
        private readonly IPhotoGradeItemService _photoGradeItemService;
        private readonly IUserService _userService;

        private readonly IOptions<AWSSettingDto> _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        private readonly AwsS3Helper _awsS3Helper;

        public PhotoGradeService(IHttpContextAccessor httpContextAccessor, 
                                 IMapper mapper, IAlertService alertService, IGradeCreditService gradeCreditService, 
                                 IUserService userService, IPhotoGradesRepository photoGradesRepository,
                                 IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client,
                                 IPhotoGradeItemService photoGradeItemService)
            : base(httpContextAccessor)
        {
            _mapper = mapper;
            _alertService = alertService;
            _gradeCreditService = gradeCreditService;

            _photoGradesRepository = photoGradesRepository;
            _photoGradeItemService = photoGradeItemService;
            _userService = userService;

            _awsSettings = awsSettings;
            _aws3Client = aws3Client;
            _awsS3Helper = new AwsS3Helper(_awsSettings, _aws3Client);
        }

        #region CRUD

        public async Task<PhotoGradeDto> Create(CreatePhotoGradeCommand createCommand)
        {
            string userEmail = string.Empty;
            var currentUser = await _userService.GetById(this.CurrentUserId());
            if (currentUser != null)
                userEmail = currentUser.Email;

            if (currentUser != null && currentUser.Role != RoleEnum.Admin)
            {
                decimal currentTotalGradeCredits = await _gradeCreditService.GetTotalByUserId(currentUser.Id);
                if (currentTotalGradeCredits <= 0)
                {
                    return new PhotoGradeDto() { Success = false, Message = "Not enough grade credits available." };
                }
            }

            var newPhotoGrade = new PhotoGradeModel();

            if (createCommand.CodeId != 0)
                newPhotoGrade.CodeId = createCommand.CodeId;

            newPhotoGrade.RequesterId = this.CurrentUserId();
            newPhotoGrade.Comments = createCommand.Comments;
            newPhotoGrade.Fullness = createCommand.Fullness;
            newPhotoGrade.DateRequested = DateTime.UtcNow;
            newPhotoGrade.PhotoGradeStatus = (int)PhotoGradeStatusEnum.InReview;
            newPhotoGrade.Price = 0;
            newPhotoGrade.CreatedBy = this.CurrentUserId();
            newPhotoGrade.CreatedOn = DateTime.UtcNow;

            _photoGradesRepository.Add(newPhotoGrade);
            _photoGradesRepository.SaveChanges();

            var photoGradesItems = await _photoGradeItemService.Create(newPhotoGrade.Id, createCommand.PhotoGrades);

            if (createCommand.SendNotification)
            {
                if (!string.IsNullOrWhiteSpace(userEmail))
                    await SendUserNotification(userEmail);

                await SendAdminNotification();
            }

            var createGradeCreditCommand = new CreateGradeCreditCommand();
            createGradeCreditCommand.Credit = -1;
            createGradeCreditCommand.UserId = currentUser.Id;

            await _gradeCreditService.Create(createGradeCreditCommand);
            
            decimal latestTotalGradeCredits = await _gradeCreditService.GetTotalByUserId(currentUser.Id);

            if (latestTotalGradeCredits <= 0)
            {
                CreateAlertCommand alertCommand = new CreateAlertCommand();
                alertCommand.AlertType = (int)AlertTypeEnum.GradeCreditZero;
                alertCommand.PhotoGradeId = 0;
                alertCommand.PhotoGradeUserId = 0;
                alertCommand.Status = (int)AlertStatusEnum.Unread;
                alertCommand.Title = "Zero Available Grade Credits Remaining";
                alertCommand.DateSent = DateTime.UtcNow;
                alertCommand.Message = $@"You have 0 available grade credits remaining. You may visit your web profile to purchase more credits.";

                await _alertService.Create(alertCommand);
            }

            var photoGrade = _mapper.Map<PhotoGradeModel, PhotoGradeDto>(newPhotoGrade);
            photoGrade.PhotoGradeItems = photoGradesItems;
            photoGrade.GradeCredits = latestTotalGradeCredits;

            return photoGrade;
        }

        public async Task<PageList<PhotoGradeItemDto>> UpdatePhoto(UpdatePhotoCommand updatePhotoCommand)
        {
            var photoGradesItems = await _photoGradeItemService.Create(updatePhotoCommand.Id, updatePhotoCommand.PhotoGrades, updatePhotoCommand.PhotoGradeItemsToDelete);
            var pageListData = PageList<PhotoGradeItemDto>.Create(photoGradesItems, 1, int.MaxValue);

            return pageListData;

        }

        public async Task<PhotoGradeDto> UpdateGrade(GradeConverterCommand updateCommand)
        {
            string userEmail = string.Empty;
           

            var currenData = await _photoGradesRepository.GetByIdAsync(updateCommand.Id);

            if (currenData == null)
                return new PhotoGradeDto() { Success = false, Message = "PhotoGrade does not exists." };

            if (!Enum.IsDefined(typeof(PhotoGradeStatusEnum), updateCommand.PhotoGradeStatus))
                return new PhotoGradeDto() { Success = false, Message = "Invalid Photograde status." };

            if (updateCommand.PhotoGradeStatus == 1) {
                var currentUser = await _userService.GetById(currenData.CreatedBy);
                if (currentUser != null)
                    userEmail = currentUser.Email;
                if (!string.IsNullOrWhiteSpace(userEmail))
                        await SendUserNotificationApproved(userEmail);
            }
            
            currenData.PhotoGradeStatus = updateCommand.PhotoGradeStatus;
            currenData.Price = updateCommand.Price;
            currenData.Comments = string.Format("{0}",updateCommand.Comments);
            currenData.CodeId = updateCommand.CodeId;

            currenData.UpdatedBy = this.CurrentUserId();
            currenData.UpdatedOn = DateTime.UtcNow;

            _photoGradesRepository.Update(currenData);
            _photoGradesRepository.SaveChanges();

            await CreateAlert(currenData, updateCommand);

            var photoGradeItems = await _photoGradeItemService.GetAllByPhotoGradeId(currenData.Id);
            await GetGradeItemsList(photoGradeItems);

            var photoGrade = _mapper.Map<PhotoGradeModel, PhotoGradeDto>(currenData);
            photoGrade.PhotoGradeItems = photoGradeItems;

            return photoGrade;
        }

        private async Task<bool> CreateAlert(PhotoGradeModel photoGrade, GradeConverterCommand updateCommand)
        {
            CreateAlertCommand alertCommand = new CreateAlertCommand();
            alertCommand.AlertType = (int)AlertTypeEnum.PhotoGradeReview;
            alertCommand.PhotoGradeId = photoGrade.Id;
            alertCommand.PhotoGradeUserId = photoGrade.CreatedBy;
            alertCommand.Status = (int)AlertStatusEnum.Unread;
            alertCommand.Title = "Photo Grade Review";
            alertCommand.DateSent = DateTime.UtcNow;
            alertCommand.Message = $@"Your Photo grade request:  Status: {((PhotoGradeStatusEnum)updateCommand.PhotoGradeStatus).ToString()}, Price: {updateCommand.Price.ToString("#,##0.#0")}, Comment: {updateCommand.Comments}";

            await _alertService.Create(alertCommand);

            return true;
        }

        public async Task<PhotoGradeDto> GetById(long id)
        {
            var singleData = await _photoGradesRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new PhotoGradeDto() { Success = false, Message = "Photograde does not exist." };

            var photoGridData = _mapper.Map<PhotoGradeModel, PhotoGradeDto>(singleData);
            photoGridData.Comments = string.Format("{0}", photoGridData.Comments);
            var photoGradeItems = await _photoGradeItemService.GetAllByPhotoGradeId(id);

            await GetGradeItemsList(photoGradeItems);

            photoGridData.PhotoGradeItems = photoGradeItems;

            return photoGridData;
        }

        private async Task<bool> GetGradeItemsList(List<PhotoGradeItemDto> photoGradeItemList)
        {
            foreach (var photoItem in photoGradeItemList)
            {
                if (!string.IsNullOrWhiteSpace(photoItem.FileKey))
                    photoItem.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(photoItem.FileKey);
            }

            return true;
        }


        public async Task<PageList<PhotoGradeListDto>> GetAll(ParametersCommand parametersCommand)
        {

            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var parameters = new List<SqlParameter>();

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "photogradestatus" &&
              !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                int photoGradeStatus = 0;
                if (int.TryParse(parametersCommand.SearchQuery, out photoGradeStatus))
                    parameters.Add(new SqlParameter("@photoGradeStatus", System.Data.SqlDbType.NVarChar) { Direction = System.Data.ParameterDirection.Input, Value = photoGradeStatus });
                else
                    parameters.Add(new SqlParameter("@photoGradeStatus", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = DBNull.Value });
            }
            else
                parameters.Add(new SqlParameter("@photoGradeStatus", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = DBNull.Value });

            return await GetPhotoGradesFromSP(parametersCommand, parameters, false);
        }

        public async Task<PageList<PhotoGradeListDto>> GetAllCompleted(ParametersCommand parametersCommand)
        {

            if (parametersCommand == null)
                throw new ArgumentNullException("Invalid parameters.");

            var parameters = new List<SqlParameter>();

            if (!string.IsNullOrEmpty(parametersCommand.SearchCategory) && parametersCommand.SearchCategory.ToLower() == "photogradestatus" &&
              !string.IsNullOrEmpty(parametersCommand.SearchQuery))
            {
                int photoGradeStatus = 0;
                if (int.TryParse(parametersCommand.SearchQuery, out photoGradeStatus))
                    parameters.Add(new SqlParameter("@photoGradeStatus", System.Data.SqlDbType.NVarChar) { Direction = System.Data.ParameterDirection.Input, Value = photoGradeStatus });
                else
                    parameters.Add(new SqlParameter("@photoGradeStatus", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = DBNull.Value });
            }
            else
                parameters.Add(new SqlParameter("@photoGradeStatus", System.Data.SqlDbType.Bit) { Direction = System.Data.ParameterDirection.Input, Value = DBNull.Value });


            return await GetPhotoGradesFromSP(parametersCommand, parameters, true);
        }

        private async Task<PageList<PhotoGradeListDto>> GetPhotoGradesFromSP(ParametersCommand parametersCommand, List<SqlParameter> parameters, bool isCompletedOnly)
        {
            long currentUserId = this.CurrentUserId();
            parameters.Add(new SqlParameter("@userId", System.Data.SqlDbType.BigInt) { Direction = System.Data.ParameterDirection.Input, Value = currentUserId });
            
            var listData = await _photoGradesRepository.GetPhotoGrades(parameters);
            if (isCompletedOnly)
                listData = listData.Where(w => w.PhotoGradeStatus == PhotoGradeStatusEnum.Approved || w.PhotoGradeStatus == PhotoGradeStatusEnum.Rejected).ToList();

            var pageListData = PageList<PhotoGradeListDto>.Create(listData, parametersCommand.PageNumber, parametersCommand.PageSize);
            foreach (var pageItem in pageListData)
            {
                if (!string.IsNullOrWhiteSpace(pageItem.FileKey))
                    pageItem.FileUrl = await _awsS3Helper.GetPreSignedUrlAsync(pageItem.FileKey);
            }

            return pageListData;
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _photoGradesRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _photoGradesRepository.Update(singleData);
            _photoGradesRepository.SaveChanges();

            return true;
        }
        #endregion CRUD

        private async Task<bool> SendUserNotification(string userEmail)
        {
            var smtpSetting = new SMTPConfig();
            string fromEmail = smtpSetting.Email;
            string confirmEmail = $"Photo Grade Submitted";
            string logoName = smtpSetting.LogoName;

            string siteLogo = smtpSetting.SiteDomain + $"/media/brand/{logoName}";

            StringBuilder sb = new StringBuilder();
            sb.Append($"<img style=\"display: block; -webkit - user - select: none; cursor: zoom -in; background - color: hsl(0, 0 %, 90 %); transition: background - color 300ms;\" src=\"{siteLogo}\" width=\"320\" height=\"164\"><br/><br/>");
            sb.Append($"Photo grade submitted.<br/> <br/>");

            string emailBody = sb.ToString();

            await EmailHelper.SendEmail(userEmail, fromEmail, confirmEmail, emailBody, isBodyHtml: true);

            return true;
        }
        private async Task<bool> SendUserNotificationApproved(string userEmail)
        {
            var smtpSetting = new SMTPConfig();
            string fromEmail = smtpSetting.Email;
            string confirmEmail = $"Photo Grade Approved";
            string logoName = smtpSetting.LogoName;

            string siteLogo = smtpSetting.SiteDomain + $"/media/brand/{logoName}";

            StringBuilder sb = new StringBuilder();
            sb.Append($"<img style=\"display: block; -webkit - user - select: none; cursor: zoom -in; background - color: hsl(0, 0 %, 90 %); transition: background - color 300ms;\" src=\"{siteLogo}\" width=\"320\" height=\"164\"><br/><br/>");
            sb.Append($"Photo grade approved.<br/> <br/>");

            string emailBody = sb.ToString();

            await EmailHelper.SendEmail(userEmail, fromEmail, confirmEmail, emailBody, isBodyHtml: true);

            return true;
        }

        private async Task<bool> SendAdminNotification()
        {
            var smtpSetting = new SMTPConfig();
            string fromEmail = smtpSetting.Email;
            string confirmEmail = $"New Photo Grade Request";
            string logoName = smtpSetting.LogoName;
            string adminEmail = smtpSetting.AdminEmail;

            string siteLogo = smtpSetting.SiteDomain + $"/media/brand/{logoName}";

            StringBuilder sb = new StringBuilder();
            sb.Append($"<img style=\"display: block; -webkit - user - select: none; cursor: zoom -in; background - color: hsl(0, 0 %, 90 %); transition: background - color 300ms;\" src=\"{siteLogo}\" width=\"320\" height=\"164\"><br/><br/>");
            sb.Append($"There's a new photo grade request that has been submitted.<br/> <br/>");

            string emailBody = sb.ToString();

            await EmailHelper.SendEmail(adminEmail, fromEmail, confirmEmail, emailBody, isBodyHtml: true);

            return true;
        }

    }
}
