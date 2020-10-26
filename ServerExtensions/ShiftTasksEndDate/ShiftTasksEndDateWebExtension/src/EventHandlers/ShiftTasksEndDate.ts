import { Layout } from "@docsvision/webclient/System/Layout";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { $AdvancedDocumentController } from "../Services/ShiftTasksEndDate";

export async function shiftTasksEndDate(sender: Layout) {
    let service = sender.getService($AdvancedDocumentController);;
    await service.shiftTasksEndDate(layoutManager.cardLayout.cardInfo.id);
}