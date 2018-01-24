namespace WebClient {
    export interface AcquaintancePanelImplState extends PanelState, AcquaintancePanelState {
        loading: boolean;
    }

    export class AcquaintancePanelImpl extends PanelImpl<AcquaintancePanelParams, AcquaintancePanelImplState > {
        constructor(props: AcquaintancePanelParams) {
            super(props);
            this.state.visibility = true;

            // События API
            this.state.opening = CancelableEvent.Create<IEventArgs>(props.wrapper);
            this.state.closing = CancelableEvent.Create<IEventArgs>(props.wrapper);
            this.state.opened = SimpleEvent.Create<IEventArgs>(props.wrapper);
            this.state.closed = SimpleEvent.Create<IEventArgs>(props.wrapper);

            this.attachReceivers = this.attachReceivers.bind(this);
            this.attachConsiderationDate = this.attachConsiderationDate.bind(this);
            this.onSendClick = this.onSendClick.bind(this);
            this.onMainButtonClick = this.onMainButtonClick.bind(this);
            this.onCancelClick = this.onCancelClick.bind(this);
        }        

        @api open() {
        if (!this.isOpened) {
            CancelableEvent.cast(this.state.opening).trigger().accepted(() => {
                this.setState({ isOpened: true }, () => {
                    SimpleEvent.cast(this.state.opened).trigger();
                });
            });
        }
    }

    @api close() {
        if (this.isOpened) {
            CancelableEvent.cast(this.state.closing).trigger().accepted(() => {
                this.setState({ isOpened: false }, () => {
                    SimpleEvent.cast(this.state.closed).trigger();
                });
            });
        }
    }

    @api get isOpened() {
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
            layoutBusinessProcessController.SendToAcquaintance(this.state.layout.cardInfo.id, receiversIds, date);
            this.close();
        }
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
                    {this.props.sendButtonText || resources.AcquaintancePanel_SendButton}
                </button>

                <div className={"side-panel-root" + classIf(this.state.isOpened, "opened")}>
                    <div className="backdrop" onClick={this.onCancelClick} ></div>
                    <div className="side-panel">
                        {this.state.isOpened &&
                            <div className="side-panel-content">
                                <div className="header">{resources.AcquaintancePanel_Header}</div>
                                <MultipleEmployees name="sidePanelReceivers" editMode={EditMode.Edit}
                                required={true} parent={this.state.wrapper} placeHolder={resources.AcquaintancePanel_ReceiversPlaceholder}
                                    ref={this.attachReceivers} />
                                <DateTimePicker name="sidePanelConsiderationDate" editMode={EditMode.Edit}
                                parent={this.state.wrapper} required={true} placeHolder={resources.AcquaintancePanel_ConsiderationDatePlaceholder}
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
        )}
    }    
}