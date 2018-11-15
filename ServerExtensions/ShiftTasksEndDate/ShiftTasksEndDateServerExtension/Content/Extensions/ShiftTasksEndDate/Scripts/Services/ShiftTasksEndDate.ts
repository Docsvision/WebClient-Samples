namespace WebClient {

    export class AdvancedDocumentController {
        constructor(private services: $RequestManager) {
        }

        shiftTasksEndDate(cardId: string): JQueryDeferred<any> {
            let url = urlStore.urlResolver.resolveUrl("ShiftTasksEndDate", "AdvancedDocument");
            let data = {
                cardId: cardId
            }
            return this.services.requestManager.post(url, JSON.stringify(data));
        }
    }
    export type $AdvancedDocumentController = { advancedDocumentController: AdvancedDocumentController };

    App.addServiceFactory<$AdvancedDocumentController>({
        advancedDocumentController: (services: $RequestManager) => new AdvancedDocumentController(services)
    }, LAYOUT_SERVICE);
}
