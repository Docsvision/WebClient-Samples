function validateTextBoxControl(sender: WebClient.Layout, args: WebClient.CancelableEventArgs<any>) {
    let textBox: WebClient.TextBox = sender.controls.textBox1;

    let controlText = textBox.params.value;
    if (!controlText || controlText.length === 0) {
        alert('Текст контрола пуст');
        args.cancel();
    } else if(controlText.length > 100) {
        alert('Текст контрола длиннее 100 символов');
        args.cancel();
    }
}