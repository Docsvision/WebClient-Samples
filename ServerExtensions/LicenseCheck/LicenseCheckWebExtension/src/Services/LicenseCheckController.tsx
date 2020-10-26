import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class LicenseCheckController {
    constructor(private services: $RequestManager) {
    }

    checkLicenseFeature(): Promise<boolean> {
        var url = urlStore.urlResolver.resolveUrl("CheckFeature", "LicenseCheck");
        return this.services.requestManager.post(url, '');
    }
}

export type $LicenseCheckController = { licenseCheckController: LicenseCheckController };
export const $LicenseCheckController = serviceName((s: $LicenseCheckController) => s.licenseCheckController);
    
