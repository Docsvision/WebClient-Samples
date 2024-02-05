import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class SampleDocumentController {
    constructor(private services: $RequestManager) {
    }
    
    public createOutgoingDocument(parentDocId?: string): Promise<string> {
        var url = urlStore.urlResolver.resolveUrl("CreateOutgoingDocument", "SampleDocument");
        url += "?parentDocId=" + encodeURIComponent((parentDocId || layoutManager.cardLayout.cardInfo.id));

        return this.services.requestManager.get(url);
    }
}

export type $SampleDocumentController = { sampleDocumentController: SampleDocumentController };
export const $SampleDocumentController = serviceName((s: $SampleDocumentController) => s.sampleDocumentController);

