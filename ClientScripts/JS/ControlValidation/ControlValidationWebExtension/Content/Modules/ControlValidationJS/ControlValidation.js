// Используем синтаксис модулей CommonJS 

// Импортируем класс MessageBox из Web-клиента
// Путь, откуда следует импортировать можно найти в документации https://docsvision.github.io/WebClient-JsDocApi/
var MessageBox = require("@docsvision/webclient/Helpers/MessageBox/MessageBox").MessageBox;

function validate(textBox) {
    let controlText = textBox.params.value;
    if (!controlText || controlText.length === 0) {
        MessageBox.ShowWarning('Текст контрола пуст');
        return false;
    } else if (controlText.length > 100) {
        MessageBox.ShowWarning('Текст контрола длиннее 100 символов');
        return false;
    } else {
        return true;
    }
}

// Экспортируем, чтобы использовать в другом модуле
exports.validate = validate;