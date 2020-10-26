import { RefCases } from "./Controls/RefCases/RefCases";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $RefCasesService, RefCasesService } from "./Services/refCasesServices";


// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "RefCases",
    version: "5.5.15",
    layoutServices: [
        Service.fromFactory($RefCasesService, (services: $RequestManager) => new
        RefCasesService(services))
        ],
    controls: [{ controlTypeName: "RefCases", constructor: RefCases }]
});
