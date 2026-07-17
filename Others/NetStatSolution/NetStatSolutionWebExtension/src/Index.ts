import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { cardTypeResolver } from "@docsvision/webclient/System/CardTypeResolver";
import "./NetStat.scss";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение Web-клиента
extensionManager.registerExtension({
    name: "NetStatSolutionWebExtension",
    version: "6.1",
    initialize() {
        cardTypeResolver.registerCardType({
            id: "CCCA40C0-5FA4-4878-B0DA-34E67E167BEA",
            name: "NetStatSolutionCard",
            cssClass: "NetStatSolutionCard",
            caption: "Карточка учета сетевого оборудования"
        });
    }
});
