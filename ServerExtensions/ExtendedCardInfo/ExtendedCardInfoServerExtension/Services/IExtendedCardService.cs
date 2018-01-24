using ExtendedCardInfoServerExtension.Models;
using DocsVision.Platform.WebClient;
using System;

namespace ExtendedCardInfoServerExtension.Services
{
    /// <summary>
    /// Сервис для расширенной карточки
    /// </summary>
    interface IExtendedCardService
    {
        /// <summary>
        /// Получить расширенную карточку
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="ExtendedCardModel"/></returns>
        ExtendedCardModel GetExtendedCard(SessionContext sessionContext, Guid cardId);
    }
}
