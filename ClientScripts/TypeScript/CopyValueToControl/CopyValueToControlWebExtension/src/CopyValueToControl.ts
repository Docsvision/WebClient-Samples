import { TextBox } from "@docsvision/webclient/Platform/TextBox";

export function copyValueToControl(sender: TextBox) {
    let layout = sender.layout;
    let textBox1 = layout.controls.get<TextBox>("textBox1");
    let textBox2 = layout.controls.get<TextBox>("textBox2");

    textBox2.params.value = textBox1.params.value;
}