﻿using AcquaintancePanelServerExtension.Models;
using System;
using System.Collections.Generic;

namespace AcquaintancePanelServerExtension.Services
{
    public interface ILayoutBPService
    {
        StartProcessResultModel StartBusinessProcess(Guid cardId, Guid processTemplateId, IEnumerable<Guid> employeeIds = null, DateTime? endDate = null); 
    }
}