import { SampleExchangeRates } from "./Controls/SampleExchangeRates/SampleExchangeRates";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его элементы
extensionManager.registerExtension({
    name: "SampleExchangeRates",
    version: "5.5.14",
    controls: [{ controlTypeName: "SampleExchangeRates", constructor: SampleExchangeRates }]
});
