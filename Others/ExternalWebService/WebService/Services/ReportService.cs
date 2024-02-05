using System;
using WebService.Helpers;

namespace WebService.Services
{
    public class ReportService : IReportService
    {

        private static readonly Guid GetReportId = new Guid("85701f4b-61ff-4a33-add1-959b471e7558");
        private const string getCardId = "CardId";
        private const string getDescription = "Description";

        /// <summary>
        /// Получить отчет по идентификатору карточки
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="string"/></returns>
        public string GetTestReportData(SessionContext sessionContext, Guid cardId)
        {
            var report = sessionContext.Session.ReportManager.Reports[GetReportId];
            report.Parameters[getCardId].Value = cardId.ToString();

            var reportDataRows = report.GetData();

            var descriptionCard = "";
            if (reportDataRows != null)
            {
                foreach (var reportDataRow in reportDataRows)
                {
                    descriptionCard = reportDataRow.GetString(getDescription);
                }
            }
            return descriptionCard;
        }
    }
}