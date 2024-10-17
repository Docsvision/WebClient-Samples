﻿import { Service } from "@docsvision/web/core/services";
import * as EventHandlers from "./EventHandlers";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { $SampleWorkerController, SampleWorkerController } from "./$SampleWorkerController";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";

// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "Sample worker web extension",
    version: "1.0",
    globalEventHandlers: [ EventHandlers ],
    layoutServices: [ 
        Service.fromFactory($SampleWorkerController,  (services: $RequestManager) => new SampleWorkerController(services))
    ]
})