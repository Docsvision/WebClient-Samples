import { serviceName } from "@docsvision/web/core/services";
import { Event, Store } from "effector";

export interface IBackgroundRows {
    [id: string]: string;
}

export interface IBackgroundRow {
    id: string;
    color: string;
}

/** Интефрейс сервиса {@see $BackgroundRows} */
export interface IBackgroundRowsService {
    readonly $rows: Store<IBackgroundRows>;
    setBackground: Event<IBackgroundRow>;
}

export type $BackgroundRows = { backgroundRows: IBackgroundRowsService };
export const $BackgroundRows = serviceName((x: $BackgroundRows) => x.backgroundRows);