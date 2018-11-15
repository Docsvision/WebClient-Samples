namespace WebClient {
    export class SamplePartnersController {
        constructor(private services: $RequestManager) {
        }

        getPartnersInfo(partnerIds: string[]): JQueryDeferred<any[]> {
            var url = urlStore.urlResolver.resolveUrl("GetPartnersInfo", "SamplePartners");
            var data = { "partnerIds": partnerIds };
            return this.services.requestManager.post(url, JSON.stringify(data));
        }
    }
    export type $SamplePartnersController = { samplePartnersController: SamplePartnersController };

    App.addServiceFactory<$SamplePartnersController>({
        samplePartnersController: (services: $RequestManager) => new SamplePartnersController(services)
    }, LAYOUT_SERVICE);
}