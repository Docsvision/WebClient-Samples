
import { $LayoutBusinessProcessController } from "../../Services/LayoutBusinessProcessController";
import { AcquaintancePanelState, AcquaintancePanelImpl } from "./AcquaintancePanelImpl";
import { PanelParams, Panel } from "@docsvision/webclient/Platform/Panel";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { r } from "@docsvision/webclient/System/Readonly";
import { apiEvent } from "@docsvision/webclient/System/Event";
import { CancelableApiEvent, BasicApiEvent } from "@docsvision/webclient/System/ApiEvent";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { $EditOperationStore } from "@docsvision/webclient/System/LayoutServices";
import { handler } from "@docsvision/webclient/System/Handler";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { $Layout } from "@docsvision/webclient/System/$Layout";
import { editOperationAvailable } from "@docsvision/webclient/System/OperationUtils";

export class AcquaintancePanelParams extends PanelParams {
    @rw sendButtonText: string;
    @r standardCssClass?: string = "acquaintance-panel";
    @r canSend?: boolean;

    @apiEvent opening?: CancelableApiEvent<IEventArgs>;
    @apiEvent opened: BasicApiEvent<IEventArgs>;
    @apiEvent closing: CancelableApiEvent<IEventArgs>;
    @apiEvent closed: BasicApiEvent<IEventArgs>;

    @rw services?: $EditOperationStore & $LayoutBusinessProcessController & $Layout;
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
