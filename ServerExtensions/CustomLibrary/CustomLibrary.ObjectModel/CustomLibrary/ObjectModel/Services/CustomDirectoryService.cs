using DocsVision.Platform.ObjectModel;

namespace CustomLibrary.ObjectModel.Services
{
    internal class CustomDirectoryService : ContextService, ICustomDirectoryService
    {
        /// <summary>
        /// Initializes a 
        /// </summary>
        public CustomDirectoryService()
        {
        }

        private CustomDirectory CustomDirectory
        {
            get
            {
                return this.Context.GetObject<CustomDirectory>(CustomLibrary.CardLib.CardDefs.CustomDirectory.ID);
            }
        }

        public int GetCounter()
        {
            return CustomDirectory.MainInfo.Counter;
        }
    }
}