namespace WebClient {
    export interface SampleTextBoxImplState extends BaseControlState, SampleTextBoxState {        
    }

    export class SampleTextBoxImpl extends BaseControlImpl<SampleTextBoxParams, SampleTextBoxImplState> {
        constructor(props: SampleTextBoxParams) {
            super(props);

            this.state.dataChanged = SimpleEvent.Create<ISampleDataChangedEventArgs>(props.wrapper);
            this.state.imageClick = SimpleEvent.Create<IEventArgs>(props.wrapper);

            this.handleDataChanged = this.handleDataChanged.bind(this);
            this.handleImageClick = this.handleImageClick.bind(this);
        }

        protected handleImageClick(event: React.MouseEvent) {
            SimpleEvent.cast(this.state.imageClick).trigger();
        }

        protected handleDataChanged(event) {
            this.setValue(event.target.value);
        }

        // Вызывается при получении нового значения SampleTextBoxParams.value через интерфейсы класса SampleTextBox
        @handler(() => at(SampleTextBoxParams).value)
        set value(value: string) {
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

        protected setValue(value: string) {
            if (this.state.value != value) {
                var eventArgs: IDataChangedEventArgs = {
                    oldValue: this.state.value,
                    newValue: value
                };
                this.state.value = value;
                this.forceUpdate();
                SimpleEvent.cast(this.state.dataChanged).trigger(eventArgs);
            }
        }

        protected getImageStyle() {
            return {
                height: this.state.imageHeight,
                width: this.state.imageWidth,
                background: 'url("' + this.state.url + '") 0 0 / cover no-repeat'
            };
        }

        protected getInputStyle() {
            return {
                width: 'calc(100% - '  + this.state.imageWidth + ')'
            };
        }

        renderControl() {
            return (
                <div>
                    <label>{this.state.labelText}</label>
                    <div className="image" style={this.getImageStyle() } onClick={this.handleImageClick}></div>
                    <input className="input" style={this.getInputStyle()} value={this.state.value}
                        readOnly={!this.state.canEdit} onFocus={this.handleFocus} onBlur={this.handleBlur}
                        onChange={this.handleDataChanged} tabIndex={this.getTabIndex()} title={this.state.tip} />
                </div>
            );
        }
    }
}