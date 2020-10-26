import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class SamplePartnersController {
    constructor(private services: $RequestManager) {
    }

    getPartnersInfo(partnerIds: string[]): Promise<any[]> {
        var url = urlStore.urlResolver.resolveUrl("GetPartnersInfo", "SamplePartners");
        var data = { "partnerIds": partnerIds };
        return this.services.requestManager.post(url, JSON.stringify(data));
    }
}

export type $SamplePartnersController = { samplePartnersController: SamplePartnersController };
export const $SamplePartnersController = serviceName((s: $SamplePartnersController) => s.samplePartnersController);