import { IColumn, ITableData } from "@docsvision/web/components/table/interfaces";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { IFolderDataLoadingPlugin, ResponseResolveResult } from "@docsvision/webclient/Platform/IFolderDataLoadingPlugin";
import { PluginOrder } from "@docsvision/webclient/System/PluginOrder";
import { BackgroundRowsColumnId } from "./BackgroundRowsPlugins";
import { FilterStatus, getFilterPluginData } from "@docsvision/web/components/table/plugins/filter";

export class BackgroundRowsResponseResolver implements IFolderDataLoadingPlugin {
    id: string = "BackgroundRowsResponseResolver";
    description: string = "Добавляет новую колонку.";
    order: PluginOrder = PluginOrder.Normal;

    /** Вызывается после каждого ответа загрузки данных таблицы */
    async resolveResponse(data: ITableData, response: GenModels.GridViewModelEx): Promise<void | ResponseResolveResult> {
        /*  Сделаем проверку на существование столбцов в таблице, 
            а также проверим не был ли добавлен столбец, который мы хотим добавить. */
        if (data.columns.length && !data.columns.find(x => x.id == BackgroundRowsColumnId)) {

            const backgroundRowsColumn = {
                // Уникальный идентификатор столбца.
                id: BackgroundRowsColumnId,
                // Отображаемое название столбца.
                name: "Фон строки",
            } as IColumn;

            // Помечаем столбец, как недоступный для фильтрации
            getFilterPluginData(backgroundRowsColumn).filterStatus = FilterStatus.Disabled;

            data.columns.push(backgroundRowsColumn);
        }
    }
}