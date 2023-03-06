using Microsoft.AspNetCore.Http;

namespace Onsharp.BeyondAutoCore.Hangfire.ServiceClient
{

    public class ApiClient
    {
        private readonly string _host;
        private readonly int _port;

        private string _token;
        private string _scheme;
        private string _root = "api/v1";
        private string _service { get; }

        public ApiClient(string host, int port, string service, bool enableSSL, string token)
        {
            _host = host;
            _port = port;

            _scheme = enableSSL ? "https" : "http";
            _service = service;
            _token = token;

        }

        private async Task<HttpResponseMessage> GetRequest(string action, string parameters)
        {
            HttpClient client = null;
            HttpRequestMessage request = null;
            HttpResponseMessage response = null;
            try
            {
                client = new HttpClient();
                client.Timeout = TimeSpan.FromMinutes(30);
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                                                    _scheme, _host, _port, _root, _service, action);
                if (!string.IsNullOrWhiteSpace(parameters)) uri += "?" + parameters;
                request = new HttpRequestMessage(HttpMethod.Get, uri);
                AddAuthHeader(request);
                response = await Send(client, request);//.ConfigureAwait(false);
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                if (client != null) client.Dispose();
                if (request != null) request.Dispose();
            }
            return response;
        }

        private async Task<HttpResponseMessage> GetRequest(string parameters)
        {
            HttpClient client = null;
            HttpRequestMessage request = null;
            HttpResponseMessage response = null;
            try
            {
                client = new HttpClient();
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}",
                              _scheme, _host, _port, _root, _service);
                if (!string.IsNullOrWhiteSpace(parameters)) uri += "?" + parameters;
                request = new HttpRequestMessage(HttpMethod.Get, uri);
                AddAuthHeader(request);
                response = await Send(client, request);//.ConfigureAwait(false);
            }
            catch (Exception e)
            {
                throw;
            }
            finally
            {
                if (client != null) client.Dispose();
                if (request != null) request.Dispose();
            }
            return response;
        }

        private async Task<HttpResponseMessage> GetByIdRequest(object id)
        {
            HttpClient client = null;
            HttpRequestMessage request = null;
            HttpResponseMessage response = null;
            try
            {
                client = new HttpClient();
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                              _scheme, _host, _port, _root, _service, id);
                request = new HttpRequestMessage(HttpMethod.Get, uri);
                AddAuthHeader(request);
                response = await Send(client, request);//.ConfigureAwait(false);
            }
            finally
            {
                if (client != null) client.Dispose();
                if (request != null) request.Dispose();
            }
            return response;
        }

        public async Task<HttpResponseMessage> PutRequest(object payload)
        {
            HttpResponseMessage response = null;
            string jsonPayload = JsonConvert.SerializeObject(payload);

            using (HttpClient client = new HttpClient())
            {
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}",
                              _scheme, _host, _port, _root, _service);
                using (var request = new HttpRequestMessage(HttpMethod.Put, uri))
                {
                    if (jsonPayload != null)
                    {
                        request.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                    }
                    AddAuthHeader(request);
                    response = await Send(client, request);//.ConfigureAwait(false);
                }
            }
            return response;
        }

        public async Task<HttpResponseMessage> PutRequest(object id, object payload)
        {
            HttpResponseMessage response = null;
            string jsonPayload = JsonConvert.SerializeObject(payload);

            using (HttpClient client = new HttpClient())
            {
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                              _scheme, _host, _port, _root, _service, id);
                using (var request = new HttpRequestMessage(HttpMethod.Put, uri))
                {
                    if (jsonPayload != null)
                    {
                        request.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                    }
                    AddAuthHeader(request);
                    response = await Send(client, request);//.ConfigureAwait(false);
                }
            }
            return response;
        }
        private async Task<HttpResponseMessage> PutRequest(string action, object payload)
        {
            HttpResponseMessage response = null;
            string jsonPayload = JsonConvert.SerializeObject(payload);

            using (HttpClient client = new HttpClient())
            {
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                              _scheme, _host, _port, _root, _service, action);
                using (var request = new HttpRequestMessage(HttpMethod.Put, uri))
                {
                    if (jsonPayload != null)
                    {
                        request.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                    }
                    AddAuthHeader(request);
                    //request.Headers.TransferEncodingChunked = true;
                    response = await Send(client, request);//.ConfigureAwait(false);
                }
            }
            return response;
        }

        public async Task<HttpResponseMessage> PostRequest(object payload, string action = null, double timeOut = 0, bool? continueOnCapturedContext = null)
        {
            HttpResponseMessage response = null;
            using (HttpClient client = new HttpClient())
            {
                if (timeOut > 0) client.Timeout = TimeSpan.FromMinutes(timeOut);
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}",
                      _scheme, _host, _port, _root, _service);
                if (!string.IsNullOrWhiteSpace(action))
                    uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                                _scheme, _host, _port, _root, _service, action);
                using (var request = new HttpRequestMessage(HttpMethod.Post, uri))
                {
                    request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
                    AddAuthHeader(request);

                    if (continueOnCapturedContext.HasValue)
                    {
                        response = await Send(client, request).ConfigureAwait(continueOnCapturedContext.Value);
                    }
                    else
                    {
                        response = await Send(client, request);
                    }
                }
            }
            return response;
        }

        private async Task<HttpResponseMessage> PostRequestConfigureAwait(object payload, string action = null, bool ConfigureAwait = true)
        {
            HttpResponseMessage response = null;
            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromMinutes(30);
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}",
                              _scheme, _host, _port, _root, _service);
                if (!string.IsNullOrWhiteSpace(action))
                    uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                                _scheme, _host, _port, _root, _service, action);
                using (var request = new HttpRequestMessage(HttpMethod.Post, uri))
                {
                    request.Content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
                    AddAuthHeader(request);
                    response = await SendConfigureAwait(client, request, ConfigureAwait).ConfigureAwait(ConfigureAwait);
                }
            }
            return response;
        }
        private async Task<HttpResponseMessage> PostBinaryRequest(string action, Dictionary<string, string> apiParameters, string fileParamName, IFormFileCollection files)
        {
            HttpResponseMessage response = null;
            string parameters = string.Join("&", apiParameters.Select(x => x.Key + "=" + x.Value).ToArray());

            try
            {
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                              _scheme, _host, _port, _root, _service, action);
                if (parameters != null) uri += "?" + parameters;
                using (var client = new HttpClient())
                {
                    using (var content = new MultipartFormDataContent("Upload----" + DateTime.Now.ToString()))
                    {
                        client.DefaultRequestHeaders.Add("Authorization", "Bearer " + _token);
                        client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("multipart/form-data"));

                        if (files != null & files.Count > 0)
                        {
                            foreach (var file in files)
                            {
                                await using var memoryStream = new MemoryStream();
                                await file.CopyToAsync(memoryStream);
                                var fileData = memoryStream.ToArray();

                                content.Add(new StreamContent(new MemoryStream(fileData)), fileParamName, file.FileName);
                            }
                        }
                        else
                        {
                            byte[] fileData = null;
                            content.Add(new StreamContent(Stream.Null), fileParamName, "none");
                        }

                        using (
                               var message =
                                   await client.PostAsync(uri, content))
                        {
                            var input = await message.Content.ReadAsStringAsync();

                            return message;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                var xx = ex;
            }

            return response;
        }

        private async Task<HttpResponseMessage> PutBinaryRequest(string action, Dictionary<string, string> apiParameters, string fileParamName, IFormFileCollection files)
        {
            HttpResponseMessage response = null;
            string parameters = string.Join("&", apiParameters.Select(x => x.Key + "=" + x.Value).ToArray());

            try
            {
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                              _scheme, _host, _port, _root, _service, action);
                if (parameters != null) uri += "?" + parameters;
                using (var client = new HttpClient())
                {
                    using (var content = new MultipartFormDataContent("Upload----" + DateTime.Now.ToString()))
                    {
                        client.DefaultRequestHeaders.Add("Authorization", "Bearer " + _token);
                        client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("multipart/form-data"));

                        if (files != null & files.Count > 0)
                        {
                            foreach (var file in files)
                            {
                                await using var memoryStream = new MemoryStream();
                                await file.CopyToAsync(memoryStream);
                                var fileData = memoryStream.ToArray();

                                content.Add(new StreamContent(new MemoryStream(fileData)), fileParamName, file.FileName);
                            }
                        }
                        else
                        {
                            byte[] fileData = null;
                            content.Add(new StreamContent(Stream.Null), fileParamName, "none");
                        }

                        using (
                           var message =
                               await client.PutAsync(uri, content))
                        {
                            var input = await message.Content.ReadAsStringAsync();

                            return message;
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                var xx = ex;
            }

            return response;
        }

        private async Task<HttpResponseMessage> DeleteRequest(long id, string action = null)
        {
            HttpResponseMessage response = null;
            using (HttpClient client = new HttpClient())
            {
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                               _scheme, _host, _port, _root, _service, string.IsNullOrWhiteSpace(action) ? id.ToString() : string.Format("details/", id));
                using (var request = new HttpRequestMessage(HttpMethod.Delete, uri))
                {
                    AddAuthHeader(request);
                    response = await Send(client, request);//.ConfigureAwait(false);
                }
            }
            return response;
        }
        private async Task<HttpResponseMessage> DeleteRequest(int id, string action = null)
        {
            HttpResponseMessage response = null;
            using (HttpClient client = new HttpClient())
            {
                string uri = string.Format("{0}://{1}:{2}/{3}/{4}/{5}",
                              _scheme, _host, _port, _root, _service, string.IsNullOrWhiteSpace(action) ? id.ToString() : string.Format("{0}/{1}", action, id));
                using (var request = new HttpRequestMessage(HttpMethod.Delete, uri))
                {
                    AddAuthHeader(request);
                    response = await Send(client, request);//.ConfigureAwait(false);
                }
            }
            return response;
        }
        /// <summary>
        //	Helper method to send the request and optionally log the request and response 
        /// </summary>
        /// <param name="client"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        private async Task<HttpResponseMessage> Send(HttpClient client, HttpRequestMessage request)
        {
#if DEBUG
#pragma warning disable 4014 // async method not awaited
            LogRequest(request);
#pragma warning restore 4014
#endif

            HttpResponseMessage response = await client.SendAsync(request);

#if DEBUG
#pragma warning disable 4014 // async method not awaited
            LogResponse(response);
#pragma warning restore 4014
#endif

            return response;
        }

        /// <summary>
        //	Helper method to send the request and optionally log the request and response 
        /// </summary>
        /// <param name="client"></param>
        /// <param name="request"></param>
        /// <param name="ConfigureAwait"></param>
        /// <returns></returns>
        private async Task<HttpResponseMessage> SendConfigureAwait(HttpClient client, HttpRequestMessage request, bool ConfigureAwait = true)
        {
#if DEBUG
#pragma warning disable 4014 // async method not awaited
            LogRequest(request);
#pragma warning restore 4014
#endif

            HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(ConfigureAwait);

#if DEBUG
#pragma warning disable 4014 // async method not awaited
            LogResponse(response);
#pragma warning restore 4014
#endif

            return response;
        }

        private void AddAuthHeader(HttpRequestMessage msg)
        {
            //	Concatenate the accessCode and securityKey like "accessCode:securityKey" and
            //	then encode the result in base 64
            //string credentials = _accessCode + ":" + _securityKey;
            //byte[] base64bits = Encoding.UTF8.GetBytes(credentials);
            //string base64str = Convert.ToBase64String(base64bits);
            if (!string.IsNullOrWhiteSpace(_token))
            {
                msg.Headers.Add("Authorization", "Bearer " + _token);
            }

            //        msg.Headers.Authorization =
            //new AuthenticationHeaderValue("Bearer", "Your Oauth token");
            //msg.Headers.Authorization =
            //  new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", base64str);
        }

        private async Task<int> LogRequest(HttpRequestMessage request)
        {
            if (request.Content == null) return 0;

            Stream stream = await request.Content.ReadAsStreamAsync();
            stream.Seek(0, SeekOrigin.Begin);
            byte[] buf = new byte[stream.Length];
            stream.Read(buf, 0, (int)stream.Length);
            stream.Seek(0, SeekOrigin.Begin);

            string data = System.Text.Encoding.UTF8.GetString(buf, 0, buf.Length);

            return buf.Length;
        }

        private async Task<int> LogResponse(HttpResponseMessage response)
        {
            if (response.Content == null) return 0;

            Stream stream = await response.Content.ReadAsStreamAsync();
            stream.Seek(0, SeekOrigin.Begin);
            byte[] buf = new byte[stream.Length];
            stream.Read(buf, 0, (int)stream.Length);
            stream.Seek(0, SeekOrigin.Begin);

            string data = System.Text.Encoding.UTF8.GetString(buf, 0, buf.Length);

            return buf.Length;
        }

        private async Task<ApiException> ApiExceptionFromResponse(HttpResponseMessage response)
        {
            ApiException ex = null;
            //	There might be a detailed error message in the response body
            Stream stream = await response.Content.ReadAsStreamAsync();
            if (stream != null)
            {
                byte[] buf = new byte[stream.Length];
                stream.Read(buf, 0, buf.Length);
                string msg = System.Text.Encoding.UTF8.GetString(buf, 0, buf.Length);
                ex = ApiException.Create(response.StatusCode, msg);
            }
            else
            {
                //	If there's no exception in the response body then just
                //	use the response status code
                ex = new ApiException(response.StatusCode, response.ReasonPhrase);
            }
            return ex;
        }

        protected async Task<Result<T>> Create<T>(object payloadObject, string action = null, double timeOut = 0, bool? continueOnCapturedContext = null)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            var payLoad = payloadObject;
            try
            {
                response = await PostRequest(payLoad, action, timeOut, continueOnCapturedContext);
                stream = await response.Content.ReadAsStreamAsync();
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                using (JsonReader jsonReader = new JsonTextReader(streamreader))
                {
                    return serializer.Deserialize<Result<T>>(jsonReader);
                }
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }
        protected async Task<Result<T>> Post<T>(object payloadObject, string action = null)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            var payLoad = payloadObject;
            try
            {
                response = await PostRequest(payLoad, action);
                stream = await response.Content.ReadAsStreamAsync();
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                using (JsonReader jsonReader = new JsonTextReader(streamreader))
                {
                    return serializer.Deserialize<Result<T>>(jsonReader);
                }
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }
        protected async Task<Result<T>> CreateConfigureAwait<T>(object payloadObject, string action = null, bool ConfigureAwait = true)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            var payLoad = payloadObject;
            try
            {
                response = await PostRequestConfigureAwait(payLoad, action, ConfigureAwait).ConfigureAwait(ConfigureAwait);
                stream = await response.Content.ReadAsStreamAsync().ConfigureAwait(ConfigureAwait);
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                using (JsonReader jsonReader = new JsonTextReader(streamreader))
                {
                    return serializer.Deserialize<Result<T>>(jsonReader);
                }
            }
            catch (Exception ex)
            {
                Result<T> result = new Result<T>();
                result.ErrorCode = 1;//error code  
                result.Message = ex.Message + "||" + (ex.InnerException != null ? ex.InnerException.Message : string.Empty);
                result.Exception = ex;
                result.Success = false;
                return result;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }

        protected async Task<bool> CreateBinaryRequest<T>(string action, Dictionary<string, string> apiParameters, string fileParamName, IFormFileCollection files) //byte[] fileBytes
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;

            try
            {
                response = await PostBinaryRequest(action, apiParameters, fileParamName, files);

                return true;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
            }

            return false;
        }

        protected async Task<bool> UpdateBinaryRequest<T>(string action, Dictionary<string, string> apiParameters, string fileParamName, IFormFileCollection files) //byte[] fileBytes
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;

            try
            {
                response = await PutBinaryRequest(action, apiParameters, fileParamName, files); //.ConfigureAwait(false);

                return true;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
            }

            return false;
        }

        protected async Task<Result<T>> Update<T>(object id, object payloadObject)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            var payLoad = (T)payloadObject;
            try
            {
                response = await PutRequest(id, payLoad);//.ConfigureAwait(false);
                stream = await response.Content.ReadAsStreamAsync();//.ConfigureAwait(false);
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                JsonTextReader jsonreader = new JsonTextReader(streamreader);
                return serializer.Deserialize<Result<T>>(jsonreader);
            }
            catch (Exception ex)
            {
                Result<T> result = new Result<T>();
                result.ErrorCode = 1;//error code  
                result.Message = ex.Message;
                result.Exception = ex;
                return result;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }
        protected async Task<Result<T>> Update<T>(string action, object payloadObject, bool isCustom = false)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            var payLoad = isCustom ? payloadObject : (T)payloadObject;
            try
            {
                response = await PutRequest(action, payLoad);//.ConfigureAwait(false);
                stream = await response.Content.ReadAsStreamAsync();//.ConfigureAwait(false);
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                JsonTextReader jsonreader = new JsonTextReader(streamreader);
                return serializer.Deserialize<Result<T>>(jsonreader);

            }
            catch (Exception ex)
            {
                Result<T> result = new Result<T>();
                result.ErrorCode = 1;//error code
                result.Success = false;
                result.Message = ex.Message;
                result.Exception = ex;
                return result;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }


        protected async Task<Result<T>> GetById<T>(object id)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            try
            {
                response = await GetByIdRequest(id);//.ConfigureAwait(false);
                stream = await response.Content.ReadAsStreamAsync();//.ConfigureAwait(false);
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                JsonTextReader jsonreader = new JsonTextReader(streamreader);
                return serializer.Deserialize<Result<T>>(jsonreader);
            }
            catch (Exception ex)
            {
                Result<T> result = new Result<T>();
                result.ErrorCode = 1;//error code
                result.Success = false;
                result.Message = ex.Message;
                result.Exception = ex;
                return result;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }
        protected async Task<Result<T>> Get<T>(string sortBy, bool ascending, int pageIndex, int pageSize)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            try
            {
                string parameters = string.Format("sortBy={0}&ascending={1}&pageNumber={2}&pageSize={3}", sortBy, ascending, pageIndex, pageSize);
                response = await GetRequest(parameters);//.ConfigureAwait(false);
                stream = await response.Content.ReadAsStreamAsync();//.ConfigureAwait(false);
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                JsonTextReader jsonreader = new JsonTextReader(streamreader);
                return serializer.Deserialize<Result<T>>(jsonreader);
            }
            catch (Exception ex)
            {
                Result<T> result = new Result<T>();
                result.ErrorCode = 1;//error code
                result.Success = false;
                result.Message = ex.Message;
                result.Exception = ex;
                return result;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }
        protected async Task<Result<T>> Get<T>(int organizationId, string sortBy, bool ascending, int pageIndex, int pageSize)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            try
            {
                string parameters = string.Format("sortBy={0}&ascending={1}&pageNumber={2}&pageSize={3}", sortBy, ascending, pageIndex, pageSize, organizationId);
                response = await GetRequest(parameters);//.ConfigureAwait(false);
                stream = await response.Content.ReadAsStreamAsync();//.ConfigureAwait(false);
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                JsonTextReader jsonreader = new JsonTextReader(streamreader);
                return serializer.Deserialize<Result<T>>(jsonreader);
            }
            catch (Exception ex)
            {
                Result<T> result = new Result<T>();
                result.ErrorCode = 1;//error code
                result.Success = false;
                result.Message = ex.Message;
                result.Exception = ex;
                return result;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }
        protected async Task<Result<T>> Get<T>(Dictionary<string, string> apiParameters)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            try
            {
                string parameters = string.Join("&", apiParameters.Select(x => x.Key + "=" + x.Value).ToArray());
                response = await GetRequest(parameters);//.ConfigureAwait(false);
                stream = await response.Content.ReadAsStreamAsync();//.ConfigureAwait(false);
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                JsonTextReader jsonreader = new JsonTextReader(streamreader);
                return serializer.Deserialize<Result<T>>(jsonreader);
            }
            catch (Exception ex)
            {
                Result<T> result = new Result<T>();
                result.ErrorCode = 1;//error code
                result.Success = false;
                result.Message = ex.Message;
                result.Exception = ex;
                return result;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }

        public async Task<dynamic> Get<T>(string action, Dictionary<string, string> apiParameters = null)
        {
            HttpResponseMessage response = null;
            Stream stream = null;
            StreamReader streamreader = null;
            try
            {
                string parameters = "";
                if (apiParameters != null)
                    parameters = string.Join("&", apiParameters.Select(x => x.Key + "=" + x.Value).ToArray());

                response = await GetRequest(action, parameters);//.ConfigureAwait(false);
                stream = await response.Content.ReadAsStreamAsync();//.ConfigureAwait(false);
                JsonSerializer serializer = new JsonSerializer();
                streamreader = new StreamReader(stream);
                using (var jsonReader = new JsonTextReader(streamreader))
                {
                    var data = serializer.Deserialize<T>(jsonReader);
                    return data;
                }
            }
            catch (Exception ex)
            {
                //T result = T;
                //result.ErrorCode = 1;//error code
                //result.Success = false;
                //result.Message = ex.Message;
                //result.Exception = ex;
                return null;
            }
            finally
            {
                if (streamreader != null) streamreader.Dispose();
                if (stream != null) stream.Dispose();
                if (response != null) response.Dispose();
            }
        }

        protected async Task<bool> Delete(long id)
        {
            HttpResponseMessage response = null;
            bool success = false;
            try
            {
                response = await DeleteRequest(id);//.ConfigureAwait(false);

                success = response.IsSuccessStatusCode;

                if (!response.IsSuccessStatusCode)
                    throw await ApiExceptionFromResponse(response);//.ConfigureAwait(false);
            }
            finally
            {
                if (response != null) response.Dispose();
            }

            return success;
        }
        protected async Task<bool> Delete(int id, string action = null)
        {
            HttpResponseMessage response = null;
            bool success = false;
            try
            {
                response = await DeleteRequest(id, action);//.ConfigureAwait(false);

                success = response.IsSuccessStatusCode;

                if (!response.IsSuccessStatusCode)
                    throw await ApiExceptionFromResponse(response);//.ConfigureAwait(false);
            }
            finally
            {
                if (response != null) response.Dispose();
            }

            return success;
        }
    }

}
