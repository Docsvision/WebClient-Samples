function shiftTasksEndDate(sender: WebClient.Layout) {
    getServices(sender).advancedDocumentController.shiftTasksEndDate(layoutManager.cardLayout.cardInfo.id);
}