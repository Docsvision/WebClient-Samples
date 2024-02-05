using DocsVision.Platform.WebClient.Models.RealTimeCommunication;
using DocsVision.Platform.WebClient.Models.RealTimeCommunication.NotificationMessage;
using DocsVision.Platform.WebClient.Services;
using System;
using Microsoft.AspNetCore.Mvc;

namespace SignalForUsersExtension
{
    public class ServiceController : ControllerBase
    {
        readonly IRealtimeCommunicationService communicationService;


        public ServiceController(IRealtimeCommunicationService communicationService)
        {
            this.communicationService = communicationService;
        }


        /// <summary>
        /// Отправляет оповещение всем пользователям
        /// </summary>
        /// <param name="message">Текст сообщения</param>
        /// <param name="messageType">Тип сообщения</param>
        [HttpPost]
        public void SendAll([FromBody]SendMessageRequest request)
        {
            var commMessage = new RealtimeCommunicationMessage<NotificationRealtimeMessage>();
            var messageData = new NotificationRealtimeMessage()
            {
                NotificationType = request.MessageType,
                Message = request.Message
            };
            commMessage.Initialize(NotificationRealtimeMessage.MessageType, messageData);
            communicationService.SendAll(commMessage);
            
        }

        /// <summary>
        /// Отправляет оповещение текущему пользователю
        /// </summary>
        /// <param name="message">Текст сообщения</param>
        /// <param name="messageType">Тип сообщения</param>
        [HttpPost]
        public void SendToCurrentSession([FromBody]SendMessageRequest request)
        {
            var commMessage = new RealtimeCommunicationMessage<NotificationRealtimeMessage>();
            var messageData = new NotificationRealtimeMessage()
            {
                NotificationType = request.MessageType,
                Message = request.Message
            };
            commMessage.Initialize(NotificationRealtimeMessage.MessageType, messageData);
            communicationService.SendToCurrentSession(commMessage);
        }

     
        /// <summary>
        /// Отправляет оповещение указанному пользователю
        /// </summary>
        /// <param name="message">Текст сообщения</param>
        /// <param name="messageType">Тип сообщения</param>
        /// <param name="recipientID">Идентификатор сотрудника, которому отправляется сообщение</param>
        [HttpPost]
        public void Send([FromBody]SendMessageRequest request)
        {
            var commMessage = new RealtimeCommunicationMessage<NotificationRealtimeMessage>();
            var messageData = new NotificationRealtimeMessage()
            {
                NotificationType = request.MessageType,
                Message = request.Message
            };
            commMessage.Initialize(NotificationRealtimeMessage.MessageType, messageData);
            communicationService.Send(request.RecipientID, commMessage);
        }
    }
}