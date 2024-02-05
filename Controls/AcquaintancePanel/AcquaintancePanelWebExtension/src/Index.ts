import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $LayoutBusinessProcessController, LayoutBusinessProcessController } from "./Services/LayoutBusinessProcessController";
import { AcquaintancePanel } from "./Controls/AquaintancePanel/AcquaintancePanel";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение, его контролы и сервисы.
extensionManager.registerExtension({
    name: "AcquaintancePanel",
    version: "6.1",
    controls: [ { controlTypeName: "AcquaintancePanel", constructor: AcquaintancePanel } ],
    layoutServices: [ 
        Service.fromFactory($LayoutBusinessProcessController,  (services: $RequestManager) => new LayoutBusinessProcessController(services))
    ]
});

