import * as ControlValidation from "./ControlValidation";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его обработчики
extensionManager.registerExtension({
    name: "ControlValidation",
    version: "5.5.13",
    globalEventHandlers: [ControlValidation]
});