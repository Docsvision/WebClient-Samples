using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectModel;
using System.Diagnostics;

namespace CustomLibrary.ObjectModel
{
    /// <summary>
    /// Represents database settings section row
    /// </summary>
    public class MainInfo : BaseCardSectionRow
    {
        /// <summary>
        /// Counter property
        /// </summary>
        public static readonly ObjectProperty CounterProperty = ObjectProperty.Register("Counter", typeof(int), typeof(MainInfo));

        /// <summary>
		/// Initializes a new instance of the <see cref="MainInfo"/> class
		/// </summary>
		[DebuggerHidden]
        static MainInfo()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MainInfo"/> class
        /// </summary>
        internal MainInfo()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MainInfo"/> class within the specified data
        /// </summary>
        internal MainInfo(ObjectInitializationData data)
			: base(data)
		{
        }

        #region Properties

        /// <summary>
        /// Gets or sets counter
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
