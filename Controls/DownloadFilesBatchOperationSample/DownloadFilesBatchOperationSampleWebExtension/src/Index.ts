import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { DownloadFilesBatchOperationSample } from "./Controls/DownloadFilesBatchOperation/DownloadFilesBatchOperationSample";
import { ILocalizationsMap } from "@docsvision/webclient/System/ILocalizationsMap";

// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "DownloadFilesBatchOperation",
    version: "6.1",
    controls: [{ controlTypeName: "DownloadFilesBatchOperationSample", constructor: DownloadFilesBatchOperationSample }],
    getLocalizations: getLocalizations
})

function getLocalizations(): ILocalizationsMap {
    let cultureMap = {};
    cultureMap["ru"] = {
        "DownloadFilesBatchOperationName": "Скачать файлы",
        "DownloadFilesBatchOperation_OnlyDocuments": "Операция доступна только для документов",
        "DownloadFilesBatchOperation": "Скачать"
    };
    cultureMap["en"] = {
        "DownloadFilesBatchOperationName": "Download files",
        "DownloadFilesBatchOperation_OnlyDocuments": "Operation is available only for documents",
        "DownloadFilesBatchOperation": "Download"

    };
    return cultureMap;
}