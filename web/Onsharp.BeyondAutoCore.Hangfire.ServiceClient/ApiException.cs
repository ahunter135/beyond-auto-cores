namespace Onsharp.BeyondAutoCore.Hangfire.ServiceClient
{
	/// <summary>
	///	Exceptions returned by the server, deserialized from the response message 
	/// body by the JSON library. 
	/// </summary>
	public class ApiException : Exception, IReadOnlyDictionary<string, object>
	{
		protected HttpStatusCode _code;
		protected Dictionary<string, object> _data;

		public ApiException()
		{
			_data = new Dictionary<string, object>();
		}

		public ApiException(string message)
			: base(message)
		{
			_data = new Dictionary<string, object>();
			_data.Add("Message", message);
		}

		public ApiException(HttpStatusCode code, string message)
			: base(message)
		{
			_code = code;
			_data = new Dictionary<string, object>();
			_data.Add("Message", message);
		}

		public ApiException(Dictionary<string, object> values)
		{
			_data = new Dictionary<string, object>(values);
		}

		public override string Message
		{
			get
			{
				//	First look for ExceptionMessage, and if that's not found
				//	then fall back to Message
				object value = null;
				_data.TryGetValue("ExceptionMessage", out value);
				if (value != null) return value.ToString();

				_data.TryGetValue("Message", out value);
				if (value != null) return value.ToString();

				return base.Message;
			}
		}

		public HttpStatusCode StatusCode
		{
			get
			{
				return _code;
			}
		}

		public string CorrelationId
		{
			get
			{
				object value = null;
				_data.TryGetValue("CorrelationId", out value);
				return value != null ? value.ToString() : null;
			}
		}

		/// <summary>
		/// Try to parse the message in the style of HttpError and store the result in the ApiException's dictionary.
		/// </summary>
		/// <param name="code"></param>
		/// <param name="message"></param>
		public static ApiException Create(HttpStatusCode code, string message)
		{
			TextReader tr = null;
			try
			{
				tr = new StringReader(message);
				JsonTextReader jr = new JsonTextReader(tr);
				JsonSerializer serializer = new JsonSerializer();

				Dictionary<string, object> dict = serializer.Deserialize<Dictionary<string, object>>(jr);
				ApiException error = new ApiException(dict);
				return error;
			}
			catch (Exception)
			{
				//	If we couldn't parse it then just package up the original message
				return new ApiException(code, message);
			}
			finally
			{
				if (tr != null) tr.Dispose();
			}
		}

		//	IReadOnlyDictinary
		public bool ContainsKey(string key) { return _data.ContainsKey(key); }
		public bool TryGetValue(string key, out object value) { return _data.TryGetValue(key, out value); }
		public object this[string key] { get { return _data[key]; } }
		public IEnumerable<string> Keys { get { return _data.Keys; } }
		public IEnumerable<object> Values { get { return _data.Values; } }
		public int Count { get { return _data.Count; } }
		public IEnumerator<KeyValuePair<string, object>> GetEnumerator() { return _data.GetEnumerator(); }
		//	IEnumerable
		System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() { return this.GetEnumerator(); }
	}

}
