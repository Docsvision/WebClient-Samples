import { sampleDocument_loadPartnersInfo } from "../Logic/LoadPartnersInfo";
import { getServices } from "../Services/Services";
import { Layout } from "@docsvision/webclient/System/Layout";


/* Обработчики событий просмотра документа */

declare function outgoingDocumentViewCardOpened(sender, args);

export function sampleDocumentViewCardOpened(sender: Layout, e) {
    outgoingDocumentViewCardOpened(sender, e); // Вызываем стандартный обработчик из решения УД
    sampleDocument_loadPartnersInfo(getServices(sender));
}