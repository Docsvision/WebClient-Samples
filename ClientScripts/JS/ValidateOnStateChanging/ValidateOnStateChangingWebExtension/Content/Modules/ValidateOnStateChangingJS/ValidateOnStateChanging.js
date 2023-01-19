// Используем синтаксис модулей CommonJS

// Импортируем класс MessageBox и объект extensionManager из Web-клиента
// Путь, откуда следует импортировать можно найти в документации https://docsvision.github.io/WebClient-JsDocApi/
var MessageBox = require("@docsvision/webclient/Helpers/MessageBox/MessageBox").MessageBox;
var extensionManager = require("@docsvision/webclient/System/ExtensionManager").extensionManager;

function validateOnStateChanging(sender, args) {
    let layout = sender.layout;
    let textBox1 = layout.controls.textBox1;

    const controlText = textBox1.params.value;
    if (!controlText || controlText.length === 0) {
        MessageBox.ShowWarning('Текст контрола пуст');
        args.cancel();
    } else if (controlText.length > 100) {
        MessageBox.ShowWarning('Текст контрола длиннее 100 символов');
        args.cancel();
    }
}

// Регистрируем расширение и все его обработчики
extensionManager.registerExtension({
    name: "ValidateOnStateChangingJS",
    version: "5.5.17",
    globalEventHandlers: [{ validateOnStateChanging: validateOnStateChanging }]
});