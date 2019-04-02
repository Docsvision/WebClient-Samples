using System;
using System.Web.Http;
using WebService.Helpers;

namespace WebService.Controllers
{
    public class ReportsController : ApiController
    {
        private Services.IReportService ReportService => WebApiApplication.Instance.GetService<Services.IReportService>();

        /// <summary>
        /// Получить отчет по идентификатору карточки
        /// </summary>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="string"/></returns>
        [HttpGet]
        public string GetTestReportData(Guid cardId)
        {
            var sessionContext = SessionHelper.GetSessionContext();

            var cardDescription = ReportService.GetTestReportData(sessionContext, cardId);

            return cardDescription;
        }
    }
}