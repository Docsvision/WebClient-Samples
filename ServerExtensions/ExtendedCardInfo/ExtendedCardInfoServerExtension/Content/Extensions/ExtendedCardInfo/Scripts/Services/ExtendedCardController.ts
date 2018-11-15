namespace WebClient {
    export class ExtendedCardController {
        constructor(private services: $RequestManager) {
        }

        getExtendedCardModel(cardId: string): JQueryDeferred<IExtendedCardModel> {
            let url = urlStore.urlResolver.resolveUrl("Get", "ExtendedCard");
            url = url + "?cardId=" + cardId;
            return this.services.requestManager.get<IExtendedCardModel>(url);
        }
    } 

    export type $ExtendedCardController = { extendedCardController: ExtendedCardController };

    App.addServiceFactory<$ExtendedCardController>({
        extendedCardController: (services: $RequestManager) => new ExtendedCardController(services)
    }, LAYOUT_SERVICE);
}