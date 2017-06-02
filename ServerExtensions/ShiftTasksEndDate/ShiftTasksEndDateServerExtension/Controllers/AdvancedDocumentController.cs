using System;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Models;
using JsonHelper = DocsVision.Platform.WebClient.Helpers.JsonHelper;

namespace ShiftTasksEndDateServerExtension.Controllers
{
    public class AdvancedDocumentController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private Helpers.ServiceHelper serviceHelper;

        public AdvancedDocumentController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.serviceHelper = new Helpers.ServiceHelper(serviceProvider);
        }

        [HttpPost]
        public ActionResult ShiftTasksEndDate(Guid cardId)
        {
            var response = new CommonResponse();
            var sessionContext = this.serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            if (this.serviceHelper.EmployeeService.GetCurrentEmployee(sessionContext) == null)
            {
                response.InitializeError(Resources.Error_AccessDenied);
                return GetResponse(response);
            }

            this.serviceHelper.ShiftTasksEndDateService.ShiftTasksEndDate(sessionContext, cardId);

            response.InitializeSuccess();

            return GetResponse(response);
        }

        private ContentResult GetResponse(CommonResponse response)
        {
            return Content(JsonHelper.SerializeToJson(response), "application/json");
        }
    }
}