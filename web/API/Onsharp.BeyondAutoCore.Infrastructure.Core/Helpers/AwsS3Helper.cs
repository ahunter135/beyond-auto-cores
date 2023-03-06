using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Amazon.S3.Util;
using Microsoft.Extensions.Options;
using System.Net;
using Microsoft.AspNetCore.Http;

namespace Onsharp.BeyondAutoCore.Infrastructure.Core.Helpers
{
    public class AwsS3Helper 
    {
        private readonly AWSSettingDto _awsSettings;
        private readonly IAmazonS3 _aws3Client;
        public AwsS3Helper(
            IOptions<AWSSettingDto> awsSettings,
            IAmazonS3 aws3Client)
        {
            _awsSettings = awsSettings.Value;
            _aws3Client = aws3Client;
        }
        public async Task<bool> BucketExistAsync(string bucketName)
        {
            return await AmazonS3Util.DoesS3BucketExistV2Async(_aws3Client, bucketName);
        }

        public async Task<bool> CreateBucketAsync(string bucketName)
        {
            if (await AmazonS3Util.DoesS3BucketExistV2Async(_aws3Client, _awsSettings.Bucket) == true)
            {
                throw new Exception($"{bucketName} already exist.");
            }

            var putBucketRequest = new PutBucketRequest()
            {
                BucketName = _awsSettings.Bucket,
                UseClientRegion = true
            };

            var response = await _aws3Client.PutBucketAsync(putBucketRequest);
            if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteBucketAsync(string bucketName)
        {
            var response = await _aws3Client.DeleteBucketAsync(bucketName);
            if (response.HttpStatusCode == HttpStatusCode.OK)
            {
                return true;
            }
            return false;
        }

        public async Task<byte[]> DownloadFileAsync(string bucketName, string fileKey)
        {
            MemoryStream ms = null;

            try
            {
                var getObjectRequest = new GetObjectRequest
                {
                    BucketName = bucketName,
                    Key = fileKey
                };

                using (var response = await _aws3Client.GetObjectAsync(getObjectRequest))
                {
                    if (response.HttpStatusCode == HttpStatusCode.OK)
                    {
                        using (ms = new MemoryStream())
                        {
                            await response.ResponseStream.CopyToAsync(ms);
                        }
                    }
                }

                if (ms is null || ms.ToArray().Length < 1)
                    throw new FileNotFoundException(string.Format("The file '{0}' is not found", fileKey));

                return ms.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<string> GetPreSignedUrlAsync(string fileKey)
        {
            var url = "";
            await Task.Run(() =>
            {
                url = _aws3Client.GetPreSignedURL(new GetPreSignedUrlRequest()
                {
                    BucketName = _awsSettings.Bucket,
                    Key = fileKey,
                    Expires = DateTime.Now.AddMinutes(120)
                });
            });

            return url;
        }

        public async Task<bool> UploadFileAsync(IFormFile file, string bucketName, string fileKey)
        {
            try
            {
                using (var newMemoryStream = new MemoryStream())
                {
                    file.CopyTo(newMemoryStream);

                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = newMemoryStream,
                        Key = fileKey,
                        BucketName = bucketName,
                        ContentType = file.ContentType
                    };

                    var fileTransferUtility = new TransferUtility(_aws3Client);

                    await fileTransferUtility.UploadAsync(uploadRequest);

                    return true;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
