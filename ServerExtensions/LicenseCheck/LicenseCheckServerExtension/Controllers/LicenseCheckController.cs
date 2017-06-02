using System;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Helpers;
using ServiceHelper = LicenseCheckServerExtension.Helpers.ServiceHelper;

namespace LicenseCheckServerExtension.Controllers
{
    /// <summary>
    /// Represents license checking controller
    /// </summary>
    public class LicenseCheckController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Create new instance of <see cref="LicenseCheckController"/> class
        /// </summary>
        /// <param name="serviceProvider">Service provider</param>
        public LicenseCheckController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// Checks license feature
        /// </summary>
        public string CheckFeature()
        {
            var response = this.serviceHelper.LicenseCheckService.CheckFeature();
            return JsonHelper.SerializeToJson(response);
        }
    }
}