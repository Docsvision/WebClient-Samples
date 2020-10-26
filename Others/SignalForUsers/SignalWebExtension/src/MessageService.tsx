import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";

export enum MessageType {
    Alert = 0,
    Success = 1,
    Warning = 2,
    Error = 3,
    Info = 4
}

// Клиентский сервис, предоставляющий доступ к серверным методам работы с подсистемой оповещений
export class MessageService {
    constructor(private services: $RequestManager) {
    }

    // Отправляет сообщение message всем пользователям. Тип сообщения messageType влияет на оформление сообщения
    sendAll(message: string, messageType: MessageType) {
        let url = urlStore.urlResolver.resolveApiUrl("SendAll", "Service");

        this.services.requestManager.post(url, JSON.stringify({ message, messageType }));
    }

    // Отправляет сообщение message текущему пользователю. Тип сообщения messageType влияет на оформление сообщения
    sendToCurrentSession(message: string, messageType: MessageType) {
        let url = urlStore.urlResolver.resolveApiUrl("SendToCurrentSession", "Service");
        
        this.services.requestManager.post(url, JSON.stringify({ message, messageType }));
    }

    // Отправляет сообщение message пользователю с идентификатором employeeID. Тип сообщения messageType влияет на оформление сообщения
    send(message: string, messageType: MessageType, employeeId: string) {
        let url = urlStore.urlResolver.resolveApiUrl("Send", "Service");

        this.services.requestManager.post(url, JSON.stringify({ message, messageType, recipientId: employeeId }));
    }

}

export type $MessageService = { messageService: MessageService };
export const $MessageService = serviceName((s: $MessageService) => s.messageService);