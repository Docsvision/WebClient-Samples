import * as Feature1Handlers from "./Feature1/Action1EventHandler";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/web/core/services";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $Feature1 } from "./Feature1/$Feature1";
import { Feature1Service } from "./Feature1/$Feature1Service";
import { Control1 } from "./Feature1/Control1";


// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "Template web extension",
    version: "1.0",
    globalEventHandlers: [ Feature1Handlers ],
    layoutServices: [ 
        Service.fromFactory($Feature1, (services: $RequestManager) => new Feature1Service(services))
    ],
    controls: [
        { controlTypeName: "Control1", constructor: Control1 }
    ]
})