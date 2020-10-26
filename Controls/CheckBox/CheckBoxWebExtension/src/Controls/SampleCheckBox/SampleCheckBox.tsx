import { BaseControlParams, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { apiEvent } from "@docsvision/webclient/System/Event";
import { BasicApiEvent } from "@docsvision/webclient/System/ApiEvent";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { $EditOperationStore, $LayoutInfo } from "@docsvision/webclient/System/LayoutServices";
import { SampleCheckBoxState, SampleCheckBoxImpl } from "./SampleCheckBoxImpl";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { handler, at } from "@docsvision/webclient/System/Handler";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { resources } from "@docsvision/webclient/System/Resources";
import { editOperationAvailable } from "@docsvision/webclient/System/OperationUtils";
import { getBindingResult } from "@docsvision/webclient/System/GetBindingResult";

export class SampleCheckBoxParams extends BaseControlParams {
    @r standardCssClass?: string = "Sample-checkbox";

    @rw value?: boolean;
    @rw tip?: string;
    @rw labelText?: string;
    @rw tabStop?: boolean;
    @r defaultValue?: boolean;        
    @r canEdit?: boolean = true;    
    @rw disabled?: boolean = false;

    @apiEvent dataChanged?: BasicApiEvent<IDataChangedEventArgs>;
    @apiEvent checked?: BasicApiEvent<IEventArgs>;
    @apiEvent unchecked?: BasicApiEvent<IEventArgs>;

    @rw services?: $EditOperationStore & $LayoutInfo;
}

export class SampleCheckBox extends BaseControl<SampleCheckBoxParams, SampleCheckBoxState> {
    constructor(props: SampleCheckBoxParams) {
        super(props);

        this.onDataChanged = this.onDataChanged.bind(this);
    }

    protected createParams() {
        return new SampleCheckBoxParams();
    }

    private get checkBoxImpl(): SampleCheckBoxImpl {
        return this.controlImpl as any;
    }

    componentDidMount() {
        super.componentDidMount();
        this.params.dataChanged.subscribe(this.onDataChanged);
    }

    protected onDataChanged() {
        if (this.state.services.layoutInfo.type == GenModels.LayoutType.View) {
            this.state.saveHelper.send(() => this.save(), () => { });
        }
    }

    // Обработчик значения свойства "binding", присылаемого сервером.
    // Данное свойство задается только сервером, поэтому в нет смысла объявлять его в SampleCheckBoxParams
    @handler("binding")
    protected set binding(binding: IBindingResult<boolean>) {
        // Если заполнено binding свойство, то берем значение из него
        if (binding && binding.value !== undefined && binding.value !== null) {
            this.checkBoxImpl.setValue(binding.value);
        }
        this.state.canEdit = editOperationAvailable(this.state.services, binding);
        this.state.binding = binding;
    }

    // Обработчик на запись значения SampleCheckBoxParams.defaultValue
    @handler(() => at(SampleCheckBoxParams).defaultValue)
    protected set defaultValue(value: boolean) {
        // Делаем то же, что произошло бы без обработчика автоматически
        this.state.defaultValue = value;
        // Если значение не задано, устанавливаем значение по умолчанию 
        if (this.checkBoxImpl.getValue() == undefined) {
            this.checkBoxImpl.setValue(value);
        }
    }

    // Вызывается при установлении нового значения SampleCheckBoxParams.value через интерфейсы класса SampleCheckBox
    @handler(() => at(SampleCheckBoxParams).value)
    set value(value: boolean) {
        if (this.checkBoxImpl.canEdit) {
            this.checkBoxImpl.setValue(value);
        } else {
            // Значения будут равны если компонент инициализируется при создании,
            // не равны - когда значение меняется уже после создания
            // Если canEdit == false, то делаем так, чтобы задавать значение можно было только при создании.
            if (this.checkBoxImpl.getValue() === value) {
                this.checkBoxImpl.setValue(value);
            } else {
                console.warn(resources.OperationForbidden);
            }
        }
    }

    // Вызывается при сохранении карточки, возвращает свойство Binding с обновленным значнием value
    protected getBindings(): IBindingResult<any>[] {
        return [getBindingResult(this.state.binding, this.params.value, () => at(SampleCheckBoxParams).labelText)];
    }

    protected createImpl() {
        return new SampleCheckBoxImpl(this.props, this.state);
    }
}

    