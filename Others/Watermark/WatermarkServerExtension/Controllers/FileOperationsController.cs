using DocsVision.Platform.WebClient.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class FileOperationsController : ControllerBase
    {
        private readonly IFileService fileService;
        private readonly IEnvironmentService environmentService;

        public FileOperationsController(IFileService fileService, IEnvironmentService environmentService)
        {
            this.fileService = fileService;
            this.environmentService = environmentService;
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
        public async Task<ActionResult> AddFile([FromForm(Name = "file")] FormFileCollection formFiles, Guid cardId)
        {

            string rootPath = CreateAndGetTempFolder();
            try
            {
                // Добавляемые файлы
                List<string> files = await SaveFilesFromResponse(formFiles);
                
                await fileService.AddFilesToCard(cardId, files);
                return Ok();

            }
            catch (Exception e)
            {
                return Problem(statusCode: (int)HttpStatusCode.InternalServerError, detail: e.Message);
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
            string rootPath = Path.Combine(environmentService.SiteRootDir, Path.GetRandomFileName());

            Directory.CreateDirectory(rootPath);
            return rootPath;
        }


        // Сохраняет файлы из запроса на диск
        private async Task<List<string>> SaveFilesFromResponse(FormFileCollection fileData)
        {
            // Пути к копиям оперативных файлов (полученных IIS автоматически), которые будут добавляться в карточки
            var naturalFiles = new List<string>();

            // Загружаем файлы из запроса
            foreach (var file in fileData)
            {
                string tempFolderForFile = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName());
                Directory.CreateDirectory(tempFolderForFile);

                // Устанавиваем настоящее название для оперативного файла
                string naturalFileName = Path.Combine(tempFolderForFile, file.FileName);

                using (Stream source = file.OpenReadStream())
                {
                    using (Stream destination = new FileStream(naturalFileName, FileMode.Create))
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