import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";;
import { $CardId } from "@docsvision/webclient/System/LayoutServices";
import { $Feature1 } from "./$Feature1";

// Все функции, классы и переменные используемые за пределами модуля (т.е. файла)
// должны экспортироваться (содержать ключевое слово export в объявлении).
export async function feature1_action1(sender: LayoutControl, e: IEventArgs) {
    let cardId = sender.layout.getService($CardId);
    let feature1 = sender.layout.getService($Feature1);
    await feature1.action1({
        documentId: cardId
    });
}