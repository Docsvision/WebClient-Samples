import * as Feature1Handlers from "./Feature1/Action1EventHandler";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "Sample worker web extension",
    version: "1.0",
    globalEventHandlers: [ Feature1Handlers ],
})