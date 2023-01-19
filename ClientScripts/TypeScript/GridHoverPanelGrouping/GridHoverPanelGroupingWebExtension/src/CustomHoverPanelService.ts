import { HeaderHoverPanelPlugin } from "@docsvision/web/components/table/plugins/hover-panel";
import { IHoverPanelService } from "@docsvision/webclient/Platform/$HoverPanel";
import { HoverPanelGroupingByColumn } from "./CustomHoverPanelPlugins";

/* Создаём сервис алогичный IHoverPanelService. */
export class CustomHoverPanelService implements IHoverPanelService {

    /*
        При инициализации плагинов для HoverPanel, будет вызван этот метод.
        Внутри него мы можем убрать, добавить интересующие нас плагины для панели при наведении и вернуть новый массив плагинов.
    */
    getPlugins(defaultPlugins: HeaderHoverPanelPlugin<any>[]): HeaderHoverPanelPlugin<any>[] {
        /*
            К примеру:
            - defaultPlugins = defaultPlugins.filter(plugin => plugin.name !== target)
            - defaultPlugins.push(ownPlugin) 
        */

        /* Добавляем плагин для группировки по колонке */
        defaultPlugins.push(HoverPanelGroupingByColumn);

        return defaultPlugins;
    }
}