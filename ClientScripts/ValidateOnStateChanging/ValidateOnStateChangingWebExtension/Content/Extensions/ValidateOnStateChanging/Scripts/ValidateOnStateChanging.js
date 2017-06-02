
function validateOnStateChanging(sender, args) {
	var layout = sender.layout;
	var controlText = layout.controls.textBox1.params.value;
    if (!controlText || controlText.length === 0) {
        alert('Control text is empty');
        args.cancel();
    }
    else if (controlText.length > 100) {
        alert('Control text is longer than 100');
        args.cancel();
    }
}