
import * as LicenseCheck from "./EventHandlers/CheckLicenseFeature";
import { $LicenseCheckController, LicenseCheckController } from "./Services/LicenseCheckController";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { Service } from "@docsvision/webclient/System/Service";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "LicenseCheck",
    version: "5.5.16",
    globalEventHandlers: [ LicenseCheck ],
    layoutServices: [ 
        Service.fromFactory($LicenseCheckController, (services: $RequestManager) => new LicenseCheckController(services)) 
    ]
});