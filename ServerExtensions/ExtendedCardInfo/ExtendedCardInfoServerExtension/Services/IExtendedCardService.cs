using ExtendedCardInfoServerExtension.Models;
using DocsVision.Platform.WebClient;
using System;

namespace ExtendedCardInfoServerExtension.Services
{
    /// <summary>
    /// Extended card service
    /// </summary>
    interface IExtendedCardService
    {
        /// <summary>
        /// Gets extended card
        /// </summary>
        /// <param name="sessionContext">Session context</param>
        /// <param name="cardId">Card identifier</param>
        /// <returns><see cref="ExtendedCardModel"/></returns>
        ExtendedCardModel GetExtendedCard(SessionContext sessionContext, Guid cardId);
    }
}
