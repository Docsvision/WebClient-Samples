import React from "react";
import { BaseControlParams, BaseControlState, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { ControlImpl } from "@docsvision/webclient/System/ControlImpl";

export class SampleLinkParams extends BaseControlParams {
    @r standardCssClass?: string = "sample-link";

    // Параметр url обязателен для контрола, поэтому без знака "?"
    @rw urlAddress: string;
    @rw tabStop?: boolean;
    @rw text?: string;
}

export interface SampleLinkState extends SampleLinkParams, BaseControlState {
}

export class SampleLink extends BaseControl<SampleLinkParams, SampleLinkState> {
    protected createParams() {
        return new SampleLinkParams();
    }

    // Пример, как создать контрол без impl-класса. Просто возвращаем экземпляр ControlImpl, передавая ему функцию отрисовки.
    // Данный способ можно применять в случае если контрол достаточно простой
    protected createImpl() {
        return new ControlImpl(this.props, this.state, this.renderControl.bind(this));
    }

    protected getText() {
        return this.state.text ? this.state.text : this.state.urlAddress;
    }

    renderControl() {
        return (
            <div>
                <a href={this.state.urlAddress} tabIndex={this.controlImpl.getTabIndex()} target="_blank">
                    { this.getText() }
                </a>
            </div>
        );
    }
}


