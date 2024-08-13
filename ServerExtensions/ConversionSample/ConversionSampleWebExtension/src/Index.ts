import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/web/core/services";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import * as AttachPdfa from "./EventHandlers/AttachPdfa";
import { $ConversionFileController, ConversionFileController } from "./Services/ConversionSample";

extensionManager.registerExtension({
    name: "Conversion sample web extension",
    version: "6.1",
    globalEventHandlers: [ AttachPdfa ],
    layoutServices: [ 
        Service.fromFactory($ConversionFileController, (services: $RequestManager) => new ConversionFileController(services))
    ]
})