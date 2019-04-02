define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function showRelatedControl(sender) {
        var layout = sender.layout;
        var label = layout.controls.get("label1");
        label.params.visibility = sender.params.value;
    }
    exports.showRelatedControl = showRelatedControl;
});
