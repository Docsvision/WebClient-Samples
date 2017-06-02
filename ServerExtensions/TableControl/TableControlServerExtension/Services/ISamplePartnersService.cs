using TableControlServerExtension.Models;
using DocsVision.Platform.WebClient;
using System;

namespace TableControlServerExtension.Services
{
    public interface ISamplePartnersService
    {
        PartnerModel GetPartnerInfo(SessionContext sessionContext, Guid id);
    }
}
