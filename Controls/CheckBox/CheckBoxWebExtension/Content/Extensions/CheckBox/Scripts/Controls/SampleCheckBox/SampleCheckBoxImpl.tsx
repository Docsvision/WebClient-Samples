namespace WebClient {
    // В этом интерфейсе следует объявлять все служебные значения, с которыми работает SampleCheckBoxImpl 
    // (которые уже не объявлены в SampleCheckBoxState и SampleCheckBoxParams)
    // Объявленные здесь переменные доступны через this.state
    export interface SampleCheckBoxImplState extends BaseControlImplState, SampleCheckBoxState {
        currentValue: boolean;
        saveHelper: RequestHelper;
    }

    // Все пользовательские Impl-контролы должны быть наследниками BaseControlImpl либо любого из его потомков
    export class SampleCheckBoxImpl extends BaseControlImpl<SampleCheckBoxParams, SampleCheckBoxImplState> {
        constructor(props: SampleCheckBoxParams) {
            super(props);
            this.state.saveHelper = new RequestHelper(() => this.forceUpdate());
            // Инициализируем события
            this.state.dataChanged = SimpleEvent.Create<IDataChangedEventArgs>(props.wrapper);
            this.state.checked = SimpleEvent.Create(props.wrapper);
            this.state.unchecked = SimpleEvent.Create(props.wrapper);

            // связываем функцию handleCheckBoxClick с текущим экземпляром класса (необходимо выполнять для каждого метода, вызываемого из метода render)
            this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this); 
            this.handleDataChanged = this.handleDataChanged.bind(this);          
        }

        // Вызывается при установлении нового значения SampleCheckBoxParams.value через интерфейсы класса SampleCheckBox
        @handler(() => at(SampleCheckBoxParams).value)
        set value(value: boolean) {
            if (this.state.canEdit) {
                this.setValue(value);
            } else {
                // Значения будут равны если компонент инициализируется при создании,
                // не равны - когда значение меняется уже после создания
                // Если canEdit == false, то делаем так, чтобы задавать значение можно было только при создании.
                if (this.props.value === value) {
                    this.setValue(value);
                } else {
                    console.warn(resources.OperationForbidden);
                }
            }
        }

        // Вызывается при клике по CheckBox
        protected handleCheckBoxClick(event) {
            if (this.state.canEdit) {
                let newValue = !this.state.value;
                // Вызываем метод изменения значения
                this.setValue(newValue);
            }
        }

        protected handleDataChanged(eventArgs: IDataChangedEventArgs) {
            SimpleEvent.cast(this.state.dataChanged).trigger(eventArgs);
        }

        protected getValue(): boolean {
            return this.state.currentValue;
        }

        protected setValue(value: boolean) {
            var args = {
                oldValue: this.getValue(),
                newValue: value
            };
            this.state.currentValue = value;
            if (this.state.value != value) {
                // Устанавливаем новое значение value
                this.state.value = value;
                // Вызываем перерисовку контрола
                this.forceUpdate();
                // Запускаем событие checked/unchecked в зависимости от значения value
                this.state.value ? SimpleEvent.cast(this.state.checked).trigger() : SimpleEvent.cast(this.state.unchecked).trigger();
            }
            if (args.oldValue != args.newValue) {
                this.handleDataChanged(args);
            }
        }

        protected getCssClass(): string {
            return super.getCssClass() + classIf(!this.state.canEdit, "disabled");
        }

        // Отрисовка контрола
        renderControl() {
            // onChange={() => null} - не используемый обработчик, т.к. мы меняем значение, обрабатывая клик по родительскому блоку
            // (если не указать onChange для input, React сообщает об ошибке)
            return (
                <div title={this.state.tip}>
                    <input id="switch" type="checkbox" checked={this.state.value} disabled={!this.state.canEdit} tabIndex={this.getTabIndex()} onChange={() => null} />
                    <label for="switch" onClick={this.handleCheckBoxClick}>Toggle</label>
                    <label className="label-text">{this.state.labelText}</label>
                </div>);
        }
    }
}