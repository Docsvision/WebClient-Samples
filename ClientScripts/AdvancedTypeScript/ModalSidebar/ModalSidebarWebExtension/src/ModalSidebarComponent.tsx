import { BaseControlParams, BaseControlState } from "@docsvision/webclient/System/BaseControl";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import React from "react";
import { ModalSidebar } from "@docsvision/webclient/Helpers/ModalSidebar/ModalSidebar";
import { ModalSidebarHeader } from "@docsvision/webclient/Helpers/ModalSidebar/ModalSidebarHeader";
import { ModalSidebarCloseButton } from "@docsvision/webclient/Helpers/ModalSidebar/ModalSidebarCloseButton";
import { Button } from "@docsvision/webclient/Helpers/Button";
import { resources } from "@docsvision/webclient/System/Resources";

export class ModalSidebarComponentParams extends BaseControlParams {
    onSave?: (text: string) => void;
    onCancel? : () => void;
}

export interface IModalSidebarComponentState extends ModalSidebarComponentParams, BaseControlState {
}

export class ModalSidebarComponent extends React.Component<ModalSidebarComponentParams, IModalSidebarComponentState> {
    textBox: TextBox;

    constructor(params: ModalSidebarComponentParams, state: IModalSidebarComponentState) {
        super(params, state);
    }

    protected onSave = () => {
        this.props.onSave(this.textBox.value);
        this.props.onCancel();
    };

    render() { 
        return(
            <ModalSidebar isOpen={true} >
                    <ModalSidebarHeader>Sidebar</ModalSidebarHeader>
                    <ModalSidebarCloseButton onClick={() => this.props.onCancel()} />
                    <TextBox parent={null} ref={(el) => this.textBox = el}></TextBox>
                    <Button onClick={() => this.onSave()}>{resources.Dialog_Ok}</Button>
            </ModalSidebar>
        );
    }
};