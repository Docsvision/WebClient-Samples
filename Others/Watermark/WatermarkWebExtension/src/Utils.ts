import { PopupNotification } from "@docsvision/webclient/System/PopupNotification";

export async function showError(message: string) {
    PopupNotification.create({
        text: message,
        timeout: 0,
        type: "error"
    }, true);
}

export async function showNotify(message: string) {
    PopupNotification.create({
        text: message,
        timeout: 0,
        type: "info"
    }, true);
}
