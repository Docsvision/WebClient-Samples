using CustomLibrary.ObjectModel.Services;
using DocsVision.Platform.ObjectModel;
using System;

namespace CustomLibrary.ObjectModel.Mapping
{
    /// <summary>
    /// Кастомная библиотека для фабрики сервисов
    /// </summary>
    public sealed class CustomLibraryServiceFactory : ServiceFactory
    {
        /// <summary>
        /// Получить сервис указанного типа
        /// </summary>      
        protected override object GetService(Type serviceType)
        {
            if (serviceType == typeof(ICustomDirectoryService))
                return new CustomDirectoryService();

            return null;
        }
    }

}
