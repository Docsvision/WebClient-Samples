using System;
using System.Collections.Generic;
using DocsVision.Platform.WebClient;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle.Options;
using NetStatSolution.ObjectModel;

namespace NetStatSolutionServerExtension
{
    public class NetStatCardLifeCycle : ICardLifeCycleEx
    {
        public Guid CardTypeId => NetstatSolutionCardDefs.ID;

        public Guid Create(SessionContext sessionContext, CardCreateLifeCycleOptions options)
        {
            var cardId = sessionContext.AdvancedCardManager.CreateCard(CardTypeId, options.CardKindId);
            FillCardInternal(sessionContext, cardId);
            return cardId;
        }

        public bool Validate(SessionContext sessionContext, CardValidateLifeCycleOptions options, out List<ValidationResult> validationResults)
        {
            validationResults = null;
            return true;
        }

        public void OnSave(SessionContext sessionContext, CardSaveLifeCycleOptions options)
        {
        }

        public bool CanDelete(SessionContext sessionContext, CardDeleteLifeCycleOptions options, out string message)
        {
            message = null;
            return true;
        }

        public void OnDelete(SessionContext sessionContext, CardDeleteLifeCycleOptions options)
        {
        }

        public string GetDigest(SessionContext sessionContext, CardDigestLifeCycleOptions options)
        {
            var card = sessionContext.ObjectContext.GetObject<NetstatSolutionCard>(options.CardId);
            return card.MainInfo.Name;
        }

        private static void FillCardInternal(SessionContext sessionContext, Guid cardId)
        {
            var card = sessionContext.ObjectContext.GetObject<NetstatSolutionCard>(cardId);
            card.MainInfo.Name = Resources.NetStatCard_DefaultName;
            sessionContext.ObjectContext.SaveObject(card);
        }
    }
}
