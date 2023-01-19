import { ITableData } from "@docsvision/web/components/table/interfaces";
import { getRowLoaded } from "@docsvision/web/components/table/plugins/lazy-loading";
import { $TableData } from "@docsvision/web/components/table/plugins/table-data";
import { LabeledText } from "@docsvision/webclient/Helpers/LabeledText";
import { getUnreadRow } from "@docsvision/webclient/Platform/IUnreadRowData";
import { useStore } from "effector-react";
import React from "react";

export interface IToolbarButtonMessageContent {
    data: ITableData;
    services: $TableData;
}

export function ToolbarButtonMessageContent(props: IToolbarButtonMessageContent) {
    const { data, services } = props;

    // Обновляем компонент при изменении хранилища $data из services.tableData
    useStore(services.tableData.$data);

    // Количество загруженных карточек
    const loadedRows = data.rows.filter(x => getRowLoaded(x).loaded).length;
    // Количество непрочитанных карточек
    const unreadRows = data.rows.filter(x => getUnreadRow(x).isUnread).length;

    return (
        <>
            <LabeledText label={"На текущий момент загружено карточек"} text={loadedRows} />
            <LabeledText label={"Из них не прочитано"} text={unreadRows} />
        </>
    )
}