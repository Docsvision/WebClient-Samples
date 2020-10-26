using System;
using System.Web.Mvc;
using CustomLibraryServerExtension.Services;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Helpers;

namespace CustomLibraryServerExtension.Controllers
{
    /// <summary>
    /// Представляет собой кастомную библиотеку контроллера
    /// </summary>
    public class CustomLibraryController : Controller
    {
        private readonly ICustomLibraryService customLibraryService;
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomLibraryController"/>
        /// </summary>
        public CustomLibraryController(ICurrentObjectContextProvider currentObjectContextProvider, ICustomLibraryService customLibraryService)
        {
            this.currentObjectContextProvider = currentObjectContextProvider;
            this.customLibraryService = customLibraryService;
        }

        /// <summary>
        /// TBD
        /// </summary>
        public string GetCustomData()
        {
            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            var response = customLibraryService.GetCustomData(sessionContext);
            return JsonHelper.SerializeToJson(response);
        }
    }
}