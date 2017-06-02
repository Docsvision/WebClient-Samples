using TableControlServerExtension.Services;
using System;
using DocsVision.Platform.WebClient.Helpers;

namespace TableControlServerExtension.Helpers
{
    internal class ServiceHelper : DocsVision.BackOffice.WebClient.Helpers.ServiceHelper
    {
        private ISamplePartnersService samplePartnersService;      

        public ServiceHelper(IServiceProvider serviceProvider):base(serviceProvider)
        {
        }

        public ISamplePartnersService SamplePartnersService
        {
            get
            {
                return this.samplePartnersService ?? (this.samplePartnersService = ServiceUtil.GetService<ISamplePartnersService>(serviceProvider));
            }
        }
       
    }
}