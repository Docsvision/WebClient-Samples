function copyValueToControl(sender: WebClient.TextBox) {
    let layout = sender.layout;
    let textBox1 = layout.controls.get<WebClient.TextBox>("textBox1");
    let textBox2 = layout.controls.get<WebClient.TextBox>("textBox2");

    textBox2.params.value = textBox1.params.value;
}