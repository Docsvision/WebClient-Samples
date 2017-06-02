using ExtendedCardInfoServerExtension.Models;
using System;
using System.Web.Http;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Helpers;
using DocsVision.Platform.WebClient.Models.Generic;
using ServiceHelper = ExtendedCardInfoServerExtension.Helpers.ServiceHelper;

namespace ExtendedCardInfoServerExtension.Controllers
{
    public class ExtendedCardController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        public ExtendedCardController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        public ActionResult Get([FromUri]Guid cardId)
        {
            var response = new CommonResponse<ExtendedCardModel>();
            
            var sessionContext = this.serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            if (this.serviceHelper.EmployeeService.GetCurrentEmployee(sessionContext) == null)
            {
                response.InitializeError(Resources.Error_AccessDenied);
                return GetResponse(response);
            }

            var extendedCardModel = this.serviceHelper.ExtendedCardService.GetExtendedCard(sessionContext, cardId);

            if (extendedCardModel == null)
            {
                response.InitializeError(Resources.Response_InvalidCardId);
                return GetResponse(response);
            }

            response.InitializeSuccess(extendedCardModel);

            return GetResponse(response);
        }


        #region Helpers

        private ContentResult GetResponse<T>(CommonResponse<T> response)
        {
            return Content(JsonHelper.SerializeToJson(response), "application/json");
        }

        #endregion

    }
}