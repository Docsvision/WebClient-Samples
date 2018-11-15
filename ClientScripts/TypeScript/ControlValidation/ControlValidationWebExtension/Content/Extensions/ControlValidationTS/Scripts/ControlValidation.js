function validateTextBoxControl(sender, args) {
    var textBox = sender.controls.textBox1;
    var controlText = textBox.params.value;
    if (!controlText || controlText.length === 0) {
        alert('Текст контрола пуст');
        args.cancel();
    }
    else if (controlText.length > 100) {
        alert('Текст контрола длиннее 100 символов');
        args.cancel();
    }
}
