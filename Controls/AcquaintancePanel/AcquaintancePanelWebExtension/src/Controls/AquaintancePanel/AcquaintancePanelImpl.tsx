import { AcquaintancePanelParams } from "./AcquaintancePanel";
import { PanelState, PanelImpl } from "@docsvision/webclient/Platform/PanelImpl";
import { MultipleEmployees } from "@docsvision/webclient/BackOffice/MultipleEmployees";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { CancelableEvent } from "@docsvision/webclient/System/CancelableEvent";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { SimpleEvent } from "@docsvision/webclient/System/SimpleEvent";
import { IStartBPResultModel } from "./Models/IStartBPResultModel";
import React from "react";
import { resources } from "@docsvision/webclient/System/Resources";
import { EditMode } from "@docsvision/webclient/System/EditMode";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { classIf } from "@docsvision/webclient/System/CssUtils";


    export interface AcquaintancePanelState extends AcquaintancePanelParams, PanelState {
        children: GenModels.LayoutModel[];
        isOpened: boolean;
        receivers: MultipleEmployees;
        considerationDate: DateTimePicker;
        loading: boolean;
    }

    export class AcquaintancePanelImpl extends PanelImpl<AcquaintancePanelParams, AcquaintancePanelState > {
        constructor(props: AcquaintancePanelParams, state: AcquaintancePanelState) {
            super(props, state);
            this.state.visibility = true;

            // События API
            this.state.opening = CancelableEvent.Create<IEventArgs>(this.state.wrapper);
            this.state.closing = CancelableEvent.Create<IEventArgs>(this.state.wrapper);
            this.state.opened = SimpleEvent.Create<IEventArgs>(this.state.wrapper);
            this.state.closed = SimpleEvent.Create<IEventArgs>(this.state.wrapper);

            this.attachReceivers = this.attachReceivers.bind(this);
            this.attachConsiderationDate = this.attachConsiderationDate.bind(this);
            this.onSendClick = this.onSendClick.bind(this);
            this.onMainButtonClick = this.onMainButtonClick.bind(this);
            this.onCancelClick = this.onCancelClick.bind(this);
        }        

        open() {
            if (!this.isOpened) {
                CancelableEvent.cast(this.state.opening).trigger().accepted(() => {
                    this.setState({ isOpened: true }, () => {
                        SimpleEvent.cast(this.state.opened).trigger();
                    });
                });
            }
        }

        close() {
            if (this.isOpened) {
                CancelableEvent.cast(this.state.closing).trigger().accepted(() => {
                    this.setState({ isOpened: false }, () => {
                        SimpleEvent.cast(this.state.closed).trigger();
                    });
                });
            }
        }

        get isOpened() {
            return this.state.isOpened;
        }

        attachReceivers(control) {
            this.state.receivers = control;
        }

        attachConsiderationDate(control) {
            this.state.considerationDate = control;
        }

        onMainButtonClick() {
            this.open();
        }

        onSendClick() {
            // Мы задали для контролов required: true, поэтому метод validate вернет fales и отобразит сообщение, если значение не введено
            let validationParams = { ShowErrorMessage: true };
            if (this.state.receivers.validate(validationParams).every(valResult => valResult.Passed) && this.state.considerationDate.validate(validationParams).every(valResult => valResult.Passed)) {
                let receiversIds = this.state.receivers.params.value.map(employeeInfo => employeeInfo.id);
                let date = this.state.considerationDate.params.value;

                console.info("Starting with employee id = " + receiversIds + ", date = " + date);
                this.sendToAcquaintance(this.state.services.layout.cardInfo.id, receiversIds, date);
                this.close();
            }
        }

        sendToAcquaintance(cardId?: string, employeeIds?: string[], endDate?: Date): Promise<IStartBPResultModel> {
            return this.state.services.layoutBusinessProcessController.sendToAcquaintance(cardId, employeeIds, endDate);  
        }

        onCancelClick() {
            this.close();
        }

        renderControl() {
            if (!this.state.canSend)
                return;
            return (
                <div className={this.getCssClass()} style={this.getCssStyle()} >
                    <button className="main-panel-button panel-button" onClick={this.onMainButtonClick}>
                        {this.state.sendButtonText || resources.AcquaintancePanel_SendButton}
                    </button>

                    <div className={"side-panel-root" + classIf(this.state.isOpened, "opened")}>
                        <div className="backdrop" onClick={this.onCancelClick} ></div>
                        <div className="side-panel">
                            {this.state.isOpened &&
                                <div className="side-panel-content">
                                    <div className="header">{resources.AcquaintancePanel_Header}</div>
                                    <MultipleEmployees name="sidePanelReceivers" editMode={EditMode.Edit}
                                        required={true} placeHolder={resources.AcquaintancePanel_ReceiversPlaceholder}
                                        ref={this.attachReceivers} />
                                    <DateTimePicker name="sidePanelConsiderationDate" editMode={EditMode.Edit}
                                        required={true} placeHolder={resources.AcquaintancePanel_ConsiderationDatePlaceholder}
                                        ref={this.attachConsiderationDate} />
                                    <div className="panel-buttons">
                                        <button className="panel-button send" onClick={this.onSendClick}>
                                            {resources.AcquaintancePanel_SendButton}
                                        </button>
                                        <button className="panel-button cancel" onClick={this.onCancelClick}>
                                            {resources.AcquaintancePanel_CancelButton}
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }    
