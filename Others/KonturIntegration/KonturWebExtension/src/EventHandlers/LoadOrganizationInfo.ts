import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { NewContractLayout } from "../NewContractLayout";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import * as KonturTypes from "../Utils/KonturTypes";
import { $KonturRequestController } from "../ServerRequests.ts/KonturRequestController";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";

// cspell:words Kontur

export async function loadOrganizationInfo(sender: LayoutControl) {
    let layout = new NewContractLayout(sender.layout);
    if (layout.INN.hasValue()) {
        let data: KonturTypes.OrganizationInfo[];
        data = await loadOrganizationData(sender, "req", `inn=${layout.INN.value}`);

        if (data) {
            let org = data[0].UL;
            if (org) {
                layout.name.value = org.legalName.short || org.legalName.full;
                layout.fullName.value = org.legalName.full;
                let addr = org.legalAddress.parsedAddressRF;
                try {
                    layout.address.value = {
                        addressType: GenModels.AddressTypeModeItems.LegalAddress,
                        zipCode: addr.zipCode,
                        country: '',
                        city: `${addr.regionName.topoValue} ${addr.regionName.topoFullName} ${addr.city.topoShortName}.${addr.city.topoValue}`,
                        address: `${addr.street.topoShortName}. ${addr.street.topoValue}, ${addr.house.topoShortName} ${addr.street.topoValue}`
                    }
                } catch (err) {
                    console.error(err);
                }

                layout.OKPO.value = org.okpo;
                if (layout.KPP)
                    layout.KPP.value = org.kpp;
                let contacts = await loadOrganizationData(sender, "contacts", `inn=${layout.INN.value}`) as KonturTypes.OrganizationContact[];
                if (contacts?.[0]?.contactPhones?.phones?.length > 0) {
                    layout.phone.value = contacts[0].contactPhones.phones[0];
                }
                let sites = await loadOrganizationData(sender, "sites", `inn=${layout.INN.value}`) as KonturTypes.OrganizationSite[];
                if (sites?.[0]?.sites?.length > 0) {
                    layout.webSite.value = sites?.[0]?.sites?.[0];
                }
            } else {
                console.error("Указан ИНН индивидуального предпринимателя (не юридического лица)");
            }
        }
    } else {
        console.error("Элемент управления INN не содержит значения!");
    }
}

async function loadOrganizationData(sender: LayoutControl, method: string, parameters: string) {
    try {
        let data = await sender.layout.getService($KonturRequestController).getFromKontur(method, parameters);
        if (!data) {
            MessageBox.ShowWarning("Информация об организации не найдена!");
        }
        return data;
    }
    catch (err) {
        console.error(err);
        MessageBox.ShowWarning("Ошибка при загрузке организации: " + err);
        return null;
    }
}
