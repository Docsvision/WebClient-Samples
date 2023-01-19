
import { ITablePlugins, TableCompositionNames, TablePlugins } from "@docsvision/web/components/table/interfaces";
import { decorate } from "@docsvision/web/core/composition";
import { $BackgroundRows } from "./$BackgroundRows";
import { BackgroundRowsService } from "./BackgroundRowsService";
import { throttle } from "patronum/throttle";
import { BackgroundRowsButton } from "./BackgroundRowsButton/BackgroundRowsButton";

export const BackgroundRowsColumnId = "backgroundRows";
export const BackgroundRowsFeature = "BackgroundRowsFeature";

export const BackgroundRowsServiceProvider: TablePlugins.ServiceProvider<$BackgroundRows> = {
    name: "BackgroundRowsServiceProvider",
    description: "Добавляет сервис $BackgroundRows.",
    feature: BackgroundRowsFeature,
    composition: TableCompositionNames.Root,
    addServices: (composition) => {
        /*  Т.к addServices вызывается при каждом рендере, 
            сделаем проверку на существование сервиса, который хотим добавить. */
        if (!composition.services.backgroundRows) {
            composition.services.backgroundRows = new BackgroundRowsService();
        }
    }
};

export const BackgroundRowsCellButtonPlugin: TablePlugins.Cell.Component<$BackgroundRows> = {
    name: "BackgroundRowsCellButtonPlugin",
    description: "Отображает кнопку изменения фона строки.",
    feature: BackgroundRowsFeature,
    composition: TableCompositionNames.TableCell,
    // Компонент будет отображён, если условие правдиво.
    shouldRender: (composition) => composition.data.column.id == BackgroundRowsColumnId,
    // Компонент, который будет отображён в ячейке добавленной колонки.
    component: BackgroundRowsButton
};

export const BackgroundRowsMountEffect: TablePlugins.Row.MountEffect<$BackgroundRows> = {
    name: "BackgroundRowsMountEffect",
    description: "Обновляет композицию при изменении $rows",
    feature: BackgroundRowsFeature,
    composition: TableCompositionNames.TableRow,
    // Вызывается при монтировании компоненты.
    compositionDidMount: (composition) => {
        const { backgroundRows } = composition.services;

        /*  Из-за того, что хранилище backgroundRow.$rows может меняться достаточно быстро
            (зависит от скорости изменения цвета в палитре), необходимо установить ограничение обновления композиции.
            В данном случае, optimalUpdate будет срабатывать не чаще, чем раз в 100 мс для оптимизации браузера. */
        const optimalUpdate = throttle({ source: backgroundRows.$rows, timeout: 100 });

        // Когда сработает событие, то будет обновлена композиция таблицы.
        const update = optimalUpdate.watch(() => composition.update());
        // Отписка от события, когда компонент будет размонтирован.
        return () => update.unsubscribe();
    }
};

export const BackgroundRowDecorator: TablePlugins.Row.Decorator<$BackgroundRows> = {
    name: "BackgroundRowDecorator",
    description: "Изменяет фон строки.",
    feature: BackgroundRowsFeature,
    composition: TableCompositionNames.TableRow,
    // Метод, с помощью которого появляется возможность декорирования ReactNode.
    jsxDecorator: (node, composition) => {
        const { services, data } = composition;
        // Получаем хранилище, которое содержит информацию о цвете фона строк.
        const backgroundRows = services.backgroundRows.$rows.getState();

        /*  В данном методе вторым аргументом является объект свойств ReactNode, как в React.createElement.
            В данном случае, если хранилище содержит информацию о фоне строки, то она будет применена, в противном случае стиль не применится. */
        return decorate(node, { style: { background: backgroundRows[data.row.entityId] }});
    }
};

export const BackgroundRowsPlugins: ITablePlugins = {
    serviceProviders: [ BackgroundRowsServiceProvider ],
    row: {
        mountEffects: [ BackgroundRowsMountEffect ],
        containerDecorators: [ BackgroundRowDecorator ]
    },
    cell: {
        content: [ BackgroundRowsCellButtonPlugin ]
    }
};