namespace WebClient {

    export class SampleCheckBoxParams extends BaseControlParams {
        @r standardCssClass?: string = "Sample-checkbox";

        @rw value?: boolean;
        @rw tip?: string;
        @rw labelText?: string;
        @rw tabStop?: boolean;
        @r defaultValue?: boolean;        
        @r canEdit?: boolean = true;        

        @apiEvent dataChanged?: BasicApiEvent<IDataChangedEventArgs>;
        @apiEvent checked: BasicApiEvent<IEventArgs>;
        @apiEvent unchecked: BasicApiEvent<IEventArgs>;
    }

    export interface SampleCheckBoxState extends SampleCheckBoxParams, BaseControlState {
        // Сохраненное значение binding, используется в getBindings
        binding: IBindingResult<boolean>;
    }

    export class SampleCheckBox extends BaseControl<SampleCheckBoxParams, SampleCheckBoxState> {
        constructor(props: SampleCheckBoxParams) {
            super(props);

            this.onDataChanged = this.onDataChanged.bind(this);
        }

        protected createParams() {
            return new SampleCheckBoxParams();
        }

        private get myControlImpl(): SampleCheckBoxImpl {
            return this.controlImpl as any;
        }

        componentDidMount() {
            super.componentDidMount();
            getEvent(this.params.dataChanged).subscribe(this.onDataChanged);
        }

        protected onDataChanged() {
            if (layoutManager.cardLayout.layoutInfo.type == LayoutType.View) {
                this.myControlImpl.state.saveHelper.send(() => this.save(), () => { });
            }
        }

        // Обработчик значения свойства "binding", присылаемого сервером.
        // Данное свойство задается только сервером, поэтому в нет смысла объявлять его в SampleCheckBoxParams
        @handler("binding")
        protected set binding(binding: IBindingResult<boolean>) {
            // Если заполнено binding свойство, то берем значение из него
            if (binding && binding.value !== undefined && binding.value !== null) {
                this.state.value = binding.value;
            }
            this.state.canEdit = !binding || this.layout.editOperations.available(binding.editOperation);
            this.state.binding = binding;
        }

        // Обработчик на запись значения SampleCheckBoxParams.defaultValue
        @handler(() => at(SampleCheckBoxParams).defaultValue)
        protected set defaultValue(value: boolean) {
            // Делаем то же, что произошло бы без обработчика автоматически
            this.state.defaultValue = value;
            // Если значение не задано, устанавливаем значение по умолчанию 
            if (this.state.value == undefined) {
                this.state.value = value;
            }
        }

        // Вызывается при сохранении карточки, возвращает свойство Binding с обновленным значнием value
        protected getBindings(): IBindingResult<any>[] {
            return [getBindingResult(this.state.binding, this.params.value)];
        }

        render() {
            return <SampleCheckBoxImpl {...this.state} ref={this.attachControl} />;
        }
    }

    // Регистрируем контрол под именем SampleCheckBox в controlFactory
    controlFactory.register("SampleCheckBox", () => SampleCheckBox);
}