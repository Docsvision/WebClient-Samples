
import { IStartBPResultModel } from "../Controls/AquaintancePanel/Models/IStartBPResultModel";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class LayoutBusinessProcessController {
    constructor(private services: $RequestManager) {
    }

    sendToAcquaintance(cardId?: string, employeeIds?: string[], endDate?: Date): Promise<IStartBPResultModel> {
        var url = urlStore.urlResolver.resolveUrl("SendToAcquaintance", "LayoutBusinessProcess");
        var data = {
            "cardId": cardId || layoutManager.cardLayout.cardInfo.id,
            "employeeIds": employeeIds,
            "endDate": endDate
        };

        return this.services.requestManager.post(url, JSON.stringify(data));
    }
}

export type $LayoutBusinessProcessController = { layoutBusinessProcessController: LayoutBusinessProcessController };
export const $LayoutBusinessProcessController = serviceName((s: $LayoutBusinessProcessController) => s.layoutBusinessProcessController);

