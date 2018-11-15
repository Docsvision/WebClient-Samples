function showRelatedControl(sender) {
    var layout = sender.layout;
    var label = layout.controls.get("label1");
    label.params.visibility = sender.params.value;
}
