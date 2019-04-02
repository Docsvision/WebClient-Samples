import { Layout } from "@docsvision/webclient/System/Layout";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";
import React from "react";
import { ModalSidebarComponent } from "./ModalSidebarComponent";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { ModalHost } from "@docsvision/webclient/Helpers/ModalHost";

export function showModalSidebar(sender: Layout, args: IDataChangedEventArgs){
    let textBox1 = sender.layout.controls.get<TextBox>("textBox1");

    let onSave = (text: string) => {
        textBox1.params.value = text;
        textBox1.save();
    };
    let modalHost = new ModalHost("modal-dialog", () => (
        <ModalSidebarComponent 
            onCancel={() => modalHost.unmount()} 
            onSave={(text: string) => onSave(text)} 
            parent={null}/>
    ));
    modalHost.mount(); 
}