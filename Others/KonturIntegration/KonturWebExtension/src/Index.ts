import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import * as LoadOrganizationInfo from "./EventHandlers/LoadOrganizationInfo";
import * as OpenBriefReport from "./EventHandlers/OpenBriefReport";
import { $KonturRequestController, KonturRequestController } from "./ServerRequests.ts/KonturRequestController";
;

// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "Kontur web extension",
    version: "5.5.16",
    globalEventHandlers: [ LoadOrganizationInfo, OpenBriefReport ],
    layoutServices: [ 
        Service.fromFactory($KonturRequestController, (services: $RequestManager) => new KonturRequestController(services))
    ]
})