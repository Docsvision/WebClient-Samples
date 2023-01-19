import { Icon } from "@docsvision/web/components/media/Icon/Icon";
import { $Grouping } from "@docsvision/web/components/table/plugins/grouping";
import { HeaderHoverPanelName, HeaderHoverPanelPlugin } from "@docsvision/web/components/table/plugins/hover-panel";
import { $SidePanel } from "@docsvision/web/components/table/plugins/side-panel";
import { PluginPlacement } from "@docsvision/web/core/composition";
import { useStore } from "effector-react";
import React from "react";

export const CustomHoverPanelFeature = "CustomHoverPanelFeature";

export const HoverPanelGroupingByColumn: HeaderHoverPanelPlugin<$Grouping & $SidePanel> = {
    name: "HoverPanelGroupingByColumn",
    description: `
        Добавляет элемент в панель при наведении, который находится в ячейке шапки таблицы.
        При клике на элемент, происходит группировка по столбцу.
    `,
    feature: CustomHoverPanelFeature,
    composition: HeaderHoverPanelName,
    placement: PluginPlacement.AfterContent,
    component: (props) => {
        /* Деструктуризируем объект props, получая все необходимые данные для реализации группировки по столбцу. */
        const { data: { column }, services: { grouping, sidePanel } } = props.composition;

        /* 
            С помощью хука useStore получаем данные из хранилища $gropingPath.
            Хук предоставляет возможность перерисовывать компонент при изменении состояния хранилища $gropingPath.
            Благодаря тому, что мы следим за его состоянием и перерисовываем компонент, мы можем учитывать следующую логику:
            - Если столбец уже сгруппирован, то не показывать иконку
            - Если столбец не сгруппирован, то показывать иконку
         */ 
        const groupingPath = useStore(grouping.$groupingPath);

        const groupByColumn = () => {
            /* 
                Проверяем доступна ли колонка для группировки и, если она доступна, 
                открываем боковую панель с группировкой, если она была закрыта.
            */
            if (grouping.canAddColumnGrouping(column.id) && !sidePanel.$isOpen.getState()) {
                sidePanel.toggle();
            }

            /* Группируем по колонке. */
            grouping.addColumnGrouping(column.id);
        };

        /* Проверяем сценарий, что группировка по колонке уже применена. */
        const isGrouped = Boolean(groupingPath.find(path => path.columnId == column.id));

        /* Если группировка доступна и уже применена или недоступна для этой колонки, то ничего не отрисовываем. */
        if (grouping.$groupingAvailable.getState() && (isGrouped || !grouping.canAddColumnGrouping(column.id))) {
            return <></>;
        }

        /* Если группировка доступна, то рисуем иконку, при нажатии на которую будет применена группировка. */
        return (
            <Icon 
                iconClass="dv-ico context-menu-group hover-panel-custom-grouping-by-column" 
                onClick={groupByColumn} 
                dv-tooltip="Сгруппировать по столбцу" />
        );
    }
};