using DocsVision.Platform.WebClient;
using System;

namespace ShiftTasksEndDateServerExtension.Services
{
    /// <summary>
    /// Расширенный сервис для карточки
    /// </summary>
    public interface IShiftTasksEndDateService
    {
        /// <summary>
        /// Сдвигает дату окончания задач
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="ExtendedCardModel"/></returns>
        void ShiftTasksEndDate(SessionContext sessionContext, Guid cardId);
    }
}
