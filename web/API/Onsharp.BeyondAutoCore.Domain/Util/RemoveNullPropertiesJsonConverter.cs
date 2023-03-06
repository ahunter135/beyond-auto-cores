using Newtonsoft.Json;

namespace Onsharp.BeyondAutoCore.Domain.Util
{
    public class RemoveNullPropertiesJsonConverter : JsonConverter
    {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException("Unnecessary because CanRead is false. The type will skip the converter.");
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            // Convert empty string to value value
            //
            foreach (var propertyInfo in value.GetType().GetProperties().Where(p => p.GetIndexParameters().Length == 0))
            {
                if (propertyInfo.PropertyType == typeof(string))
                {
                    string valueString = propertyInfo.GetValue(value, null) as string;
                    if (string.IsNullOrEmpty(valueString) || string.IsNullOrWhiteSpace(valueString))
                    {
                        propertyInfo.SetValue(value, null, null);
                    }
                }
            }

            serializer.NullValueHandling = NullValueHandling.Ignore;
            serializer.Serialize(writer, value);
        }

        public override bool CanConvert(Type objectType)
        {
            throw new NotImplementedException();
        }

        public override bool CanRead
        {
            get { return false; }
        }
    }
}
