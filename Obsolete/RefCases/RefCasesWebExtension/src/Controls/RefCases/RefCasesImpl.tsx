import ReactDOM from "react-dom";
import { RefCasesParams, RefCases } from "./RefCases";
import { Models } from "./Data/CaseModel";
import { InputBasedControlState, InputBasedControlImpl } from "@docsvision/webclient/System/InputBasedControlImpl";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { ModalWindow } from "@docsvision/webclient/Legacy/ModalWindow";
import { RequestHelper } from "@docsvision/webclient/System/RequestHelper";
import { SimpleEvent } from "@docsvision/webclient/System/SimpleEvent";
import { ModalWindowParams } from "@docsvision/webclient/Legacy/ModalWindowParams";
import React from "react";
import { IBoxWithButtonsButtonInfo } from "@docsvision/webclient/Helpers/BoxWithButtons";
import { Typeahead } from "@docsvision/webclient/Helpers/Typeahead/Typeahead";
import { ITypeaheadVariant } from "@docsvision/webclient/Helpers/Typeahead/Models/ITypeaheadVariant";
import { resources } from "@docsvision/webclient/System/Resources";
import { ITypeaheadSearchQuery } from "@docsvision/webclient/Helpers/Typeahead/Models/ITypeaheadSearchQuery";
import { ITypeaheadSearchResult } from "@docsvision/webclient/Helpers/Typeahead/Models/ITypeaheadSearchResult";
import { renderModalContent } from "@docsvision/webclient/System/RenderModalContent";
import { RefCasesSelectDialog } from "./RefCasesSelectDialog/RefCasesSelectDialog";
import { cloneObject } from "@docsvision/webclient/System/CloneObject";
import { CaseTypeaheadVariant } from "./Data/ClientModels/CaseTypeaheadVariant";


/** Интерфейс состояния */
/** @internal */
export interface RefCasesState extends RefCasesParams, InputBasedControlState<Models.RefCasesCaseDisplayModel> {
    // Используется для хранения биндинга
    binding: IBindingResult<Models.RefCasesCaseDisplayModel>;
    
    // Диалоговое окно выбора Дела из справочника
    dialog: ModalWindow;

    // Вспомогательный компонент, предоставляющий метод для обработки длительных операций (будет использоваться при получении данных из справочника)
    requestHelper: RequestHelper;
    
    // Событие ввода значения в поле элемента управления
    inputKeyDown: SimpleEvent<React.KeyboardEvent<any>>;
}

/** internal */
//export type RefCasesImplState = RefCasesState;

/** Реализация элемента управления */
/** @internal */
export class RefCasesImpl extends InputBasedControlImpl<Models.RefCasesCaseDisplayModel, RefCasesParams, RefCasesState>
{
    // Ссылка на компонент быстрого поиска
    private typeahead: Typeahead;

    constructor(props: RefCasesParams, state: RefCasesState) {
        super(props, state);

        this.state.requestHelper = new RequestHelper(() => this.forceUpdate());
        this.state.inputKeyDown = new SimpleEvent<React.KeyboardEvent<any>>(this);

        this.findItems = this.findItems.bind(this);
        this.showDictionary = this.showDictionary.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.attachTypeahead = this.attachTypeahead.bind(this);
    }

    // Открывает диалоговое окно выбора дела из справочника
    async showDictionary() {
        if (this.state.dialog && this.state.dialog.IsOpened) {
            return;
        }

        // Компонент диалогового окна выбора из справочника
        let controlInModal: RefCasesSelectDialog;

        // Устанавливаем параметры диалогового окна
        let params = new ModalWindowParams();
        params.headerText = resources.RefCases_SelectFromDirectory;
        params.content = "";
        params.buttonOkShow = true;
        params.buttonOkText = resources.Navigator_ButtonSelect;

        // Обработчик начатии кнопки ОК в диалоговом окне
        let okFunction = () => {
            let selectedCase = cloneObject(controlInModal.selectedCase);

            // Если выбрано Дело, его модель (RefCasesCaseDisplayModel) устанавливается в значение элемента управления
            if (selectedCase) {
                this.state.services.refCasesService.getCaseTitleName(selectedCase.uniqueId).then((title) => {

                    let displayValue = {
                        id: selectedCase.uniqueId,
                        name: title
                    } as Models.RefCasesCaseDisplayModel;

                    this.setValue(displayValue, true);
                });

                if (this.state.dialog) {
                    this.state.dialog.Hide();
                    this.state.dialog = null;
                }
            }
        };

        // Устанавливается обработчик нажатия кнопки ОК
        params.buttonOkFunction = okFunction;

        // Получаем текущее значение элемента управления
        const value = this.getValue();
        this.state.dialog = new ModalWindow(params);

        // Формируем диалоговое окно
        renderModalContent(this.state.dialog, (
            <RefCasesSelectDialog key={this.state.name + "_Modal"} ref={(el) => controlInModal = el}
                rootSectionId={this.state.rootSection}
                services={this.state.services}

                // Кнопка ОК включается при выборе Дела  
                nodeSelected={(node) => {
                    if (this.state.dialog) {
                        if (node) this.state.dialog.OkButtonElement.classList.remove("disabled");
                        else this.state.dialog.OkButtonElement.classList.add("disabled");
                    }
                }}

                // Обработчик для двойного щелчка по делу - аналогично нажатию кнопки ОК
                nodeAccepted={okFunction} />
        ));

        this.state.dialog.Show();
        this.state.dialog.OkButtonElement.classList.add("disabled");
    }


    // Поле для ввода текста, к которому добавляется стандартная кнопка выбора значения из справчника
    protected renderInputWithPlaceholder(): React.ReactNode {

        // Кнопка открытия справочника. Отключается, если нет прав на операцию редактирования
        let buttons: IBoxWithButtonsButtonInfo[] = [
            {
                onClick: this.showDictionary,
                name: "open-dictionary",
                iconClassName: "open-dictionary-button-icon dv-ico dv-ico-dictionary",
                visible: this.editAvailable,
                title: resources.RefCases_SelectFromDirectory,
                disabled: !this.editAvailable,
                tabIndex: this.getTabIndex(),
            }
        ];

        // Формируем элемент с быстрым поиском
        return (
            <Typeahead className={"universal-directory-box"} extraButtons={buttons}
                findItems={this.findItems} 
                clearButton={this.hasValue()} 
                searchText={this.state.inputText}
                afterOpenCallback={() => this.afterOpenCallback()}
                popoverClassName={this.state.standardCssClass} 
                popoverAttributes={{ "data-control-name": this.state.name }}
                inputKeyDown={this.state.inputKeyDown} 
                onSelected={this.onSelected}
                disabled={!this.editAvailable} 
                ref={this.attachTypeahead}>
                {super.renderInputWithPlaceholder()}
            </Typeahead>
        );
    }

    // Обработчик события быстрого поиска по справочнику
    protected findItems(typeaheadQuery: ITypeaheadSearchQuery): Promise<ITypeaheadSearchResult> {
        return new Promise<ITypeaheadSearchResult>((resolve, reject) => {
            this.state.services.refCasesService.searchCase(typeaheadQuery.searchText, typeaheadQuery.skipCount, typeaheadQuery.maxCount, this.state.rootSection).then(response => {               
                let result = {
                    // Результаты поиска, д.б. приведены к ITypeaheadSearchResult
                    items: response.items.map(item => new CaseTypeaheadVariant(item)),

                    // Флаг, сообщающий о наличии результатов, не включенных в данный ответ
                    hasMore: response.hasMore
                } as ITypeaheadSearchResult;
                resolve(result);
            }).catch(reject);
        });
    }

    // Обработчик выбора элемента из результатов поиска
    protected onSelected(variant: ITypeaheadVariant) {
        let caseVariant = variant as CaseTypeaheadVariant;
        this.setValue(caseVariant && caseVariant.data || null, true);
        this.focusInput();
    }

    // Установка фокуса на основной элемент управления
    private focusInput() {
        if (this.getInputElem()) {
            this.getInputElem().focus();
        }
    }

    // Закрытия 
    private afterOpenCallback = () => {
        if (this.state.dialog && this.state.dialog.IsOpened) {
            this.typeahead.closeDropdown();
        }
    }

    protected attachTypeahead(t: Typeahead) {
        this.typeahead = t;
    }

    // Получение значения для отображения в поле ввода текста
    protected getTextValue(): string {
        return this.getValue() && this.getValue().name || "";
    }

    // Обработчик нажати клавиши
    protected onInputKeyDown(ev: React.KeyboardEvent<any>) {
        super.onInputKeyDown(ev);
        this.state.inputKeyDown.trigger(ev);
    }

    // Рендерит элемент управления в RefCases
    protected renderInto(props: RefCasesParams, container: HTMLElement): void {
        ReactDOM.render(<RefCases {...props} key={props.name} />, container);
    }
}