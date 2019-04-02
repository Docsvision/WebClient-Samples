using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.WebClient.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Http;
using NLog;
using WebService.Helpers;
using WebService.Interfaces.Models;

namespace WebService.Services
{
    public class DocumentService : IDocumentService
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Получить модель карточки документа по его идентификатору
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="DocumentModel"/></returns>
        public DocumentModel Get(SessionContext sessionContext, ObjectContext objectContext, Guid cardId)
        {
            var cardData = sessionContext.Session.CardManager.GetCardData(cardId);
            var systemRow = cardData.Sections[CardDocument.System.ID].FirstRow;
            var mainInfoRow = cardData.Sections[CardDocument.MainInfo.ID].FirstRow;
            var documentContractRow = cardData.Sections[CardDocument.Contract.ID].FirstRow;
            var documentFilesRows = cardData.Sections[CardDocument.Files.ID].GetAllRows();

            var contract = new ContractModel
            {
                Id = documentContractRow.Id,
                ContractSum = documentContractRow.GetDecimal(CardDocument.Contract.ContractSum),
                ContractCurrency = (ContractCurrencyMode?)documentContractRow.GetInt32(CardDocument.Contract.ContractCurrency),
                ContractDate = documentContractRow.GetDateTime(CardDocument.Contract.ContractDate),
            };

            var files = new List<FileModel>();
            foreach (var fileRow in documentFilesRows)
            {
                var documentFile = objectContext.GetObject<DocumentFile>(fileRow.Id);
                var file = new FileModel
                {
                    Id = documentFile.FileVersionRowId,
                    Name = documentFile.FileName,
                    Size = documentFile.FileSize,
                };
                files.Add(file);
            }

            var documentModel = new DocumentModel
            {
                Id = cardId,
                KindId = systemRow.GetGuid(CardDocument.System.Kind),
                RegDate = mainInfoRow.GetDateTime(CardDocument.MainInfo.RegDate),
                Name = mainInfoRow.GetString(CardDocument.MainInfo.Name),
                Registrar = mainInfoRow.GetGuid(CardDocument.MainInfo.Registrar),
                Files = files,
                Contract = contract,
            };

            return documentModel;
        }

        /// <summary>
        /// Создать карточку документа
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="document">Модель документа</param>
        /// <returns><see cref="Guid"/></returns>
        public Guid Create(SessionContext sessionContext, ObjectContext objectContext, DocumentModel document)
        {
            var documentService = objectContext.GetService<DocsVision.BackOffice.ObjectModel.Services.IDocumentService>();

            var kindsCardKind = document.KindId.HasValue ? objectContext.GetObject<KindsCardKind>(document.KindId) : null;
            var documentCard = documentService.CreateDocument(null, kindsCardKind);
            objectContext.AcceptChanges();

            var cardId = documentCard.GetObjectId();
            var cardData = sessionContext.Session.CardManager.GetCardData(cardId);
            cardData.BeginUpdate();
            try
            {
                var mainInfoRow = cardData.Sections[CardDocument.MainInfo.ID].FirstRow;
                mainInfoRow.SetString(CardDocument.MainInfo.Name, document.Name);
                mainInfoRow.SetGuid(CardDocument.MainInfo.Registrar, document.Registrar); 
                mainInfoRow.SetDateTime(CardDocument.MainInfo.RegDate, document.RegDate); 

                if (document.Contract != null)
                {
                    var documentContractRow = cardData.Sections[CardDocument.Contract.ID].FirstRow;
                    documentContractRow.SetDecimal(CardDocument.Contract.ContractSum, document.Contract.ContractSum);
                    documentContractRow.SetInt32(CardDocument.Contract.ContractCurrency, (int?)document.Contract.ContractCurrency);
                }

                cardData.EndUpdate();

                return cardId;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                cardData.CancelUpdate();
                throw;
            }
        }

        /// <summary>
        /// Обновить данные карточки документа
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="document">Модель документа</param>
        public void Update(SessionContext sessionContext, ObjectContext objectContext, [FromBody]DocumentModel document)
        {
            var cardId = document.Id ?? Guid.Empty;
            var cardData = sessionContext.Session.CardManager.GetCardData(cardId);

            cardData.BeginUpdate();
            try
            {
                var mainInfoRow = cardData.Sections[CardDocument.MainInfo.ID].FirstRow;

                mainInfoRow.SetString(CardDocument.MainInfo.Name, document.Name);
                mainInfoRow.SetGuid(CardDocument.MainInfo.Registrar, document.Registrar);
                mainInfoRow.SetDateTime(CardDocument.MainInfo.RegDate, document.RegDate);

                if (document.Contract != null)
                {
                    var documentContractRow = cardData.Sections[CardDocument.Contract.ID].FirstRow;
                    documentContractRow.SetDecimal(CardDocument.Contract.ContractSum, document.Contract.ContractSum);
                    documentContractRow.SetInt32(CardDocument.Contract.ContractCurrency, (int?)document.Contract.ContractCurrency);
                }

                cardData.EndUpdate();
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                cardData.CancelUpdate();
                throw;
            }
        }

        /// <summary>
        /// Удалить карточку документа по идентификатору
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="id">Идентификатор карточки</param>
        public void Delete(SessionContext sessionContext, [FromBody]Guid id)
        {
            sessionContext.Session.CardManager.DeleteCard(id);
        }

        /// <summary>
        /// Изменить состояние карточки документа
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="changeStaterequestModel">Модель смены состояния карточки документа</param>
        public void ChangeState(SessionContext sessionContext, ObjectContext objectContext, [FromBody]ChangeStateRequestModel changeStateRequestModel)
        {
            string bpErrors = null;

            var cardDocument = objectContext.GetObject<Document>(changeStateRequestModel.CardId);
            var statesOperation = objectContext.GetObject<StatesOperation>(changeStateRequestModel.OperationId);
            var stateService = objectContext.GetService<DocsVision.BackOffice.ObjectModel.Services.IStateService>();
            if (stateService.IsOperationAllowedFull(statesOperation, cardDocument))
            {
                var state = cardDocument.SystemInfo.State;
                var stateMachineBranches = stateService.GetStateMachineBranches(cardDocument.SystemInfo.CardKind);
                var stateMachineBranche = stateMachineBranches
                    .Single(l =>
                    l.Operation.GetObjectId() == changeStateRequestModel.OperationId &&
                    l.StartState == state);

                stateService.ChangeState(cardDocument, stateMachineBranche, true, out bpErrors);
            }

            if (!string.IsNullOrEmpty(bpErrors))
            {
                throw new InvalidOperationException(bpErrors);
            }
        }

        /// <summary>
        /// Скачать файл
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="id">Идентификатор карточки</param>
        /// <returns><see cref="HttpResponseMessage"/></returns> 
        public HttpResponseMessage DownloadFile(SessionContext sessionContext, Guid fileId)
        {
            var fileData = sessionContext.Session.FileManager.GetFile(fileId);

            if (fileId != Guid.Empty)
            {
                var response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StreamContent(fileData.OpenReadStream());
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response.Content.Headers.ContentDisposition = ContentDispositionHeaderValue.Parse("attachment; filename=\"" + HttpUtility.UrlEncode(fileData.Name, UnicodeEncoding.UTF8)
                    .Replace("+++", " ").Replace("++", " ").Replace("+", " ") + "\"");
                response.Content.Headers.ContentDisposition.FileName = fileData.Name;
                return response;
            }

            return new HttpResponseMessage(HttpStatusCode.NotFound);
        }

        /// <summary>
        /// Загрузить файл в карточку документа
        /// </summary>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="provider">Провайдер</param>
        /// <param name="uploadFilesDir">Временная директория загрузки файла</param>
        /// <returns><see cref="Guid"/></returns>  
        public Guid UploadFile(ObjectContext objectContext, MultipartFormDataStreamProvider provider, string uploadFilesDir)
        {
            var documentService = objectContext.GetService<DocsVision.BackOffice.ObjectModel.Services.IDocumentService>();
            var cardId = new Guid(provider.FormData["cardId"]);
            var card = objectContext.GetObject<Document>(cardId);
            var fileDataItem = provider.FileData.SingleOrDefault() ?? throw new InvalidOperationException("There is no file content");
            var newFileName = Path.Combine(uploadFilesDir, fileDataItem.Headers.ContentDisposition.FileName);
            File.Move(fileDataItem.LocalFileName, newFileName);
            var documentFile = documentService.AttachMainFile(card, newFileName);

            objectContext.AcceptChanges();

            return documentFile.FileVersionRowId;
        }
    }
}