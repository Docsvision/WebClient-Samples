function validateOnStateChanging(sender: WebClient.Layout, args: WebClient.CancelableEventArgs<any>) {
    let textBox1 = sender.controls.get<WebClient.TextBox>("textBox1");

    const controlText = textBox1.params.value;
    if (!controlText || controlText.length === 0) {
        alert('Текст контрола пуст');
        args.cancel();
    } else if (controlText.length > 100) {
        alert('Текст контрола длиннее 100 символов');
        args.cancel();
    }
}