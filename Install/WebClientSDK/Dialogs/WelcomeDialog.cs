using System;
using WixSharp;
using WixSharp.UI.Forms;

namespace WixSharpSetup.Dialogs
{
    /// <summary>
    /// The standard Welcome dialog
    /// </summary>
    public partial class WelcomeDialog : ManagedForm, IManagedDialog // change ManagedForm->Form if you want to show it in designer
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="WelcomeDialog"/> class.
        /// </summary>
        public WelcomeDialog()
        {
            InitializeComponent();
        }

        void WelcomeDialog_Load(object sender, EventArgs e)
        {
            image.Image = Runtime.Session.GetResourceBitmap("WixUI_Bmp_Dialog");
        }

        void cancel_Click(object sender, EventArgs e)
        {
            Shell.Cancel();
        }

        void next_Click(object sender, EventArgs e)
        {
            Shell.GoNext();
        }

        void back_Click(object sender, EventArgs e)
        {
            Shell.GoPrev();
        }
    }
}