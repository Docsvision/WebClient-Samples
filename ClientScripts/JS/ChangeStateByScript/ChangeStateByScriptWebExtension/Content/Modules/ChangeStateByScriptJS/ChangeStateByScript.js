// Используем синтаксис модулей CommonJS 

// Импортируем класс MessageBox и объект extensionManager из Web-клиента
// Путь, откуда следует импортировать можно найти в документации https://docsvision.github.io/WebClient-JsDocApi/
var MessageBox = require("@docsvision/webclient/Helpers/MessageBox/MessageBox").MessageBox;
var extensionManager = require("@docsvision/webclient/System/ExtensionManager").extensionManager;

function changeStateByScript(sender, args) {
    var layout = sender.layout;

    if (layout.editOperations.available('b8a6119c-4d06-4401-b1af-0310615c72f6')) {  // Operation Start approving for Документ УД\Исходящий
        layout.changeState('b8a6119c-4d06-4401-b1af-0310615c72f6').then(function() {
            MessageBox.ShowInfo('Состояние изменилось');
        });
    } else {
        MessageBox.ShowError('Операция недоступна');
    }
}

// Регистрируем расширение и все его обработчики
extensionManager.registerExtension({
    name: "ChangeStateByScriptJS",
    version: "5.5.16",
    globalEventHandlers: [{ changeStateByScript: changeStateByScript }]
});