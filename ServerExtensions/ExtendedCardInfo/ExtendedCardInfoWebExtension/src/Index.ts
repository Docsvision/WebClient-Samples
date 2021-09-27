import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { Service } from "@docsvision/webclient/System/Service";
import * as ExtendedCardCheckDates from "./EventHandlers/ExtendedCardCheckDates";
import { $ExtendedCardController, ExtendedCardController } from "./Services/ExtendedCardController";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "ExtendedCardInfo",
    version: "5.5.16",
    globalEventHandlers: [ ExtendedCardCheckDates ],
    layoutServices: [ 
        Service.fromFactory($ExtendedCardController, (services: $RequestManager) => new ExtendedCardController(services)) 
    ]
});
