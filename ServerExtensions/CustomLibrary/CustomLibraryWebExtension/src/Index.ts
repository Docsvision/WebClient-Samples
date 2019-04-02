
import * as CustomData from "./EventHandlers/CustomData";
import { $CustomLibraryController, CustomLibraryController } from "./Services/CustomLibraryController";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "CustomLibrary",
    version: "5.5.12",
    globalEventHandlers: [ CustomData ],
    layoutServices: [ 
        Service.fromFactory($CustomLibraryController, (services: $RequestManager) => new CustomLibraryController(services)) 
    ]
});