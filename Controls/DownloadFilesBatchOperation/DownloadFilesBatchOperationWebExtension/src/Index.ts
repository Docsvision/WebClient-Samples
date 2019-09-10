import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { DownloadFilesBatchOperation } from "./Controls/DownloadFilesBatchOperation/DownloadFilesBatchOperation";
import { ILocalizationsMap } from "@docsvision/webclient/System/ILocalizationsMap";

// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "DownloadFilesBatchOperation",
    version: "5.5.13",
    controls: [{ controlTypeName: "DownloadFilesBatchOperation", constructor: DownloadFilesBatchOperation }],
    getLocalizations: getLocalizations
})

function getLocalizations(): ILocalizationsMap {
    let cultureMap = {};
    cultureMap["ru"] = {
        "DownloadFilesBatchOperationName": "Скачать файлы",
        "DownloadFilesBatchOperation_OnlyDocuments": "Операция доступна только для документов",
    };
    cultureMap["en"] = {
        "DownloadFilesBatchOperationName": "Download files",
        "DownloadFilesBatchOperation_OnlyDocuments": "Operation is available only for documents",

    };
    return cultureMap;
}