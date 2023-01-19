import { $MessageWindow } from "@docsvision/web/components/modals/message-box";
import { ITablePlugins, TableCompositionNames, TablePlugins } from "@docsvision/web/components/table/interfaces";
import { $TableData } from "@docsvision/web/components/table/plugins/table-data";
import { CompositionPluginOrder } from "@docsvision/web/core/composition";
import { IconButton } from "@docsvision/webclient/Helpers/IconButton";
import { ToolbarButtonMessageContent } from "./ToolbarButtonMessageContent";
import React from "react";


export const ToolbarButtonFeature = "ToolbarButtonFeature";

export const ToolbarButtonButtonPlugin: TablePlugins.Toolbar.Component<$MessageWindow & $TableData> = {
    name: "ToolbarButtonButtonPlugin",
    description: "Отображает кнопку в панели инструментов таблицы",
    feature: ToolbarButtonFeature,
    composition: TableCompositionNames.Toolbar,
    order: CompositionPluginOrder.Priority,
    component: (props) => {
        const { data, services } = props.composition;

        const showInfo = () => {
            // Вызывается модальное окно с информацией
            services.messageWindow.showInfo(() => <ToolbarButtonMessageContent data={data} services={services} />);
        };

        // Кнопка, при нажатии на которую открывается модальное окно с информацией
        return <IconButton iconClassName="dv-ico ico-modal-info" onClick={showInfo} />;
    }
};



export const ToolbarButtonPlugins: ITablePlugins = {
    toolbar: {
        afterContent: [ ToolbarButtonButtonPlugin ]
    }
};