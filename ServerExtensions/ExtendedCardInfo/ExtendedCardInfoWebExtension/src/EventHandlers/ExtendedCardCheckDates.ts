
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { $ExtendedCardController } from "../Services/ExtendedCardController";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { $CardId, $ControlStore } from "@docsvision/webclient/System/LayoutServices";

export async function extendedCardCheckDates(sender: DateTimePicker) {
    let cardId = sender.getService($CardId);
    const controls = sender.getService($ControlStore);
    let extendedCardController = sender.getService($ExtendedCardController);
    let messageBox = sender.getService($MessageBox);
    const response = await extendedCardController.getExtendedCardModel(cardId);

    let createDate = new Date(response.createDate);
    let regDateControl = controls.regDate as DateTimePicker;
    if (regDateControl.params.value > createDate) {
        messageBox.showInfo('Дата регистрации документа больше даты создания документа');
    } else if (regDateControl.params.value < createDate) {
        messageBox.showInfo('Дата создания документа больше даты регистрации документа');
    } else {
        messageBox.showInfo('Дата регистрации документа равна дате создания документа');
    } 
}

