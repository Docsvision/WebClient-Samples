import { serviceName } from '@docsvision/web/core/services';
import { IAction1Request } from './Models/IAction1Request';
import { IAction1Response } from './Models/IAction1Response';

export interface IFeature1Service {
    action1(request: IAction1Request): Promise<IAction1Response>;
}

export type $Feature1 = { feature1: IFeature1Service };
export const $Feature1 = serviceName((x: $Feature1) => x.feature1);