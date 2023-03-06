namespace Onsharp.BeyondAutoCore.Hangfire.ServiceClient
{
    public class Result<T>
    {
        public string Message { get; set; }
        public Dictionary<string, string> Errors { get; set; }
        public T Data { get; set; }
        public int ErrorCode { get; set; }
        public bool Success { get; set; }
        public Exception Exception { get; set; }
        public string GetErrors()
        {

            string summary = "";
            if (Errors != null && Errors.Count > 0)
            {
                foreach (var item in Errors)
                {
                    summary += item.Key + " " + item.Value + ". ";
                }
            }
            return summary;
        }
    }
}
