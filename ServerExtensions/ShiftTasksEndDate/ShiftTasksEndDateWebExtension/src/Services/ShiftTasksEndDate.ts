import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class AdvancedDocumentController {
    constructor(private services: $RequestManager) {
    }

    shiftTasksEndDate(cardId: string): JQueryDeferred<any> {
        let url = urlStore.urlResolver.resolveUrl("ShiftTasksEndDate", "AdvancedDocument");
        let data = {
            cardId: cardId
        }
        return this.services.requestManager.post(url, JSON.stringify(data));
    }
}
export type $AdvancedDocumentController = { advancedDocumentController: AdvancedDocumentController };
export const $AdvancedDocumentController = serviceName((s: $AdvancedDocumentController) => s.advancedDocumentController);