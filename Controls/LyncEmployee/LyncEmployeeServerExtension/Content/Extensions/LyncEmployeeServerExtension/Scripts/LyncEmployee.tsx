interface ActiveXObject {
    new (s: string): any;
}
declare var ActiveXObject: ActiveXObject; 

namespace WebClient {

    interface IExtenedEmployeeData extends IEmployeeData {
        /** Идентификатор сотрудника в Docsvision. */
        id: string;
        /** Отображаемое имя сотрудника. Формат отображаемого имени определяется настройками в Справочнике сотрудников.*/
        displayName: string;
        /** Email сотрудника. */
        email: string;
    }

    export class LyncEmployeeParams extends BaseControlParams {
        @rw value?: IExtenedEmployeeData = {} as any;
        @rw labelText?: string;
        @r standardCssClass?: string = "custom-lync-employee";
        @r showEmptyLabel?: boolean;
    }

    /** @internal */
    export interface LyncEmployeeState extends LyncEmployeeParams, BaseControlState {
        employeeVisualizer: EmployeeVisualizer;
        lyncStatus: string;
    }

    export class LyncEmployee extends BaseControl<LyncEmployeeParams, LyncEmployeeState> {

        windowObject = window as any;

        constructor(props: LyncEmployeeParams) {
            super(props);
            this.state.employeeVisualizer = new EmployeeVisualizer(EmployeeTooltipMode.FioAndPosition);
             
            this.hideLyncPresencePopup = this.hideLyncPresencePopup.bind(this);
            this.showLyncPresencePopup = this.showLyncPresencePopup.bind(this);
        }

        protected createParams() {
            return new LyncEmployeeParams();
        }

        @handler("binding")
        private set binding(val: IBindingResult<IExtenedEmployeeData>) {
            this.value = val.value;
        }

        @handler(() => at(LyncEmployeeParams).value)
        private set value(value: IExtenedEmployeeData) {
            if (value && value.id) {
                this.state.value = value || {} as any;
            }
        }

        componentDidMount() {
            if (!this.windowObject.nameCtrl) {
                if (this.windowObject.ActiveXObject) {
                    this.windowObject.nameCtrl = new ActiveXObject("Name.NameCtrl");
                } else {
                    try {
                        this.windowObject.nameCtrl = new ActiveXObject("Name.NameCtrl");
                    } catch (e) {
                        this.windowObject.nameCtrl = (function (b) {
                            var c = null;
                            try {
                                c = document.getElementById(b);
                                if (!Boolean(c) && (Boolean(navigator.mimeTypes) && navigator.mimeTypes[b] && navigator.mimeTypes[b].enabledPlugin)) {
                                    var a = document.createElement("object");
                                    a.id = b;
                                    a.type = b;
                                    a.width = "0";
                                    a.height = "0";
                                    a.style.setProperty("visibility", "hidden", "");
                                    document.body.appendChild(a);
                                    c = document.getElementById(b)
                                }
                            } catch (d) {
                                c = null
                            }
                            return c
                        })("application/x-sharepoint-uc");
                    }
                }

            }

            if (this.windowObject.nameCtrl) {
                SimpleEvent.cast(this.params.mouseOut).subscribe(this.hideLyncPresencePopup);
                SimpleEvent.cast(this.params.mouseOver).subscribe(this.showLyncPresencePopup);

                let that = this;
                this.windowObject.nameCtrl.OnStatusChange = function (userName, status, id) {
                    switch (status) {
                        case 0:
                            that.state.lyncStatus = 'available';
                            break;
                        case 1:
                            that.state.lyncStatus = 'offline';
                            break;
                        case 2:
                        case 4:
                        case 16:
                            that.state.lyncStatus = 'away';
                            break;
                        case 3:
                        case 5:
                            that.state.lyncStatus = 'inacall';
                            break;
                        case 6:
                        case 7:
                        case 8:
                            that.state.lyncStatus = 'outofoffice';
                            break;
                        case 10:
                            that.state.lyncStatus = 'busy';
                            break;
                        case 9:
                        case 15:
                            that.state.lyncStatus = 'donotdisturb';
                            break;
                    }

                    that.forceUpdate();
                };

                setTimeout(() => this.windowObject.nameCtrl.GetStatus(this.state.value.email, ""), 500);
            }
        }

        private showLyncPresencePopup() {
            if (!this.windowObject.nameCtrl) {
                return;
            }

            var eLeft = $(ReactDOM.findDOMNode(this)).offset().left;
            var x = eLeft - $(window).scrollLeft();

            var eTop = $(ReactDOM.findDOMNode(this)).offset().top;
            var y = eTop - $(window).scrollTop();

            this.windowObject.nameCtrl.ShowOOUI(this.state.value.email, 0, x, y);
        }

        private hideLyncPresencePopup() {
            if (!this.windowObject.nameCtrl) {
                return;
            }
            this.windowObject.nameCtrl.HideOOUI();
        }

        private renderEmployee() {
            return (
                <span>{this.state.value.displayName} <span className={'lync-status ' + this.state.lyncStatus}></span></span>
            );
        }

        /** @internal */
        render() {
            return (
                <ControlImpl {...this.state} ref={this.attachControl}>
                    <LabeledText label={this.state.labelText}
                        text={this.renderEmployee()}
                        wrapLongTextUnderLabel={true}
                        visible={true}
                        showEmpty={this.state.showEmptyLabel} />
                </ControlImpl>
            );
        }
    }

    controlFactory.register("LyncEmployee", () => LyncEmployee);
}