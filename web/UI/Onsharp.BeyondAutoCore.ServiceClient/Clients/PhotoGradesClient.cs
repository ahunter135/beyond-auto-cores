

namespace Onsharp.BeyondAutoCore.Web.ServiceClient.Clients
{
    public class PhotoGradesClient : ApiClient
    {
        protected override string Service { get { return "photogrades"; } }

        public PhotoGradesClient(string host, int port, bool enableSSL, string token)
          : base(host, port, enableSSL, token)
        {
        }

        public async Task<List<PhotoGradeListDto>> GetAll()
        {
            var result = new List<PhotoGradeListDto>();

            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            var dataList = await Get<List<PhotoGradeListDto>>("", apiParameters);
            if (dataList != null)
                result = dataList.Data.Where(x => x.PhotoGradeStatus != Common.Enums.PhotoGradeStatusEnum.Rejected).ToList();

            return result;
        }

        public async Task<Result<PhotoGradeDto>> GetById(long id)
        {
            return await GetById<PhotoGradeDto>(id);
        }

        public async Task<bool> CreatePhotoGrade(long codeId, bool sendNotification, IFormFileCollection files)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            apiParameters.Add("fullNess", "100");
            apiParameters.Add("codeId", codeId.ToString());
            apiParameters.Add("sendEmailNotification", sendNotification.ToString());
            
            return await CreateBinaryRequest<bool>("", apiParameters, "photoGrades", files);
        }

        public async Task<bool> UpdatePhoto(long photoGradeId, string? photoGradeItemsToDelete = "", IFormFileCollection files = null)
        {
            Dictionary<string, string> apiParameters = new Dictionary<string, string>();
            apiParameters.Add("id", photoGradeId.ToString());
            apiParameters.Add("photoGradeItemsToDelete", photoGradeItemsToDelete.ToString());
            return await UpdateBinaryRequest<bool>("", apiParameters, "photoGrades", files);
        }

        public async Task<Result<PhotoGradeListDto>> Update(UpdatePhotoGradeCommand updateCodeCommand)
        {
            return await Update<PhotoGradeListDto>("converter", updateCodeCommand, true);
        }

        public async Task<bool> DeletePhotoGrade(long id)
        {
            return await Delete(id);
        }

    }

}
