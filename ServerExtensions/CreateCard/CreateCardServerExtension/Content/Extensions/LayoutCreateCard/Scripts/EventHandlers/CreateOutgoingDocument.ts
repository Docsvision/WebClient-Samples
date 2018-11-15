function createOutgoingDocument(sender: WebClient.CustomButton) {
    getServices(sender).sampleDocumentController.createOutgoingDocument(layoutManager.cardLayout.cardInfo.id).done((data) => {
        if (data) {
            var url = urlStore.urlResolver.resolveUrl("Show", "Card") + "/" + data;
            window.location.href = url;
        }
    });
}