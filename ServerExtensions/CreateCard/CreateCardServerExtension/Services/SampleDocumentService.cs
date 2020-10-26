using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using System;

namespace CreateCardServerExtension.Services
{
    public class SampleDocumentService : ISampleDocumentService
    {
        private static readonly Guid OutgoingCardKindId = new Guid("{8e40f327-9517-4a43-998d-bf2bd619588d}");
        private static readonly Guid AnswerLinkType = new Guid("{ce1eb938-0c99-41fb-a0f2-52c6ace5e80a}");
        private static readonly Guid OppositeLinkType = new Guid("{502f7fe3-477f-492f-9f43-ed2aa7cb32d9}");
        private const string NamePrefix = "В ответ на ";

        /// <summary>
        /// Создаёт новый экземпляр <see cref="LicenseCheckService"/>
        /// </summary>
        public SampleDocumentService()
        {

        }

        public Guid CreateOutgoingDocument(SessionContext sessionContext, Guid parentDocId)
        {            
            var kindsCardKind = sessionContext.ObjectContext.GetObject<KindsCardKind>(OutgoingCardKindId);           
            var parentDoc = sessionContext.ObjectContext.GetObject<Document>(parentDocId);

            var documentService = sessionContext.ObjectContext.GetService<IDocumentService>();
            var document = documentService.CreateDocument(null, kindsCardKind);
            sessionContext.ObjectContext.SaveObject(document);
            var documentId = document.GetObjectId();
            document.Description = document.SystemInfo.CardKind.Name;
            if (document.MainInfo.Registrar == null)
            {
                var staffService = sessionContext.ObjectContext.GetService<IStaffService>();
                document.MainInfo.Registrar = staffService.GetCurrentEmployee();
            }

            var rowMain = GetRowData(sessionContext, documentId, CardDocument.MainInfo.ID, true);
            if (rowMain != null)
            {
                rowMain.SetFieldValue(CardDocument.MainInfo.RegDate, DateTime.Now.ToLocalTime());
            }

            document.MainInfo.Name = NamePrefix + sessionContext.AdvancedCardManager.GetFieldValue(parentDocId, CardDocument.MainInfo.ID, CardDocument.MainInfo.ExternalNumber);

            var senderOrganization = sessionContext.AdvancedCardManager.GetFieldValue(parentDocId, CardDocument.SenderPartner.ID, CardDocument.SenderPartner.SenderOrg);
            if (senderOrganization != null)
            {
                var row = GetRowData(sessionContext, documentId, CardDocument.ReceiversPartners.ID, true);
                if (row != null)
                {
                    row.SetFieldValue(CardDocument.ReceiversPartners.ReceiverPartnerCo, senderOrganization);
                }               
            }

            var referenceListService = sessionContext.ObjectContext.GetService<IReferenceListService>();
            if (document.MainInfo.ReferenceList == null)
            {               
                document.MainInfo.ReferenceList = referenceListService.CreateReferenceList();
                sessionContext.ObjectContext.SaveObject(document.MainInfo.ReferenceList);                
            }

            if (document.MainInfo.Tasks == null)
            {
                var tasksServie = sessionContext.ObjectContext.GetService<ITaskListService>();
                document.MainInfo.Tasks = tasksServie.CreateTaskList();
                sessionContext.ObjectContext.SaveObject(document.MainInfo.Tasks);
            }

            // Создаёт прямую ссылку и присоединяет её к новому документу
            var linkType = sessionContext.ObjectContext.GetObject<LinksLinkType>(AnswerLinkType);
            var reference = referenceListService.CreateReference(document.MainInfo.ReferenceList, linkType, parentDoc,
                   string.IsNullOrEmpty(parentDoc.Description) ? parentDoc.SystemInfo.CardKind.Name : parentDoc.Description, false);

            // Создаёт обратную ссылку и присоединяет её к родительскому документу
            var oppositeLinkType = sessionContext.ObjectContext.GetObject<LinksLinkType>(OppositeLinkType);
            referenceListService.CreateReference(parentDoc.MainInfo.ReferenceList, oppositeLinkType, document,
                string.IsNullOrEmpty(document.Description) ? document.SystemInfo.CardKind.Name : document.Description, false);

            sessionContext.ObjectContext.SaveObject(document);
            var cardId = sessionContext.ObjectContext.GetObjectRef(document).Id;

            return cardId;            
        }

        private IRowData GetRowData(SessionContext sessionContext, Guid cardId, Guid sectionId, bool allowCreateFirstRow)
        {
            if (sectionId != Guid.Empty)
            {
                return sessionContext.AdvancedCardManager.GetSection(cardId, sectionId).GetFirstRow(allowCreateFirstRow);
            }
            else
            {
                return null;
            }
        }
    }
}