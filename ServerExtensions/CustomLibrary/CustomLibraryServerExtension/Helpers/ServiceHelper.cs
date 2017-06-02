using CustomLibraryServerExtension.Services;
using System;
using DocsVision.Platform.WebClient.Helpers;

namespace CustomLibraryServerExtension.Helpers
{
    internal class ServiceHelper : DocsVision.BackOffice.WebClient.Helpers.ServiceHelper
    {
        private ICustomLibraryService customLibraryService;

        public ServiceHelper(IServiceProvider serviceProvider): base(serviceProvider)
        {
        }     

        public ICustomLibraryService CustomLibraryService
        {
            get
            {
                return customLibraryService ?? (customLibraryService = ServiceUtil.GetService<ICustomLibraryService>(serviceProvider));
            }
        }
    }
}