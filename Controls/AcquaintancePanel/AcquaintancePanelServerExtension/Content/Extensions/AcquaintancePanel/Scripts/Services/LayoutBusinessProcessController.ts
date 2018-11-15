
namespace WebClient {
    export class LayoutBusinessProcessController {
        constructor(private services: $RequestManager) {
        }

        sendToAcquaintance(cardId?: string, employeeIds?: string[], endDate?: Date): JQueryDeferred<IStartBPResultModel> {
            var url = urlStore.urlResolver.resolveUrl("SendToAcquaintance", "LayoutBusinessProcess");
            var data = {
                "cardId": cardId || layoutManager.cardLayout.cardInfo.id,
                "employeeIds": employeeIds,
                "endDate": endDate
            };

            return this.services.requestManager.post(url, JSON.stringify(data));
        }
    }

    export type $LayoutBusinessProcessController = { layoutBusinessProcessController: LayoutBusinessProcessController };

    WebClient.App.addServiceFactory<$LayoutBusinessProcessController>({
        layoutBusinessProcessController: (services: $RequestManager) => new LayoutBusinessProcessController(services)
    }, LAYOUT_SERVICE);
}
