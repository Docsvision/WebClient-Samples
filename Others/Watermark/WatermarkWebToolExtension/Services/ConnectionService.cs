using NLog;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace WatermarkWebToolExtension.Services
{
    public class ConnectionToWebClient
    {
        private string serverAddress;
        private string accessToken;
        private string LOGIN_PAGE_URL => $"{serverAddress}/Account/LoginWindows";
        private string UPLOAD_FILE_API_URL => $"{serverAddress}/api/FileOperations/AddFile";
        private string DOWNLOAD_FILE_API_URL => $"{serverAddress}/api/FileOperations/GetFile";
        private const string AuthorizationHeaderName = "Authorization";
        private const string AuthorizatoinHeaderTemplate = "Bearer {0}";


        private HttpClient httpClient;
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public ConnectionToWebClient(string serverAddress, string accessToken) {
            this.serverAddress = serverAddress;
            this.accessToken = accessToken;
            this.httpClient = CreateHttpClient(serverAddress, accessToken);
        }

        // Получение файла с сервера Web-клиента
        // Будет возвращен локальный путь к файлу
        public async Task<string> PullFile(Guid fileId)
        {
            var response = await httpClient.GetAsync(DOWNLOAD_FILE_API_URL + $"?fileCardID={fileId}", HttpCompletionOption.ResponseContentRead);
            response.EnsureSuccessStatusCode();

            var fileName = response.Content.Headers.ContentDisposition.FileName;
            var folder = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
            Directory.CreateDirectory(folder);
            var pathToFile = Path.Combine(folder, fileName);

            using (var stream = await response.Content.ReadAsStreamAsync())
            {
                using (var fileStream = new FileStream(pathToFile, FileMode.OpenOrCreate, FileAccess.Write, FileShare.ReadWrite))
                {
                    stream.CopyTo(fileStream);
                    fileStream.Flush();
                    fileStream.Close();
                }
            };
            return pathToFile;
        }

        // Отправка файлов на сервер Web-клиента
        // Файлы files будут сохранены в карточке cardId
        public async Task PushFiles(Guid cardId, string[] files)
        {
            var content = new MultipartFormDataContent();
            content.Add(new StringContent(cardId.ToString()), "cardId");

            foreach (var file in files)
            {
                var stream = File.Open(file, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
                content.Add(new StreamContent(stream), "file", Path.GetFileName(file));
            }

            var response = await httpClient.PostAsync(UPLOAD_FILE_API_URL, content);
            response.EnsureSuccessStatusCode();
        }


        // Создание подключения с авторизацией через форму
        private HttpClient CreateHttpClient(string serverAddress, string accessToken)
        {
            var httpClientHandler = new HttpClientHandler();
            httpClientHandler.UseCookies = true;
            httpClientHandler.CookieContainer = new System.Net.CookieContainer();
            var cookie = new System.Net.Cookie("UserCulture", System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName);
            var domain = new Uri(serverAddress);
            httpClientHandler.CookieContainer.Add(domain, cookie);

            var client = new HttpClient(httpClientHandler);
            client.DefaultRequestHeaders.Add(AuthorizationHeaderName, String.Format(AuthorizatoinHeaderTemplate, accessToken));
            return client;
        }
    }
}
