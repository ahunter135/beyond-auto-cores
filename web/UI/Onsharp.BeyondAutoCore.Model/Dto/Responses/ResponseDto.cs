namespace Onsharp.BeyondAutoCore.Web.Model.Dto
{
    public class ResponseDto
    {
        public ResponseDto()
        {
            Success = 1;
        }

        /// <summary>
        /// The success integer code.
        /// </summary>
        public int Success { get; set; }

        /// <summary>
        /// The Error integer code.
        /// </summary>
        public int ErrorCode { get; set; }

        /// <summary>
        /// The response string returned.
        /// </summary>
        public string Message { get; set; }
    }
}
