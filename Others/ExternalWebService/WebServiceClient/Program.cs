using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;
using WebService.Interfaces.Models;

namespace WebServiceClient
{
    class Program
    {
        static HttpClient client = new HttpClient();
        static void Main(string[] args)
        {
            RunAsync().GetAwaiter().GetResult();
        }

        static async Task<HttpResponseMessage> CreateCardAsync(DocumentModel document)
        {
            if (document.Name == null)
            {
                throw new Exception("Error: Some of the required properties are empty");
            }
            else
            {
                HttpResponseMessage response = await client.PostAsJsonAsync("api/Documents/Create", document);
                response.EnsureSuccessStatusCode();

                return response;
            }
        }

        static async Task<HttpResponseMessage> GetCardAsync(Guid cardId)
        {
            HttpResponseMessage response = await client.GetAsync($"api/Documents/Get?id={cardId}");

            return response;
        }

        static async Task<HttpResponseMessage> UpdateCardAsync(DocumentModel document)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync("api/Documents/Update", document);

            return response;
        }

        static async Task<HttpResponseMessage> ChangeCardStateAsync(ChangeStateRequestModel changeStateRequestModel)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync($"api/Documents/Changestate", changeStateRequestModel);

            return response;
        }

        static async Task<HttpResponseMessage> UploadFileAsync(String filePath, Guid cardId)
        {

            var content = new MultipartFormDataContent();
            using (var fstream = File.OpenRead(filePath))
            {
                var streamContent = new StreamContent(fstream);
                content.Add(streamContent, "file", Path.GetFileName(filePath));
                content.Add(new StringContent(cardId.ToString()),"cardId");

                HttpResponseMessage response = await client.PostAsync($"api/Documents/UploadFile", content);
                response.EnsureSuccessStatusCode();

                return response;
            }
        }

        static async Task<HttpResponseMessage> DownloadFileAsync(Guid fileId)
        {
            HttpResponseMessage response = await client.GetAsync($"api/Documents/DownloadFile?fileid={fileId}", HttpCompletionOption.ResponseHeadersRead);

            response.EnsureSuccessStatusCode();
            string fileName = response.Content.Headers.ContentDisposition.FileName;
            var applicationDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            string downloadFileDir = Path.Combine(applicationDirectory, "Downloads");
            Directory.CreateDirectory(downloadFileDir);
            downloadFileDir = Path.Combine(downloadFileDir, fileName);
            using (var stream = await response.Content.ReadAsStreamAsync())
            {
                using (FileStream fsNew = new FileStream(downloadFileDir, FileMode.Create, FileAccess.Write))
                {
                    stream.CopyTo(fsNew);
                }
            };
            return response;
        }

        static async Task<HttpResponseMessage> DeleteCardAsync(Guid cardId)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync($"api/Documents/Delete", cardId);

            return response;
        }

        static async Task<HttpResponseMessage> GetTestReportDataAsync(Guid cardId)
        {
            HttpResponseMessage response = await client.GetAsync($"api/Reports/GetTestReportData?cardId={cardId}");

            return response;
        }

        static async Task RunAsync()
        {
            client.BaseAddress = new Uri(Properties.Settings.Default.WebServiceUrl);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = null;
            try
            {
                // Создание новой карточки документа
                Console.WriteLine("############ CREATE CARD ############");
                Console.WriteLine();
                DocumentModel document = new DocumentModel
                {
                    Name = "CardWebClientTest",
                    KindId = new Guid("8e40f327-9517-4a43-998d-bf2bd619588d")
                };

                response = await CreateCardAsync(document);
                Guid cardId = Guid.Parse(response.Content.ReadAsStringAsync().Result.Trim('\"'));
                document.Id = cardId;
                Console.WriteLine($"URL: {response.RequestMessage.RequestUri}");
                Console.WriteLine($"Query parameters: document: {document}");
                Console.WriteLine($"Created document card id: {cardId}");
                Console.WriteLine();

                //Получение созданной карточки документа
                Console.WriteLine("############ GET CARD ############");
                Console.WriteLine();
                response = await GetCardAsync(cardId);
                Console.WriteLine($"URL:  {response.RequestMessage.RequestUri}");
                Console.WriteLine($"Query parameters: cardId: {cardId}");
                Console.WriteLine($"Document data: {response.Content.ReadAsStringAsync().Result}");
                Console.WriteLine();

                //Обновление данных карточки документа
                Console.WriteLine("############ UPDATE CARD ############");
                Console.WriteLine();
                document.Name = "NewDocumentName";
                response = await UpdateCardAsync(document);
                Console.WriteLine($"URL:  {response.RequestMessage.RequestUri}");
                Console.WriteLine($"Query parameters: document: {document}");
                Console.WriteLine($"Document data: {response.StatusCode}");
                Console.WriteLine();

                //Загрузка файла в карточку документа
                Console.WriteLine("############ UPLOAD FILE ############");
                Console.WriteLine();

                var applicationDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                var uploadFileName = Path.Combine(applicationDirectory, "testfile.txt");

                response = await UploadFileAsync(uploadFileName, cardId);
                Console.WriteLine($"URL:  {response.RequestMessage.RequestUri}");
                Console.WriteLine($"Query parameters: uploadFileName: {uploadFileName}, cardId: {cardId}");
                Guid fileId = Guid.Parse(response.Content.ReadAsStringAsync().Result.Trim('\"'));
                Console.WriteLine($"Response: newFileId: {fileId}");
                Console.WriteLine();

                //Изменение состояния карточки документа
                Console.WriteLine("############ CHANGE CARD STATE ############");
                Console.WriteLine();

                ChangeStateRequestModel changeStateRequestModel = new ChangeStateRequestModel
                {
                    CardId = cardId,
                    OperationId = new Guid("68c039da-d2e4-4c01-975a-eed6ca0b17a7")
                };
                response = await ChangeCardStateAsync(changeStateRequestModel);
                Console.WriteLine($"URL:  {response.RequestMessage.RequestUri}");
                Console.WriteLine(
                    $"Query parameters: cardId: {cardId}, operationId:{changeStateRequestModel.OperationId}");
                Console.WriteLine($"Document data: {response.StatusCode}");
                Console.WriteLine();

                //Скачивание файла из карточки документа
                Console.WriteLine("############ DOWNLOAD FILE ############");
                Console.WriteLine();
                response = await DownloadFileAsync(fileId);
                Console.WriteLine($"URL:  {response.RequestMessage.RequestUri}");
                Console.WriteLine($"Query parameters: fileId: {fileId}");
                Console.WriteLine($"Response: {response.StatusCode}");
                Console.WriteLine();

                //Получение отчета карточки
                Console.WriteLine("############ CARD REPORT ############");
                Console.WriteLine();
                response = await GetTestReportDataAsync(cardId);
                Console.WriteLine($"URL:  {response.RequestMessage.RequestUri}");
                Console.WriteLine($"Query parameters: cardId: {cardId}");
                Console.WriteLine($"Response: {response.Content.ReadAsStringAsync().Result}");
                Console.WriteLine();

                //Удаление карточки документа
                Console.WriteLine("############ DELETE CARD ############");
                Console.WriteLine();
                response = await DeleteCardAsync(cardId);
                Console.WriteLine($"URL:  {response.RequestMessage.RequestUri}");
                Console.WriteLine($"Query parameters: cardId: {cardId}");
                Console.WriteLine($"Response: {response.StatusCode}");
                Console.WriteLine();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            Console.WriteLine();
            Console.WriteLine($"Press any key to exit");

            Console.ReadKey();
        }
    }
}
