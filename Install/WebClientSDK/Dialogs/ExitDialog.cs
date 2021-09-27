using System.Diagnostics;
using System.IO;
using System.Windows.Forms;
using WixSharp;
using WixSharp.UI.Forms;

namespace WixSharpSetup.Dialogs
{
    /// <summary>
    /// The standard Exit dialog
    /// </summary>
    public partial class ExitDialog : ManagedForm, IManagedDialog // change ManagedForm->Form if you want to show it in designer
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ExitDialog"/> class.
        /// </summary>
        public ExitDialog()
        {
            InitializeComponent();
        }

        void ExitDialog_Load(object sender, System.EventArgs e)
        {
            image.Image = Runtime.Session.GetResourceBitmap("WixUI_Bmp_Dialog");
            if (Shell.UserInterrupted || Shell.Log.Contains("User cancelled installation."))
            {
                title.Text = "[UserExitTitle]";
                description.Text = "[UserExitDescription1]";
                this.Localize();
            }
            else if (Shell.ErrorDetected)
            {
                title.Text = "[FatalErrorTitle]";
                description.Text = Shell.CustomErrorDescription ?? "[FatalErrorDescription1]";
                this.Localize();
            }
            else
            {
                checkBoxOpenInstallDir.Enabled = checkBoxOpenInstallDir.Checked = true;
            }

            // show error message if required
            // if (Shell.Errors.Any())
            // {
            //     string lastError = Shell.Errors.LastOrDefault();
            //     MessageBox.Show(lastError);
            // }
        }

        void finish_Click(object sender, System.EventArgs e)
        {
            if (checkBoxOpenInstallDir.Checked)
            {
                try
                {
                    Process.Start(Runtime.InstallDir);
                }
                catch
                {
                    //Catch all, we don't want the installer to crash in an
                    //attempt to open the installation directory.
                }
            }
            Shell.Exit();
        }

        void viewLog_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            try
            {
                string wixSharpDir = Path.Combine(Path.GetTempPath(), @"WixSharp");
                if (!Directory.Exists(wixSharpDir))
                    Directory.CreateDirectory(wixSharpDir);

                string logFile = Path.Combine(wixSharpDir, Runtime.ProductName + ".log");
                System.IO.File.WriteAllText(logFile, Shell.Log);
                Process.Start(logFile);
            }
            catch
            {
                //Catch all, we don't want the installer to crash in an
                //attempt to view the log.
            }
        }
    }
}