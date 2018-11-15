function showRelatedControl(sender) {
    let layout = sender.layout;
    let label = layout.controls.label1;

    label.params.visibility = sender.params.value;
}