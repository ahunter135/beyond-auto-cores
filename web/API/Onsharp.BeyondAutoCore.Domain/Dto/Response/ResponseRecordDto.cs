using Newtonsoft.Json;
using Onsharp.BeyondAutoCore.Domain.Util;

namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class ResponseRecordDto<T> : ResponseDto where T : class
    {
        /// <summary>
        /// Contains the returned property of type T.
        /// </summary>
        [JsonConverter(typeof(RemoveNullPropertiesJsonConverter))]
        public T Data { get; set; }

    }
}
