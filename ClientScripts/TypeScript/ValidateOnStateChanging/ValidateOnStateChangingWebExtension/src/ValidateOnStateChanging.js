define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function validateOnStateChanging(sender, args) {
        var textBox1 = sender.controls.get("textBox1");
        var controlText = textBox1.params.value;
        if (!controlText || controlText.length === 0) {
            alert('Текст контрола пуст');
            args.cancel();
        }
        else if (controlText.length > 100) {
            alert('Текст контрола длиннее 100 символов');
            args.cancel();
        }
    }
    exports.validateOnStateChanging = validateOnStateChanging;
});
