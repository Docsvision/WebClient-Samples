import * as EventHandlers from "./EventHandlers";
import { $MessageService, MessageService } from "./MessageService";

import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";


// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрируем обработчики из EventHandlers и сервис из CommunicationService
extensionManager.registerExtension({
    name: "Send message for all users",
    version: "6.1",
    globalEventHandlers: [ EventHandlers ],
    layoutServices: [ 
        Service.fromFactory($MessageService, (services: $RequestManager) => new MessageService(services))
    ]
})