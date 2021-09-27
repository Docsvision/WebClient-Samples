using DocsVision.ApprovalDesigner.ObjectModel;
using DocsVision.BackOffice.WebClient.Services;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle.Options;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle;

namespace CreateCardDialogServerExtension
{
    public class ApprovalStageCardLifeCycle : ICardLifeCycleEx
    {
        private readonly Guid ApprovalStageCardTypeId = new Guid("0DB13C90-21B6-49D8-9070-8144DF97552A");

        public Guid CardTypeId => throw new NotImplementedException();

        public Guid CreateFromTemplate(SessionContext sessionContext, Guid templateId, Guid? parentCardId)
        {
            var cardId = sessionContext.AdvancedCardManager.CreateCard(templateId);
            this.FillCardInternal(sessionContext, cardId);
            return cardId;
        }

        public Guid Create(SessionContext sessionContext, CardCreateLifeCycleOptions options)
        {
            var cardId = sessionContext.AdvancedCardManager.CreateCard(ApprovalStageCardTypeId, options.CardKindId);
            this.FillCardInternal(sessionContext, cardId);
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
            var card = sessionContext.ObjectContext.GetObject<ApprovalStage>(options.CardId);
            return card.MainInfo.Name;
        }

        private void FillCardInternal(SessionContext sessionContext, Guid cardId)
        {
            var card = sessionContext.ObjectContext.GetObject<ApprovalStage>(cardId);
            card.MainInfo.Name = Resources.ApprovalStage_DefaultName;
            sessionContext.ObjectContext.SaveObject(card);
        }
    }
}