using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectModel;
using System.Diagnostics;
using System.Linq;

namespace CustomLibrary.ObjectModel
{
    /// <summary>
    /// Представляет собой кастомную директорию
    /// </summary>
    public class CustomDirectory : BaseCard
    {
        /// <summary>
        /// Настройки базы данных
        /// </summary>
        public static readonly ObjectProperty MainInfoProperty = ObjectProperty.Register("MainInfo", typeof(ObjectCollection<MainInfo>), typeof(CustomDirectory));

        [DebuggerHidden]
        static CustomDirectory()
        {
        }

        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomDirectory"/>
        /// </summary>
        internal protected CustomDirectory()
            : base()
        {
        }

        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomDirectory"/>
        /// </summary>
        internal protected CustomDirectory(ObjectInitializationData data)
            : base(data)
        {
        }

        #region Properties

        /// <summary>
        /// Главная информация
        /// </summary>
        public MainInfo MainInfo
        {
            get
            {
                if (((ObjectCollection<MainInfo>)GetValue(MainInfoProperty)).Count == 0)
                    ((ObjectCollection<MainInfo>)GetValue(MainInfoProperty)).Add(new MainInfo());

                return ((ObjectCollection<MainInfo>)GetValue(MainInfoProperty)).First();
            }
        }

        #endregion
    }
}
