import { $SampleDocumentController, SampleDocumentController } from "./Services/SampleDocumentController/SampleDocumentController";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import * as CreateOutgoingDocument from "./EventHandlers/CreateOutgoingDocument";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "CreateCard",
    version: "5.5.14",
    globalEventHandlers: [ CreateOutgoingDocument ],
    layoutServices: [ 
        Service.fromFactory($SampleDocumentController, (services: $RequestManager) => new SampleDocumentController(services)) 
    ]
});