// Используем синтаксис модулей CommonJS 

// Импортируем объект extensionManager из Web-клиента
// Путь, откуда следует импортировать можно найти в документации https://docsvision.github.io/WebClient-JsDocApi/
var extensionManager = require("@docsvision/webclient/System/ExtensionManager").extensionManager;

function copyValueToControl(sender) {
    let layout = sender.layout;
    let textBox1 = layout.controls.textBox1;
    let textBox2 = layout.controls.textBox2;

    textBox2.params.value = textBox1.params.value;
}

// Регистрируем расширение и все его обработчики
extensionManager.registerExtension({
    name: "CopyValueToControlJS",
    version: "5.5.16",
    globalEventHandlers: [{ copyValueToControl: copyValueToControl }]
});