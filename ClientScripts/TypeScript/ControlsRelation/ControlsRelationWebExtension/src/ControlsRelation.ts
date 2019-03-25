import { CheckBox } from "@docsvision/webclient/Platform/CheckBox";
import { Label } from "@docsvision/webclient/Platform/Label";

export function showRelatedControl(sender: CheckBox) {
    let layout = sender.layout;
    let label = layout.controls.get<Label>("label1");

    label.params.visibility = sender.params.value;
}