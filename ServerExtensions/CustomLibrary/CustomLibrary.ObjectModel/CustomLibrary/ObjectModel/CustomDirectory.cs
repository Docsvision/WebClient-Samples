using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectModel;
using System.Diagnostics;
using System.Linq;

namespace CustomLibrary.ObjectModel
{
    /// <summary>
    /// Represents custom directory
    /// </summary>
    public class CustomDirectory : BaseCard
    {
        /// <summary>
        /// Represents database settings property
        /// </summary>
        public static readonly ObjectProperty MainInfoProperty = ObjectProperty.Register("MainInfo", typeof(ObjectCollection<MainInfo>), typeof(CustomDirectory));

        [DebuggerHidden]
        static CustomDirectory()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomDirectory"/> class
        /// </summary>
        internal protected CustomDirectory()
            : base()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomDirectory"/> class
        /// </summary>
        internal protected CustomDirectory(ObjectInitializationData data)
            : base(data)
        {
        }

        #region Properties

        /// <summary>
        /// Main information
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
