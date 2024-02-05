import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { NewContractLayout } from "../NewContractLayout";
import { BriefReport } from "../Utils/KonturTypes";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { $KonturRequestController } from "../ServerRequests.ts/KonturRequestController";
import { $CardId } from "@docsvision/webclient/System/LayoutServices";
import { $Router } from "@docsvision/webclient/System/$Router";
import { toShortDateString } from "@docsvision/webclient/System/DateTimeUtils";
import { $Layout } from "@docsvision/webclient/System/$Layout";

export async function openBriefReport(sender: LayoutControl) {
    await openBriefReportInternal(sender, false);
}

export async function openBriefReportAndAttachFile(sender: LayoutControl) {
    await openBriefReportInternal(sender, true);
}


async function openBriefReportInternal(sender: LayoutControl, attachReportToCard: boolean) {
    let layout = new NewContractLayout(sender.layout);
    if (layout.INN.hasValue()) {
        let reports = await sender.layout.getService($KonturRequestController).getFromKontur("briefReport", "inn=" + layout.INN.value);
        let report: BriefReport;

        if (reports?.[0]) {
            report = reports[0] as BriefReport;
        } else {
            MessageBox.ShowError("Не удалось загрузить отчет");
        }

        if (report) {
            window.open(report.briefReport.href, undefined, "width=800,height=600,top=100,left=100,resizable,scrollbars=yes");

            if (attachReportToCard) {
                let reportFileName = "Отчет о контрагенте от " + toShortDateString(new Date(), sender.layout.getService());
                try {
                    await sender.layout.getService($KonturRequestController).addKonturReportToCard(
                        sender.layout.getService($CardId), reportFileName, "inn=" + layout.INN.value);
                } finally {
                    await sender.layout.getService($Layout).reloadFromServer();
                }
            }
        }
    } else {
        console.error("Элемент управления INN не содержит значения!");
    }
}
