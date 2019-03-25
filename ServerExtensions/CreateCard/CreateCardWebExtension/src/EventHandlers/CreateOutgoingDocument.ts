
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { $SampleDocumentController } from "../Services/SampleDocumentController/SampleDocumentController";

export async function createOutgoingDocument(sender: CustomButton): JQueryDeferred<void> {
    const data = await sender.layout.getService($SampleDocumentController).createOutgoingDocument(layoutManager.cardLayout.cardInfo.id);
    if (data) {
        var url = urlStore.urlResolver.resolveUrl("Show", "Card") + "/" + data;
        window.location.href = url;
    }
}