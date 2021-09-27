using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WatermarkServerExtension.Services;

namespace WatermarkServerExtension.Controllers
{
    // Контроллер получения-записи файлов карточки
    public class FileOperationsController : ApiController
    {
        IFileService fileService;

        public FileOperationsController(IFileService fileService)
        {
            this.fileService = fileService;
        }

        // Возвращает файл из карточки файла с версиями с ИД fileCardID 
        [HttpGet]
        public HttpResponseMessage GetFile(Guid fileCardID)
        {
            FileReader fileReader = fileService.GetFileReader(fileCardID);

            if (fileReader.FileID == Guid.Empty)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            // Создаём ответ с файлом
            HttpResponseMessage response = CreateResponseForFile(fileReader);
            return response;
        }

        // Добавляет в карточку файлы из запроса
        [HttpPost]
        public async Task<HttpResponseMessage> AddFile()
        {

            // Проверяем формат содержимого запроса
            if (!Request.Content.IsMimeMultipartContent())
            {
                return Request.CreateErrorResponse(HttpStatusCode.UnsupportedMediaType, "Ошибка в формате входных данных");
            }

            string rootPath = CreateAndGetTempFolder();
            MultipartFormDataStreamProvider provider;

            try
            {
                provider = new MultipartFormDataStreamProvider(rootPath);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, $"Ошибка при работе с временными данными: {ex.Message}");
            }

            try
            {
                // Читаем данные из запроса
                await Request.Content.ReadAsMultipartAsync(provider);

                // Если не передали файлы для добавления
                if (provider.FileData.Count < 1)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "В запросе не переданы файлы для получения");
                }

                // Идентификатор карточки, в которую добавляются файлы
                Guid cardId = GetCardIdFromResponse(provider.FormData);

                // Добавляемые файлы
                List<string> files = await SaveFilesFromResponse(provider.FileData);
                
                await fileService.AddFilesToCard(cardId, files);
                return Request.CreateResponse(HttpStatusCode.OK);

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        // Формирует ответ с данными файла
        private HttpResponseMessage CreateResponseForFile(FileReader fileReader)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StreamContent(fileReader.Stream);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            response.Content.Headers.ContentDisposition = ContentDispositionHeaderValue.Parse("attachment; filename=\"" + HttpUtility.UrlEncode(fileReader.FileName, UnicodeEncoding.UTF8)
                .Replace("+++", " ").Replace("++", " ").Replace("+", " ") + "\"");
            response.Content.Headers.ContentDisposition.FileName = fileReader.FileName;
            return response;
        }

        // Создаёт временную папку на сервере для загружаемых файлов
        private string CreateAndGetTempFolder() {
            // Устанавливаем каталог для оперативного сохранения файлов
            string serverRoot = HttpContext.Current.Server.MapPath("~/App_Data");
            string rootPath = Path.Combine(serverRoot, Path.GetRandomFileName());
            Directory.CreateDirectory(rootPath);
            return rootPath;
        }


        // Сохраняет файлы из запроса на диск
        private async Task<List<string>> SaveFilesFromResponse(Collection<MultipartFileData> fileData)
        {
            // Пути к копиям оперативных файлов (полученных IIS автоматически), которые будут добавляться в карточки
            var naturalFiles = new List<string>();

            // Загружаем файлы из запроса
            foreach (MultipartFileData file in fileData)
            {
                string tempFolderForFile = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
                Directory.CreateDirectory(tempFolderForFile);

                // Устанавиваем настоящее название для оперативного файла
                string naturalFileName = Path.Combine(tempFolderForFile, file.Headers.ContentDisposition.FileName);

                using (Stream source = File.Open(file.LocalFileName, FileMode.Open))
                {
                    using (Stream destination = File.Create(naturalFileName))
                    {
                        await source.CopyToAsync(destination);
                    }
                }
                naturalFiles.Add(naturalFileName);
            }

            return naturalFiles;
        }

        // Получает из запроса идентификатор карточки для добавления файлов
        private Guid GetCardIdFromResponse(NameValueCollection formData) {

            // Получаем идентификатор карточки из запроса
            string dummyCardId = formData.Get("cardId");

            if (dummyCardId == "" || !Guid.TryParse(dummyCardId, out Guid cardId))
            {
                throw new Exception($"Ошибка получения идентификатора карточки из значения {dummyCardId}");
            }

            return cardId;
        }
    }
}