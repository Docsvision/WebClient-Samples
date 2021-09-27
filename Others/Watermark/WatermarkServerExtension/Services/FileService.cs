using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.ObjectManager.SystemCards;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WatermarkServerExtension.Services
{
    public class FileService : IFileService
    {
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;
        private Guid DOCUMENT_CARD_ID = new Guid("B9F7BFD7-7429-455E-A3F1-94FFB569C794");

        public FileService(ICurrentObjectContextProvider currentObjectContextProvider) {
            this.currentObjectContextProvider = currentObjectContextProvider;
        }

        // Добавляет файлы с ФС в карточу cardID
        public async System.Threading.Tasks.Task<IEnumerable<Guid>> AddFilesToCard(Guid cardID, List<string> files)
        {
            // Получает карточку, к которой прикрепляются файлы
            var document = GetDocumentCard(cardID);
            ObjectContext objectContext = GetObjectContext();

            ILockService lockService = GetLockService(objectContext);

            if (lockService.IsObjectLockedByAnotherUser(document)) {
                throw new Exception($"Карточка {cardID} заблокирована другим пользователем");
            }

            if (lockService.LockObjectBase(document) == false) {
                throw new Exception($"Не удалось заблокировать карточку {cardID}");
            }

            IDocumentService documentService = GetDocumentService(objectContext);

            return await System.Threading.Tasks.Task.Run(() =>
            {
                IEnumerable<Guid> documentFileIds;
                try
                {
                    IEnumerable<DocumentFile> documentsFiles = documentService.AddAdditionalFiles(document, files);
                    objectContext.AcceptChanges();
                    documentFileIds = documentsFiles.Select(t => t.FileId);
                }
                catch (Exception ex)
                {
                    throw new Exception($"Ошибка при добавлении файлов в карточку {cardID}\n {ex.Message}");
                }
                finally {
                    lockService.UnlockObject(document);
                }

                // Возвращает идентификаторы добавленных файлов с версиями
                return documentFileIds;
            });
        }

        // Получает указатель для чтения файла из карточки файла с версиями fileCardID
        public FileReader GetFileReader(Guid fileCardID)
        {
            ObjectContext objectContext = GetObjectContext();
            IVersionedFileCardService versionedFileCardService = GetVersionedFileCardService(objectContext);

            // Получение файла карточки с версиями
            VersionedFileCard fileCard = versionedFileCardService.OpenCard(fileCardID);
            
            // Получение идентификатора файла из последей версии
            Guid fileID = fileCard.CurrentVersion.Id;

            UserSession userSession = GetUserSession();
            
            // Если файла нет, возвращается пустой указатель
            if (userSession.FileManager.FileExists(fileID) == false) 
                return new FileReader();
            
            // Запрашивается файл текущей версии
            var file = userSession.FileManager.GetFile(fileID);
           
           // Возвращается указатель для чтения файла
            return new FileReader() {
                FileID = fileID,
                FileName = file.Name,
                Stream = file.OpenReadStream()
            };
        }

        // Возвращает модель Документа по его идентификатору
        // Если карточка не найдена или не является документов, вызывается ошибка
        private Document GetDocumentCard(Guid cardID) 
        {
            Document document;
            try
            {
                document = GetObjectContext().GetObject<Document>(cardID);
            }
            catch (Exception ex) {
                throw new Exception($"Прочая ошибка при получении Документа.\n{ex.Message}");
            }

            if (document == null) {
                throw new Exception($"Карточка с идентификатором {cardID} не существует");
            }
            if (document.CardType.Id != DOCUMENT_CARD_ID) {
                throw new Exception("Функция добавления файлов поддерживается только для карточек Документ");
            }
        
            return document;        
        }

        #region Сервисы

        private ObjectContext GetObjectContext()
        {
            return currentObjectContextProvider.GetOrCreateCurrentSessionContext().ObjectContext;
        }
        private UserSession GetUserSession()
        {
            return currentObjectContextProvider.GetOrCreateCurrentSessionContext().Session;
        }

        private ILockService GetLockService(ObjectContext objectContext)
        {
            return objectContext.GetService<ILockService>();
        }

        private IDocumentService GetDocumentService(ObjectContext objectContext)
        { 
            return objectContext.GetService<IDocumentService>();
        }

        private IVersionedFileCardService GetVersionedFileCardService(ObjectContext objectContext)
        {
            return objectContext.GetService<IVersionedFileCardService>();
        }


        #endregion
    }
}