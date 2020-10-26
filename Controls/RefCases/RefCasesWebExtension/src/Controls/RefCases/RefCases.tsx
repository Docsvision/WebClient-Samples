import { InputBasedControlParams, InputBasedControl } from "@docsvision/webclient/System/InputBasedControl";
import { Models } from "./Data/CaseModel";
import { $LayoutDirectoryDesignerController } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";
import { $EditOperationStore, $LayoutInfo } from "@docsvision/webclient/System/LayoutServices";
import { RefCasesState, RefCasesImpl } from "./RefCasesImpl";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { at, handler } from "@docsvision/webclient/System/Handler";
import { cloneObject } from "@docsvision/webclient/System/CloneObject";
import { getBindingResult } from "@docsvision/webclient/System/GetBindingResult";
import { $RefCasesService } from "../../Services/refCasesServices";
import { editOperationAvailable } from "@docsvision/webclient/System/OperationUtils";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";

// Класс параметров
// Основной компонент элеменета управления основан на строке ввода InputBasedControl
export class RefCasesParams extends InputBasedControlParams<Models.RefCasesCaseDisplayModel> {

    /** Стандартный CSS класс со стилями элемента управления 
        Необходимо переопределить с собственным названием CSS класса */
    @r standardCssClass?: string = "ref-cases";

    /** Секция справочника, из которой разрешено выбирать дела.
        Настраивается в Конструкторе web-разметок. Может быть пустым (ограничение отсутствует) */
    @rw rootSection?: string;

    /** Клиентские сервисы
     $RefCasesService - собственный сервис для работы с данными Справочника номенклатуры дел 5 */
    @rw services?: $LayoutDirectoryDesignerController & $EditOperationStore & $LayoutInfo & $RefCasesService;
}

// Интерфейсный класс
export class RefCases extends InputBasedControl<Models.RefCasesCaseDisplayModel, RefCasesParams, RefCasesState>
{
    protected getServices(): $LayoutInfo {
        return this.state.services;
    }
    
    protected createParams(): RefCasesParams {
        return new RefCasesParams();
    }
    
    // Загружаем биндинг при инициализации элемента управления
    @handler("binding")
    protected set binding(binding: IBindingResult<Models.RefCasesCaseDisplayModel>) {
        this.value = binding && binding.value;
        this.state.canEdit = editOperationAvailable(this.state.services, binding);
        this.state.binding = binding;
    }

    // Возвращаем биндинги
    protected getBindings() {
        let binding = cloneObject(this.state.binding);
        return [getBindingResult(binding, this.params.value && this.params.value.id || null, () => at(RefCasesParams).labelText)];
    }

    // Предоставляем экземпляр реализации элемента управления Справочник номенклатуры дел 5
    protected createImpl() {
        return new RefCasesImpl(this.props, this.state);
    }
}