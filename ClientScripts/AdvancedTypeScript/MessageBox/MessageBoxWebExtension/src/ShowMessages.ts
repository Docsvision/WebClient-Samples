import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";

export async function showMessages() {
    await MessageBox.ShowInfo("Это информационное сообщение");
    await MessageBox.ShowWarning("Это предупреждающее сообщение");
    await MessageBox.ShowError("Это сообщение об ошибке");
    try{
        await MessageBox.ShowConfirmation("Выберите кнопку");
        alert("Нажата кнопка 'Ок'");
    }
    catch{
        alert("Нажата кнопка 'Отмена'");
    }
}