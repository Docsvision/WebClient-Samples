using CreateCardServerExtension.Services;
using System;
using DocsVision.Platform.WebClient.Helpers;

namespace CreateCardServerExtension.Helpers
{
    internal class ServiceHelper : DocsVision.BackOffice.WebClient.Helpers.ServiceHelper
    {
        private ISampleDocumentService layoutCreateDocumentService; 

        public ServiceHelper(IServiceProvider serviceProvider): base(serviceProvider)
        {
        }

        public ISampleDocumentService LayoutCreateDocumentService
        {
            get
            {
                return this.layoutCreateDocumentService ?? (this.layoutCreateDocumentService = ServiceUtil.GetService<ISampleDocumentService>(serviceProvider));
            }
        }
    }
}