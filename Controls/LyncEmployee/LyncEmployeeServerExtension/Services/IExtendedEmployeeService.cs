using LyncEmployeeServerExtension.Models;
using DocsVision.Platform.WebClient;
using System;

namespace LyncEmployeeServerExtension.Services
{
    interface IExtendedEmployeeService
    {
        ExtendedEmployeeModel GetExtendedEmployeeModel(SessionContext sessionContext, Guid employeeId);
    }
}
