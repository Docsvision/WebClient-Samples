import { BaseControlParams, BaseControl } from '@docsvision/webclient/System/BaseControl';
import { r } from '@docsvision/webclient/System/Readonly';
import { rw } from '@docsvision/webclient/System/Readwrite';
import { $TableRowSelection } from '@docsvision/webclient/Platform/$TableRowSelection';
import { $BatchOperationsPerformer } from '@docsvision/webclient/Platform/$BatchOperationsPerformer';
import { $TableManagement } from '@docsvision/webclient/Platform/$TableManagement';
import { $TableMode } from '@docsvision/webclient/Platform/$TableMode';
import { $BatchOperations } from '@docsvision/webclient/Platform/$BatchOperations';
import { $RequestManager } from '@docsvision/webclient/System/$RequestManager';
import { $UrlResolver } from '@docsvision/webclient/System/$UrlResolver';
import { DownloadFilesBatchOperationSampleImpl, DownloadFilesBatchOperationSampleState } from './DownloadFilesBatchOperationSampleImpl';
import { DownloadDocumentFileMode } from './DownloadDocumentFileMode';
import { handler } from '@docsvision/webclient/System/Handler';
import { $Folders } from '@docsvision/webclient/Legacy/$Folders';
import { $FileDownload } from '@docsvision/webclient/Platform/$FileDownload';

export class DownloadFilesBatchOperationSampleParams extends BaseControlParams {       
    @r standardCssClass?: string = "system-download-files-batch-operation";
    @rw buttonText?: string;
    @rw downloadDocumentFileMode?: DownloadDocumentFileMode = DownloadDocumentFileMode.All;
    @rw folders?: string[] = [];
    @r services?: $TableRowSelection & $BatchOperationsPerformer & $TableManagement & $TableMode & $BatchOperations & $Folders & $FileDownload
         & $RequestManager & $UrlResolver;
}

/**
 * Класс элемента управления DownloadFilesBatchOperation.
 */
export class DownloadFilesBatchOperationSample extends BaseControl<DownloadFilesBatchOperationSampleParams, DownloadFilesBatchOperationSampleState> {

    constructor(props) {
        super(props);
    }

    @handler("batchOperationRestrictionFolders")
    private set setFolders(value: string) {
        if (value) {
            this.state.folders = value.split(",");
            for (let i = 0; i < this.state.folders.length; i++) {
                if (this.state.folders[i]) {
                    this.state.folders[i] = this.state.folders[i].toLowerCase();
                }
            };
        }
    }

    /** @notest @internal */
    protected createParams() {
        return new DownloadFilesBatchOperationSampleParams();
    }

    protected createImpl() {
        return new DownloadFilesBatchOperationSampleImpl(this.props, this.state);
    }
}