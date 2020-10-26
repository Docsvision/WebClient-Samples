
using DocsVision.Platform.WebClient.Models.RealTimeCommunication.NotificationMessage;
using System;

namespace SignalForUsersExtension
{
    public class SendMessageRequest
    {
        public string Message { get; set; }
        public NotificationType MessageType { get; set; }
        public Guid RecipientID { get; set; }
    }
}