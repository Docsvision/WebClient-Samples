import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { app } from "@docsvision/webclient/App";
import { ToolbarButtonPluginFactory } from "./ToolbarButtonPluginFactory";


// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "GridToolbarButton",
    version: "5.5.17",
    initialize() {
        app.folderPluginProvider.addFactory(new ToolbarButtonPluginFactory());
    },
})