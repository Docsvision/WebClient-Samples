import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";;
import { $CardId } from "@docsvision/webclient/System/LayoutServices";
import { $SampleWorkerController } from "./$SampleWorkerController";

export async function sendConversionTask(sender: LayoutControl, e: IEventArgs) {
    const cardId = sender.layout.getService($CardId);
    const sampleWorkerController = sender.layout.getService($SampleWorkerController);
    await sampleWorkerController.sendToWorker({
        cardId
    });
}