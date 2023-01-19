import { ITablePlugins } from "@docsvision/web/components/table/interfaces";
import { IFolderPluginFactory } from "@docsvision/webclient/Platform/IFolderPluginFactory";
import { ToolbarButtonPlugins } from "./ToolbarButtonPlugins";

export class ToolbarButtonPluginFactory implements IFolderPluginFactory {
    id: string = "ToolbarButtonPluginFactory";

    // Вовзращает плагины для таблицы
    getTablePlugins(): ITablePlugins[] {
        return [ ToolbarButtonPlugins ];
    } 
}