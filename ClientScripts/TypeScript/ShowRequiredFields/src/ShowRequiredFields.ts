import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { ILayoutBeforeSavingEventArgs } from "@docsvision/webclient/System/ILayoutParams";
import { Layout } from "@docsvision/webclient/System/Layout";

export function showRequiredFields(sender: Layout, args: ICancelableEventArgs<ILayoutBeforeSavingEventArgs>) {
    const controls = sender.layout.controls;
    let validationResults = args.data?.control?.validate({ ShowErrorMessage: true }) || [];
    let invalidResults = validationResults.filter((value) => !value.Passed);
    if (invalidResults.length !== 0) {
        let labelTexts = invalidResults.map((control) => controls.get<any>(`${control.ControlName}`).params.labelText);
        const text = sender.layout.params.services.locale === 'ru' ? 'Необходимо заполнить следующие поля' : 'The following fields are required';
        sender.layout.params.services.messageWindow.showInfo(`${text}: ${labelTexts.join('; ')}`);
    }
}