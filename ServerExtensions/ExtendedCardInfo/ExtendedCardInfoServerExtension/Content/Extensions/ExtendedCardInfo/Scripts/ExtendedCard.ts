namespace WebClient.Samples {
    export function getExtendedCardModel(cardId: string): JQueryDeferred<IExtendedCardModel> {
        let url = urlStore.urlResolver.resolveUrl("Get", "ExtendedCard");
        url = url + "?cardId=" + cardId;
        return requestManager.get<IExtendedCardModel>(url);
    }
}