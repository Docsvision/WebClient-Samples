function copyValueToControl(sender) {
    let layout = sender.layout;
    let textBox1 = layout.controls.textBox1;
    let textBox2 = layout.controls.textBox2;

    textBox2.params.value = textBox1.params.value;
}