namespace WebClient.Samples {
    export function shiftTasksEndDate(cardId: string): JQueryDeferred<any> {
        let url = urlStore.urlResolver.resolveUrl("ShiftTasksEndDate", "AdvancedDocument");
        let data = {
            cardId: cardId
        }
        return requestManager.post(url, JSON.stringify(data));
    }
}

function shiftTasksEndDate() {
    WebClient.Samples.shiftTasksEndDate(layoutManager.cardLayout.cardInfo.id);
}