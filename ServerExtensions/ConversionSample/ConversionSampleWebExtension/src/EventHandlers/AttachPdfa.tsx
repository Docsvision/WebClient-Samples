import { Layout } from "@docsvision/webclient/System/Layout";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { $ConversionFileController } from "../Services/ConversionSample";
import { FileListControl } from "@docsvision/webclient/BackOffice/FileListControl";
import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { IAgreementEventArgs } from "@docsvision/webclient/Approval/IAgreementEventArgs";
import { StackingModal } from "@docsvision/webclient/Helpers/StackingModal";
import React from "react";
import { ModalDialog, ModalDialogContent } from "@docsvision/web/components/modals/modal-dialog";
import { ModalDialogTopBorder } from "@docsvision/webclient/Helpers/ModalDialog/ModalDialogTopBorder";
import { ModalHost } from "@docsvision/webclient/Helpers/ModalHost";
import { resources } from "@docsvision/webclient/System/Resources";
import { AgreementManagement } from "@docsvision/webclient/Approval/AgreementManagement";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";

export async function attachPdfa(sender: Layout, args: ICancelableEventArgs<IAgreementEventArgs>) {
    args.wait();

    const conversionService = sender.getService($ConversionFileController);
    const fileList = layoutManager.cardLayout.controls.get<FileListControl>("fileList");
    const fileId = fileList.params.files[0].data.currentVersion.id;
    try
    {
        await conversionService.сanConvert(fileId);

        const modalHost = new ModalHost("conversion-dialog", () => renderConversionInfo());
        try {
            const agreementManagement = layoutManager.cardLayout.controls.get<AgreementManagement>("agreementManagementButton");
            agreementManagement.hideSidebar();
            modalHost.mount();
            await conversionService.attachPdfa(layoutManager.cardLayout.cardInfo.id, fileId);
            modalHost.unmount();
            await fileList.reloadFromServer();
            args.accept();
        } catch (err) {
            args.cancel();
            modalHost.unmount();
            throw err;
        }
    } catch (err) {
        MessageBox.ShowError(err);
        throw err;
    }
}

export async function attachPdfaButton(sender: Layout) {
    const conversionService = sender.getService($ConversionFileController);
    const fileList = layoutManager.cardLayout.controls.get<FileListControl>("fileList");
    const fileId = fileList.params.files[0].data.currentVersion.id;

    try {
        await conversionService.сanConvert(fileId);
        const modalHost = new ModalHost("conversion-dialog", () => renderConversionInfo());
        try {
            const agreementManagement = layoutManager.cardLayout.controls.get<AgreementManagement>("agreementManagementButton");
            agreementManagement.hideSidebar();
            modalHost.mount();
            await conversionService.attachPdfa(layoutManager.cardLayout.cardInfo.id, fileId);
            modalHost.unmount();
            await fileList.reloadFromServer();
        } catch (err) {
            modalHost.unmount();
            throw err;
        }
    } catch (err) {
        throw err;
    }
}

function renderConversionInfo() {
    return (
        <StackingModal visible={true} >
            <ModalDialog isOpen={true} showCloseButton={false} header={resources.Dialog_Information} showButtonsPanel={false}>
                    <ModalDialogTopBorder color="#4285F4" /> 
                    <ModalDialogContent>{resources.ConvertationProcess}</ModalDialogContent>
            </ModalDialog>
        </StackingModal>
    );
}