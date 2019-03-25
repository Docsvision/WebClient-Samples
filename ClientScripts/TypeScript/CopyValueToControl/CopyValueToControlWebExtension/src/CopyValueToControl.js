define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function copyValueToControl(sender) {
        var layout = sender.layout;
        var textBox1 = layout.controls.get("textBox1");
        var textBox2 = layout.controls.get("textBox2");
        textBox2.params.value = textBox1.params.value;
    }
    exports.copyValueToControl = copyValueToControl;
});
