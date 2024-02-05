﻿import * as ControlsRelation from "./ControlsRelation";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем расширение и все его обработчики
extensionManager.registerExtension({
    name: "ControlsRelation",
    version: "6.1",
    globalEventHandlers: [ControlsRelation]
});