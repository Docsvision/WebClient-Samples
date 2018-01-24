using ExtendedCardInfoServerExtension.Models;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.WebClient;
using System;

namespace ExtendedCardInfoServerExtension.Services
{
    public class ExtendedCardService : IExtendedCardService
    {
        /// <summary>
        /// Получить расширенную карточку
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="ExtendedCardModel"/></returns>
        public ExtendedCardModel GetExtendedCard(SessionContext sessionContext, Guid cardId)
        {
            // Удаляет карточку из кеша. Этот метод будет обозначен как устаревший в следующих сборках!
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