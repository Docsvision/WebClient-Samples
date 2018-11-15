namespace WebClient {
    export class LicenseCheckController {
        constructor(private services: $RequestManager) {
        }
    
        checkLicenseFeature(): JQueryDeferred<boolean> {
            var url = urlStore.urlResolver.resolveUrl("CheckFeature", "LicenseCheck");
            return this.services.requestManager.post(url, '');
        }
    }

    export type $LicenseCheckController = { licenseCheckController: LicenseCheckController };

    App.addServiceFactory<$LicenseCheckController>({
        licenseCheckController: (services: $RequestManager) => new LicenseCheckController(services)
    }, LAYOUT_SERVICE);
}