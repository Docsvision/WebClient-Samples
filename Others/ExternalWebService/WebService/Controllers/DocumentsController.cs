using DocsVision.Platform.StorageServer;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using NLog;
using WebService.Interfaces.Models;
using Microsoft.AspNetCore.Mvc;
using WebService.Services;

namespace WebService.Controllers
{
    public class DocumentsController : ControllerBase
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        private Services.IDocumentService _documentService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ISessionService _sessionService;

        /// <summary>
        /// </summary>
        /// <param name="documentService"></param>
        public DocumentsController(IDocumentService documentService, 
            IWebHostEnvironment webHostEnvironment,
            ISessionService sessionService)
        {
            _documentService = documentService;
            _webHostEnvironment = webHostEnvironment;
            _sessionService = sessionService;
        }

        /// <summary>
        /// Получить модель карточки документа по его идентификатору
        /// </summary>
        /// <param name="id">Идентификатор карточки</param>
        /// <returns><see cref="DocumentModel"/></returns>
        [HttpGet]
        public DocumentModel? Get(Guid id)
        {
            var sessionContext = _sessionService.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();

            DocumentModel? documentModel = null;
            DoAction(() =>
            {
                documentModel = _documentService.Get(sessionContext, objectContext, id);
            });

            return documentModel;
        }

        /// <summary>
        /// Создать карточку документа
        /// </summary>
        /// <param name="document">Модель документа</param>
        /// <returns><see cref="Guid"/></returns>
        [HttpPost]
        public Guid Create([FromBody]DocumentModel document)
        {
            var sessionContext = _sessionService.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();

            var employeeID = sessionContext.Session.Properties.Contains("EmployeeID")
                    ? Guid.Parse(sessionContext.Session.Properties["EmployeeID"].Value.ToString()!)
                    : Guid.Empty;
            document.Registrar = employeeID;

            var newDocumentId = Guid.Empty;
            DoAction(() =>
            {
                newDocumentId = _documentService.Create(sessionContext, objectContext, document);
            });

            return newDocumentId;
        }

        /// <summary>
        /// Обновить данные карточки документа
        /// </summary>
        /// <param name="document">Модель документа</param>
        [HttpPost]
        public void Update([FromBody]DocumentModel document)
        {
            var sessionContext = _sessionService.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();

            DoAction(() =>
            {
                _documentService.Update(sessionContext, objectContext, document);
            });
        }

        /// <summary>
        /// Удалить карточку документа по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор карточки</param>
        [HttpPost]
        public void Delete([FromBody]Guid id)
        {
            var sessionContext = _sessionService.GetSessionContext();

            DoAction(() =>
            {
                _documentService.Delete(sessionContext, id);
            });
        }

        /// <summary>
        /// Изменить состояние карточки документа
        /// </summary>
        /// <param name="changeStateRequestModel">Модель смены состояния карточки документа</param>
        [HttpPost]
        public void ChangeState([FromBody]ChangeStateRequestModel changeStateRequestModel)
        {
            var sessionContext = _sessionService.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();

            DoAction(() =>
            {
                _documentService.ChangeState(sessionContext, objectContext, changeStateRequestModel);
            });
        }

        /// <summary>
        /// Загрузить файл в карточку документа
        /// </summary>
        /// <returns><see cref="Task{Guid}"/></returns>
        [HttpPost]
        public async Task<Guid> UploadFile([FromForm(Name = "file")] IFormFile file, Guid cardId)
        {
            var sessionContext = _sessionService.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();
            
            var uploadDir = Path.Combine(_webHostEnvironment.ContentRootPath, "App_Data", "Uploads");
            var uploadFilesDir = Path.Combine(uploadDir, Guid.NewGuid().ToString());
            Directory.CreateDirectory(uploadFilesDir);

            var fileId = Guid.Empty;

            try
            {
                fileId = await _documentService.UploadFile(objectContext, file, cardId, uploadFilesDir);
            }
            finally
            {
                Directory.Delete(uploadDir, true);
            }

            return fileId;
        }

        /// <summary>
        /// Скачать файл
        /// </summary>
        /// <returns><see cref="HttpResponseMessage"/></returns>
        [HttpGet]
        public IActionResult DownloadFile(Guid fileId)
        {
            var sessionContext = _sessionService.GetSessionContext();
            Stream? fileStream = null;
            string? fileName = null;

            DoAction(() =>
            {
                 fileStream = _documentService.DownloadFile(sessionContext, fileId, out fileName);
            });

            if (fileStream != null)
            {
                return File(fileStream, "application/octet-stream", fileName);
            }
            else
            {
                return NotFound();
            }
        }
                                                                   
        private void DoAction(Action action)
        {
            try
            {
                action();
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                throw;
            }
        }
    }
}
