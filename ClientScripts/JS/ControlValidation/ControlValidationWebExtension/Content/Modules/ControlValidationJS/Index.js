

// Импортируем объект extensionManager из Web-клиента
// Путь, откуда следует импортировать можно найти в документации https://docsvision.github.io/WebClient-JsDocApi/
var extensionManager = require("@docsvision/webclient/System/ExtensionManager").extensionManager;
// Импортируем из модуля ControlValidation.js все экспортированные символы
var EventHandlers = require("./EventHandlers");


// Регистрируем расширение и все его обработчики
extensionManager.registerExtension({
    name: "ControlValidationJS",
    version: "5.5.16",
    globalEventHandlers: [EventHandlers]
});