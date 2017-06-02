using ExtendedCardInfoServerExtension.Models;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.WebClient;
using System;

namespace ExtendedCardInfoServerExtension.Services
{
    public class ExtendedCardService : IExtendedCardService
    {
        /// <summary>
        /// Gets extended card
        /// </summary>
        /// <param name="sessionContext">Session context</param>
        /// <param name="cardId">Card identifier</param>
        /// <returns><see cref="ExtendedCardModel"/></returns>
        public ExtendedCardModel GetExtendedCard(SessionContext sessionContext, Guid cardId)
        {
            // Removes card from the cache. That method will deprecated in the next releases!
            sessionContext.AdvancedCardManager.RefreshCard(cardId);

            var card = sessionContext.ObjectContext.GetObject<BaseCard>(cardId);
            if (card == null)
            {
                return null;
            }

            var extendedCardModel = new ExtendedCardModel();
            extendedCardModel.Initialize(card);
            return extendedCardModel;
        }
    }
}