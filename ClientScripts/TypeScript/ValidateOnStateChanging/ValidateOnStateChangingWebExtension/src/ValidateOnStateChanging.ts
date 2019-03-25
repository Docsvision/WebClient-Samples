import { Layout } from "@docsvision/webclient/System/Layout";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";


export function validateOnStateChanging(sender: Layout, args: CancelableEventArgs<any>) {
    let textBox1 = sender.controls.get<TextBox>("textBox1");

    const controlText = textBox1.params.value;
    if (!controlText || controlText.length === 0) {
        MessageBox.ShowWarning('Текст контрола пуст');
        args.cancel();
    } else if (controlText.length > 100) {
        MessageBox.ShowWarning('Текст контрола длиннее 100 символов');
        args.cancel();
    }
}