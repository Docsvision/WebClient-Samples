using AcquaintancePanelServerExtension.Services;
using System;
using DocsVision.Platform.WebClient.Helpers;

namespace AcquaintancePanelServerExtension.Helpers
{
    internal class ServiceHelper: DocsVision.BackOffice.WebClient.Helpers.ServiceHelper
    {
        private ILayoutBPService layoutBPService;

        public ServiceHelper(IServiceProvider serviceProvider):base(serviceProvider)
        {
        }
       
        public ILayoutBPService LayoutBPService
        {
            get
            {
                return this.layoutBPService ?? (this.layoutBPService = ServiceUtil.GetService<ILayoutBPService>(serviceProvider));
            }
        }
    }
}