using System;
using System.Collections.Generic;
using System.Web.Mvc;
using AcquaintancePanelServerExtension.Services;
using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Helpers;

namespace AcquaintancePanelServerExtension.Controllers
{
    public class LayoutBusinessProcessController : Controller
    {
        private readonly Guid acquaitanceBPID = new Guid("a490324e-3b99-e211-a503-001676e1723a");
        
        private readonly ILayoutBPService layoutBPService;
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="LayoutBusinessProcessController"/>
        /// </summary>
        public LayoutBusinessProcessController(ILayoutBPService layoutBPService, ICurrentObjectContextProvider currentObjectContextProvider)
        {
            this.layoutBPService = layoutBPService;
            this.currentObjectContextProvider = currentObjectContextProvider;
        }

        /// <summary>
        /// GET: /LayoutCustomLogic/SendToAcquaintance
        /// </summary>
        /// <returns></returns>
        public ActionResult SendToAcquaintance(Guid cardId, List<Guid> employeeIds = null, DateTime? endDate = null)
        {
            var sessionContext = this.currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            var response = this.layoutBPService.StartBusinessProcess(sessionContext, cardId, acquaitanceBPID, employeeIds, endDate);

            return Content(JsonHelper.SerializeToJson(response), "application/json");            
        }
        
    }
}