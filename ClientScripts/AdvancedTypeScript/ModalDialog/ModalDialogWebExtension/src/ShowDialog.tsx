import React from "react";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { Layout } from "@docsvision/webclient/System/Layout";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";
import { ModalDialogComponent } from "./ModalDialogComponent";
import { ModalHost } from "@docsvision/webclient/Helpers/ModalHost";
import { CommonModalDialog } from "@docsvision/webclient/Helpers/ModalDialog/CommonModalDialog";
import { Button } from "@docsvision/webclient/Helpers/Button";

//компонент для отображения нестандартного модального окна с необычным внешним видом или поведением
//для реализации нестандартных решений рекомендуется использовать собственные компоненты
export function showModalDialog(sender: Layout, args: IDataChangedEventArgs){
    let textBox1 = sender.layout.controls.get<TextBox>("textBox1");

    let onSave = (text: string) => {
        textBox1.params.value = text;
        textBox1.save();
    };

    let modalHost = new ModalHost("modal-dialog", () => (
        <ModalDialogComponent parent={null} onCancel={() => modalHost.unmount()} onSave={(text: string) => onSave(text)}/>
    ));
    modalHost.mount();
}

//стандартный модальный диалог
export function showCommonDialog(sender: Layout, args: IDataChangedEventArgs){
    let textBox1 = sender.layout.controls.get<TextBox>("textBox1");
    let textBoxModal = null;

    let onSave = () => {
        textBox1.params.value = textBoxModal.params.value;
        textBox1.save();
        commonHost.unmount();
    };

    let commonHost = new ModalHost("common-dialog", () => (
        <CommonModalDialog  header={"header"} onClose={() => commonHost.unmount()} isOpen={true}>
            <TextBox parent={null} modalMode={true} ref={(el) => textBoxModal = el}/>
            <Button onClick={() => onSave()}>OK</Button>
        </CommonModalDialog>
    ));
    commonHost.mount();
}
