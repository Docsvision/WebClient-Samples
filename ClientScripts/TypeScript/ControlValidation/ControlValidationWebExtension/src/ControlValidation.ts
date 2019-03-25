import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";


export function validateTextBoxControl(sender: Layout, args: CancelableEventArgs<any>) {
    let textBox: TextBox = sender.controls.textBox1;

    let controlText = textBox.params.value;
    if (!controlText || controlText.length === 0) {
        MessageBox.ShowWarning('Текст контрола пуст');
        args.cancel();
    } else if(controlText.length > 100) {
        MessageBox.ShowWarning('Текст контрола длиннее 100 символов');
        args.cancel();
    }
}