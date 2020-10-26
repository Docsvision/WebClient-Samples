
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { $ExtendedCardController } from "../Services/ExtendedCardController";

export async function extendedCardCheckDates(sender: DateTimePicker) {
    let layout = sender.layout;
    let service = sender.layout.getService($ExtendedCardController);
    const response = await service.getExtendedCardModel(layout.cardInfo.id);

    let createDate = new Date(response.createDate);
    let regDateControl = layout.controls.regDate as DateTimePicker;
    if (regDateControl.params.value > createDate) {
        alert('Дата регистрации документа больше даты создания документа');
    } else if (regDateControl.params.value < createDate) {
        alert('Дата создания документа больше даты регистрации документа');
    } else {
        alert('Дата регистрации документа равна дате создания документа');
    } 
}

