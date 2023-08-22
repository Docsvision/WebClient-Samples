import { $DigitalSignature } from "@docsvision/webclient/BackOffice/$DigitalSignature";
import { $LayoutFolderController, $LayoutCardController, $LayoutFileController } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";
import { $BatchOperations } from "@docsvision/webclient/Platform/$BatchOperations";
import { $BatchOperationsPerformer } from "@docsvision/webclient/Platform/$BatchOperationsPerformer";
import { $CurrentFolder } from "@docsvision/webclient/Platform/$CurrentFolder";
import { $FolderDataLoading } from "@docsvision/webclient/Platform/$FolderDataLoading";
import { $FolderGrid } from "@docsvision/webclient/Platform/$FolderGrid";
import { $TableManagement } from "@docsvision/webclient/Platform/$TableManagement";
import { $TableMode } from "@docsvision/webclient/Platform/$TableMode";
import { $TableRowSelection } from "@docsvision/webclient/Platform/$TableRowSelection";
import { $CheckBoxServices } from "@docsvision/webclient/Platform/CheckBox";
import { BaseControlParams, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { $LayoutInfo, $CardInfo } from "@docsvision/webclient/System/LayoutServices";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { resources } from "@docsvision/webclient/System/Resources";
import { DocumentSignBatchOperationState, DocumentSignBatchOperationImpl } from "./DocumentSignBatchOperationImpl";


export class DocumentSignBatchOperationParams extends BaseControlParams {       
    /** Стандартный CSS класс со стилями элемента управления */
    @r standardCssClass?: string = "system-documents-sign-batch-operation";
    /** Строка формата "<Имя1>,<Имя2>..." с перечнем имен столбцов представления для отображения
     * карточки в списке групповой операции.
     */
    @r columnNameForPresentation?: string;
    /** Текст кнопки операции. */
    @rw buttonText?: string = resources.DocumentBatchSign_signOperationName;

    @rw services?: $LayoutInfo & $LayoutFolderController & $CardInfo & $LayoutCardController & $FolderDataLoading &
        $TableRowSelection & $CheckBoxServices & $BatchOperationsPerformer & $TableManagement & $TableMode & $BatchOperations & $CurrentFolder &
        $LayoutFileController & $DigitalSignature & $FolderGrid;
}

export class DocumentSignBatchOperation extends BaseControl<DocumentSignBatchOperationParams, DocumentSignBatchOperationState> {

    /** @notest @internal */
    protected createParams() {
        return new DocumentSignBatchOperationParams();
    }

    protected createImpl() {
        return new DocumentSignBatchOperationImpl(this.props, this.state);
    }
}