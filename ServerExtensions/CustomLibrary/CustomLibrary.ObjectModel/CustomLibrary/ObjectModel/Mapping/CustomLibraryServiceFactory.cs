using CustomLibrary.ObjectModel.Services;
using DocsVision.Platform.ObjectModel;
using System;

namespace CustomLibrary.ObjectModel.Mapping
{
    /// <summary>
    /// Custom library service factory
    /// </summary>
    public sealed class CustomLibraryServiceFactory : ServiceFactory
    {
        /// <summary>
        /// Gets service of specified type
        /// </summary>      
        protected override object GetService(Type serviceType)
        {
            if (serviceType == typeof(ICustomDirectoryService))
                return new CustomDirectoryService();

            return null;
        }
    }

}
