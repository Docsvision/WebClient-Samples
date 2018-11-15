/* Обработчики событий просмотра документа */

function sampleDocumentViewCardOpened(sender: WebClient.Layout, e) {
    outgoingDocumentViewCardOpened(sender, e); // Вызываем стандартный обработчик из решения УД
    WebClient.sampleDocument_loadPartnersInfo(getServices(sender));
}