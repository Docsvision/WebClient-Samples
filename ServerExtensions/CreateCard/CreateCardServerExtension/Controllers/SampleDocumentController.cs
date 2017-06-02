using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Helpers;
using ServiceHelper = CreateCardServerExtension.Helpers.ServiceHelper;

namespace CreateCardServerExtension.Controllers
{
    public class SampleDocumentController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Create new instance of <see cref="SampleDocumentController"/>
        /// </summary>
        /// <param name="serviceProvider">Service provider</param>
        public SampleDocumentController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// GET: / LayoutCreateDocumentController/SendToAcquaintance
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateOutgoingDocument(Guid parentDocId)
        {
            var sessionContext = this.serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();
            if (this.serviceHelper.EmployeeService.GetCurrentEmployee(sessionContext) == null)
            {
                return RedirectToAction("AccessDenied", "Error");
            }

            var response = this.serviceHelper.LayoutCreateDocumentService.CreateOutgoingDocument(parentDocId);

            return Content(JsonHelper.SerializeToJson(response), "application/json");
        }
    }
}