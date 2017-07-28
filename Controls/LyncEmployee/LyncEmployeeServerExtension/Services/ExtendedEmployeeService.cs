using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.WebClient;
using LyncEmployeeServerExtension.Models;
using System;

namespace LyncEmployeeServerExtension.Services
{
    public class ExtendedEmployeeService : IExtendedEmployeeService
    {
        /// <summary>
        /// Gets extended card
        /// </summary>
        /// <param name="sessionContext">Session context</param>
        /// <param name="cardId">Card identifier</param>
        /// <returns><see cref="ExtendedCardModel"/></returns>
        public ExtendedEmployeeModel GetExtendedEmployeeModel(SessionContext sessionContext, Guid employeeId)
        {
            var staffEmployee = sessionContext.ObjectContext.GetObject<StaffEmployee>(employeeId);
            if (staffEmployee != null)
            {

                var employeeModel = new ExtendedEmployeeModel()
                {
                    Id = employeeId,
                    DisplayName = staffEmployee.DisplayName,
                    Email = staffEmployee.Email
                };

                return employeeModel;
            }

            return null;
        }
    }
}