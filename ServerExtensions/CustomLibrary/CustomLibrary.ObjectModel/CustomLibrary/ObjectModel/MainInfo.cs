using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectModel;
using System.Diagnostics;

namespace CustomLibrary.ObjectModel
{
    /// <summary>
    /// Представляет собой настройки строки секции базы данных
    /// </summary>
    public class MainInfo : BaseCardSectionRow
    {
        /// <summary>
        /// Счётчик
        /// </summary>
        public static readonly ObjectProperty CounterProperty = ObjectProperty.Register("Counter", typeof(int), typeof(MainInfo));

        /// <summary>
		/// Создаёт новый экземпляр <see cref="MainInfo"/>
		/// </summary>
		[DebuggerHidden]
        static MainInfo()
        {
        }

        /// <summary>
        /// Создаёт новый экземпляр <see cref="MainInfo"/>
        /// </summary>
        internal MainInfo()
        {
        }

        /// <summary>
        /// Создаёт новый экземпляр <see cref="MainInfo"/> с указанными данными
        /// </summary>
        internal MainInfo(ObjectInitializationData data)
			: base(data)
		{
        }

        #region Properties

        /// <summary>
        /// Устанавливает или получает значение счётчика
        /// </summary>
        public int Counter
        {
            get
            {
                return (int)GetValue(CounterProperty);
            }
            set
            {
                SetValue(CounterProperty, value);
            }
        }

        #endregion
    }
}
