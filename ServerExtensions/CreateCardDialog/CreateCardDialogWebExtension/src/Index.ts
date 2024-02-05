import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { cardTypeResolver } from "@docsvision/webclient/System/CardTypeResolver";
import { resources } from "@docsvision/webclient/System/Resources";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение Web-клиента
extensionManager.registerExtension({
    name: "CreateCardDialog",
    version: "6.1",
    initialize() {
        cardTypeResolver.registerCardType({
            id: "0DB13C90-21B6-49D8-9070-8144DF97552A",
            name: "CardApprovalStage",
            cssClass: "CardApprovalStage",
            caption: resources.CardType_CardApprovalStage_DisplayName
        });
    }
});