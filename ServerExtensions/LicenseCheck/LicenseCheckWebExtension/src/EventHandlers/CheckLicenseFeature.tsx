import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { $LicenseCheckController } from "../Services/LicenseCheckController";

export async function checkLicenseFeature(sender: CustomButton) {
    const data = await sender.layout.getService($LicenseCheckController).checkLicenseFeature();
    
    if (data) {
        alert('Характеристика существует в лицензии');
    } else {
        alert('Характеристика не существует в лицензии');
    }
}