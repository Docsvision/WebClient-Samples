function copyValueToControl(sender) {
	var controls = sender.layout.controls;
	controls.textBox2.params.value = controls.textBox1.params.value;
}
