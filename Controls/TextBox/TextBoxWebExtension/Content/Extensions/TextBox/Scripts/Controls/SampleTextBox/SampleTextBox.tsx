namespace WebClient {

    export class SampleTextBoxParams extends BaseControlParams {
        @r standardCssClass?: string = "sample-textbox";

        @rw value?: string;
        @rw tip?: string;
        @rw labelText?: string;
        @rw tabStop?: boolean;
        @r default?: string;
        @r canEdit?: boolean = true;
        @rw url?: string;

        @r imageHeight: string = "1.5em";
        @r imageWidth: string = "1.5em";
        
        @apiEvent dataChanged: BasicApiEvent<ISampleDataChangedEventArgs>;
        @apiEvent imageClick: BasicApiEvent<IEventArgs>;
    }

    export interface SampleTextBoxState extends SampleTextBoxParams, BaseControlState {
        // Сохраненное значение binding, используется в getBindings
        binding: IBindingResult<string>;
    }

    export class SampleTextBox extends BaseControl<SampleTextBoxParams, SampleTextBoxState> {
        protected createParams() {
            return new SampleTextBoxParams();
        }

        private get sampleTextBoxImpl(): SampleTextBoxImpl {
            return this.controlImpl as SampleTextBoxImpl;
        }

        // Обработчик значения свойства "binding", присылаемого сервером.
        // Данное свойство задается только сервером, поэтому в нет смысла объявлять его в SampleTextBoxParams
        @handler("binding")
        protected set binding(binding: IBindingResult<string>) {
            // Если заполнено binding свойство, то берем значение из него
            if (binding && binding.value !== undefined && binding.value !== null) {
                this.state.value = binding.value;
            }
            this.state.canEdit = !binding || this.layout.editOperations.available(binding.editOperation);
            this.state.binding = binding;
        }

        // Обработчик на запись значения SampleCheckBoxParams.defaultValue
        @handler(() => at(SampleTextBoxParams).default)
        protected set defaultValue(value: string) {
            // Делаем то же, что произошло бы без обработчика автоматически
            this.state.default = value;
            // Если значение не задано, устанавливаем значение по умолчанию 
            if (this.state.value == undefined) {
                this.state.value = value;
            }
        }

        // Вызывается при сохранении карточки, возвращает свойство Binding с обновленным значнием value
        protected getBindings(): IBindingResult<any>[] {
            return [getBindingResult(this.state.binding, this.params.value, () => at(DepartmentParams).labelText)];
        }

        render() {
            return <SampleTextBoxImpl {...this.state} ref={this.attachControl} />;
        }
    }

    // Регистрируем контрол под именем SampleTextBox в controlFactory
    controlFactory.register("SampleTextBox", () => SampleTextBox);
}