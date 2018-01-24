using System;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Helpers;
using ServiceHelper = LicenseCheckServerExtension.Helpers.ServiceHelper;

namespace LicenseCheckServerExtension.Controllers
{
    /// <summary>
    /// Представляет собой контроллер для проверки лицензии
    /// </summary>
    public class LicenseCheckController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="LicenseCheckController"/>
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public LicenseCheckController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// Проверить признак лицензии
        /// </summary>
        public string CheckFeature()
        {
            var response = this.serviceHelper.LicenseCheckService.CheckFeature();
            return JsonHelper.SerializeToJson(response);
        }
    }
}