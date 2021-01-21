import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class KonturRequestController {
    
    constructor(private services: $RequestManager) {
    }

    getFromKontur(method: string, parameters: string): Promise<string | null> {
        return this.services.requestManager.get(`api/KonturRequest/GetFromKontur?method=${method}&parameters=${parameters}`);
    }

    addKonturReportToCard(cardId: string, reportFileName: string, parameters: string) {
        return this.services.requestManager.get(`api/KonturRequest/AddKonturReportToCard?cardId=${cardId}&fileName=${encodeURIComponent(reportFileName)}&parameters=${parameters}`);
    }
}

export type $KonturRequestController = {  konturRequestController: KonturRequestController }
export const $KonturRequestController = serviceName((x: $KonturRequestController) => x.konturRequestController);