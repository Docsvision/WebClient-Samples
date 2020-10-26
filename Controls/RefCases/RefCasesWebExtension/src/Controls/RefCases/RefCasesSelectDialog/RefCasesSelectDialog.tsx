
import React from "react";
import { $LayoutDirectoryDesignerController } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";
import { DynamicTree } from "@docsvision/webclient/Helpers/DynamicTree/DynamicTree";
import { IDynamicTreeNodeData } from "@docsvision/webclient/Helpers/DynamicTree/IDynamicTreeNodeData";
import { TreeNode } from "@docsvision/webclient/Helpers/Tree/Data/ClientModels/TreeNode";
import { CommonComboBox } from "@docsvision/webclient/Helpers/ComboBox/CommonComboBox";
import { PopoverComboBoxBodyContent } from "@docsvision/webclient/Helpers/ComboBox/Helpers/PopoverComboBoxBodyContent";
import { PopoverMode } from "@docsvision/webclient/Helpers/PopoverHelpers/Popover";
import { IComboBoxElement } from "@docsvision/webclient/Helpers/ComboBox/Data/ClientModels/IComboBoxElement";
import { $RefCasesService } from "../../../Services/refCasesServices";
import { $EditOperationStore, $LayoutInfo } from "@docsvision/webclient/System/LayoutServices";
import { RequestHelper } from "@docsvision/webclient/System/RequestHelper";
import { RefCasesSectionTreeNode } from "../Data/ClientModels/RefCasesSectionTreeNode";
import { RefCasesCaseTreeNode } from "../Data/ClientModels/RefCasesCaseTreeNode";
import { resources } from "@docsvision/webclient/System/Resources";



/** @internal */
export interface IRefCasesSelectDialogProps {
    // Обработчики выбора узла Дела
    nodeSelected: (node: RefCasesCaseTreeNode) => void;
    nodeAccepted: (node: RefCasesCaseTreeNode) => void;

    // Корневой раздел
    rootSectionId?: string;
    services?: $LayoutDirectoryDesignerController & $EditOperationStore & $LayoutInfo & $RefCasesService;
}

/** @internal */
export interface IRefCasesSelectDialogState extends IRefCasesSelectDialogProps {
    requestHelper: RequestHelper;
    
    // Выбранный узел Дела
    selectedCaseNode: RefCasesCaseTreeNode;
    
    // Поле для хранения списка лет
    years: IComboBoxElement[];
    
    // Выбранные Год и Раздел
    selectedYearID: string;
    selectedSectionID: string;

    // Состояния отображения элементов для выбора Года, Раздела и Дела
    showYearsList: boolean;
    showSectionsTree: boolean;
    showCasesTree: boolean;
}

/** @internal */
export class RefCasesSelectDialog extends React.Component<IRefCasesSelectDialogProps, IRefCasesSelectDialogState> {

    /** @internal */
    state: IRefCasesSelectDialogState;

    constructor(props: IRefCasesSelectDialogProps) {
        super(props);

        this.state = {} as IRefCasesSelectDialogState;
        this.state.requestHelper = new RequestHelper(() => this.forceUpdate());

        this.collectYearsList = this.collectYearsList.bind(this);
        this.loadSectionsTree = this.loadSectionsTree.bind(this);
        this.loadCasesTree = this.loadCasesTree.bind(this);

        this.onSectionNodeSelected = this.onSectionNodeSelected.bind(this);
        this.onCaseNodeSelected = this.onCaseNodeSelected.bind(this);
        this.onCaseNodeAccepted = this.onCaseNodeAccepted.bind(this);

        // Загружаем список лет из справочника
        this.collectYearsList();
    }

    // Предоставляет доступ к выбранному Делу внешним компонентам
    public get selectedCase() {
        return this.state.selectedCaseNode;
    }

    // Загружает из Справочника номенклатуры дел 5 список лет в state.years, который является источником данных для элемента управления CommonComboBox
    protected collectYearsList() {
        // Если установлен раздел, из которого возможен выбор дел - rootSectionId, будет возвращен только год с данным разделом
        this.props.services.refCasesService.getYears(this.props.rootSectionId).then((items) => {
            this.state.years = items.map(x => ({
                id: x.id,
                title: x.displayValue
            } as IComboBoxElement));
     
            // Показываем элемент со списком лет
            this.setState({ showYearsList: true });
        });
    }

    // Возвращает  список разделов из Справочника номенклатуры дел 5
    protected loadSectionsTree(): Promise<IDynamicTreeNodeData[]> {
        return new Promise<IDynamicTreeNodeData[]>((resolve, reject) => {
            this.state.requestHelper.send(
                () => this.props.services.refCasesService.getSections(this.state.selectedYearID, this.props.rootSectionId),
                items => {
                    let nodes = RefCasesSectionTreeNode.Create(items);
                    resolve(nodes);
                },
                reject);
        });
    }

    // Возвращает  список дел из Справочника номенклатуры дел 5
    protected loadCasesTree(): Promise<IDynamicTreeNodeData[]> {
        return new Promise<IDynamicTreeNodeData[]>((resolve, reject) => {
            this.state.requestHelper.send(
                () => this.props.services.refCasesService.getCases(this.state.selectedSectionID),
                items => {
                    let nodes = RefCasesCaseTreeNode.Create(items);
                    resolve(nodes);
                },
                reject);
        });
    }

    // Загружает список дел после выбора раздела
    protected onSectionNodeSelected(node: TreeNode) {
        this.state.selectedSectionID = node.uniqueId;
        
        this.state.selectedCaseNode = null;
        this.props.nodeSelected && this.props.nodeSelected(null);
        
        this.setState({ showCasesTree: false }, () => this.setState({ showCasesTree: true }));
    }

    // Сохраняет дело в selectedNode после его выбора в списке дел
    protected onCaseNodeSelected(node: TreeNode) {
        this.state.selectedCaseNode = node.data as RefCasesCaseTreeNode;
        this.props.nodeSelected && this.props.nodeSelected(node.data as RefCasesCaseTreeNode);
    }

    // Сохраняет дело в selectedNode после его выбора в списке дел и нажатия кнопки Выбрать
    protected onCaseNodeAccepted(node: TreeNode) {
        this.state.selectedCaseNode = node.data as RefCasesCaseTreeNode;
        this.props.nodeAccepted && this.props.nodeAccepted(node.data as RefCasesCaseTreeNode);
    }

    // Инициализация интерфейса
    render(): React.ReactNode {

        // Список лет
        let yearsList = <div>{resources.RefCases_Years}
            <CommonComboBox elements={this.state.years} selectedID={this.state.selectedYearID}
            onChange={(selectedElement: IComboBoxElement) => {
                this.setState({ selectedYearID: selectedElement.id });
                this.setState({ showSectionsTree: false }, () => this.setState({ showSectionsTree: true }));
                this.setState({ showCasesTree: false });
                this.forceUpdate();
            }}

            renderElementList={(elements, expanded) =>
                <PopoverComboBoxBodyContent mode={PopoverMode.BottomDropdown} isOpen={expanded} className="combobox-helper">
                    {elements}
                </PopoverComboBoxBodyContent>
            } />
            </div>;


        // Дерево разделов
        let sectionsTree = <div className="ref-cases-dialog__tree">
            <div className="tree-block">{resources.RefCases_Sections}
                <DynamicTree loadNodes={this.loadSectionsTree} treeHeight={300} 
                nodeSelected={this.onSectionNodeSelected} >
                </DynamicTree>
            </div>
        </div>;

        // Список дел
        let casesTree = <div className="ref-cases-dialog__tree">
            <div className="tree-block">{resources.RefCases_Cases}
                <DynamicTree loadNodes={this.loadCasesTree} treeHeight={300} 
                nodeSelected={this.onCaseNodeSelected} nodeAccepted={this.onCaseNodeAccepted} >
                </DynamicTree>
            </div>
        </div>;

        return (
            <div>
                {this.state.showYearsList && yearsList}
                {this.state.showSectionsTree && sectionsTree}
                {this.state.showCasesTree && casesTree}
            </div>
        );
    }
}
