import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class CustomLibraryController {
    constructor(private services: $RequestManager) {
    }

    getCustomData(): Promise<number> {
        var url = urlStore.urlResolver.resolveUrl("GetCustomData", "CustomLibrary");
        return this.services.requestManager.post(url, '');
    }
}

export type $CustomLibraryController = { customLibraryController: CustomLibraryController };
export const $CustomLibraryController = serviceName((s: $CustomLibraryController) => s.customLibraryController);
