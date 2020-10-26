using AcquaintancePanelServerExtension.Models;
using System;
using System.Collections.Generic;
using DocsVision.Platform.WebClient;

namespace AcquaintancePanelServerExtension.Services
{
    public interface ILayoutBPService
    {
        StartProcessResultModel StartBusinessProcess(SessionContext sessionContext, Guid cardId, Guid processTemplateId, IEnumerable<Guid> employeeIds = null, DateTime? endDate = null); 
    }
}