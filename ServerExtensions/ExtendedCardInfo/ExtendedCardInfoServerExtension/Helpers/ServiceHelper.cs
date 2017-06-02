using System;
using DocsVision.Platform.WebClient.Helpers;
using ExtendedCardInfoServerExtension.Services;

namespace ExtendedCardInfoServerExtension.Helpers
{
    internal class ServiceHelper : DocsVision.BackOffice.WebClient.Helpers.ServiceHelper
    {
        private IExtendedCardService extendedCardService;

        public ServiceHelper(IServiceProvider serviceProvider): base(serviceProvider)
        {
        }     

        public IExtendedCardService ExtendedCardService
        {
            get
            {
                return extendedCardService ?? (extendedCardService = ServiceUtil.GetService<IExtendedCardService>(serviceProvider));
            }
        }
    }
}