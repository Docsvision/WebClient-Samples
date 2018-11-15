namespace WebClient {
    export interface SampleTextBoxState extends SampleTextBoxParams, BaseControlState {
        // Сохраненное значение binding, используется в getBindings
        binding: IBindingResult<string>;
    }

    export class SampleTextBoxImpl extends BaseControlImpl<SampleTextBoxParams, SampleTextBoxState> {
        constructor(props: SampleTextBoxParams, state: SampleTextBoxState) {
            super(props, state);

            this.state.dataChanged = SimpleEvent.Create<ISampleDataChangedEventArgs>(this.state.wrapper);
            this.state.imageClick = SimpleEvent.Create<IEventArgs>(this.state.wrapper);

            this.handleDataChanged = this.handleDataChanged.bind(this);
            this.handleImageClick = this.handleImageClick.bind(this);
        }

        protected handleImageClick(event: React.MouseEvent) {
            SimpleEvent.cast(this.state.imageClick).trigger();
        }

        protected handleDataChanged(event) {
            this.setValue(event.target.value);
        }

       
        public setValue(value: string) {
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

        public getValue() {
            return this.state.value;
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