using System;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Helpers;
using ServiceHelper = CustomLibraryServerExtension.Helpers.ServiceHelper;

namespace CustomLibraryServerExtension.Controllers
{
    /// <summary>
    /// Представляет собой кастомную библиотеку контроллера
    /// </summary>
    public class CustomLibraryController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomLibraryController"/>
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public CustomLibraryController(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// TBD
        /// </summary>
        public string GetCustomData()
        {
            var response = this.serviceHelper.CustomLibraryService.GetCustomData();
            return JsonHelper.SerializeToJson(response);
        }
    }
}