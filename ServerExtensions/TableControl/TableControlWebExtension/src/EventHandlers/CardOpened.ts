import { sampleDocument_loadPartnersInfo } from "../Logic/LoadPartnersInfo";
import { getServices } from "../Services/Services";
import { Layout } from "@docsvision/webclient/System/Layout";


/* Обработчик события открытия разметки просмотра документа */
export function sampleDocumentViewCardOpened(sender: Layout, e) {
    sampleDocument_loadPartnersInfo(getServices(sender));
}