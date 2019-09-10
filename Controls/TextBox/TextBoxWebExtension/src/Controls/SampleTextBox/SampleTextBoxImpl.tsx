import { SampleTextBoxParams } from "./SampleTextBox";
import React from "react";
import { BaseControlState } from "@docsvision/webclient/System/BaseControl";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { BaseControlImpl } from "@docsvision/webclient/System/BaseControlImpl";
import { SimpleEvent } from "@docsvision/webclient/System/SimpleEvent";
import { ISampleDataChangedEventArgs } from "./Data/ISampleDataChangedEventArgs";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";

export interface SampleTextBoxState extends SampleTextBoxParams, BaseControlState {
    // Сохраненное значение binding, используется в getBindings
    binding: IBindingResult<string>;
}

export class SampleTextBoxImpl extends BaseControlImpl<SampleTextBoxParams, SampleTextBoxState> {
    constructor(props: SampleTextBoxParams, state: SampleTextBoxState) {
        super(props, state);

        this.state.dataChanged = SimpleEvent.Create<ISampleDataChangedEventArgs>(this.state.wrapper);
        this.state.imageClick = SimpleEvent.Create<IEventArgs>(this.state.wrapper);

        this.handleDataChanged = this.handleDataChanged.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
    }

    protected handleImageClick(event: React.MouseEvent<any>) {
        SimpleEvent.cast(this.state.imageClick).trigger();
    }

    protected handleDataChanged(event) {
        this.setValue(event.target.value);
    }
    
    public setValue(value: string) {
        if (this.state.value != value) {
            var eventArgs: IDataChangedEventArgs = {
                oldValue: this.state.value,
                newValue: value
            };
            this.state.value = value;
            this.forceUpdate();
            SimpleEvent.cast(this.state.dataChanged).trigger(eventArgs);
        }
    }

    public getValue() {
        return this.state.value;
    }

    protected getImageStyle() {
        return {
            height: this.state.imageHeight,
            width: this.state.imageWidth,
            background: 'url("' + this.state.urlAddress + '") 0 0 / cover no-repeat'
        };
    }

    protected getInputStyle() {
        return {
            width: 'calc(100% - '  + this.state.imageWidth + ')'
        };
    }

    renderControl() {
        return (
            <div>
                <label>{this.state.labelText}</label>
                <div className="image" style={this.getImageStyle() } onClick={this.handleImageClick}></div>
                <input className="input" style={this.getInputStyle()} value={this.state.value}
                    readOnly={!this.state.canEdit} onFocus={this.handleFocus} onBlur={this.handleBlur}
                    onChange={this.handleDataChanged} tabIndex={this.getTabIndex()} title={this.state.tip} />
            </div>
        );
    }
}
