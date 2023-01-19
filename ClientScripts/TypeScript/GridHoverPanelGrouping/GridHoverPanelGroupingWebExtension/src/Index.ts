import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { app } from "@docsvision/webclient/App";
import { CustomHoverPanelService } from "./CustomHoverPanelService";
import { $HoverPanel } from "@docsvision/webclient/Platform/$HoverPanel";


// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "HoverPanelGroping",
    version: "5.5.17",
    initialize() {
        // Заменяем реализацию стандартного сервиса $HoverPanel на CustomHoverPanelService.
        app.setService($HoverPanel, new CustomHoverPanelService());
    },
})