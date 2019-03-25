
import * as CheckDates from "./EventHandlers/ExtendedCardCheckDates";
import { $ExtendedCardController, ExtendedCardController } from "./Services/ExtendedCardController";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { Service } from "@docsvision/webclient/System/Service";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "ExtendedCardInfo",
    version: "5.5.12",
    globalEventHandlers: [ CheckDates ],
    layoutServices: [ 
        Service.fromFactory($ExtendedCardController, (services: $RequestManager) => new ExtendedCardController(services)) 
    ]
});