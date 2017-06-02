using DocsVision.Platform.WebClient;
using System;

namespace ShiftTasksEndDateServerExtension.Services
{
    /// <summary>
    /// Extended card service
    /// </summary>
    interface IShiftTasksEndDateService
    {
        /// <summary>
        /// Shifts tasks end date
        /// </summary>
        /// <param name="sessionContext">Session context</param>
        /// <param name="cardId">Card identifier</param>
        /// <returns><see cref="ExtendedCardModel"/></returns>
        void ShiftTasksEndDate(SessionContext sessionContext, Guid cardId);
    }
}
