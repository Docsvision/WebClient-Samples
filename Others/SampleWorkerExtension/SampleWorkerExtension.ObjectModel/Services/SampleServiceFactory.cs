using DocsVision.Platform.ObjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public sealed class SampleServiceFactory : ServiceFactory
    {
        /// <summary>
        /// Gets the service.
        /// </summary>
        /// <param name="serviceType">Service type.</param>
        /// <returns>Service instance.</returns>
        protected override object GetService(Type serviceType)
        {
            if (serviceType == typeof(ISampleCustomService))
                return new SampleCustomService();
            else
                return null;
        }
    }
}
