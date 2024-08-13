import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export type $ConversionFileController = { ConversionFileController: ConversionFileController };
export const $ConversionFileController = serviceName((s: $ConversionFileController) => s.ConversionFileController);

export class ConversionFileController {
    constructor(private services: $RequestManager) {
    }
    
    сanConvert(fileId: string) {
        let url = urlStore.urlResolver.resolveApiUrl("CanConvert", "ConversionFile");
        url = url + "?fileId=" + fileId;
        return this.services.requestManager.get(url);
    }

    attachPdfa(documentId: string, fileId: string) {
        let url = urlStore.urlResolver.resolveApiUrl("AttachPdfa", "ConversionFile");
        let data = {
            documentId: documentId,
            fileId: fileId
        }
        return this.services.requestManager.post(url, JSON.stringify(data));
    }
}