import * as showAdaptiveMenuBar from "./ShowAdaptiveMenuBar";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "AdaptiveMenuBar Web Extension",
    version: "5.5.14",
    globalEventHandlers: [ showAdaptiveMenuBar ]
})
