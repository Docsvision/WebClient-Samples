using System;
using System.Net.Http;
using DocsVision.ConversionSampleServerExtension.Models;
using DocsVision.ConversionSampleServerExtension.Services;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Routing;

namespace DocsVision.ConversionSampleServerExtension.Controllers 
{
    /// <summary>
    /// Rонтроллер для взаимодействия с сервисом конвертации.
    /// </summary>

    public class ConversionFileController : Controller
	{
		private readonly ICurrentObjectContextProvider _currentObjectContextProvider;
		private readonly IConversionSampleService _conversionSampleService;

        /// <summary>
        /// Создаёт новый экземпляр класса <see cref="CSPSignatureVisualizationExtension" />.
        /// </summary>
        /// <param name="currentObjectContextProvider">Экземпляр <see cref="ICurrentObjectContextProvider"/>.</param>
        /// <param name="conversionSampleService">Экземпляр <see cref="IConversionSampleService"/>.</param>
        public ConversionFileController(ICurrentObjectContextProvider currentObjectContextProvider,
			IConversionSampleService conversionSampleService)
		{
			_currentObjectContextProvider = currentObjectContextProvider;
			_conversionSampleService = conversionSampleService;
		}

        [HttpGet]
        public CommonResponse CanConvert(Guid fileId)
        {
            var sessionContext = _currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            return _conversionSampleService.CanConvert(sessionContext, fileId);
        }

        /// <summary>
        /// Конвертирует файл в PDF/A формат и прикладывает его к документу как основной файл.
        /// </summary>
        /// <param name="request"><see cref="AttachPdfaRequest"/>. Тело запроса.</param>

        [HttpPost]
		public CommonResponse AttachPdfa(AttachPdfaRequest request)
		{
			var sessionContext = _currentObjectContextProvider.GetOrCreateCurrentSessionContext();
			return _conversionSampleService.AttachPdfa(sessionContext, request.DocumentId, request.FileId);
		}

        [HttpPost]
        public string Test()
        {
            return "Hello! Test is OK!";
        }
	}
}