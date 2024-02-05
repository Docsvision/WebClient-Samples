using DocsVision.Platform.ObjectModel;
using System;
using System.Net.Http;
using WebService.Helpers;
using WebService.Interfaces.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebService.Services
{
    public interface IDocumentService
    {
        /// <summary>
        /// Получить модель карточки документа по его идентификатору
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="DocumentModel"/></returns>
        DocumentModel Get(SessionContext sessionContext, ObjectContext objectContext, Guid cardId);

        /// <summary>
        /// Создать карточку документа
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="document">Модель документа</param>
        /// <returns><see cref="Guid"/></returns>
        Guid Create(SessionContext sessionContext, ObjectContext objectContext, DocumentModel document);

        /// <summary>
        /// Обновить данные карточки документа
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="document">Модель документа</param>
        void Update(SessionContext sessionContext, ObjectContext objectContext, [FromBody]DocumentModel document);

        /// <summary>
        /// Удалить карточку документа по идентификатору
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="id">Идентификатор карточки</param>
        void Delete(SessionContext sessionContext, [FromBody]Guid id);

        /// <summary>
        /// Изменить состояние карточки документа
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="changeStaterequestModel">Модель смены состояния карточки документа</param>
        void ChangeState(SessionContext sessionContext, ObjectContext objectContext, [FromBody]ChangeStateRequestModel changeStateRequestModel);

        /// <summary>
        /// Скачать файл
        /// </summary>
        Stream? DownloadFile(SessionContext sessionContext, Guid fileId, out string? fileName);

        /// <summary>
        /// Загрузить файл в карточку документа
        /// </summary>
        /// <param name="objectContext">Контекст объекта</param>
        /// <param name="file">Загруженный файл</param>
        /// <param name="cardId">Карточка, куда следует прикрепить файл</param>
        /// <param name="uploadFilesDir">Временная директория загрузки файла</param>
        /// <returns><see cref="Guid"/></returns>  
        Task<Guid> UploadFile(ObjectContext objectContext, IFormFile file, Guid cardId, string uploadFilesDir);
    }
}
