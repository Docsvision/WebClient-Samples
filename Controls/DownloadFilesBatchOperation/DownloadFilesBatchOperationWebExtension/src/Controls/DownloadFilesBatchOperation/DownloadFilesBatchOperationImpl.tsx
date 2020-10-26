import React from 'react';
import { BaseControlState } from '@docsvision/webclient/System/BaseControl';
import { IBatchOperationInfo } from '@docsvision/webclient/Platform/$BatchOperations';
import { resources } from '@docsvision/webclient/System/Resources';
import { ITableRowModel } from '@docsvision/webclient/Platform/ITableRowModel';
import { BatchOperationErrorInfo } from '@docsvision/webclient/Platform/BatchOperationErrorInfo';
import { DOCUMENT_CARD_TYPE_ID } from '@docsvision/webclient/BackOffice/Constants';
import { Button } from '@docsvision/webclient/Helpers/Button';
import { BaseControlImpl } from '@docsvision/webclient/System/BaseControlImpl';
import { DownloadFilesBatchOperationParams } from './DownloadFilesBatchOperation';
import { RequestRejectValues } from '@docsvision/webclient/Legacy/Utils';
import { IFileInfo } from './IFileInfo';
import "file-saver"
import { DownloadDocumentFileMode } from './DownloadDocumentFileMode';
import { showIf } from '@docsvision/webclient/System/CssUtils';

export interface DownloadFilesBatchOperationState extends DownloadFilesBatchOperationParams, BaseControlState {
}

/**
 * Класс элемента управления DownloadFilesBatchOperation.
 */
export class DownloadFilesBatchOperationImpl extends BaseControlImpl<DownloadFilesBatchOperationParams, DownloadFilesBatchOperationState> {

    componentDidMount() {
        super.componentDidMount();

        this.state.services.batchOperations.register(this.getOperationInfo());
        this.state.services.tableRowSelection.selectionChanged.subscribe(this.onSelectionChanged);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.state.services.batchOperations.unregister(this.getOperationInfo().id);
        this.state.services.tableRowSelection.selectionChanged.unsubscribe(this.onSelectionChanged);
    }

    onSelectionChanged = () => {
        this.state.services.batchOperations.update(this.state.name, this.getOperationInfo());
    }


    private getOperationInfo(): IBatchOperationInfo {
        return {
            id: this.state.name,
            controlName: this.state.name,
            isAvailable: this.isAvailable(),
            isVisible: this.isVisible(),
            displayName: resources.DownloadFilesBatchOperationName
        };
    }

    // Функция, вызываемая при клике по кнопке скачивания файлов
    private onDownloadFilesClick = async () => {

        // Функция, которая будет применяться к каждой строке для выполнения групповой операции
        let downloadFilesTask = async (row: ITableRowModel) => {
            let errors = [] as BatchOperationErrorInfo[];
            try {
                let url = this.state.services.urlResolver.resolveApiUrl("GetDocumentFiles", "DownloadFilesBatchOperation");
                let requestAddress = "{0}?documentId={1}".format(url, row.instanceId);
                // Запрос списка файлов из карточки row.instanceId для скачивания
                let fileInfos = await this.state.services.requestManager.get<IFileInfo[]>(requestAddress, {
                    disableDialogsOnErrors: true,
                    rejectValue: RequestRejectValues.ProcessedResponseObject
                });
                for (let fileInfo of fileInfos) {
                    if (this.state.downloadDocumentFileMode == DownloadDocumentFileMode.All ||
                        this.state.downloadDocumentFileMode == DownloadDocumentFileMode.Main && fileInfo.isMain ||
                        this.state.downloadDocumentFileMode == DownloadDocumentFileMode.Additional && !fileInfo.isMain) {
                        //Последовательное скачивание файлов с сервера
                        let fileData = await this.downloadFile(fileInfo) as string;
                        // Сохранение файла через интерфейс браузер
                        saveAs(fileData, fileInfo.fileName);
                    }
                }
            } catch (responseObject) {
                errors.push({
                    gridRow: row,
                    cardDigest: responseObject.data,
                    errorMessage: responseObject.message
                });
            }
            return errors;
        };
        let errors = await this.state.services.batchOperationsPerformer.perform(
            resources.DownloadFilesBatchOperationName,
            this.state.services.tableRowSelection.selection,
            downloadFilesTask
        );
        this.state.services.tableManagement.reload();
        if (errors.length == 0) {
            // Снятие выделения со строки в случае, если не возникло никаких ошибок
            this.state.services.tableMode.rowsSelectionMode = false;
        }
    }

    private async downloadFile(fileInfo: IFileInfo) {
        let url = this.state.services.urlResolver.resolveUrl("Download", "File");
        let requestAddress = "{0}?fileId={1}".format(url, fileInfo.fileId);
        let fileData = await this.state.services.requestManager.get(requestAddress, {
            disableDialogsOnErrors: true,
            returnRawResponse: true,
            responseType: "blob"
        });
        return fileData;
    }

    private isAvailable() {
        return this.state.services.tableRowSelection.selection.selectedRows.every(x => x.cardTypeId == DOCUMENT_CARD_TYPE_ID);
    }

    private isVisible() {
        let currentFolderId = this.state.services.folders.getCurrentFolderId();
        if (this.state.folders.length == 0){
            return false;
        }
        if (this.state.folders && this.state.folders.length > 0 && currentFolderId && !this.state.folders.includes(currentFolderId)) {
            return false;
        }
        return this.state.services.tableRowSelection.selection.selectedRows.some(x => x.cardTypeId == DOCUMENT_CARD_TYPE_ID);
    }

    getCssClass() {
        return super.getCssClass() + showIf(this.isVisible());
    }

    renderControl() {
        let tooltip = this.isAvailable() ? "" : resources.DownloadFilesBatchOperation_OnlyDocuments;
        return (
            <Button stretchWidth={false} onClick={this.onDownloadFilesClick} disabled={!this.isAvailable()} title={tooltip} >
                {this.state.buttonText}
            </Button>
        );
    }
}