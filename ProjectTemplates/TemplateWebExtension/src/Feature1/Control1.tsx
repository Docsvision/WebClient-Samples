import { Button } from "@docsvision/web/components/form/button";
import { $Layout } from "@docsvision/webclient/System/$Layout";
import { BaseControlParams, BaseControlState, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { ControlImpl } from "@docsvision/webclient/System/ControlImpl";
import { getBindingResult } from "@docsvision/webclient/System/GetBindingResult";
import { at, handler } from "@docsvision/webclient/System/Handler";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { $CardId } from "@docsvision/webclient/System/LayoutServices";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import React from "react";
import { $Feature1 } from "./$Feature1";

/**
 * Содержит публичные свойства элемента управления [Control1]{@link Control1}.
 */
export class Control1Params extends BaseControlParams {
    /** Стандартный CSS класс со стилями элемента управления. */
    @r standardCssClass?: string = "control-1";

    // Объявление параметров, соответствующих параметрам в шаблоне xml-расширения 
    // для конструктора разметок "TemplateXmlDesignerExtension"
    @rw number: number;
    @rw doubleNumber: number;
    @rw text: string;
    @rw largeText: string;
    @rw localizedText: string;
    @rw flag: boolean;
    @rw id: string;

    @rw value: string;

    /** Сервисы, необходимые для работы контрола. */
    @rw services?: $Feature1 & $CardId & $Layout;
}

export interface IControl1State extends Control1Params, BaseControlState {
    binding: IBindingResult<string>;
}

/** Реализация элемента управления Control1 */
export class Control1 extends BaseControl<Control1Params, IControl1State> {
    /** Вызывается до рендеринга и до вызова хандлеров, но после инициализации сервисов. */
    protected construct() {
    }

    /** Вызывается до рендеринга, но после вызова хандлеров и инициализации сервисов. */
    protected prepare() {
    }

    /** Вызывается после отображения контрола в DOM браузера */
    init() {
    }

    /**
     * Вызывается перед удалением контрола из DOM браузера
     */
    deinit() {

    }

    protected createParams() {
        return new Control1Params();
    }

    protected createImpl() {
        return new ControlImpl(this.props, this.state, this.renderControl.bind(this));
    }

    // Получение значения поля карточки
    @handler("binding")
    protected set binding(binding: IBindingResult<string>) {
        this.state.value = binding?.value;
        this.state.binding = binding;
    }

    // Сохранение значения поля карточки
    protected getBindings(): IBindingResult<unknown>[] {
        // Первый параметр - значение IBindingResult, полученное с сервера
        // Второй параметр - текущее значение, которое мы хотим сохранить
        // Третий параметр - имя свойства контрола, содержащего отображамое имя значения для записи в историю карточки.
        return [getBindingResult(this.state.binding, this.state.value, () => at(Control1Params).text)];
    }

    private onClickHandler = async (e: React.MouseEvent) => {
        await this.state.services.feature1.action1({
            documentId: this.state.services.cardId
        });
        await this.state.services.layout.reloadFromServer();
    }

    renderControl() {
        return (
            <Button onClick={this.onClickHandler} tabIndex={this.controlImpl.getTabIndex()}
                title={this.state.largeText} stretchWidth={false} className="system-card-button">
                {this.state.text}
            </Button>
        );
    }
}


