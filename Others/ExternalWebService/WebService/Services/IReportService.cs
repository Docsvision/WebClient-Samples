using System;
using WebService.Helpers;

namespace WebService.Services
{
    interface IReportService
    {
        /// <summary>
        /// Получить отчет по идентификатору карточки
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="string"/></returns>
        string GetTestReportData(SessionContext sessionContext, Guid cardId);
    }
}
