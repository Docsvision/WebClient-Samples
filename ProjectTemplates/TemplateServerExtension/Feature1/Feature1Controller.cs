using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;
using ServerExtension.Feature1.Models;
using System;
using System.Web.Http;

namespace ServerExtension.Feature1
{
    /// <summary>
    /// Контроллер регистрирует конечные точки серверного API.
    /// </summary>
    public class Feature1Controller : ApiController
    {
        private readonly ICurrentObjectContextProvider _currentObjectContextProvider;
        private readonly IFeature1Service _feature1Service;

        /// <summary>
        /// Через параметры конструктора добавляются зависимости от сервисов Web-клиента 
        /// и собственных сервисов расширения.
        /// </summary>
        public Feature1Controller(
            ICurrentObjectContextProvider currentObjectContextProvider,
            IFeature1Service Feature1Service)
        {
            _currentObjectContextProvider = currentObjectContextProvider;
            _feature1Service = Feature1Service;
        }

        /// <summary>
        /// Объявление конечной точки API. Доступ к ней осуществляется по адресу "api/Feature1/Action1".
        /// </summary>
        /// <param name="request">Параметры из тела запроса.</param>
        /// <remarks>Атрибут HttpPost или HttpGet указывает на вид обрабатываемого запроса.</remarks>
        [HttpPost]
        public CommonResponse<Action1Response> Action1(Action1Request request)
        {
            // Объект sessionContext необходимо получать в начале каждого запроса.
            // Использовать повторно объект между запросами нельзя.
            var sessionContext = _currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            // Рекомендуется размещать всю логику в сервисах, в контроллере только код вызова 
            // соответствующего метода. Это упрощает повторное использование кода.
            var result = _feature1Service.Action1(sessionContext, request);
            // Если запрос меняет карточку, то следует возвратить CommonResponse с новым
            // timestamp карточки. Такой объект можно создать, например, вызвав соответствующую
            // перегрузку CommonResponse.CreateSuccess.
            return CommonResponse.CreateSuccess(sessionContext, request.DocumentId, result);
        }
    }
}
