import React from 'react';
import { CommonModalDialogHost } from "@docsvision/webclient/Helpers/ModalDialog/CommonModalDialogHost"
import { LocationContainerControl } from '@docsvision/webclient/System/LocationContainerControl';
import { addServices } from '@docsvision/web/core/services';
import { LoadingViewWithText } from '@docsvision/webclient/System/LoadingViewWithText';
import { LoadingState } from '@docsvision/webclient/System/LoadingState';
import { TableCompositions } from '@docsvision/web/components/table/interfaces';
import { $ContextMenuOptions } from '@docsvision/webclient/Platform/$ContextMenuOptions';
import { $FolderGrid } from '@docsvision/webclient/Platform/$FolderGrid';
import { $LayoutCardController } from '@docsvision/webclient/Generated/DocsVision.WebClient.Controllers';
import { $DeviceType } from '@docsvision/webclient/StandardServices';
import { $LayoutManager } from '@docsvision/webclient/System/$LayoutManager';
import { PlatformModeConditionTypes } from '@docsvision/webclient/Platform/PlatformModeConditionTypes';
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models"
import { CommonModalDialogProps } from '@docsvision/webclient/Helpers/ModalDialog/CommonModalDialog';

const GRID_CONTEXT_MENU_SHOW_CARD_LOCATION_NAME = "GRID_CONTEXT_MENU_SHOW_CARD";

export async function showCard(context: TableCompositions.Cell, services: $ContextMenuOptions & $FolderGrid & $LayoutCardController & $DeviceType & $LayoutManager) {
    // Модальное окно
    const modalHost = new CommonModalDialogHost("grid-context-menu__card-layout", services);

    /** Конфигурируем модальное окно */
    const dialogProps = modalHost.dialogProps as CommonModalDialogProps;
    // Заголовок
    dialogProps.header = "Предпросмотр";

    // Максимальная ширина
    dialogProps.maxWidth = "80vw";

    // Максимаьная высота
    dialogProps.maxHeight = "80vh";

    // Изменение отображения модального окна (свернуть / развернуть)
    dialogProps.maximizeButtonEnabled = true;
    dialogProps.onMaximize = () => {
        dialogProps.maximized = !dialogProps.maximized;
        modalHost.forceUpdate();
    }

    // Обработчик закрытия модального окна
    modalHost.onCancelCallback = () => services.layoutManager.destroy(GRID_CONTEXT_MENU_SHOW_CARD_LOCATION_NAME);

    // Отображение текста загрузки разметки
    const renderLoading = (state: LoadingState) => <LoadingViewWithText state={state} className="padding-20 margin-30" />;
    
    // Получение разметки карточки в режиме просмотра
    const loadLayout = async (): Promise<GenModels.LayoutViewModel> => {
        const model = await services.layoutCardController.view(context.data.row.entityId, PlatformModeConditionTypes.VIEW);
        return model;
    }
    
    // Сервисы модального окна
    const dialogServices = addServices(services, modalHost.service, true);
    
    // Тело модального окна
    modalHost.renderCallback = () => (
        <LocationContainerControl 
            async={true}
            renderLoadingState={renderLoading}
            customLayoutLoader={loadLayout}
            locationName={GRID_CONTEXT_MENU_SHOW_CARD_LOCATION_NAME}
            services={dialogServices}
            name={GRID_CONTEXT_MENU_SHOW_CARD_LOCATION_NAME} />
    );
     
    // Показываем модальное окно
    await modalHost.showDialog();
}