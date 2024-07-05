using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.StorageServer;
using ServerExtension.Models;
using System;
using System.Text;
using System.Xml.Serialization;
using System.Xml;

namespace ServerExtension.Services
{
    public class SampleWorkerService : ISampleWorkerService
    {
        private readonly Guid MainInfoMessageSectionId = new Guid("7e4090cd-280a-4607-ab73-cac3d3d7db01");
        private readonly Guid MessageCardTypeId = new Guid("23A98E72-8C75-4B99-A3E6-3DA5853B3CA9");
        private readonly Guid OutgoingMessageSectionId = new Guid("0455567c-adee-4fe5-9a21-562062ffb5d0");
        private readonly Guid HandleServiceId = new Guid("735E2DBB-862D-48CC-8E49-D4166CF640E7");
        private static readonly Guid MessageCardId = new Guid("D82B1CC1-9416-48EA-889B-A9BFD34CAA72");

        public Guid CreateMessageToWorker(ObjectContext context, WorkerMessageArgs args, Guid eventId)
        {
            CardData cardMessage;
            var session = context.GetService<UserSession>();

            var messageCardId = Guid.NewGuid();
            cardMessage = session.CardManager.CreateCardData(MessageCardTypeId, messageCardId);
            var mainInfo = cardMessage.Sections[MainInfoMessageSectionId].FirstRow;
            mainInfo.SetGuid(Constants.Fields.ObjectIdFieldAlias, Guid.Empty);
           
            if (cardMessage != null)
            {
                if (cardMessage.InUpdate)
                {
                    StorageServerTrace.Runtime.TraceEvent(System.Diagnostics.TraceEventType.Warning, 0, "Card {0} already in update mode", MessageCardId);
                    cardMessage.CancelUpdate();
                }

                SectionData outgoingSection = cardMessage.Sections[OutgoingMessageSectionId];

                if (outgoingSection.InUpdate)
                {
                    StorageServerTrace.Runtime.TraceEvent(System.Diagnostics.TraceEventType.Warning, 0, "Card section 0455567c-adee-4fe5-9a21-562062ffb5d0 of card {0} already in update mode", MessageCardId);
                    outgoingSection.CancelUpdate();
                }
                try
                {
                    outgoingSection.BeginUpdate();
                    RowData newRow = outgoingSection.CreateRow();
                    newRow.SetBoolean(Constants.Fields.ConcurrentFieldAlias, true);
                    newRow.SetBoolean(Constants.Fields.AutoSendToSelfFieldAlias, true);
                    newRow.SetGuid(Constants.Fields.TypeIdFieldAlias, HandleServiceId);
                    newRow.SetGuid(Constants.Fields.SubTypeIdFieldAlias, eventId);
                    newRow.SetString(Constants.Fields.DataFieldAlias, Serialize(args));
                    newRow.SetDateTime(Constants.Fields.CreateDateFieldAlias, DateTime.Now);
                }
                finally
                {
                    outgoingSection.EndUpdate();
                }
            }

            return cardMessage.Id;
        }

        private string Serialize(WorkerMessageArgs args)
        {
            XmlSerializer xmlSerializer = new XmlSerializer(typeof(WorkerMessageArgs));

            StringBuilder sb = new StringBuilder();
            using (XmlWriter writer = XmlWriter.Create(sb))
            {
                xmlSerializer.Serialize(writer, args);
            }

            return sb.ToString();
        }
    }
}