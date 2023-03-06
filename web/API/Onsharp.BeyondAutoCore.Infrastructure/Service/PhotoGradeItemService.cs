

namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class PhotoGradeItemService : BaseService, IPhotoGradeItemService
    {
        private readonly BacDBContext _bacDBContext;
        private readonly IPhotoGradeItemsRepository _photoGradeItemsRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<AWSSettingDto> _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        private readonly AwsS3Helper _awsS3Helper;

        public PhotoGradeItemService(BacDBContext bacDBContext, IHttpContextAccessor httpContextAccessor,
                          IOptions<AWSSettingDto> awsSettings, IAmazonS3 aws3Client,
                          IMapper mapper, IPhotoGradeItemsRepository photoGradeItemsRepository)
            : base(httpContextAccessor)
        {

            _mapper = mapper;
            _bacDBContext = bacDBContext;
            _photoGradeItemsRepository = photoGradeItemsRepository;

            _awsSettings = awsSettings;
            _aws3Client = aws3Client;
            _awsS3Helper = new AwsS3Helper(_awsSettings, _aws3Client);
        }

        #region CRUD

        public async Task<List<PhotoGradeItemDto>> Create(long photoGradeId, List<IFormFile> PhotoGrades, List<long> listItemsToDelete = null)
        {
            var result = new List<PhotoGradeItemModel>();

            // Delete the existing photos
            if (listItemsToDelete != null && listItemsToDelete.Count > 0)
            {
                var collection = _photoGradeItemsRepository.GetAllIQueryable();
                collection = collection.Where(w => listItemsToDelete.Contains(w.Id));

                foreach (var item in collection)
                {
                    _photoGradeItemsRepository.Delete(item);
                }
            }

            // Add the new photos
            foreach (var photoGrade in PhotoGrades)
            {
                // should have a better implementation. 
                // Implement this way since we cannot upload null IFormFile for now
                if (photoGrade.FileName == "none")
                    continue;

                string fileKey = "photograde_" + DateTime.Now.ToString("yyyyMMddhhmmssfff") + "_" + photoGrade.FileName;

                bool uploadResult = false;
                try {
                    uploadResult = await _awsS3Helper.UploadFileAsync(photoGrade, _awsSettings.Value.Bucket, fileKey);
                    uploadResult = true;
                }
                catch (Exception ex)
                {
                    uploadResult = false;
                }
                
                var newPhotoGradeItem = new PhotoGradeItemModel();
                newPhotoGradeItem.PhotoGradeId = photoGradeId;
                newPhotoGradeItem.FileKey = fileKey;
                newPhotoGradeItem.FileName = photoGrade.FileName;
                newPhotoGradeItem.IsUploaded = uploadResult;
                newPhotoGradeItem.CreatedBy = this.CurrentUserId();
                newPhotoGradeItem.CreatedOn = DateTime.UtcNow;
                _photoGradeItemsRepository.Add(newPhotoGradeItem);

                result.Add(newPhotoGradeItem);
            }

            _photoGradeItemsRepository.SaveChanges();

            return _mapper.Map<List<PhotoGradeItemModel>, List<PhotoGradeItemDto>>(result);

        }

        public async Task<PhotoGradeItemDto> GetById(long id)
        {
            var singleData = await _photoGradeItemsRepository.GetByIdAsync(id);
            if (singleData == null || singleData.IsDeleted)
                return new PhotoGradeItemDto() { Success = false, Message = "Photograde item does not exist." };

            return _mapper.Map<PhotoGradeItemModel, PhotoGradeItemDto>(singleData);
        }

        public async Task<List<PhotoGradeItemDto>> GetAllByPhotoGradeId(long photoGradeId)
        {
            
            var collection = _photoGradeItemsRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false && w.PhotoGradeId == photoGradeId);

            return _mapper.Map<List<PhotoGradeItemModel>, List<PhotoGradeItemDto>>(collection.ToList()); ;
        }

        public async Task<bool> Delete(long id)
        {
            var singleData = await _photoGradeItemsRepository.GetByIdAsync(id);
            if (singleData == null)
                return false;

            singleData.IsDeleted = true;
            _photoGradeItemsRepository.Update(singleData);
            _photoGradeItemsRepository.SaveChanges();

            return true;
        }

        public async Task<bool> DeleteAllByPhotoGradeId(long photoGradeId)
        {
            var collection = _photoGradeItemsRepository.GetAllIQueryable();
            collection = collection.Where(w => w.IsDeleted == false && w.PhotoGradeId == photoGradeId);

            foreach (var photoGrade in collection)
            {
                photoGrade.IsDeleted = true;
                _photoGradeItemsRepository.Update(photoGrade);
            }

            _photoGradeItemsRepository.SaveChanges();

            return true;
        }


        #endregion CRUD

        public async Task<string> GetPreSignedUrlAsync(string fileKey)
        {
            if (string.IsNullOrWhiteSpace(fileKey))
                return "";

            return await _awsS3Helper.GetPreSignedUrlAsync(fileKey);
        }

    }
}
