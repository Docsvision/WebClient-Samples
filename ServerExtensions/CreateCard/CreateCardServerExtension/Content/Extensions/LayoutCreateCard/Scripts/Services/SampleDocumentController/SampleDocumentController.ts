namespace WebClient {
    export class SampleDocumentController {
        constructor(private services: $RequestManager) {
        }
        
        public createOutgoingDocument(parentDocId?: string): JQueryDeferred<string> {
            var url = urlStore.urlResolver.resolveUrl("CreateOutgoingDocument", "SampleDocument");
            var data = {
                "parentDocId": (parentDocId || layoutManager.cardLayout.cardInfo.id)
            };

            return this.services.requestManager.post(url, JSON.stringify(data));
        }
    }

    export type $SampleDocumentController = { sampleDocumentController: SampleDocumentController };

    App.addServiceFactory<$SampleDocumentController>({
        sampleDocumentController: (services: $RequestManager) => new SampleDocumentController(services)
    }, LAYOUT_SERVICE);
}