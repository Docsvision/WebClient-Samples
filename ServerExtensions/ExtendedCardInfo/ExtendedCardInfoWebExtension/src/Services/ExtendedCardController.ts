
import { IExtendedCardModel } from "./ServerModels/IExtendedCardModel";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class ExtendedCardController {
    constructor(private services: $RequestManager) {
    }

    getExtendedCardModel(cardId: string): Promise<IExtendedCardModel> {
        let url = urlStore.urlResolver.resolveUrl("Get", "ExtendedCard");
        url = url + "?cardId=" + cardId;
        return this.services.requestManager.get<IExtendedCardModel>(url);
    }
} 

export type $ExtendedCardController = { extendedCardController: ExtendedCardController };
export const $ExtendedCardController = serviceName((s: $ExtendedCardController) => s.extendedCardController);