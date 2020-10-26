using System;
using CustomLibrary.ObjectModel;
using DocsVision.Platform.WebClient;

namespace CustomLibraryServerExtension.Services
{
    /// <summary>
    /// Представляет собой пример сервиса, использующего кастомную библиотеку
    /// </summary>
    public class CustomLibraryService : ICustomLibraryService
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomLibraryService"/>
        /// </summary>
        public CustomLibraryService(IServiceProvider provider)
        {
        }

        /// <summary>
        /// Получить кастомные данные
        /// </summary>
        public int GetCustomData(SessionContext sessionContext)
        {
            var settingsDirectory = sessionContext.ObjectContext.GetObject<CustomDirectory>(CustomLibrary.CustomLibrary.CardLib.CardDefs.CustomDirectory.ID);

            int count = settingsDirectory.MainInfo.Counter;

            return count;
        }
    }
}