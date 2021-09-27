using System;
using System.Windows.Forms;
using WixSharp;
using WixSharp.UI.Forms;

namespace WixSharpSetup.Dialogs
{
    /// <summary>
    /// The standard InstallDir dialog
    /// </summary>
    public partial class InstallDirDialog : ManagedForm, IManagedDialog  // change ManagedForm->Form if you want to show it in designer
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InstallDirDialog"/> class.
        /// </summary>
        public InstallDirDialog()
        {
            InitializeComponent();
        }

        string installDirProperty;

        void InstallDirDialog_Load(object sender, EventArgs e)
        {
            banner.Image = Runtime.Session.GetResourceBitmap("WixUI_Bmp_Banner");

            installDirProperty = Runtime.Session.Property("WixSharp_UI_INSTALLDIR");

            string installDirPropertyValue = Runtime.Session.Property(installDirProperty);

            if (installDirPropertyValue.IsEmpty())
            {
                //We are executed before any of the MSI actions are invoked so the INSTALLDIR (if set to absolute path)
                //is not resolved yet. So we need to do it manually
                installDir.Text = Runtime.Session.GetDirectoryPath(installDirProperty);

                if (installDir.Text == "ABSOLUTEPATH")
                    installDir.Text = Runtime.Session.Property("INSTALLDIR_ABSOLUTEPATH");
            }
            else
            {
                //INSTALLDIR set either from the command line or by one of the early setup events (e.g. UILoaded)
                installDir.Text = installDirPropertyValue;
            }

            if (!Runtime.Session.Property("WEBCLIENTDIR").IsEmpty())
            {
                if (Runtime.Session["checkBoxOverrideState"].IsEmpty())
                    Runtime.Session["checkBoxOverrideState"] = "True";
                // Enable groupBox and get checkBox last state
                groupBoxOverride.Enabled = true;
                checkBoxOverride.Checked = Runtime.Session["checkBoxOverrideState"] == "True";
            }
        }

        void back_Click(object sender, EventArgs e)
        {
            Shell.GoPrev();
        }

        void next_Click(object sender, EventArgs e)
        {
            if (!installDirProperty.IsEmpty())
                Runtime.Session[installDirProperty] = installDir.Text;
            if (checkBoxOverride.Checked)
                Runtime.Session["OVERRIDESAMPLESOUTPUT"] = "1";
            Shell.GoNext();
        }

        void cancel_Click(object sender, EventArgs e)
        {
            Shell.Cancel();
        }

        void change_Click(object sender, EventArgs e)
        {
            using (var dialog = new FolderBrowserDialog { SelectedPath = installDir.Text })
            {
                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    installDir.Text = dialog.SelectedPath;
                }
            }
        }

        private void checkBoxOverride_CheckedChanged(object sender, EventArgs e)
        {
            Runtime.Session["checkBoxOverrideState"] = checkBoxOverride.Checked.ToString();
        }
    }
}