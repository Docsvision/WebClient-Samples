function validateOnStateChanging(sender, args) {
    let layout = sender.layout;
    let textBox1 = layout.controls.textBox1;

    const controlText = textBox1.params.value;
    if (!controlText || controlText.length === 0) {
        alert('Текст контрола пуст');
        args.cancel();
    } else if (controlText.length > 100) {
        alert('Текст контрола длиннее 100 символов');
        args.cancel();
    }
}