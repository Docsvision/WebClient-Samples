using DocsVision.BackOffice.ObjectModel.Mapping;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace CustomLibrary.ObjectModel.Mapping
{
    internal sealed class MainInfoMapper: BaseCardSectionRowMapper<MainInfo>
    {
        private static ObjectMap map;

        /// <summary>
        /// Initializes a new instance of the <see cref="MainInfoMapper"/> class
        /// </summary>
        static MainInfoMapper()
        {
            InitializeObjectMap();
        }
        /// <summary>
        /// Initializes a new instance of the <see cref="MainInfoMapper"/> class
        /// </summary>
		public MainInfoMapper(ObjectContext context)
            : base(context)
        {
        }

        #region Overrides

        /// <summary>
        /// Gets the object map
        /// </summary>
        protected override ObjectMap GetObjectMap()
        {
            return map;
        }

        /// <summary>
        /// Creates the object within the specified initialization data
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
