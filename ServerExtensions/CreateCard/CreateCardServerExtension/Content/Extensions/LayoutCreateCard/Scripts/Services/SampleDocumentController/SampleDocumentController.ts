namespace WebClient {
    export class SampleDocumentController {
        public CreateOutgoingDocument(parentDocId?: string): JQueryDeferred<string> {
            var url = urlStore.urlResolver.resolveUrl("CreateOutgoingDocument", "SampleDocument");
            var data = {
                "parentDocId": parentDocId || layoutManager.cardLayout.cardInfo.id               
            };

            return requestManager.post(url, JSON.stringify(data));
        }
    }
    export var sampleDocumentController: SampleDocumentController = new SampleDocumentController();
}

function createOutgoingDocument() {
    WebClient.sampleDocumentController.CreateOutgoingDocument(layoutManager.cardLayout.cardInfo.id).done((data) => {
        if (data) {            
            var url = urlStore.urlResolver.resolveUrl("Show", "Card") + "/" + data;
            window.location.replace(url);            
        }
    });
}