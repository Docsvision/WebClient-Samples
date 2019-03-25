import { SampleLink } from "./Controls/SampleLink/SampleLink";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "SampleLink",
    version: "5.5.12",
    controls: [{ controlTypeName: "SampleLink", constructor: SampleLink }]
});
