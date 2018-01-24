using DocsVision.BackOffice.ObjectModel.Mapping;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace CustomLibrary.ObjectModel.Mapping
{
    /// <summary>
    /// Представляет собой маппер для настроек директории
    /// </summary>
    public class CustomDirectoryMapper : BaseCardMapper<CustomDirectory>
    {
        private static ObjectMap map;

        static CustomDirectoryMapper()
        {
            InitializeObjectMap();
        }

        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomDirectoryMapper"/>
        /// </summary>
        /// <param name="context">Контекст объекта</param>
        public CustomDirectoryMapper(ObjectContext context)
            : base(context)
        {

        }

        /// <summary>
        /// TBD
        /// </summary>       
        protected override CustomDirectory CreateObject(ObjectInitializationData data)
        {
            return new CustomDirectory(data);
        }

        /// <summary>
        /// TBD
        /// </summary>  
        protected override ObjectMap GetObjectMap()
        {
            return map;
        }

        #region Helpers

        private static void InitializeObjectMap()
        {
            map = new ObjectMap();

            map.ObjectTypeId = CustomLibrary.CardLib.CardDefs.CustomDirectory.ID;

            map.Collection(CustomDirectory.MainInfoProperty, CustomLibrary.CardLib.CardDefs.CustomDirectory.MainInfo.ID);
        }

        #endregion
    }
}
