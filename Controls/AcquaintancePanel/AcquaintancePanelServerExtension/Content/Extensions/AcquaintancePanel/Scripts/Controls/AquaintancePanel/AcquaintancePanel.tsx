namespace WebClient {
    export class AcquaintancePanelParams extends PanelParams {
        @rw sendButtonText: string;
        @r standardCssClass?: string = "acquaintance-panel";
        @r canSend?: boolean;

        @apiEvent opening?: CancelableApiEvent<IEventArgs>;
        @apiEvent opened: BasicApiEvent<IEventArgs>;
        @apiEvent closing: CancelableApiEvent<IEventArgs>;
        @apiEvent closed: BasicApiEvent<IEventArgs>;
    }

    export interface AcquaintancePanelState extends AcquaintancePanelParams, PanelState {

        children: ILayoutModel[];
        lastLoading: JQueryDeferred<ILayoutModel[]>;
        isOpened: boolean;
        receivers: MultipleEmployees;
        considerationDate: DateTimePicker;
    }

    export class AcquaintancePanel extends Panel<AcquaintancePanelParams, AcquaintancePanelState> {
        protected createParams() {
            return new AcquaintancePanelParams();
        }

        @handler("binding")
        set Binding(binding: IBindingResult<boolean>) {
            this.state.canSend = !binding || this.layout.editOperations.available(binding.editOperation);
        }

        render() {
            return <AcquaintancePanelImpl {...this.state} ref={this.attachControl} />;
        }
    }

    controlFactory.register("AcquaintancePanel", () => AcquaintancePanel);
}