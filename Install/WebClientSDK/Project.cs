using System;
using System.Collections.Generic;
using System.IO;
using WebClientSDK.Helpers;
using WixSharp;
using WixSharpSetup.Dialogs;

namespace WebClientSDK
{
    class Project
    {
        public static void Build(Dictionary<string, string> Localization)
        {
            var project = new ManagedProject
            {
                Name = Localization["ProductName"],
                OutFileName = Constants.OutFileName,
                UpgradeCode = new Guid(Constants.UpgradeCode),
                Version = new Version(Environment.GetEnvironmentVariable("BUILD_NUMBER") ?? "1.0.0.0"),
                InstallScope = InstallScope.perMachine,
                LicenceFile = Constants.LicenceFile,
                BackgroundImage = Constants.BackgroundImage,
                BannerImage = Constants.BannerImage,
                Language = Localization["Language"],
                LocalizationFile = Path.Combine("wix", Localization["WixLocalization"]),
                OutDir = Path.Combine(@"..\bin", Localization["Language"]),

                Dirs = new[]
                {
                    new Dir("%ProgramFiles%")
                    {
                        Dirs = new[]
                        {
                            new Dir(Constants.Manufacturer)
                            {
                                Dirs = new[]
                                {
                                    new InstallDir("WebClientSDK")
                                    {
                                        FileCollections = new[]
                                        {
                                            new Files(@"..\..\installroot\*")
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

                Properties = new[]
                {
                    new Property("OVERRIDESAMPLESOUTPUT", "0")
                },

                GenericItems = new[]
                {
                    new EnvironmentVariable("SamplesOutput", "[WEBCLIENTDIR]")
                    {
                        Condition = new Condition("OVERRIDESAMPLESOUTPUT", "1"),
                        // DO NOT OVERWRITE IF EXIST
                        Action = EnvVarAction.create
                    },
                    new EnvironmentVariable("DocsvisionWebClientSDK", "[INSTALLDIR]")
                    {
                        Action = EnvVarAction.set
                    }
                },

                ControlPanelInfo =
                {
                    Comments = string.Format("{0} {1}", Localization["Comments"], Localization["ProductName"]),
                    HelpLink = Constants.UrlSupport,
                    HelpTelephone = Constants.UrlSupport,
                    UrlInfoAbout = Constants.UrlManufacturer,
                    UrlUpdateInfo = Constants.UrlManufacturer,
                    ProductIcon = Constants.ProductIcon,
                    Manufacturer = Constants.Manufacturer,
                    InstallLocation = "[INSTALLDIR]",
                    NoModify = true,
                },

                ManagedUI = new ManagedUI
                {
                    InstallDialogs = new ManagedDialogs()
                                        .Add<WelcomeDialog>()
                                        .Add<LicenceDialog>()
                                        .Add<InstallDirDialog>()
                                        .Add<ProgressDialog>()
                                        .Add<ExitDialog>(),

                    ModifyDialogs = new ManagedDialogs()
                                        .Add<MaintenanceTypeDialog>()
                                        .Add<ProgressDialog>()
                                        .Add<ExitDialog>()
                },

                MajorUpgrade = new MajorUpgrade
                {
                    Schedule = UpgradeSchedule.afterInstallValidate,
                    AllowSameVersionUpgrades = true,
                    AllowDowngrades = false,
                    DowngradeErrorMessage = Localization["DowngradeErrorMessage"],
                }
            };

            AutoElements.EnableUACRevealer = false;
            AutoElements.UACWarning = null;
            project.UIInitialized += SetupEvents.RestartElevated;
            project.UIInitialized += SetupEvents.FindWebClient;

            project.BuildMsi();
        }
    }
}
