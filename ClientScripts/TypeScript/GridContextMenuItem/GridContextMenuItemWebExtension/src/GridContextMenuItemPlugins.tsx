import { ITablePlugins, TableCompositionNames, TableCompositions, TablePlugins } from "@docsvision/web/components/table/interfaces";
import { $ContextMenuOptions, IDataItemFilter, IDataItemProvider } from "@docsvision/webclient/Platform/$ContextMenuOptions";
import { $FolderGrid } from "@docsvision/webclient/Platform/$FolderGrid";
import { CONTEXT_MENU_FOLDER_OPEN_ID } from "@docsvision/webclient/Platform/FolderGridConstants";
import { $LayoutCardController } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";
import { showCard } from "./GridContextMenuShowCard";
import { $DeviceType } from "@docsvision/webclient/StandardServices";
import { $LayoutManager } from "@docsvision/webclient/System/$LayoutManager";

export const GridContextMenuItemFeature = "GridContextMenuItemFeature";
export const CONTEXT_MENU_ITEM_CUSTOM_PROVIDER_ID = "CONTEXT_MENU_ITEM_CUSTOM_PROVIDER_ID";
export const CONTEXT_MENU_ITEM_CUSTOM_FILTER_ID = "CONTEXT_MENU_ITEM_CUSTOM_FILTER_ID";

export const AddContextMenuItemProvider: TablePlugins.ServiceProvider<$ContextMenuOptions & $FolderGrid & $LayoutCardController & $DeviceType & $LayoutManager> = {
    name: "AddContextMenuItemProvider",
    description: "Добавляет пункт контекстного меню, который открывает карточку в модальном окне",
    feature: GridContextMenuItemFeature,
    composition: TableCompositionNames.Root,
    addServices: (composition) => {
        const { contextMenuOptions, folderGrid } = composition.services;

        if (contextMenuOptions) {

            // Т.к метод addServices вызывает при каждом рендере, проверим не был ли добавлен ранее наш провайдер
            const isAdded = contextMenuOptions.isAddedProvider(CONTEXT_MENU_ITEM_CUSTOM_PROVIDER_ID, TableCompositionNames.TableCell);

            if (!isAdded) {
                const provider = {
                    // Уникальный id провайдера, содержащего элементы списка контекстного меню
                    id: CONTEXT_MENU_ITEM_CUSTOM_PROVIDER_ID,
                    // Композиция, где будет вызвано контекстное меню
                    composition: TableCompositionNames.TableCell,
                    // Метод, который возвращает массив элементов контекстного меню
                    getItemsToAdd: () => ([
                        {   
                            // Уникальный id элемента контекстного меню
                            // Пример: с помощью id осуществляется доступ к скрытию элемента контекстного меню
                            id: "CONTEXT_MENU_CUSTOM_ITEM",
                            // Отображаемое название элемента контекстного меню
                            name: "Предпросмотр карточки",
                            // Метод, который будет вызван после клика на элемент контекстного меню
                            action: (context: TableCompositions.Cell) => showCard(context, composition.services),
                            // Указание на расположение элемента в блоке элементов контекстного меню 
                            blockId: folderGrid?.getContextMenuBlockNames().linkOperation,
                            // Порядковый номер расположения элемента в блоке элементов контекстного меню
                            order: 0,
                        }
                    ])
                } as IDataItemProvider;

                contextMenuOptions.addItemProvider(provider);
            }
        }
    }
};

export const HideContextMenuItemProvider: TablePlugins.ServiceProvider<$ContextMenuOptions> = {
    name: "HideContextMenuItemProvider",
    description: "Скрывает пункт «Открыть» в контекстном меню",
    feature: GridContextMenuItemFeature,
    composition: TableCompositionNames.Root,
    addServices: (composition) => {
        const { contextMenuOptions } = composition.services;

        if (contextMenuOptions) {

            // Т.к метод addServices вызывает при каждом рендере, проверим не был ли добавлен ранее наш фильтр
            const isAdded = contextMenuOptions.isAddedFilter(CONTEXT_MENU_ITEM_CUSTOM_FILTER_ID, TableCompositionNames.TableCell);
            
            if (!isAdded) {
                const filter = {
                    // Уникальный id фильтра
                    id: CONTEXT_MENU_ITEM_CUSTOM_FILTER_ID,
                    // Композиция, где будет вызвано контекстное меню
                    composition: TableCompositionNames.TableCell,
                    // Метод, который возвращает массив id элементов контекстного меню
                    getItemsToHide: () => [CONTEXT_MENU_FOLDER_OPEN_ID]
                } as IDataItemFilter;
        
                contextMenuOptions.addItemFilter(filter);
            }
        }
    }
};

export const GridContextMenuItemPlugins: ITablePlugins = {
    serviceProviders: [ AddContextMenuItemProvider, HideContextMenuItemProvider ],
};