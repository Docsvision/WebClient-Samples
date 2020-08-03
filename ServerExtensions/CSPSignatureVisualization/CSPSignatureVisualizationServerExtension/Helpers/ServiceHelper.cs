using DocsVision.Platform.WebClient.Configuration;
using DocsVision.Platform.WebClient.Helpers;
using System;

namespace CSPSignatureVisualizationServerExtension.Helpers
{
    internal class ServiceHelper : DocsVision.BackOffice.WebClient.Helpers.ServiceHelper
    {
        private IConfigurationProvider configurationProvider;

        public ServiceHelper(IServiceProvider serviceProvider)
            :base(serviceProvider)
        {
        }

        public IConfigurationProvider ConfigurationProvider => ServiceUtil.GetService(serviceProvider, ref configurationProvider);
    }
}
