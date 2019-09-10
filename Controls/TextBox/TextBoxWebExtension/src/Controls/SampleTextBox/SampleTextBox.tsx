import { BaseControlParams, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { apiEvent } from "@docsvision/webclient/System/Event";
import { BasicApiEvent } from "@docsvision/webclient/System/ApiEvent";
import { ISampleDataChangedEventArgs } from "./Data/ISampleDataChangedEventArgs";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { $EditOperationStore } from "@docsvision/webclient/System/LayoutServices";
import { SampleTextBoxState, SampleTextBoxImpl } from "./SampleTextBoxImpl";
import { handler, at } from "@docsvision/webclient/System/Handler";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { resources } from "@docsvision/webclient/System/Resources";
import { DepartmentParams } from "@docsvision/webclient/BackOffice/Department";
import { definedNotNull } from "@docsvision/webclient/System/DefinedNotNull";
import { editOperationAvailable } from "@docsvision/webclient/System/OperationUtils";
import { getBindingResult } from "@docsvision/webclient/System/GetBindingResult";


export class SampleTextBoxParams extends BaseControlParams {
    @r standardCssClass?: string = "sample-textbox";

    @rw value?: string;
    @rw tip?: string;
    @rw labelText?: string;
    @rw tabStop?: boolean;
    @r default?: string;
    @r canEdit?: boolean = true;
    @rw urlAddress?: string;

    @r imageHeight: string = "1.5em";
    @r imageWidth: string = "1.5em";
    
    @apiEvent dataChanged?: BasicApiEvent<ISampleDataChangedEventArgs>;
    @apiEvent imageClick?: BasicApiEvent<IEventArgs>;

    @rw services?: $EditOperationStore;
}

export class SampleTextBox extends BaseControl<SampleTextBoxParams, SampleTextBoxState> {
    protected createParams() {
        return new SampleTextBoxParams();
    }

    // Обработчик значения свойства "binding", присылаемого сервером.
    // Данное свойство задается только сервером, поэтому в нет смысла объявлять его в SampleTextBoxParams
    @handler("binding")
    protected set binding(binding: IBindingResult<string>) {
        // Если заполнено binding свойство, то берем значение из него
        if (binding && definedNotNull(binding.value)) {
            this.getImpl<SampleTextBoxImpl>().setValue(binding.value);
        }
        this.state.canEdit = editOperationAvailable(this.state.services, binding);
        this.state.binding = binding;
    }

    // Обработчик на запись значения SampleCheckBoxParams.defaultValue
    @handler(() => at(SampleTextBoxParams).default)
    protected set defaultValue(value: string) {
        // Делаем то же, что произошло бы без обработчика автоматически
        this.state.default = value;
        // Если значение не задано, устанавливаем значение по умолчанию 
        if (this.getImpl<SampleTextBoxImpl>().getValue() === undefined) {
            this.getImpl<SampleTextBoxImpl>().setValue(value);
        }
    }

    // Вызывается при получении нового значения SampleTextBoxParams.value через интерфейсы класса SampleTextBox
    @handler(() => at(SampleTextBoxParams).value)
    set value(value: string) {
        if (this.state.canEdit) {
            this.getImpl<SampleTextBoxImpl>().setValue(value);
        } else {
            // Значения будут равны если компонент инициализируется при создании,
            // не равны - когда значение меняется уже после создания
            // Если canEdit == false, то делаем так, чтобы задавать значение можно было только при создании.
            if (this.getImpl<SampleTextBoxImpl>().getValue() === value) {
                this.getImpl<SampleTextBoxImpl>().setValue(value);
            } else {
                console.warn(resources.OperationForbidden);
            }
        }
    }

    // Вызывается при сохранении карточки, возвращает свойство Binding с обновленным значнием value
    protected getBindings(): IBindingResult<any>[] {
        return [getBindingResult(this.state.binding, this.params.value, () => at(DepartmentParams).labelText)];
    }

    protected createImpl() {
        return new SampleTextBoxImpl(this.props, this.state);
    }
}

