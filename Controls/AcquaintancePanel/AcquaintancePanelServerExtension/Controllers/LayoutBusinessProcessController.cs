using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Helpers;
using ServiceHelper = AcquaintancePanelServerExtension.Helpers.ServiceHelper;

namespace AcquaintancePanelServerExtension.Controllers
{
    public class LayoutBusinessProcessController : Controller
    {

        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;
        private readonly Guid acquaitanceBPID = new Guid("a490324e-3b99-e211-a503-001676e1723a");

        /// <summary>
        /// Create new instance of <see cref="LayoutLinksController"/>
        /// </summary>
        /// <param name="serviceProvider">Service provider</param>
        public LayoutBusinessProcessController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// GET: /LayoutCustomLogic/SendToAcquaintance
        /// </summary>
        /// <returns></returns>
        public ActionResult SendToAcquaintance(Guid cardId, List<Guid> employeeIds = null, DateTime? endDate = null)
        {
            var sessionContext = this.serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();
            if (this.serviceHelper.EmployeeService.GetCurrentEmployee(sessionContext) == null)
            {
                return RedirectToAction("AccessDenied", "Error");
            }

            var response = this.serviceHelper.LayoutBPService.StartBusinessProcess(cardId, acquaitanceBPID, employeeIds, endDate);

            return Content(JsonHelper.SerializeToJson(response), "application/json");            
        }
        
    }
}