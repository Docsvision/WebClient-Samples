
import React from "react";
import { SampleCheckBoxParams } from "./SampleCheckBox";
import { BaseControlState } from "@docsvision/webclient/System/BaseControl";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { RequestHelper } from "@docsvision/webclient/System/RequestHelper";
import { BaseControlImpl } from "@docsvision/webclient/System/BaseControlImpl";
import { SimpleEvent } from "@docsvision/webclient/System/SimpleEvent";
import { IDataChangedEventArgs } from "@docsvision/webclient/System/IDataChangedEventArgs";
import { classIf } from "@docsvision/webclient/System/CssUtils";
import { KeyCodes } from "@docsvision/webclient/System/KeyCodes";
    
// В этом интерфейсе следует объявлять все служебные значения, с которыми работает SampleCheckBoxImpl 
// (которые уже не объявлены в SampleCheckBoxState и SampleCheckBoxParams)
// Объявленные здесь переменные доступны через this.state
export interface SampleCheckBoxState extends SampleCheckBoxParams, BaseControlState {
    // Сохраненное значение binding, используется в getBindings
    binding: IBindingResult<boolean>;
    currentValue: boolean;
    saveHelper: RequestHelper;
}

// Все пользовательские Impl-контролы должны быть наследниками BaseControlImpl либо любого из его потомков
export class SampleCheckBoxImpl extends BaseControlImpl<SampleCheckBoxParams, SampleCheckBoxState> {
    constructor(props: SampleCheckBoxParams, state: SampleCheckBoxState) {
        super(props, state);
        this.state.saveHelper = new RequestHelper(() => this.forceUpdate());
        // Инициализируем события
        this.state.dataChanged = SimpleEvent.Create<IDataChangedEventArgs>(this.state.wrapper);
        this.state.checked = SimpleEvent.Create(this.state.wrapper);
        this.state.unchecked = SimpleEvent.Create(this.state.wrapper);

        // связываем функцию handleCheckBoxClick с текущим экземпляром класса (необходимо выполнять для каждого метода, вызываемого из метода render)
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this); 
        this.handleDataChanged = this.handleDataChanged.bind(this);
        this.handleCheckBoxKeyDown = this.handleCheckBoxKeyDown.bind(this);
    }

    // Вызывается при клике по CheckBox
    protected handleCheckBoxClick(event: React.MouseEvent) {
        this.toggle();
    }

    // Вызывается при нажатии кнопки, когда CheckBox в фокусе
    protected handleCheckBoxKeyDown(event: React.KeyboardEvent) {
        if (event.keyCode == KeyCodes.SPACE || event.keyCode == KeyCodes.ENTER) {
            this.toggle();
        }
    }

    protected toggle() {
        if (this.canEdit) {
            let newValue = !this.getValue();
            // Вызываем метод изменения значения
            this.setValue(newValue);
        }
    }

    get canEdit() {
        return this.state.canEdit && !this.state.disabled;
    }

    protected handleDataChanged(eventArgs: IDataChangedEventArgs) {
        SimpleEvent.cast(this.state.dataChanged).trigger(eventArgs);
    }

    public getValue(): boolean {
        return this.state.currentValue;
    }

    public setValue(value: boolean) {
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
        return super.getCssClass() + classIf(!this.canEdit, "disabled");
    }

    // Отрисовка контрола
    renderControl() {
        // onChange={() => null} - не используемый обработчик, т.к. мы меняем значение, обрабатывая клик по родительскому блоку
        // (если не указать onChange для input, React сообщает об ошибке)
        return (
            <div title={this.state.tip}>
                <input id="switch" type="checkbox" checked={this.state.value} disabled={!this.canEdit} onChange={() => null} />
                <label className="checkbox-switch" htmlFor="switch" onClick={this.handleCheckBoxClick} 
                    onKeyDown={this.handleCheckBoxKeyDown} tabIndex={this.getTabIndex()}>Toggle</label>
                <label className="label-text">{this.state.labelText}</label>
            </div>
        );             
    }
}