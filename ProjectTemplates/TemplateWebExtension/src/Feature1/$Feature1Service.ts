import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { IFeature1Service } from "./$Feature1";
import { IAction1Request } from "./Models/IAction1Request";
import { IAction1Response } from "./Models/IAction1Response";

export class Feature1Service implements IFeature1Service {
    constructor(private services: $RequestManager) {

    }

    async action1(request: IAction1Request): Promise<IAction1Response> {
        return this.services.requestManager.post<IAction1Response>(
            "api/Feature1/Action1", JSON.stringify(request));
    }
}
