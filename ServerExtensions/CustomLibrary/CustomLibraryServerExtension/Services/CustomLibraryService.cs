
using CustomLibraryServerExtension.Helpers;
using System;
using CustomLibrary.ObjectModel;

namespace CustomLibraryServerExtension.Services
{
    /// <summary>
    /// Represents  sample service using custom library
    /// </summary>
    public class CustomLibraryService : ICustomLibraryService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomLibraryService"/> class
        /// </summary>
        /// <param name="provider">Service provider</param>
        public CustomLibraryService(IServiceProvider provider)
        {
            if (provider == null)
                throw new ArgumentNullException("provider");

            this.serviceProvider = provider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// Gets custom data
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