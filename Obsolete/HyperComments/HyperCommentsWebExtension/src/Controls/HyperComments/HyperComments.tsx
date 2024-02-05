
import React from "react";
import { BaseControlParams, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { BaseControlImplState } from "@docsvision/webclient/System/BaseControlImpl";
import { ControlImpl } from "@docsvision/webclient/System/ControlImpl";
import { formatString } from "@docsvision/webclient/System/StringUtils";


const initializeScriptTemplate: string = `
    <div id="hypercomments_widget"></div>
    <script type="text/javascript">
        _hcwp = [];
        _hcwp.push({widget:"Stream", widget_id: {0}, xid: '{1}'});
        (function() {
        if("HC_LOAD_INIT" in window)return;
        HC_LOAD_INIT = true;
        var lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage || "en").substr(0, 2).toLowerCase();
        var hcc = document.createElement("script"); hcc.type = "text/javascript"; hcc.async = true;
        hcc.src = ("https:" == document.location.protocol ? "https" : "http")+"://w.hypercomments.com/widget/hc/{0}/"+lang+"/widget.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hcc, s.nextSibling);
        })();
    </script>`;

const workScriptTemplate: string = `
    <div id="hypercomments_widget"></div>
    <script type="text/javascript">
        var _hcp = {};
        _hcp.widget_id = {0}
        _hcp.xid   = '{1}'; 
        HC.widget("Stream", _hcp);
    </script>`;

export class HyperCommentsParams extends BaseControlParams {
    @r standardCssClass?: string = "hyper-comments";

    @rw widgetId?: number;       
}

export interface HyperCommentsState extends BaseControlParams, BaseControlImplState {
}


export class HyperComments extends BaseControl<HyperCommentsParams, HyperCommentsState> {
    protected createParams() {
        return new HyperCommentsParams();
    }

    protected createImpl() {
        return new ControlImpl(this.props, this.state, this.renderControl.bind(this));
    }

    attachRootNode = (elem: HTMLElement) => {
        if (elem) {
            let script = window["HC_LOAD_INIT"]
                ? formatString(workScriptTemplate, this.props.widgetId, this.layout.cardInfo.id)
                : formatString(initializeScriptTemplate, this.props.widgetId, this.layout.cardInfo.id);

            $(elem).append(script);
        }
    }

    renderControl() {
        return (<div className={this.props.standardCssClass} id={this.props.name} ref={this.attachRootNode} />);
    }
}

