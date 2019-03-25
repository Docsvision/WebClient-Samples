import { Layout } from "@docsvision/webclient/System/Layout";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { $AdvancedDocumentController } from "../Services/ShiftTasksEndDate";

export async function shiftTasksEndDate(sender: Layout) {
    await sender.getService($AdvancedDocumentController).shiftTasksEndDate(layoutManager.cardLayout.cardInfo.id);
}