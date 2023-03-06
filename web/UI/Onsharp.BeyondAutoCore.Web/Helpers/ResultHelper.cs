namespace Onsharp.BeyondAutoCore.Web.Helpers;

public static class ResultHelper
{
    public static T GetData<T>(this Result<T> result) where T : new()
    {
        if (result != null && result.Success)
        {
            if (result.Data != null)
            {
                return result.Data;
            }
        }
        else
        {
            if (result != null && (result.ErrorCode == 401 || result.ErrorCode == 403))
                throw new Exception(result.ErrorCode + "" + result.Message);
            else
                throw new Exception("Error getting data. Null result.");
        }
        return new T();
    }
    public static async Task<T> GetData<T>(this Task<Result<T>> resultTask) where T : new()
    {
        return (await resultTask).GetData();
    }
    public static string GetData(this Result<string> result)
    {
        if (result.Success)
        {
            if (result.Data != null)
            {
                return result.Data;
            }
        }
        return string.Empty;
    }
}
