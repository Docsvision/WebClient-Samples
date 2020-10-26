using System;
using System.Web.Mvc;
using CreateCardServerExtension.Services;
using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Helpers;

namespace CreateCardServerExtension.Controllers
{
    public class SampleDocumentController : Controller
    {
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;
        private readonly ISampleDocumentService sampleDocumentService;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="SampleDocumentController"/>
        /// </summary>
        public SampleDocumentController(ICurrentObjectContextProvider currentObjectContextProvider, ISampleDocumentService sampleDocumentService)
        {
            this.currentObjectContextProvider = currentObjectContextProvider;
            this.sampleDocumentService = sampleDocumentService;
        }

        /// <summary>
        /// GET: / LayoutCreateDocumentController/SendToAcquaintance
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateOutgoingDocument(Guid parentDocId)
        {
            var sessionContext = this.currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            var response = sampleDocumentService.CreateOutgoingDocument(sessionContext, parentDocId);

            return Content(JsonHelper.SerializeToJson(response), "application/json");
        }
    }
}