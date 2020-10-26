using System;
using System.Web.Mvc;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Helpers;
using LicenseCheckServerExtension.Services;

namespace LicenseCheckServerExtension.Controllers
{
    /// <summary>
    /// Представляет собой контроллер для проверки лицензии
    /// </summary>
    public class LicenseCheckController : Controller
    {
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;
        private readonly ILicenseCheckService licenseCheckService;
        
        /// <summary>
        /// Создаёт новый экземпляр <see cref="LicenseCheckController"/>
        /// </summary>
        public LicenseCheckController(ICurrentObjectContextProvider currentObjectContextProvider, ILicenseCheckService licenseCheckService)
        {
            this.currentObjectContextProvider = currentObjectContextProvider;
            this.licenseCheckService = licenseCheckService;
        }

        /// <summary>
        /// Проверить признак лицензии
        /// </summary>
        public string CheckFeature()
        {
            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            var response = licenseCheckService.CheckFeature(sessionContext);
            return JsonHelper.SerializeToJson(response);
        }
    }
}