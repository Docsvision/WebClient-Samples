import { ITablePlugins } from "@docsvision/web/components/table/interfaces";
import { IFolderDataLoadingPlugin } from "@docsvision/webclient/Platform/IFolderDataLoadingPlugin";
import { IFolderPluginFactory } from "@docsvision/webclient/Platform/IFolderPluginFactory";
import { BackgroundRowsPlugins } from "./BackgroundRowsPlugins";
import { BackgroundRowsResponseResolver } from "./BackgroundRowsResponseResolver";

export class BackgroundRowsPluginFactory implements IFolderPluginFactory {
    id: string = "BackgroundRowsPluginFactory";

    getDataLoadingPlugins(): IFolderDataLoadingPlugin[] {
        return [
            new BackgroundRowsResponseResolver()
        ]
    }

    getTablePlugins(): ITablePlugins[] {
        return [ 
            BackgroundRowsPlugins
        ];
    } 
}