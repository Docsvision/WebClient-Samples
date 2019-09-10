import { SampleTextBox } from "./Controls/SampleTextBox/SampleTextBox";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "SampleTextBox",
    version: "5.5.13",
    controls: [{ controlTypeName: "SampleTextBox", constructor: SampleTextBox }]
});

