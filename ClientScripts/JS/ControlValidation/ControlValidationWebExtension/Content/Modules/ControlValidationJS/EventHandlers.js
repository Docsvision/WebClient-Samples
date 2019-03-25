// Используем синтаксис модулей CommonJS 

// Импортируем из модуля ControlValidation.js все экспортированные символы
var ControlValidation = require("./ControlValidation");


// Публикуем обработчик в глобальной области видимости (объект window)
function validateTextBoxControl(sender, args) {
    let layout = sender.layout;
    let textBox = layout.controls.textBox1;
    if (!ControlValidation.validate(textBox)) {
        args.cancel();
    }
}

// Экспортируем validateTextBoxControl, чтобы использовать в других модулях
exports.validateTextBoxControl = validateTextBoxControl;