﻿import * as EventHandlers from "./EventHandlers";


import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $WatermarkService, WatermarkService} from "./WatermarkService";
import { $WebServices } from "@docsvision/webclient/System/IWebServicesService";
import { $ApplicationSettings, $CurrentEmployeeId, $SiteUrl, $StandardServices } from "@docsvision/webclient/StandardServices";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { $StandardControllers } from "@docsvision/webclient/Legacy/StandardControllers";


// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрируем обработчики из EventHandlers и сервис из CommunicationService
extensionManager.registerExtension({
    name: "Watermark to PDF",
    version: "6.1",
    globalEventHandlers: [ EventHandlers ],
    layoutServices: [ 
        Service.fromFactory($WatermarkService, (services: $StandardControllers & $StandardServices) => new
        WatermarkService(services))
    ]
})