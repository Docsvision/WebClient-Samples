using LicenseCheckServerExtension.Services;
using System;
using DocsVision.Platform.WebClient.Helpers;

namespace LicenseCheckServerExtension.Helpers
{
    internal class ServiceHelper : DocsVision.BackOffice.WebClient.Helpers.ServiceHelper
    {    
        private ILicenseCheckService licenseCheckService;       

        public ServiceHelper(IServiceProvider serviceProvider):base(serviceProvider)
        {
        }   

        public ILicenseCheckService LicenseCheckService
        {
            get
            {
                return licenseCheckService ?? (licenseCheckService = ServiceUtil.GetService<ILicenseCheckService>(serviceProvider));
            }
        }
       
    }
}