using CreateCardServerExtension.Helpers;
using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using System;

namespace CreateCardServerExtension.Services
{
    public class SampleDocumentService : ISampleDocumentService
    {
        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;
        private static readonly Guid OutgoingCardKindId = new Guid("{8e40f327-9517-4a43-998d-bf2bd619588d}");
        private static readonly Guid AnswerLinkType = new Guid("{ce1eb938-0c99-41fb-a0f2-52c6ace5e80a}");
        private static readonly Guid OppositeLinkType = new Guid("{502f7fe3-477f-492f-9f43-ed2aa7cb32d9}");
        private const string NamePrefix = "В ответ на ";

        /// <summary>
        /// Initializes a new instance of the <see cref="LicenseCheckService"/> class
        /// </summary>
        /// <param name="provider">Service provider</param>
        public SampleDocumentService(IServiceProvider provider)
        {
            if (provider == null)
                throw new ArgumentNullException("provider");

            this.serviceProvider = provider;
            serviceHelper = new ServiceHelper(serviceProvider);
        }

        public Guid CreateOutgoingDocument(Guid parentDocId)
        {            
            var sessionContext = serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext(); ;
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

            document.MainInfo.Name = NamePrefix + sessionContext.AdvancedCardManager.GetFieldValue(parentDocId, CardDocument.MainInfo.ID, CardDocument.MainInfo.ExternalNumber);

            var senderOrganization = sessionContext.AdvancedCardManager.GetFieldValue(parentDocId, CardDocument.SenderPartner.ID, CardDocument.SenderPartner.SenderOrg);
            if (senderOrganization != null)
            {                                
                sessionContext.AdvancedCardManager.SetFieldValue(documentId, CardDocument.ReceiversPartners.ID, CardDocument.ReceiversPartners.ReceiverPartnerCo, senderOrganization);
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

            //Create direct link and attach it to new document
            var linkType = sessionContext.ObjectContext.GetObject<LinksLinkType>(AnswerLinkType);
            var reference = referenceListService.CreateReference(document.MainInfo.ReferenceList, linkType, parentDoc,
                   string.IsNullOrEmpty(parentDoc.Description) ? parentDoc.SystemInfo.CardKind.Name : parentDoc.Description, false);
            
            //Create opposite link and attach it to parent document
            var oppositeLinkType = sessionContext.ObjectContext.GetObject<LinksLinkType>(OppositeLinkType);
            referenceListService.CreateReference(parentDoc.MainInfo.ReferenceList, oppositeLinkType, document,
                string.IsNullOrEmpty(document.Description) ? document.SystemInfo.CardKind.Name : document.Description, false);

            sessionContext.ObjectContext.SaveObject(document);
            var cardId = sessionContext.ObjectContext.GetObjectRef(document).Id;

            return cardId;            
        }
    }
}