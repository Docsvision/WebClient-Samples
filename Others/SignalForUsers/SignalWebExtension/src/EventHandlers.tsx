import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";
import { $MessageService, MessageType, MessageService } from "./MessageService";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { $CurrentEmployeeAccountName } from "@docsvision/webclient/StandardServices";


// Функция использует сервис $MessageService (проект) для отправки оповещения всем пользователям
export function sendMessage(sender: Layout, e: IEventArgs) {
   let messageService = layoutManager.cardLayout.getService($MessageService);
   return messageService.sendAll("В 12:00 планируется перезагрузка Web-клиента. Сохраните данные.", MessageType.Warning);
}

// Функция использует сервис $MessageService (проект) для отправки оповещения текущему пользователю
export function sendToCurrentSession(sender: Layout, e: IEventArgs) {
   let messageService = layoutManager.cardLayout.getService($MessageService);
   let myAccountName = layoutManager.cardLayout.getService($CurrentEmployeeAccountName);

   return messageService.sendToCurrentSession("Добрый день " + myAccountName, MessageType.Info);
}

// Функция использует сервис $MessageService (проект) для отправки сообщения пользователю с указанным идентификатором
export function send(sender: Layout, e: IEventArgs) {
   let messageService = layoutManager.cardLayout.getService($MessageService);
  
   return messageService.send("Проверка подключения", MessageType.Info, "6b3e89dd-a1dc-4e9f-b160-c5a8882709ec");
}