using DocsVision.Platform.StorageServer;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using NLog;
using WebService.Helpers;
using WebService.Interfaces.Models;

namespace WebService.Controllers
{
    public class DocumentsController : ApiController
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        private Services.IDocumentService DocumentService => WebApiApplication.Instance.GetService<Services.IDocumentService>();

        /// <summary>
        /// Получить модель карточки документа по его идентификатору
        /// </summary>
        /// <param name="id">Идентификатор карточки</param>
        /// <returns><see cref="DocumentModel"/></returns>
        [HttpGet]
        public DocumentModel Get(Guid id)
        {
            var sessionContext = SessionHelper.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();

            DocumentModel documentModel = null;
            DoAction(() =>
            {
                documentModel = DocumentService.Get(sessionContext, objectContext, id);
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
            var sessionContext = SessionHelper.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();

            var employeeID = sessionContext.Session.Properties.Contains("EmployeeID")
                    ? Guid.Parse(sessionContext.Session.Properties["EmployeeID"].Value.ToString())
                    : Guid.Empty;
            document.Registrar = employeeID;

            var newDocumentId = Guid.Empty;
            DoAction(() =>
            {
                newDocumentId = DocumentService.Create(sessionContext, objectContext, document);
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
            var sessionContext = SessionHelper.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();

            DoAction(() =>
            {
                DocumentService.Update(sessionContext, objectContext, document);
            });
        }

        /// <summary>
        /// Удалить карточку документа по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор карточки</param>
        [HttpPost]
        public void Delete([FromBody]Guid id)
        {
            var sessionContext = SessionHelper.GetSessionContext();

            DoAction(() =>
            {
                DocumentService.Delete(sessionContext, id);
            });
        }

        /// <summary>
        /// Изменить состояние карточки документа
        /// </summary>
        /// <param name="changeStateRequestModel">Модель смены состояния карточки документа</param>
        [HttpPost]
        public void ChangeState([FromBody]ChangeStateRequestModel changeStateRequestModel)
        {
            var sessionContext = SessionHelper.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();

            DoAction(() =>
            {
                DocumentService.ChangeState(sessionContext, objectContext, changeStateRequestModel);
            });
        }

        /// <summary>
        /// Загрузить файл в карточку документа
        /// </summary>
        /// <returns><see cref="Task{Guid}"/></returns>
        [HttpPost]
        public async Task<Guid> UploadFile()
        {
            var sessionContext = SessionHelper.GetSessionContext();
            var objectContext = sessionContext.CreateObjectContext();
            
            var uploadDir = Path.Combine(HttpContext.Current.Server.MapPath("~/App_Data"), "Uploads");
            var uploadFilesDir = Path.Combine(uploadDir, Guid.NewGuid().ToString());
            Directory.CreateDirectory(uploadFilesDir);

            var fileId = Guid.Empty;

            try
            {
                var provider = new MultipartFormDataStreamProvider(uploadFilesDir);
                await Request.Content.ReadAsMultipartAsync(provider);
                DoAction(() =>
                {
                    fileId = DocumentService.UploadFile(objectContext, provider, uploadFilesDir);
                });
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
        public HttpResponseMessage DownloadFile(Guid fileId)
        {
            var sessionContext = SessionHelper.GetSessionContext();
            var response = new HttpResponseMessage();

            DoAction(() =>
            {
                response = DocumentService.DownloadFile(sessionContext, fileId);
            });

            return response;
        }

        private void DoAction(Action action)
        {
            try
            {
                action();
            }
            catch (StorageServerException ex)
            {
                Logger.Error(ex);
                if (ex.ErrorCode == 1344)
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }
                else
                {
                    var httpResponseMessage = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                    httpResponseMessage.ReasonPhrase = ex.Message;
                    throw new HttpResponseException(httpResponseMessage);
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                var httpResponseMessage = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                httpResponseMessage.ReasonPhrase = ex.Message;
                throw new HttpResponseException(httpResponseMessage);
            }
        }
    }
}
