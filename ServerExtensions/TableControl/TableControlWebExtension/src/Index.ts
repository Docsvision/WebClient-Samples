
import * as CardOpenedHandlers from "./EventHandlers/CardOpened";
import { $SamplePartnersController, SamplePartnersController } from "./Services/SamplePartnersController";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { Service } from "@docsvision/webclient/System/Service";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "TableControl",
    version: "5.5.12",
    globalEventHandlers: [ CardOpenedHandlers ],
    layoutServices: [ 
        Service.fromFactory($SamplePartnersController, (services: $RequestManager) => new SamplePartnersController(services)) 
    ]
});