using System;
using System.Web.Mvc;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using ShiftTasksEndDateServerExtension.Services;
using JsonHelper = DocsVision.Platform.WebClient.Helpers.JsonHelper;

namespace ShiftTasksEndDateServerExtension.Controllers
{
    public class AdvancedDocumentController : Controller
    {
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;
        private readonly IShiftTasksEndDateService shiftTasksEndDateService;

        public AdvancedDocumentController(ICurrentObjectContextProvider currentObjectContextProvider, IShiftTasksEndDateService shiftTasksEndDateService)
        {
            this.currentObjectContextProvider = currentObjectContextProvider;
            this.shiftTasksEndDateService = shiftTasksEndDateService;
        }

        [HttpPost]
        public ActionResult ShiftTasksEndDate(Guid cardId)
        {
            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            shiftTasksEndDateService.ShiftTasksEndDate(sessionContext, cardId);

            var response = new CommonResponse();
            response.InitializeSuccess();
            return GetResponse(response);
        }

        private ContentResult GetResponse(CommonResponse response)
        {
            return Content(JsonHelper.SerializeToJson(response), "application/json");
        }
    }
}