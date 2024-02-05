import { IDigitalSignOptions, SignatureMethod } from "@docsvision/webclient/BackOffice/$DigitalSignature";
import { DOCUMENT_CARD_TYPE_ID } from "@docsvision/webclient/BackOffice/Constants";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { Button } from "@docsvision/webclient/Helpers/Button";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { ISignatureLabel } from "@docsvision/webclient/Legacy/ISignatureLabel";
import { IBatchOperationInfo } from "@docsvision/webclient/Platform/$BatchOperations";
import { BatchOperationErrorInfo } from "@docsvision/webclient/Platform/BatchOperationErrorInfo";
import { ITableRowModel } from "@docsvision/webclient/Platform/ITableRowModel";
import { arrayDifference } from "@docsvision/webclient/System/ArrayUtils";
import { BaseControlState } from "@docsvision/webclient/System/BaseControl";
import { BaseControlImpl } from "@docsvision/webclient/System/BaseControlImpl";
import { showIf } from "@docsvision/webclient/System/CssUtils";
import { EMPTY_GUID } from "@docsvision/webclient/System/GuidUtils";
import { resources } from "@docsvision/webclient/System/Resources";
import { waitTimeout } from "@docsvision/webclient/System/WaitTimeout";

import React from "react";
import { DocumentSignBatchOperationParams } from "./DocumentSignBatchOperation";

export interface DocumentSignBatchOperationState extends DocumentSignBatchOperationParams, BaseControlState {
}

export class DocumentSignBatchOperationImpl extends BaseControlImpl<DocumentSignBatchOperationParams, DocumentSignBatchOperationState> {
    constructor(state, props) {
        super(state, props);
        this.onSignClick = this.onSignClick.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();

        this.state.services.batchOperations?.register(this.getOperationInfo());
        this.state.services.tableRowSelection?.selectionChanged?.subscribe(this.onSelectionChanged);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.state.services.batchOperations?.unregister(this.getOperationInfo().id);
        this.state.services.tableRowSelection?.selectionChanged?.unsubscribe(this.onSelectionChanged);
    }

    onSelectionChanged = () => {
        this.state.services.batchOperations?.update(this.state.name, this.getOperationInfo());
        this.forceUpdate();
    }

    getOperationInfo(): IBatchOperationInfo {
        return {
            id: this.state.name,
            controlName: this.state.name,
            isAvailable: this.isVisible(),
            isVisible: this.isVisible(),
            displayName: resources.DocumentBatchSign_SignOperationName
        };
    }

    protected onSignClick = async () => {
        this.previewDocumentAndCorfimSign(this.state.services.tableRowSelection.selection.selectedRows as any);
    }

    private async signDocuments() {
        let selectedMethod: SignatureMethod;
        let powerOfAttorneyID: string;
        let label: ISignatureLabel;
        const doNothing = () => {};
        const saveSignDialogData = async (signOptions: IDigitalSignOptions) => {
            label = signOptions.label;
            selectedMethod = signOptions.method;
            powerOfAttorneyID = signOptions["powerOfAttorneyID"];
            return { cardInfo: signOptions.cardInfo }
        }

        const selectedRows = this.state.services.tableRowSelection.selection.selectedRows;
        try {
            await this.state.services.digitalSignature.showDocumentSignDialog(
            selectedRows[0].instanceId, 
            {
                onCreateSignature: saveSignDialogData as any,
                onAttachSignatureToCard: doNothing as any,
            });
        } catch(err) {
            console.log(err);
        } 

        if (!selectedMethod.isSimple && !selectedMethod.certificateInfo) {
            MessageBox.ShowError(resources.DocumentBatchSign_СertificateError);
            return;
        }

        const signDocument = async (row: ITableRowModel): Promise<BatchOperationErrorInfo[]> => {
            return new Promise(async (resolve, reject) => {
                const errors = [] as BatchOperationErrorInfo[];
                const pushError = (cardName?: string, message?: string) => {
                    errors.push({
                        gridRow: row,
                        cardDigest: cardName || resources.DocumentBatchSign_Card,
                        errorMessage: message
                    });
                }
                
                const cardRow = (this.state.services.tableRowSelection.selection.selectedRows
                    .find(selection => selection.instanceId === row.instanceId) as ITableRowModel & { row })?.row;
                const cardName = this.getCardLinkPresentation(cardRow);
    
                try {
                    const documentFiles = (await this.state.services.layoutFileController.getFiles({ cardId: row.instanceId, options: null })).files || [];
                    const documentFilesEx = documentFiles.map(file => ({
                        fileCardId: file.fileId,
                        fileId: file.currentVersion?.id,
                        fileName: file.name,
                        versionId: file.currentVersion?.versionId
                    }));
                    const request = {
                        cardId: row.instanceId,
                        method: { isSimple: selectedMethod.isSimple, certificateInfo: { ...selectedMethod.certificateInfo, source: GenModels.SignatureMethodSources.LocalCryptoPro }},
                        label: label,
                        files: documentFilesEx,
                        signAttachments: true,
                        signFields: true
                    } as IDigitalSignOptions;
                    request["powerOfAttorneyID"] = powerOfAttorneyID;
                    const signResult = await this.state.services.digitalSignature.createDocumentSignature(request);
                    await this.state.services.digitalSignature.attachDocumentSignature(signResult);
                } catch (responseObject) {
                    console.log(responseObject);
                    if (typeof responseObject === "string" && responseObject.includes(resources.Error_AccessDenied)) {
                        responseObject = resources.SignatureNotAllowed
                    }
                    pushError(responseObject.data || cardName, responseObject.message || responseObject);
                }  
                resolve(errors);
            });
        }
            
        const errors = await this.state.services.batchOperationsPerformer.perform(
            resources.DocumentBatchSign_SignOperationName, 
            this.state.services.tableRowSelection.selection, 
            signDocument,
            resources.DocumentBatchSign_SignOperationDescription
        );

        if (this.state.services.folderGrid.newGridAvailable) {
            await this.state.services.folderDataLoading.loadData({ refresh: true, refreshSource: true, refreshGrouping: true });
        } else {
            await this.state.services.tableManagement.reload();
        }
        if (errors.length == 0) {
            this.state.services.tableMode.rowsSelectionMode = false;
            this.state.services.tableRowSelection.clearSelection();
            MessageBox.ShowInfo(resources.DocumentBatchSign_Signed);
        } else {
            this.state.services.tableRowSelection.clearSelection(
                arrayDifference(
                    this.state.services.tableRowSelection.selection.selectedRows.map(x => x.instanceId),
                    errors.map(x => x.gridRow.instanceId)
                )
            );
        }
    }

    private async previewDocumentAndCorfimSign(selectedRows: (ITableRowModel & { row: IRow })[]) {
        const filelist = selectedRows.map(selected => 
            <a key={selected.instanceId} className="document-sign-batch-operation-filelist" href={`#/CardView/${selected.instanceId}`} 
                target="_blank" style={{ display: "block", fontWeight: "bold"}} onClick={ev => (ev.target as HTMLElement).style.fontWeight = "normal"}>
                {this.getCardLinkPresentation(selected.row)}
            </a>
        );
        const header = <div style={{ marginBottom: "15px"}}>{resources.DocumentBatchSign_SignConfirmationHeader}</div>;
        const content = <div style={{ height: "100%", maxHeight: "50vh", overflowY: "auto"}}>{filelist}</div>
        await MessageBox.ShowConfirmation([header, content]);
        this.signDocuments();
    }

    private getCardLinkPresentation = (row: IRow) => {
        const presentations = (this.state.columnNameForPresentation?.split(',') || [])
            .map(p => p.trim());
        return (row?.cells || []).filter(cell => presentations.includes(cell.columnId))
            .map(cell => cell.value || "")
            .join(" ") 
            || resources.DocumentBatchSign_Card;
    }

    isVisible() {
        return this.state.services.tableRowSelection?.selection?.selectedRows?.length != 0
            && this.state.services.tableRowSelection?.selection?.selectedRows.every(selection => selection.cardTypeId === DOCUMENT_CARD_TYPE_ID);
    }

    getCssClass() {
        return showIf(this.isVisible()) + super.getCssClass();
    }

    private getButtonText() : string {
        if (this.state.buttonText == null || this.state.buttonText.trim() === "")
            return resources.DocumentBatchSign_SignOperationName;
        else
            return this.state.buttonText;
    }

    protected renderControl() {
        return (
            <Button onClick={this.onSignClick} stretchWidth={false}>
               {this.getButtonText()}
            </Button>
        );
    }
}

interface IRow  {
    id: string;
    uniqueId?: string;
    entityId: string;
    cells: { value: string, columnId }[];
}