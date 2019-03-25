
import { $AdvancedDocumentController, AdvancedDocumentController } from "./Services/ShiftTasksEndDate";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import * as ShiftTasksEndDate from "./EventHandlers/ShiftTasksEndDate";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "ShiftTasksEndDate",
    version: "5.5.12",
    globalEventHandlers: [ ShiftTasksEndDate ],
    layoutServices: [ 
        Service.fromFactory($AdvancedDocumentController, (services: $RequestManager) => new AdvancedDocumentController(services)) 
    ]
});