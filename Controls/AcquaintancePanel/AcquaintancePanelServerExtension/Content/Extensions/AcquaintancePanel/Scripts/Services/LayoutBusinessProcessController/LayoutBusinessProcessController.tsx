namespace WebClient {   
    export class LayoutBusinessProcessController {   
        public SendToAcquaintance(cardId?: string, employeeIds?: string[], endDate?: Date): JQueryDeferred<IStartBPResultModel> {
            var url = urlStore.urlResolver.resolveUrl("SendToAcquaintance", "LayoutBusinessProcess");
            var data = {
                "cardId": cardId || layoutManager.cardLayout.cardInfo.id,
                "employeeIds": employeeIds,
                "endDate": endDate
            };

            return requestManager.post(url, JSON.stringify(data));  
        }              
    }
    export var layoutBusinessProcessController: LayoutBusinessProcessController = new LayoutBusinessProcessController();
}

function sendToAcquaintance() {
    WebClient.layoutBusinessProcessController.SendToAcquaintance(layoutManager.cardLayout.cardInfo.id);
}
