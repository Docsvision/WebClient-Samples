import React from "react";
import { AdaptiveMenuBar } from "@docsvision/webclient/Helpers/Menu/AdaptiveMenuBar";
import { AdaptiveMenuContent } from "@docsvision/webclient/Helpers/Menu/Content/AdaptiveMenuContent";
import { AdaptiveMenuItem } from "@docsvision/webclient/Helpers/Menu/AdaptiveMenuItem";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";

export class AdaptiveMenuBarComponentProps  {
    visible: boolean;
    onClose? : () => void;
}

function onMenuItemPreviewClick(text: string){
    MessageBox.ShowInfo(text);
}

function onMenuItemOpenClick(text: string){
    MessageBox.ShowInfo(text);
}

function onMenuItemDownloadClick(text: string){
    MessageBox.ShowInfo(text);
}

export class AdaptiveMenuBarComponent extends React.Component<AdaptiveMenuBarComponentProps, {}> {
    render() { 
        let openAlias = "open";
        let downloadAlias = "download";
        let previewAlias = "preview";

        return(
            <AdaptiveMenuBar onClose={() => this.props.onClose()} expanded={this.props.visible}>
                <AdaptiveMenuContent>
                        <AdaptiveMenuItem name={previewAlias} onClick={() => onMenuItemPreviewClick(previewAlias)}
                            visible={true} >
                            {previewAlias}
                        </AdaptiveMenuItem>
                        <AdaptiveMenuItem  name={openAlias} onClick={() => onMenuItemOpenClick(openAlias)}>
                            {openAlias}
                        </AdaptiveMenuItem>
                        <AdaptiveMenuItem name={downloadAlias} onClick={() => onMenuItemDownloadClick(downloadAlias)}>
                            {downloadAlias}
                        </AdaptiveMenuItem>
                </AdaptiveMenuContent>
            </AdaptiveMenuBar>
        );
    }
};