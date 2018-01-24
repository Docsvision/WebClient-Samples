using DocsVision.ApprovalDesigner.ObjectModel;
using DocsVision.BackOffice.WebClient.Services;
using DocsVision.Platform.WebClient;
using System;

namespace CreateCardDialogServerExtension
{
    public class ApprovalStageCardFactory : ICardFactory
    {
        public Guid Create(SessionContext sessionContext, Guid cardTypeId, Guid? cardKindId, Guid? parentCardId)
        {
            var cardId = sessionContext.AdvancedCardManager.CreateCard(cardTypeId, cardKindId);
            this.FillCardInternal(sessionContext, cardId);
            return cardId;
        }

        public Guid CreateFromTemplate(SessionContext sessionContext, Guid templateId, Guid? parentCardId)
        {
            var cardId = sessionContext.AdvancedCardManager.CreateCard(templateId);
            this.FillCardInternal(sessionContext, cardId);
            return cardId;
        }

        private void FillCardInternal(SessionContext sessionContext, Guid cardId)
        {
            var card = sessionContext.ObjectContext.GetObject<ApprovalStage>(cardId);
            card.MainInfo.Name = Resources.ApprovalStage_DefaultName;
            sessionContext.ObjectContext.SaveObject(card);
        }
    }
}