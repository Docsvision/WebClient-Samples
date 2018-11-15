namespace WebClient {
    export class CustomLibraryController {
        constructor(private services: $RequestManager) {
        }

        getCustomData(): JQueryDeferred<number> {
            var url = urlStore.urlResolver.resolveUrl("GetCustomData", "CustomLibrary");
            return this.services.requestManager.post(url, '');
        }
    }

    export type $CustomLibraryController = { customLibraryController: CustomLibraryController };

    WebClient.App.addServiceFactory<$CustomLibraryController>({
        customLibraryController: (services: $RequestManager) => new CustomLibraryController(services)
    }, LAYOUT_SERVICE);
}