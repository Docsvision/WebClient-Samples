import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import * as ExtendServerQueryData from "./ExtendServerQueryData";

// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "ExtendServerQueryData",
    version: "5.5.17",
    globalEventHandlers: [ExtendServerQueryData]
});