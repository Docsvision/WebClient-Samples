using DocsVision.ApprovalDesigner.ObjectModel;
using DocsVision.BackOffice.WebClient.Services;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle;

namespace CreateCardDialogServerExtension
{
    public class ApprovalStageCardLifeCycle : ICardLifeCycle
    {
        private readonly Guid ApprovalStageCardTypeId = new Guid("0DB13C90-21B6-49D8-9070-8144DF97552A");

        public Guid Create(SessionContext sessionContext, Guid? cardKindId, Guid? parentCardId)
        {
            var cardId = sessionContext.AdvancedCardManager.CreateCard(ApprovalStageCardTypeId, cardKindId);
            this.FillCardInternal(sessionContext, cardId);
            return cardId;
        }

        public Guid CreateFromTemplate(SessionContext sessionContext, Guid templateId, Guid? parentCardId)
        {
            var cardId = sessionContext.AdvancedCardManager.CreateCard(templateId);
            this.FillCardInternal(sessionContext, cardId);
            return cardId;
        }

        public bool Validate(SessionContext sessionContext, Guid cardId, out List<ValidationResult> validationResults)
        {
            validationResults = null;
            return true;
        }

        public void OnSave(SessionContext sessionContext, Guid cardId)
        {
            
        }

        public bool CanDelete(SessionContext sessionContext, Guid cardId, out string message)
        {
            message = null;
            return true;
        }

        public void OnDelete(SessionContext sessionContext, Guid cardId)
        {
            
        }

        public string GetDigest(SessionContext sessionContext, Guid cardId)
        {
            var card = sessionContext.ObjectContext.GetObject<ApprovalStage>(cardId);
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