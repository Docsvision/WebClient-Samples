using DocsVision.BackOffice.ObjectModel;
using System;
using TableControlServerExtension.Models;
using DocsVision.Platform.WebClient;

namespace TableControlServerExtension.Services
{
    public class SamplePartnersService : ISamplePartnersService
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="SamplePartnersService"/>
        /// </summary>
        public SamplePartnersService()
        {
        }

        public PartnerModel GetPartnerInfo(SessionContext sessionContext, Guid id)
        {
            PartnerModel partnerModel = null;
            var partner = sessionContext.ObjectContext.GetObject<PartnersCompany>(id);
            if (partner != null)
            {
                partnerModel = new PartnerModel { Id = id };
                partnerModel.Initialize(partner);
            }

            return partnerModel;
        }
    }
}