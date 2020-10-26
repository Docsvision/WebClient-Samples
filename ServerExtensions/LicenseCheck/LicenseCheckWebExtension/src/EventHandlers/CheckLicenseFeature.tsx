import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { $LicenseCheckController } from "../Services/LicenseCheckController";

export async function checkLicenseFeature(sender: CustomButton) {
    let service = sender.layout.getService($LicenseCheckController);
    const data = await service.checkLicenseFeature();
    
    if (data) {
        alert('Характеристика существует в лицензии');
    } else {
        alert('Характеристика не существует в лицензии');
    }
}