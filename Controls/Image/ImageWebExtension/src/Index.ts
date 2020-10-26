import { SampleImage } from "./Controls/ImageSample/SampleImage";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "SampleImage",
    version: "5.5.15",
    controls: [{ controlTypeName: "SampleImage", constructor: SampleImage }]
});
