using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.WebClient;
using $safeprojectname$.Feature1.Models;

namespace $safeprojectname$.Feature1
{
    /// <summary>
    /// Реализация сервиса, содержащего логику обработки запроса.
    /// </summary>
    public class Feature1Service: IFeature1Service
    {
        /// <summary>
        /// Логика обработки запроса.
        /// </summary>
        /// <param name="sessionContext">Объект доступа к сессии и API Docsvision.</param>
        /// <param name="request">Параметры запроса.</param>
        /// <returns>Модель с результатом выполнения операции.</returns>
        public Action1Response Action1(SessionContext sessionContext, Action1Request request)
        {
            // Получим документ через объектную модель и обновим название
            var document = sessionContext.ObjectContext.GetObject<Document>(request.DocumentId);
            document.MainInfo.Name += Resource.Feature1LocalizedString;
            // В конце внесения изменений через объектную модель необходимо применить изменения.
            sessionContext.ObjectContext.AcceptChanges();

            return new Action1Response() { DocumentId = request.DocumentId, Name = document.MainInfo.Name };
        }
    }
}
