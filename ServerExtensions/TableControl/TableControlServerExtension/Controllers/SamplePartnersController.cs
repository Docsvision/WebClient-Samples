using TableControlServerExtension.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Helpers;
using DocsVision.Platform.WebClient.Models.Generic;
using ServiceHelper = TableControlServerExtension.Helpers.ServiceHelper;

namespace TableControlServerExtension.Controllers
{
    public class SamplePartnersController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Create new instance of <see cref="SamplePartnersController"/>
        /// </summary>
        /// <param name="serviceProvider">Service provider</param>
        public SamplePartnersController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// Get departments info
        /// </summary>
        /// <returns></returns>
        public ActionResult GetPartnersInfo(List<Guid> partnerIds)
        {
            var sessionContext = this.serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            if (this.serviceHelper.EmployeeService.GetCurrentEmployee(sessionContext) == null)
            {
                return RedirectToAction("AccessDenied", "Error");
            }
            CommonResponse<List<PartnerModel>> response = new CommonResponse<List<PartnerModel>>();
            var result = new List<PartnerModel>();
            foreach (var partnerId in partnerIds)
            {
                var partnerInfo = this.serviceHelper.SamplePartnersService.GetPartnerInfo(sessionContext, partnerId);
                result.Add(partnerInfo);
            }
            response.InitializeSuccess(result);
            return Content(JsonHelper.SerializeToJson(response), "application/json");
        }

    }
}