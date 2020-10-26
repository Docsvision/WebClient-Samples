import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";;
import { $CardId } from "@docsvision/webclient/System/LayoutServices";

// Все функции, классы и переменные используемые за пределами модуля (т.е. файла)
// должны экспортироваться (содержать ключевое слово export в объявлении).
export function someHandler(sender: LayoutControl, e: IEventArgs) {
    let cardId = sender.layout.getService($CardId);
    let requestManager = sender.layout.getService($RequestManager);
}