using System;
using Microsoft.AspNetCore.Mvc;
using WebService.Services;

namespace WebService.Controllers
{
    public class ReportsController : ControllerBase
    {
        Services.IReportService _reportService;
        ISessionService _sessionService;

        public ReportsController(Services.IReportService reportService, ISessionService sessionService)
        {
            _reportService = reportService;
            _sessionService = sessionService;
        }

        /// <summary>
        /// Получить отчет по идентификатору карточки
        /// </summary>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="string"/></returns>
        [HttpGet]
        public string GetTestReportData(Guid cardId)
        {
            var sessionContext = _sessionService.GetSessionContext();

            var cardDescription = _reportService.GetTestReportData(sessionContext, cardId);

            return cardDescription;
        }
    }
}