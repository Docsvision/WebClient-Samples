using System;
using System.Web.Mvc;
using DocsVision.Platform.WebClient.Helpers;
using ServiceHelper = CustomLibraryServerExtension.Helpers.ServiceHelper;

namespace CustomLibraryServerExtension.Controllers
{
    /// <summary>
    /// Represents custom library controller
    /// </summary>
    public class CustomLibraryController : Controller
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Create new instance of <see cref="CustomLibraryController"/>
        /// </summary>
        /// <param name="serviceProvider">Service provider</param>
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