using Microsoft.Deployment.WindowsInstaller;
using System;
using System.Diagnostics;
using System.IO;
using System.Security.Principal;
using System.Windows.Forms;
using WixSharp;

namespace WebClientSDK.Helpers
{
    public class SetupEvents
    {
        public static void RestartElevated(SetupEventArgs e)
        {
            if (new WindowsPrincipal(WindowsIdentity.GetCurrent()).IsInRole(WindowsBuiltInRole.Administrator))
            {
                e.Result = ActionResult.Success;
            }
            else
            {
                e.Result = ActionResult.Failure;

                var startInfo = new ProcessStartInfo
                {
                    UseShellExecute = true,
                    FileName = "msiexec.exe",
                    Arguments = $"/i \"{e.MsiFile}\"",
                    Verb = "RunAs"
                };

                Process.Start(startInfo);
            }
        }

        public static void FindWebClient(SetupEventArgs e)
        {
            try
            {
                foreach (var product in ProductInstallation.GetRelatedProducts(Constants.UpgradeCodeWebClient))
                {
                    if (product.IsInstalled)
                    {
                        var WebClientInstallLocation = Path.Combine(product.InstallLocation, "5.5");
                        e.Session["WEBCLIENTDIR"] = WebClientInstallLocation;
                        e.Session["INSTALLDIR"] = Path.Combine(WebClientInstallLocation, "SDK");
                        break;
                    }
                }
                e.Result = ActionResult.Success;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString(), "Exception", MessageBoxButtons.OK, MessageBoxIcon.Error);
                e.Result = ActionResult.Failure;
            }
        }
    }
}
