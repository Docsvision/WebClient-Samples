
using CustomLibraryServerExtension.Helpers;
using System;
using CustomLibrary.ObjectModel;

namespace CustomLibraryServerExtension.Services
{
    /// <summary>
    /// Представляет собой пример сервиса, использующего кастомную библиотеку
    /// </summary>
    public class CustomLibraryService : ICustomLibraryService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomLibraryService"/>
        /// </summary>
        /// <param name="provider">Сервис-провайдер</param>
        public CustomLibraryService(IServiceProvider provider)
        {
            if (provider == null)
                throw new ArgumentNullException("provider");

            this.serviceProvider = provider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// Получить кастомные данные
        /// </summary>
        public int GetCustomData()
        {
            var sessionContext = this.serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();
            var settingsDirectory = sessionContext.ObjectContext.GetObject<CustomDirectory>(CustomLibrary.CustomLibrary.CardLib.CardDefs.CustomDirectory.ID);

            int count = settingsDirectory.MainInfo.Counter;

            return count;
        }
    }
}