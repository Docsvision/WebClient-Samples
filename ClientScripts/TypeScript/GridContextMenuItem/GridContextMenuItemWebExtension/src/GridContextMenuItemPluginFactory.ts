import { ITablePlugins } from "@docsvision/web/components/table/interfaces";
import { IFolderPluginFactory } from "@docsvision/webclient/Platform/IFolderPluginFactory";
import { GridContextMenuItemPlugins } from "./GridContextMenuItemPlugins";

export class GridContextMenuItemPluginFactory implements IFolderPluginFactory {
    id: string = "GridContextMenuItemPluginFactory";

    getTablePlugins(): ITablePlugins[] {
        return [ 
            GridContextMenuItemPlugins 
        ]
    } 
}