using DocsVision.ApprovalDesigner.ObjectModel;
using DocsVision.BackOffice.WebClient.Services;
using DocsVision.Platform.WebClient;
using System;

namespace CreateCardDialogServerExtension
{
    public class ApprovalStageCardFactory : ICardFactory
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

        private void FillCardInternal(SessionContext sessionContext, Guid cardId)
        {
            var card = sessionContext.ObjectContext.GetObject<ApprovalStage>(cardId);
            card.MainInfo.Name = Resources.ApprovalStage_DefaultName;
            sessionContext.ObjectContext.SaveObject(card);
        }
    }
}