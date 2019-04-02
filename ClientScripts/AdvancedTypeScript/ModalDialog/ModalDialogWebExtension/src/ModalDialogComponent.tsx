import { StackingModal } from "@docsvision/webclient/Helpers/StackingModal";
import React from "react";
import { ModalBackdrop } from "@docsvision/webclient/Helpers/ModalBackdrop";
import { ModalDialog, IModalDialogProps } from "@docsvision/webclient/Helpers/ModalDialog/ModalDialog";
import { ModalDialogBox } from "@docsvision/webclient/Helpers/ModalDialog/ModalDialogBox";
import { ModalDialogCloseButton } from "@docsvision/webclient/Helpers/ModalDialog/ModalDialogCloseButton";
import { ModalDialogHeader } from "@docsvision/webclient/Helpers/ModalDialog/ModalDialogHeader";
import { ModalDialogContent } from "@docsvision/webclient/Helpers/ModalDialog/ModalDialogContent";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { ModalDialogButtonPanel } from "@docsvision/webclient/Helpers/ModalDialog/ModalDialogButtonPanel";
import { Button } from "@docsvision/webclient/Helpers/Button";
import { resources } from "@docsvision/webclient/System/Resources";
import { BaseControlParams, BaseControlState } from "@docsvision/webclient/System/BaseControl";

export class ModalDialogComponentParams extends BaseControlParams {
    onSave?: (text: string) => void;
    onCancel? : () => void;
}

export interface ModalDialogComponentState extends ModalDialogComponentParams, BaseControlState {
}

export class ModalDialogComponent extends React.Component<ModalDialogComponentParams, ModalDialogComponentState> {
    textBox: TextBox;

    constructor(params: ModalDialogComponentParams, state: ModalDialogComponentState) {
        super(params, state);
    }

    protected onSave = () => {
        this.props.onSave(this.textBox.value);
        this.props.onCancel();
    };

    render() { 
        return(
        <StackingModal visible={true} focusTrap={true}>
                <ModalBackdrop visible={true}>
                    <ModalDialog isOpen={true}>
                        <ModalDialogBox>
                            <div className={"message-box-modal-box-helper"}>
                                <ModalDialogCloseButton onClick={this.props.onCancel} />
                                <ModalDialogHeader className="padding-right-40">
                                        Modal Dialog
                                </ModalDialogHeader>
                                <ModalDialogContent>
                                    <TextBox parent={null} modalMode={true} ref={(el) => this.textBox = el}>
                                    </TextBox>
                                </ModalDialogContent>
                                <ModalDialogButtonPanel>
                                    <Button onClick={this.onSave}>
                                        {resources.Dialog_Ok}
                                    </Button>
                                </ModalDialogButtonPanel>
                            </div>
                        </ModalDialogBox>
                    </ModalDialog>
                </ModalBackdrop>
            </StackingModal>
        );
    }
};