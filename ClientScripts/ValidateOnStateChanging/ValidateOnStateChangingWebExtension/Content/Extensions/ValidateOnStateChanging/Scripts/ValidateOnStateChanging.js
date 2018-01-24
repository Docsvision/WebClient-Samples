
function validateOnStateChanging(sender, args) {
	var layout = sender.layout;
	var controlText = layout.controls.textBox1.params.value;
    if (!controlText || controlText.length === 0) {
        alert('Текст контрола пуст');
        args.cancel();
    }
    else if (controlText.length > 100) {
        alert('Текст контрола длиннее 100 символов');
        args.cancel();
    }
}