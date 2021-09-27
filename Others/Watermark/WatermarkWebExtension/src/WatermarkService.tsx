import { DVWebToolConnection } from "@docsvision/webclient/Helpers/DVWebToolConnection/DVWebToolConnection";
import { $WebServices } from "@docsvision/webclient/System/IWebServicesService";
import { $ApplicationSettings, $SiteUrl, $CurrentEmployeeId } from "@docsvision/webclient/StandardServices";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { WebServicesConnection } from "@docsvision/webclient/System/WebServicesConnection";
import { IWebServicesResponse } from "@docsvision/webclient/System/IWebServicesResponse";

// Клиентский сервис, предоставляющий доступ к методу добавления водяных знаков, предоставляемому расширением DVWebTool
export class WatermarkService {

    constructor(private services: $RequestManager & $WebServices & $ApplicationSettings & $MessageBox & $SiteUrl & $CurrentEmployeeId) {
    }

    // Метод принимает ИД карточки и ИД её конвертируемых файлов
    AddWatermarkToFiles(cardID: string, fileIDs: string[]): Promise<IWebServicesResponse<any>> {

        // В данных нужно также передать:
        // адрес сервера Web-клиента (DVWebTool должен подключиться к Web-клиенту для получения и сохранения файлов карточки) и 
        // ИД пользователя (для отправки оповещения о завершении процесс)
        const data: any = {
            data: {
                cardID: cardID,
                fileIDs: fileIDs,
                userID: this.services.currentEmployeeId,
                serverAddress: this.services.siteUrl
            },
            action: 'AddWatermarkToFiles', // Название метода, вызываемого из расширения DVWebTool
            locale: this.services.applicationSettings.culture.twoLetterISOLanguageName // Обязательное для передачи название локали
        };

        // Вызываем метод AddWatermarkToFiles из контроллера Watermark расширения DVWebTool
        // Тип DVWebToolConnection предоставляет методы для работы с DVWebTool
        return DVWebToolConnection.trySendData("Watermark", data, this.services);
    }
}


// Регистрируем сервис WatermarkService
export type $WatermarkService = { watermarkService: WatermarkService };
export const $WatermarkService = serviceName((s: $WatermarkService) => s.watermarkService);