interface IFileUploadOptions {
    acceptFileTypes: string;
    maxFileSize: number;
    maxAllowedSumSize: number;
    autoUpload: boolean;
    singleFileUploads: boolean;

    alertFileNullSizeError();
    alertFileMaxSizeError();
    alertFileTypeNotAllowed();
    alertMaxUploadSizeNotAllowed();

    callbackUploadAdd(e, data);
    callbackUploadSend(e, data);
    callbackAdded(e, data);
    callbackDone(e, data);
    callbackFailed(e, data);
}

declare function initFileUpload(
    uploadFormElem: HTMLElement,
    fileInputElem: HTMLElement,
    fileInputClickableLabelElem: HTMLElement,
    dropZoneElem: HTMLElement,
    filesContainerTableElem: HTMLElement,
    options?: IFileUploadOptions);

declare function deinitFileUpload(uploadFormElem: HTMLElement);

declare function fileUploadSend(formElem: HTMLElement, fileList?: File[]): JQueryXHR;