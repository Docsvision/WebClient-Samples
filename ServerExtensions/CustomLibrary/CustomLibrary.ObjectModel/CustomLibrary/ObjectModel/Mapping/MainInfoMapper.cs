using DocsVision.BackOffice.ObjectModel.Mapping;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace CustomLibrary.ObjectModel.Mapping
{
    internal sealed class MainInfoMapper: BaseCardSectionRowMapper<MainInfo>
    {
        private static ObjectMap map;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="MainInfoMapper"/>
        /// </summary>
        static MainInfoMapper()
        {
            InitializeObjectMap();
        }
        /// <summary>
        /// Создаёт новый экземпляр <see cref="MainInfoMapper"/>
        /// </summary>
        /// <param name="context">Контекст объекта</param>
		public MainInfoMapper(ObjectContext context)
            : base(context)
        {
        }

        #region Overrides

        /// <summary>
        /// Получить карту объекта
        /// </summary>
        protected override ObjectMap GetObjectMap()
        {
            return map;
        }

        /// <summary>
        /// Создаёт объект с указанными начальными данными
        /// </summary>
		protected override MainInfo CreateObject(ObjectInitializationData data)
        {
            return new MainInfo(data);
        }

        #endregion

        #region Helpers

        private static void InitializeObjectMap()
        {
            map = new ObjectMap();

            map.ObjectTypeId = CustomLibrary.CardLib.CardDefs.CustomDirectory.MainInfo.ID;

            map.Field(MainInfo.CounterProperty, CustomLibrary.CardLib.CardDefs.CustomDirectory.MainInfo.Counter);
        }

        #endregion
    }
}
