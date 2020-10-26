using DocsVision.Platform.ObjectManager;
using System;
using System.IO;
using System.Xml;
using DocsVision.Platform.StorageServer.Licensing;
using DocsVision.Platform.WebClient;

namespace LicenseCheckServerExtension.Services
{
    /// <summary>
    /// Представляет собой сервис для проверки лицензии
    /// </summary>
    public class LicenseCheckService : ILicenseCheckService
    {
        private static readonly Guid CardBuilderFeature = new Guid("{604EA6A5-7988-4099-9539-C8EB82497199}");

        /// <summary>
        /// Создаёт новый экземпляр <see cref="LicenseCheckService"/>
        /// </summary>
        public LicenseCheckService()
        {

        }

        /// <summary>
        /// Проверить признак лицензии
        /// </summary>
        public bool CheckFeature(SessionContext sessionContext)
        {
            return CheckLicenseFeature(sessionContext.Session, CardBuilderFeature);
        }

        /// <summary>
        /// Проверить лицензию
        /// </summary>
        private bool CheckLicenseFeature(UserSession session, Guid featureId)
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