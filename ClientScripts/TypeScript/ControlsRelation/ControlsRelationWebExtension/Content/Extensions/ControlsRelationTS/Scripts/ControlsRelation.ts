function showRelatedControl(sender: WebClient.CheckBox) {
    let layout = sender.layout;
    let label = layout.controls.get<WebClient.Label>("label1");

    label.params.visibility = sender.params.value;
}