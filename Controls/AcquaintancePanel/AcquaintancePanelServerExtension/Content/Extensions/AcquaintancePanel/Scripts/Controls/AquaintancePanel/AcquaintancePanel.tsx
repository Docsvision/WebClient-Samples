namespace WebClient {
    export class AcquaintancePanelParams extends PanelParams {
        @rw sendButtonText: string;
        @r standardCssClass?: string = "acquaintance-panel";
        @r canSend?: boolean;

        @apiEvent opening?: CancelableApiEvent<IEventArgs>;
        @apiEvent opened: BasicApiEvent<IEventArgs>;
        @apiEvent closing: CancelableApiEvent<IEventArgs>;
        @apiEvent closed: BasicApiEvent<IEventArgs>;

        @rw services?: $EditOperationStore & $LayoutBusinessProcessController;
    }

    export class AcquaintancePanel extends Panel<AcquaintancePanelParams, AcquaintancePanelState> {
        protected createParams() {
            return new AcquaintancePanelParams();
        }

        @handler("binding")
        set Binding(binding: IBindingResult<boolean>) {
            this.state.canSend = editOperationAvailable(this.state.services, binding);
        }

        protected createImpl() {
            return new AcquaintancePanelImpl(this.props, this.state);
        }
    }

    controlFactory.register("AcquaintancePanel", () => AcquaintancePanel);
}