// Используем синтаксис модулей CommonJS

// Импортируем объект extensionManager из Web-клиента
// Путь, откуда следует импортировать можно найти в документации https://docsvision.github.io/WebClient-JsDocApi/
var extensionManager = require("@docsvision/webclient/System/ExtensionManager").extensionManager;

function showRelatedControl(sender) {
    let layout = sender.layout;
    let label = layout.controls.label1;

    label.params.visibility = sender.params.value;
}

// Регистрируем расширение и все его обработчики
extensionManager.registerExtension({
    name: "ControlsRelationJS",
    version: "5.5.17",
    globalEventHandlers: [{ showRelatedControl: showRelatedControl }]
});