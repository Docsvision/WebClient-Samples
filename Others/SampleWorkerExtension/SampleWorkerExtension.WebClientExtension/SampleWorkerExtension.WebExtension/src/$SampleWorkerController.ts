import { serviceName } from '@docsvision/web/core/services';
import { IWorkerMessageArgs } from './Models/IWorkerMessageArgs';
import { $RequestManager } from '@docsvision/webclient/System/$RequestManager';
import { urlStore } from '@docsvision/webclient/System/UrlStore';

export class SampleWorkerController {
    
    constructor(private services: $RequestManager) {
    }

    sendToWorker(args: IWorkerMessageArgs): Promise<string | null> {
        var url = urlStore.urlResolver.resolveApiUrl("SendToWorker", "SampleWorker");
        return this.services.requestManager.post(url, JSON.stringify(args));
    }
}

export type $SampleWorkerController = { sampleWorkerController: SampleWorkerController };
export const $SampleWorkerController = serviceName((x: $SampleWorkerController) => x.sampleWorkerController);