import { Block } from "@docsvision/webclient/Platform/Block";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";


export async function changeStateByScript(sender: Block) {
    let layout = sender.layout;

    if (layout.editOperations.available('b8a6119c-4d06-4401-b1af-0310615c72f6')) {  // Operation Start approving for Документ УД\Исходящий
        await layout.changeState('b8a6119c-4d06-4401-b1af-0310615c72f6');
        MessageBox.ShowInfo('Состояние изменилось');
    } else {
        MessageBox.ShowError('Операция недоступна');
    }
}