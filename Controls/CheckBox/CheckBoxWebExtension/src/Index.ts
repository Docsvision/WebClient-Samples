import { SampleCheckBox } from "./Controls/SampleCheckBox/SampleCheckBox";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение
extensionManager.registerExtension({
    name: "SampleCheckBox",
    version: "5.5.13",
    controls: [{ controlTypeName: "SampleCheckBox", constructor: SampleCheckBox }]
});
