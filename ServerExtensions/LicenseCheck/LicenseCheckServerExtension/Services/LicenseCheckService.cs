using LicenseCheckServerExtension.Helpers;
using DocsVision.Platform.ObjectManager;
using System;
using System.IO;
using System.Xml;
using DocsVision.Platform.StorageServer.Licensing;

namespace LicenseCheckServerExtension.Services
{
    /// <summary>
    /// Represents license checking service
    /// </summary>
    public class LicenseCheckService : ILicenseCheckService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;
        private static readonly Guid CardBuilderFeature = new Guid("{604EA6A5-7988-4099-9539-C8EB82497199}");

        /// <summary>
        /// Initializes a new instance of the <see cref="LicenseCheckService"/> class
        /// </summary>
        /// <param name="provider">Service provider</param>
        public LicenseCheckService(IServiceProvider provider)
        {
            if (provider == null)
                throw new ArgumentNullException("provider");

            this.serviceProvider = provider;
            serviceHelper = new ServiceHelper(serviceProvider);
        }

        /// <summary>
        /// Checks license feature
        /// </summary>
        public bool CheckFeature()
        {
            var sessionContext = serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            return CheckLicenseFeature(sessionContext.Session, CardBuilderFeature);
        }

        /// <summary>
        /// Checks license
        /// </summary>
        private static bool CheckLicenseFeature(UserSession session, Guid featureId)
        {
            bool featureExists = false;

            string licenseXml = string.Empty;
            if (session.Properties["License"] != null)
                licenseXml = (string)session.Properties["License"].Value;

            if (!string.IsNullOrEmpty(licenseXml))
            {
                using (StringReader stringReader = new StringReader(licenseXml))
                using (XmlReader reader = XmlReader.Create(stringReader))
                {
                    License license = new License();
                    license.Load(reader);

                    featureExists = license.Features.ContainsKey(featureId);
                }
            }
            return featureExists;
        }
    }
}