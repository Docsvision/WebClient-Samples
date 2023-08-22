// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы,
// чтобы rollup смог собрать их все в один бандл.

import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { ILocalizationsMap } from "@docsvision/webclient/System/ILocalizationsMap";
import { DocumentSignBatchOperation } from "./Controls/DocumentSignBatchOperation/DocumentSignBatchOperation";

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: 'Групповая операция подписания документа',
    version: "1.0.0",
    getLocalizations,
    controls: [
        { controlTypeName: "DocumentSignBatchOperation", constructor: DocumentSignBatchOperation },
    ]
});

function getLocalizations(): ILocalizationsMap {
    let cultureMap = {};
    cultureMap["ru"] = {
        "DocumentBatchSign_SignOperationDescription": 'Пожалуйста, подождите. Выполняется операция "{0}". Это может занять некоторое время, в зависимости от количества документов.',
        "DocumentBatchSign_SignOperationName": "Подписать документы",
        "DocumentBatchSign_SignConfirmationHeader": "Просмотрите документы и подтвердите подписание:",
        "DocumentBatchSign_AccessError": "Карточка не доступна для подписания.",
        "DocumentBatchSign_СertificateError": "Не был выбран сертификат для подписи.",
        "DocumentBatchSign_Card": "Карточка",
        "DocumentBatchSign_Signed": "Документы подписаны.",
        "DocumentBatchSign_AccessSignDialogError": "Некоторые карточки не доступны для подписания или операция прервана пользователем."
    };
    cultureMap["en"] = {
        "DocumentBatchSign_SignOperationDescription": 'Wait, please. Operation "{0}" is in progress. This may take some time depending on the number of documents.',
        "DocumentBatchSign_SignOperationName": "Documents sign",
        "DocumentBatchSign_SignConfirmationHeader": "Review the documents and confirm the signing:",
        "DocumentBatchSign_AcessError": "The card is not available for signing.",
        "DocumentBatchSign_СertificateError": "No signing certificate was selected.",
        "DocumentBatchSign_Card": "Card",
        "DocumentBatchSign_Signed": "Documents are signed.",
        "DocumentBatchSign_AccessSignDialogError": "Some cards are not available for signing or the operation was interrupted by the user"
    };
    return cultureMap;
}
