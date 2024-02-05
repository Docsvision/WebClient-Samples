using ExtendedCardInfoServerExtension.Models;
using System;
using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Helpers;
using DocsVision.Platform.WebClient.Models.Generic;
using ExtendedCardInfoServerExtension.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExtendedCardInfoServerExtension.Controllers
{
    public class ExtendedCardController : Controller
    {
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;
        private readonly IExtendedCardService extendedCardService;

        public ExtendedCardController(ICurrentObjectContextProvider currentObjectContextProvider, IExtendedCardService extendedCardService)
        {
            this.currentObjectContextProvider = currentObjectContextProvider;
            this.extendedCardService = extendedCardService;
        }

        public ActionResult Get([FromQuery]Guid cardId)
        {
            var response = new CommonResponse<ExtendedCardModel>();
            
            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            var extendedCardModel = extendedCardService.GetExtendedCard(sessionContext, cardId);

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