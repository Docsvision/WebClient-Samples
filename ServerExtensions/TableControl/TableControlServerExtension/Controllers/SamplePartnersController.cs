using TableControlServerExtension.Models;
using System;
using System.Collections.Generic;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Helpers;
using DocsVision.Platform.WebClient.Models.Generic;
using TableControlServerExtension.Services;
using Microsoft.AspNetCore.Mvc;

namespace TableControlServerExtension.Controllers
{
    public class SamplePartnersController : Controller
    {
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;
        private readonly ISamplePartnersService samplePartnersService;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="SamplePartnersController"/>
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public SamplePartnersController(ICurrentObjectContextProvider currentObjectContextProvider, ISamplePartnersService samplePartnersService)
        {
            this.currentObjectContextProvider = currentObjectContextProvider;
            this.samplePartnersService = samplePartnersService;
        }

        /// <summary>
        /// Получить информацию о подразделениях
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ActionResult GetPartnersInfo([FromBody] List<Guid> partnerIds)
        {
            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();

            CommonResponse<List<PartnerModel>> response = new CommonResponse<List<PartnerModel>>();
            var result = new List<PartnerModel>();
            foreach (var partnerId in partnerIds)
            {
                var partnerInfo = samplePartnersService.GetPartnerInfo(sessionContext, partnerId);
                result.Add(partnerInfo);
            }
            response.InitializeSuccess(result);
            return Content(JsonHelper.SerializeToJson(response), "application/json");
        }

    }
}