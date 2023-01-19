import { createDomain, Event, forward, Store } from "effector";
import { IBackgroundRowsService, IBackgroundRow, IBackgroundRows } from "./$BackgroundRows";

export class BackgroundRowsService implements IBackgroundRowsService {
    $rows: Store<IBackgroundRows>;
    setBackground: Event<IBackgroundRow>;

    constructor() {
        // Инициализируем сущности необходимые для хранения и обновления хранилища.
        const domain = createDomain("BackgroundRows");

        this.setBackground = domain.event("setBackground");
        this.$rows = domain.store({}, { name: "$rows" })
            .on(this.setBackground, (store, background) => ({...store, [background.id]: background.color }));
    }
}