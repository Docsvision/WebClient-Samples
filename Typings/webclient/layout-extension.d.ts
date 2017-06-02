/** @internal  */
declare function outgoingDocument_loadPartnerDepartmentsInfo(sender: WebClient.LayoutControl): void;
/** @internal */
declare function outgoingDocument_clearEmptyPartnersTableRows(sender: WebClient.LayoutControl): JQueryPromise<{}>;
/** @internal */
declare function documentViewCardOpened(sender: WebClient.LayoutControl, e: WebClient.IEventArgs): void;
/** @internal */
declare function outgoingDocumentViewCardOpened(sender: WebClient.LayoutControl, e: WebClient.IEventArgs): void;
/** @internal */
declare function documentViewHeaderMouseOver(sender: WebClient.LayoutControl, e: WebClient.IEventArgs): void;
/** @internal */
declare function documentViewHeaderMouseOut(sender: WebClient.LayoutControl, e: WebClient.IEventArgs): void;
/** @internal */
declare function documentSaving(sender: WebClient.LayoutControl, e: WebClient.ICancelableEventArgs<WebClient.ISaveControlData>): boolean;
/** @internal */
declare function outgoingDocumentSaving(sender: WebClient.LayoutControl, e: WebClient.ICancelableEventArgs<WebClient.ISaveControlData>): void;
/** @internal */
declare function documentCreateMainFileAdding(sender: WebClient.LayoutControl, e: WebClient.ICancelableEventArgs<WebClient.IMainFileAddingArgs>): void;
declare namespace WebClient {
    abstract class BasicExtension implements IExtension {
        initialize(): void;
        getUrls(urlResolver: UrlResolver): IUrlMap;
    }
}
declare namespace WebClient {
    class LayoutExtension extends BasicExtension {
        constructor();
        initialize(): void;
        getUrls(urlResolver: UrlResolver): IUrlMap;
    }
}
declare namespace WebClient {
    class LayoutManager {
        protected layoutContainer: LayoutContainer;
        protected rootElementId: string;
        protected siteUrl: string;
        protected applicationTimestamp: number;
        /** Note, on view layouts save can be performed multiple times. On edit and create it should be performed once. */
        protected pageLeaveConfirmationDisabled: boolean;
        protected layoutUnloading: CancelableEvent<IEventArgs>;
        constructor(bootstrapperParams: ILayoutManagerParams);
        readonly RootHtmlElement: HTMLElement;
        readonly IsCardSaved: boolean;
        readonly cardLayout: Layout;
        readonly LayoutUnloading: ICancelableEvent<IEventArgs>;
        showCard(model: ILayoutCardModel): void;
        disablePageLeaveConfirmation(): void;
        deleteCard(cardId?: string): JQueryDeferred<any>;
        back(): void;
        protected loadExtensions(): void;
        protected initialize(model: ILayoutCardModel): void;
        destroy(): JQueryDeferred<any>;
        protected updateFolderStyle(cardTypeId: string): void;
        protected reactJsUnmount(): void;
        onBeforeWindowUnload(e: any): string;
        onWindowUnload(ev: any): void;
    }
}
declare var layoutManager: WebClient.LayoutManager;
declare namespace WebClient {
    /** @internal */
    class ServerController {
        protected postAction(args: IArguments): JQueryDeferred<any>;
        protected getAction(args: IArguments): JQueryDeferred<any>;
        protected prepareRequest(args: IArguments, method: RequestMethods): IRequestInfo;
        protected sendRequest(requestInfo: IRequestInfo): JQueryDeferred<any>;
        private findMetadataObject(args);
        private isMetadataObject(x);
    }
}
declare namespace WebClient {
    class LayoutStaffController extends ServerController {
        /**
         * Search for departments and organisations by typeahead logic.
         * @returns Departments and organisations, that match
         */
        FindDepartments(query: IDepartmentsSearchQuery): JQueryDeferred<IDepartmentsSearchResult>;
        /** Load departments and organisations when navigating over tree. */
        LoadDepartmentsTree(query: ILoadDepartmentsTreeQuery): JQueryDeferred<IDepartmentTreeDigest[]>;
        /** Load departments and organisations when searching over tree. */
        FindInDepartmentsTree(query: ISearchDepartmentsTreeQuery): JQueryDeferred<ISearchDepartmentsTreeResult>;
        /** Get department info, including email and phone. */
        GetDepartmentsInfo(departmentIds: string[], source?: DepartmentSource): JQueryDeferred<IDepartmentExtendedInfo[]>;
    }
    var layoutStaffController: LayoutStaffController;
}
declare namespace WebClient {
    /** Определяет возможные справочники c данными элемента управления [Подразделение]{@link Department}. */
    enum DepartmentSource {
        /** Справочник сотрудников. */
        StaffDirectory = 0,
        /** Справочник контрагентов. */
        PartnersDirectory = 1,
    }
}
declare namespace WebClient {
    enum DepartmentType {
        Organisation = 0,
        Department = 1,
    }
}
declare namespace WebClient {
    interface IDepartmentDigest extends IDepartmentInfo {
        departmentType: DepartmentType;
    }
}
declare namespace WebClient {
    interface IDepartmentExtendedInfo extends IDepartmentInfo {
        email: string;
        phone: string;
    }
}
declare namespace WebClient {
    interface IDepartmentInfo {
        id: string;
        name: string;
        fullName: string;
    }
}
declare namespace WebClient {
    /** Query, that would be sent by Department control in quick search mode */
    interface IDepartmentsSearchQuery {
        /** Search text, entered by user in quick search field */
        searchText: string;
        /** Search over departments, organisations or both */
        itemTypes: SearchDepartmentType;
        /** Count of items to skip (paginator logic) */
        skipCount: number;
        /** Max items count in the result */
        maxCount: number;
        /** Where to perform the search */
        source: DepartmentSource;
    }
}
declare namespace WebClient {
    interface IDepartmentsSearchResult {
        items: IDepartmentDigest[];
        hasMore: boolean;
    }
}
declare namespace WebClient {
    interface IDepartmentTreeDigest extends IDepartmentInfo {
        departmentType: DepartmentType;
        children?: IDepartmentTreeDigest[];
        childrenLoaded?: boolean;
    }
}
declare namespace WebClient {
    /** Query, that would be sent by Department control when user navigated over the tree. */
    interface ILoadDepartmentsTreeQuery {
        /** If specified, only chidren of this node shoudl be loaded. If value is not specified, root items will be returned.
          * If searchQuery provided, parameter should be ignored.
          */
        parentNodeId?: string;
        /** How deep into tree should we look.
          * Value "1" means only children of parent (or only root departments itself),
          * "2" - children and its children, etc. Default value 2.
          */
        treeLevelDown: number;
        /** Search over departments, organisations or both */
        itemTypes: SearchDepartmentType;
        /** Where to perform the search */
        source: DepartmentSource;
    }
}
declare namespace WebClient {
    /** Query, that would be sent by Department control when user search over the tree. */
    interface ISearchDepartmentsTreeQuery {
        /** Search over departments, organisations or both */
        itemTypes: SearchDepartmentType;
        /** Search query, entered by user. Result should contain tree,
          * enough to show n-th matched element, where n is searchResultNumber.
          * So, result shoudl contain element itself, and all its parent. It also
          * should contain root elements (without parent), to keep tree pretty when navigate between results.
          */
        searchQuery?: string;
        /** Number of matched by searchQuery element. See searchQuery for description.
          *  Used for next/prev buttons logic when searching over tree.
          */
        searchResultNumber?: number;
        /** Where to perform the search */
        source: DepartmentSource;
    }
}
declare namespace WebClient {
    interface ISearchDepartmentsTreeResult {
        /** Tree, containing found element, all its parents, and all root elements. */
        items: IDepartmentTreeDigest[];
        /** Total count of elements, that match search query */
        totalResultsCount: number;
        /** Number of matched by searchQuery element from the query. Enumerates from 1 to totalResultsCount. */
        searchResultNumber: number;
        /** Id of element, that matached search query */
        matchedElementId: string;
        /** Name of the field in the element, that matched search query, if this field is not Name (otherwise null). */
        matchedFieldName: string;
        /** Value of the matchedFieldName, if this field is not Name (otherwise null). */
        matchedFieldValue: string;
    }
}
declare namespace WebClient {
    enum SearchDepartmentType {
        None = 0,
        Department = 1,
        Organisation = 2,
    }
}
declare namespace WebClient {
    class LayoutLinksController extends ServerController {
        DeleteLink(cardId: string, info: ISimpleBindingInfo, linkId: string, timestamp: number): JQueryDeferred<ILinksDataModel>;
        PreviewCard(previewCardId: string): JQueryDeferred<string>;
        CardCreateLinks(allowedKinds: IAllowedCardKind[]): JQueryDeferred<IKindModel[]>;
        AddExistingCardLink(linkParams: ILayoutLinkCreateParams): JQueryDeferred<ILinksDataModel>;
        SetLinkDescription(data: ILayoutSetLinkDescriptionParams): JQueryDeferred<ILinksDataModel>;
    }
    var layoutLinksController: LayoutLinksController;
}
declare namespace WebClient {
    interface IAllowedCardKind {
        KindId: string;
        WithDescendants: boolean;
    }
}
declare namespace WebClient {
    interface IKindModel {
        cardTypeId: string;
        kindId: string;
        name: string;
        kinds: IKindModel[];
        notAvailable: boolean;
        layoutAvailable: boolean;
    }
}
declare namespace WebClient {
    interface ILayoutLinkCreateParams {
        sourceCardId: string;
        sourceCardTimestamp: number;
        destinationCardId: string;
        linkTypeId: string;
        linksBinding: ISimpleBindingInfo;
        saveHardLink: boolean;
    }
}
declare namespace WebClient {
    interface ILayoutSetLinkDescriptionParams {
        cardId: string;
        bindingInfo: ISimpleBindingInfo;
        linkId: string;
        newDescription: string;
        timestamp: number;
    }
}
declare namespace WebClient {
    interface ILinkItemData {
        linkId: string;
        displayName: string;
        linkTypeName: string;
        kind: LinkKind;
        cardId: string;
        creationDate?: Date;
        authorDisplayName: string;
        description: string;
    }
}
declare namespace WebClient {
    interface ILinksDataModel {
        links: ILinkItemData[];
        bindingInfo: ISimpleBindingInfo;
        allowedLinkCardTypes: string[];
    }
}
declare namespace WebClient {
    interface ILinkType {
        LinkTypeId: string;
        Caption: string;
        DisplayName: string;
    }
}
declare namespace WebClient {
    class LayoutFolderController extends ServerController {
        CheckFolderForAvailableCardKind(folderId: string, cardId: string): JQueryDeferred<ICheckResult>;
        GetUserFoldersTreeData(folderId?: string): JQueryDeferred<IFolderInfo[]>;
        protected parseFoldersTreeData(data: any): IFolderInfo[];
        protected parseServerFolderInfo(src: any, folderInfo: IFolderInfo): void;
    }
    var layoutFolderController: LayoutFolderController;
}
declare namespace WebClient {
    /** Определяет возможные варианты выбора папки по умолчанию. */
    enum FolderMode {
        /** Не использовать папку по умолчанию. */
        NoDefaultValue = 0,
        /** Использовать текщую папку, как папаку по умолчанию. */
        DefaultValueIsCurrentFolder = 1,
    }
}
declare namespace WebClient {
    enum FolderType {
        Regular = 1,
        Virtual = 4,
        Delegate = 8,
        System = 16,
    }
}
declare namespace WebClient {
    interface ICheckResult {
        passed: boolean;
        failReason: string;
    }
}
declare namespace WebClient {
    /** Предоставляет информацию о папке.  */
    interface IFolderInfo {
        /** Название папки. */
        name: string;
        /** Идентификатор папки. */
        folderId: string;
        /** Uri папки. */
        additionalId: string;
        /** Тип папки. */
        folderType: FolderType;
        /** Флаг, указывающий, возможно ли создание карточек в папке: true - запрещено (для виртуально папки), false - возможно. */
        disabled: boolean;
        /** Информация о подчиненных папках. */
        children: IFolderInfo[];
    }
}
declare namespace WebClient {
    class LayoutFileController extends ServerController {
        GetFiles(cardId: string): JQueryDeferred<IFileListDataModel>;
        LockFile(ownerCardId: string, fileCardId: string): JQueryDeferred<IFileListDataModel>;
        UnlockFile(ownerCardId: string, fileCardId: string): JQueryDeferred<IFileListDataModel>;
        DeleteFile(ownerCardId: string, fileCardId: string, timestamp: number): JQueryDeferred<IFileListDataModel>;
    }
    var layoutFileController: LayoutFileController;
}
declare namespace WebClient {
    interface IFileListDataModel {
        timestamp: number;
        files: ILayoutFileModel[];
        hasAnySignature: boolean;
    }
}
declare namespace WebClient {
    interface IFileVersion {
        id: string;
        versionId: string;
        versionPath: string;
        versionNumber: number;
        author: string;
        creationDate: Date;
        comments: IVersionComment[];
    }
}
declare namespace WebClient {
    interface ILayoutFileModel {
        name: string;
        fileId: string;
        fileCardId: string;
        isLocked: boolean;
        isFilePreviewSupported: boolean;
        currentVersion: IFileVersion;
        childVersions: IFileVersion[];
        hasFileSignature: boolean;
        isMain: boolean;
        webDavLink: string;
        webDavReadonlyLink: string;
    }
}
declare namespace WebClient {
    interface IVersionComment {
        id: string;
        date: Date;
        comment: string;
        author: string;
    }
}
declare namespace WebClient {
    class LayoutDocumentController extends ServerController {
        /**
         * Generates new number, assign it to the card and return new number as response.
         * @param cardId ID of the card be new number generated for.
         * @param generationRuleId The ID of the rule for new number generation.
         * @param save Should save generated value into the card or not.
         * @returns Generated number
         */
        GenerateNumber(cardId: string, generationRuleId: string, info: IBindingInfoExt, save: boolean): JQueryDeferred<any>;
        /**
         * Resets the card number and removes it.
         */
        ReleaseNumber(cardId: string, numberId: string, info: IBindingInfoExt): JQueryDeferred<void>;
        SendForAcquaintance(cardId: string, employeeIds: string[], endDate?: Date): JQueryDeferred<any>;
    }
    var layoutDocumentController: LayoutDocumentController;
}
declare namespace WebClient {
    interface INumberInfo {
        id: string;
        number: string;
        bindingInfo: IBindingInfoExt;
    }
}
declare namespace WebClient {
    class LayoutDirectoryDesignerController extends ServerController {
        private testDigetValues;
        private testTreeDigestValues;
        /**
         * Search for rows by typeahead logic.
         * @returns Rows that match search query
         */
        FindRows(query: IDirectoryDesignerSearchQuery): JQueryDeferred<IDirectoryDesignerSearchResult>;
        /** Load directory nodes when navigating over tree. */
        LoadTree(query: IDirectoryDesignerLoadTreeQuery): JQueryDeferred<IDirectoryDesignerTreeNodeDigest[]>;
        /** Load departments and organisations when searching over tree. */
        FindInTree(query: IDirectoryDesignerSearchTreeQuery): JQueryDeferred<IDirectoryDesignerSearchTreeResult>;
        findNodeRec(current: IDirectoryDesignerTreeNodeDigest[], idToFind: string): IDirectoryDesignerTreeNodeDigest;
    }
    var layoutUnversalDirectoryController: LayoutDirectoryDesignerController;
}
declare namespace WebClient {
    /**
    * Определяет возможные области выбора строк из [Конструктора справочников]{@link DirectoryDesignerRow}.
    */
    enum DirectoryDesignerAreas {
        /** Только из указанного узла. */
        OnlyNode = 0,
        /** Только из дочерних узлов указанного узла. */
        OnlyChildren = 1,
        /** Из указанного узла и его дочерних узлов. */
        NodeWithChildren = 2,
    }
}
declare namespace WebClient {
    enum DirectoryDesignerNodeType {
        /** Узел справочника */
        Node = 0,
        /** Строка справочника */
        Row = 1,
    }
}
declare namespace WebClient {
    /** Query, that would be sent by UnivarsalDirectory control when user navigated over the tree. */
    interface IDirectoryDesignerLoadTreeQuery {
        /** Root node, where search according to searchArea value should be performed.
          * If value does not sepcified, then all root nodes of directory should be watched.  */
        rootNodeId?: string;
        /** If parentNodeId specified, this value determines, whether we should look node,
          * its children, or everywhere */
        searchArea?: DirectoryDesignerAreas;
        /** If specified, only chidren of this node should be loaded. If value is not specified, root items will be returned.
          */
        currentNodeId?: string;
        /** How deep into tree should we look.
          * Value "1" means only children of currentNodeId (or only root node itself, if currentNodeId is null),
          * "2" - children and its children, etc.
          */
        treeLevelDown: number;
    }
}
declare namespace WebClient {
    interface IDirectoryDesignerRowDigest extends IDirectoryDesignerRowInfo {
    }
}
declare namespace WebClient {
    interface IDirectoryDesignerRowInfo {
        id: string;
        name: string;
    }
}
declare namespace WebClient {
    /** Query, that would be sent by UnversalDirectory control in quick search mode */
    interface IDirectoryDesignerSearchQuery {
        /** Root node, where search according to searchArea value should be performed.
          * If value does not sepcified, then all root nodes of directory should be watched.  */
        rootNodeId?: string;
        /** If parentNodeId specified, this value determines, whether we should look node,
          * its children, or everywhere */
        searchArea?: DirectoryDesignerAreas;
        /** Search text, entered by user in quick search field */
        searchText: string;
        /** Count of items to skip (paginator logic) */
        skipCount: number;
        /** Max items count in the result */
        maxCount: number;
    }
}
declare namespace WebClient {
    interface IDirectoryDesignerSearchResult {
        items: IDirectoryDesignerRowDigest[];
        hasMore: boolean;
    }
}
declare namespace WebClient {
    /** Query, that would be sent by UnversalDirectory control when user search over the tree. */
    interface IDirectoryDesignerSearchTreeQuery {
        /** Root node, where search according to searchArea value should be performed.
          * If value does not sepcified, then all root nodes of directory should be watched.  */
        rootNodeId?: string;
        /** If parentNodeId specified, this value determines, whether we should look node,
          * its children, or everywhere */
        searchArea?: DirectoryDesignerAreas;
        /** Search query, entered by user. Result should contain tree,
          * enough to show n-th matched element, where n is searchResultNumber.
          * So, result shoudl contain element itself, and all its parent. It also
          * should contain root elements (without parent), to keep tree pretty when navigate between results.
          */
        searchQuery?: string;
        /** Number of matched by searchQuery element. See searchQuery for description.
          *  Used for next/prev buttons logic when searching over tree.
          */
        searchResultNumber?: number;
    }
}
declare namespace WebClient {
    interface IDirectoryDesignerSearchTreeResult {
        /** Tree, containing found element, all its parents, and all root elements. */
        items: IDirectoryDesignerTreeNodeDigest[];
        /** Total count of elements, that match search query */
        totalResultsCount: number;
        /** Number of matched by searchQuery element from the query. Enumerates from 1 to totalResultsCount. */
        searchResultNumber: number;
        /** Id of element, that matched search query */
        matchedElementId: string;
        /** Name of the field in the element, that matched search query, if this field is not Name (otherwise null). */
        matchedFieldName: string;
        /** Value of the matchedFieldName, if this field is not Name (otherwise null). */
        matchedFieldValue: string;
    }
}
declare namespace WebClient {
    interface IDirectoryDesignerTreeNodeDigest {
        name: string;
        nodeType: DirectoryDesignerNodeType;
        id: string;
        children?: IDirectoryDesignerTreeNodeDigest[];
        childrenLoaded?: boolean;
    }
}
declare namespace WebClient {
    class LayoutCardController extends ServerController {
        Save(model: ISaveControlData): JQueryDeferred<any>;
        ChangeState(changeStateDataModel: IChangeStateData): JQueryDeferred<ILayoutCardModel>;
        /** Loads controls for specific tab page. */
        GetLayoutPart(layoutPartParams: ILayoutPartParams): JQueryDeferred<ILayoutModel>;
        CheckModifiedAndLocked(cardId: string, timestamp: number, refresh?: boolean): JQueryDeferred<any>;
        Delete(cardId: string): JQueryDeferred<any>;
    }
    var layoutCardController: LayoutCardController;
}
declare namespace WebClient {
    interface IChangeStateData {
        cardId: string;
        operationId: string;
        layoutType: number;
        comment?: string;
    }
}
declare namespace WebClient {
    interface ILayoutPartParams {
        cardId: string;
        layoutType: number;
        rootControlName: string;
        includeRootControl: boolean;
    }
}
declare namespace WebClient {
    interface ISaveControlData {
        cardId: string;
        layoutType: number;
        bindings: IBindingsWriteRequest[];
        createAsLink: ICreateAsLinkParams;
        createInFolder: string;
        timestamp: number;
        /** Deffered object, that shows saving process */
        defered: JQueryDeferred<any>;
    }
}
declare namespace WebClient {
    interface IBindingInfoExt extends ISimpleBindingInfo {
        editOperation: string;
    }
}
declare namespace WebClient {
    /**
    * Модель данных карточки.
    */
    interface ICardInfoModel {
        /** Идентификатор карточки. */
        id: string;
        /** Идентификатор типа карточки. */
        typeId: string;
        /** Информация о блокировке, установленной на карточке. */
        lockInfo: ILockInfoModel;
        /** Штамп времени создания/изменения карточки. */
        timestamp: number;
        createAsLink: ICreateAsLinkParams;
        createInFolder: string;
        createInCurrentFolderForbidden: boolean;
    }
}
declare namespace WebClient {
    interface ICreateAsLinkParams {
        sourceCardId: string;
        sourceCardTimestamp: number;
        linkTypeId: string;
        linksBinding: ISimpleBindingInfo;
        saveHardLink: boolean;
    }
}
declare namespace WebClient {
    interface IExtendedLayoutModel extends ILayoutModel {
        layoutInfo: ILayoutInfoModel;
    }
}
declare namespace WebClient {
    interface ILayoutCardModel {
        layoutModel: IExtendedLayoutModel;
        cardInfo: ICardInfoModel;
    }
}
declare namespace WebClient {
    /**
    * Модель данных разметки карточки.
    */
    interface ILayoutInfoModel {
        /** Тип устройства, на котором открыта карточка. */
        deviceType: DeviceType;
        /** Используемая локаль. */
        localeId: number;
        /** Название используемой разметки. */
        name: string;
        /** Идентификатор используемой разметки. */
        id: string;
        /** Тип разметки. */
        type: LayoutType;
        /** Все операции редактирования, зарегистрированные для вида карточки в *Конструкторе состояний*. */
        operations: IEditOperation[];
    }
}
declare namespace WebClient {
    interface ILayoutModel {
        properties: any;
        children: ILayoutModel[];
        controlTypeName: string;
    }
}
declare namespace WebClient {
    interface ILockInfoModel {
        isLocked: boolean;
        accountName: string;
    }
}
declare namespace WebClient {
    interface ISimpleBindingInfo {
        fieldAlias: string;
        sectionId: string;
    }
}
declare namespace WebClient {
    /**
    * Тип разметки.
    */
    enum LayoutType {
        /** Разметка, предназначенная для просмотра карточки. */
        View = 0,
        /** Разметка, предназначенная для редактирования карточки. */
        Edit = 1,
        /** Разметка, предназначенная для создания карточки. */
        Create = 2,
    }
}
declare namespace WebClient {
    class LayoutAgreementController extends ServerController {
        GetAgreementList(cardId: string): JQueryDeferred<IAgreementListDataModel>;
        GetAgreementManagementModel(cardId: string): JQueryDeferred<ILayoutAgreementManagementModel>;
    }
    var layoutAgreementController: LayoutAgreementController;
}
declare namespace WebClient {
    /**
    * Содержит данные элемента управления [Лист согласования]{@link AgreementList}.
    */
    interface IAgreementListDataModel {
        /** Строки листа согласования. */
        items: IAgreementListItemModel[];
        /** Регистрационный номер документа, для которого получен лист согласования. */
        documentNumber: string;
        /** Название документа, для которого получен лист согласования. */
        documentName: string;
    }
}
declare namespace WebClient {
    /**
    * Содержит данные элемента в {@link IAgreementListItemModel}.
    */
    interface IAgreementListItemModel {
        /** Дата согласования. */
        date: Date;
        /** Отображаемое имя согласующего. */
        employeeDisplayText: string;
        /** Подразделение согласующего. */
        departmentName: string;
        /** Комментарий к решению. */
        comment: string;
        /** Отображаемое значение решения по согласованию. */
        decisionText: string;
    }
}
declare namespace WebClient {
    interface ILayoutAgreementManagementModel {
        isNew: boolean;
        enableCreate: boolean;
        createDisableReason: string;
        agreementCardId: string;
        stateType: AgreementStateType;
        documentTimestamp: number;
    }
}
declare namespace WebClient {
    interface ILayoutManagerParams {
        rootElementId: string;
        applicationTimestamp: number;
        siteUrl: string;
        resources: IResourcesMap;
    }
}
declare namespace WebClient {
    interface IValidationParams {
        ShowErrorMessage: boolean;
    }
}
declare namespace WebClient {
    interface IValidationResult {
        Passed: boolean;
        Message: string;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IBoxWithButtonsProps {
        /** Tooltip of the menu item */
        title?: string;
        /** Text or JSX.Element that repersents a box content */
        children?: any;
        /** Custom class for menu item */
        className?: string;
        /** ReactJS key */
        key?: string;
        /** Shows loading incon at the left of the buttons */
        loadingState?: LoadingState;
        /** Buttons, that will be showed on the right side of the box */
        buttons: IBoxWithButtonsButtonInfo[];
        /** Show buttons inside the box with absolute positioning. Defautl value: false */
        buttonsInside?: boolean;
    }
    /** @internal */
    interface IBoxWithButtonsButtonInfo extends IIconButtonProps {
        /** If value is true, then button will hiden by zero-opacity, and shown on box hover
          *  Default value: false
          */
        showOnlyOnHover?: boolean;
    }
    /** @internal */
    class BoxWithButtonsDefault {
        /**
         * Creates IBoxWithButtonsButtonInfo with default values, that forms clear button.
         * @param props Overrides of default values
         *
         * @internal
        */
        static clearButton(props?: IBoxWithButtonsButtonInfo): IBoxWithButtonsButtonInfo;
    }
    /** Represents a box with buttons at the right side.
      * Usage example:
      *  <BoxWithButtons buttons={[BoxWithButtonsDefault.clearButton({ onClick: this.onClearClick })]} >
      *     { super.renderInput() }
      *  </BoxWithButtons>
      * @internal
      */
    const BoxWithButtons: (props: IBoxWithButtonsProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface IButtonProperties {
        /** Text value to show */
        text?: string;
        /** Show specified icon to the left of the text.
          * Class should define width and heihgt background, representing an icon
          * Preffered icon width is 18px (it is loading icon width), but you can use icon of any size.
          * If icon is not 18x18, then you should setup loadingIconClass, and specify your loading icon,
          * otherwise text will jump on loading on and off.
          * Default value: null
          */
        iconClass?: string;
        /** Show loading icon (instead of specified in iconClass)
          * Default value: false
          */
        loading?: boolean;
        /** Icon class when loading is true.
          * Default value: "dv-ico icon-spin loader-animate"
          */
        loadingIconClass?: string;
        /** Default value: true */
        visible?: boolean;
        /** Additional classes */
        className?: string;
        /** Click element handler. Called also on enter and space key down, when button is focused. */
        onClick?: (ev: React.MouseEvent) => void;
        /** Key down handler */
        onKeyDown?: (ev?) => void;
        /** Called on button focus */
        onFocus?: (ev?) => void;
        /** Called on button blur */
        onBlur?: (ev?) => void;
        /** Should be button 100% width or not.
          * Default value: true
          */
        stretchWidth?: boolean;
        /** Tooltip */
        title?: string;
        /** Display button with specific style
          * Default value: false
          */
        primaryButton?: boolean;
        /** How button text and icon should be aligned.
          * Default value: ButtonAlignModes.Center
          */
        align?: ButtonAlignModes;
        /** Tab index */
        tabIndex?: number;
        /** Content of the button (can be used instead of text) */
        children?: any;
        /** Support for attaching to root element */
        attach?: (instance: HTMLElement) => any;
        /** Value of attribute data-button-name for autotesting purposes */
        name?: string;
        /** If buton disabled it will have specific visual style and onClick will not be raised. Default value: false */
        disabled?: boolean;
    }
    /** @internal */
    enum ButtonAlignModes {
        Center = 0,
        Left = 1,
    }
    /** Represents a button with icon @internal */
    const Button: (props: IButtonProperties) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface ICommandBarButtonProps {
        /** Supposed, that initial state is "false". In that state button looks like "+". */
        /** Changin value to "true" initiates animated rotation to 45 degrees (button become like "x") */
        expanded: boolean;
        /** Button action. You may want to change "expanded" state in this handler. */
        onClick(event: React.MouseEvent): void;
        /** Additional class for element */
        className?: string;
        visible?: boolean;
        /** Value of attribute data-button-name for autotesting purposes */
        name?: string;
        /** Tooltip */
        title?: string;
    }
    /** Represents animated button, that looks like plus sign in collapsed state, and like "x" in expanded.
      * See also: CommandBarHelper
      * @internal
      */
    const CommandBarButton: (props: ICommandBarButtonProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface IHighlightedSearchResultProps {
        /** Search result text */
        text: string;
        /** Search text, that should be higlighted */
        searchQuery: string;
        /** Search result title */
        title?: string;
        /** Custom class */
        className?: string;
        /** React key */
        key?: any;
        /** Should crop long text with ellipsis or not. Default value: true */
        useEllipsis?: boolean;
    }
    /** @internal Represents a text, where search match is highlighted
      * Usage example:
      *     <HighlightedSearchResult text={item.name} searchQuery={this.state.searchInput.value}  />
      */
    const HighlightedSearchResult: (props: IHighlightedSearchResultProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface IIconButtonProps {
        /** Tooltip for the button */
        title?: string;
        /** Class, that adds some icon background to the button */
        iconClassName?: string;
        /** Custom class. Should be used to add some icon for the button */
        className?: string;
        /** Class hide will be added, if value is false. Default value: true. */
        visible?: boolean;
        /** Button action */
        onClick: (event: React.MouseEvent) => void;
        /** Button name for autotesting purposes */
        name?: string;
        /** Makes button disabled view and prevent raise of onClic. Default value: false */
        disabled?: boolean;
    }
    /** @internal Represents a button, that looks like small icon
      * Usage example:
      *  <IconButton name="open-dictionary" onClick={this.onOpenDictionaryClick}
      *      iconClassName="dv-ico dv-ico-dictionary" visible={ super.getEditAvailable()}
      *      title={resources.Numerator_GenerateNewNumberTooltip}  />
      */
    const IconButton: (props: IIconButtonProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface ILabeledText {
        /** Label to text value */
        label: string;
        /** Text value to show */
        text: string | JSX.Element;
        /** If this parameter true and labelText specified, text stub (dashed line) will replace empty text.
          * Default value: false
          */
        showEmpty?: boolean;
        visible?: boolean;
        className?: string;
        /** Click on text element handler */
        onTextClick?: (ev: React.MouseEvent | React.KeyboardEvent) => void;
        /** Ref to text element handler */
        attachText?: (elem: HTMLElement) => void;
        /** Show colon after label or not. If value is AutoDots, then requirement for the colons will be detected automaticly.
          * Default value: AutoDots
          */
        labelDots?: LabelDotsMode;
        /** This param describes how value will be placed if control too narrow for it
          * If param is true, value will go to new line uner a label first
          * Otherwise it will occupy rest of space to the right of a label
          * Default value: true.
          */
        wrapLongTextUnderLabel?: boolean;
        /** If this parameter true, text will be rendered as clickable (blue and with dashed underline)
          * Default value: false
          */
        clickableText?: boolean;
        /** Tooltip */
        title?: string;
        /** Tooltip for value. If not specified, used title value */
        valueTitle?: string;
        /** Tab index for case, when onTextClick specified */
        tabIndex?: number;
    }
    /** @internal */
    enum LabelDotsMode {
        Dots = 0,
        NoDots = 1,
        AutoDots = 2,
    }
    /** @internal */
    const LabeledText: (props: ILabeledText) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface IMenuBarItemProps {
        /** Tooltip of the menu item */
        title?: string;
        /** Text or JSX.Element that repersents menu item look */
        children?: any;
        /** Command action */
        onClick?(event: React.MouseEvent): void;
        /** Class "hide" will be added to command if visible = false */
        visible?: boolean;
        /** Custom class for menu item */
        className?: string;
        /** ReactJS key */
        key: string;
        /** Name for autotest purposes */
        name: string;
    }
    /** @internal */
    interface IMenuBarProps {
        expanded: boolean;
        /** Children tags, created by MenuBarItem */
        children?: JSX.Element;
        className?: string;
    }
    /** @internal Represents popup menu bar
      * Command items should be rendered with MenuBarItem.
      * Usage example:
      *  <MenuBar expanded={this.state.menuBarExpanded} >
      *     <MenuBarItem onClick={() => console.info("Command 1 clicked") } >
      *        Command 1
      *     </MenuBarItem>
      *     <MenuBarItem onClick={() => console.info("Command 2 clicked")} >
      *        Command 2
      *     </MenuBarItem>
      *  </MenuBar>
      */
    const MenuBar: (props: IMenuBarProps) => JSX.Element;
    /** @internal */
    const MenuBarItem: (props: IMenuBarItemProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal Logic to send search request to server with delay while user input quick search text.
      *
      */
    class QuickSearchLogic {
        private searchTimerHandle;
        private searchIndex;
        private searchCallback;
        private searchTimeout;
        constructor(searchCallback: Function, searchIndex?: number, searchTimeout?: number);
        processInput(newText: string): void;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITabsNavPanelItemProps {
        /** Active tab will be highlighted */
        active: boolean;
        /** Handler, that switch active tab */
        onClick(event: React.MouseEvent | React.KeyboardEvent): void;
        /** Tooltip of the menu item */
        title?: string;
        /** Text or JSX.Element that repersents menu item look */
        children?: any;
        /** Class "hide" will be added to command if visible = false */
        visible?: boolean;
        /** Custom class for menu item */
        className?: string;
        /** ReactJS key */
        key?: string;
        /** Name for autotest purposes */
        name: string;
        /** State of the tab content loading */
        loadingState?: LoadingState;
        /** Should tab item have positive tab index */
        tabIndex?: number;
    }
    /** @internal */
    interface ITabsNavPanelProps {
        /** Children tags, created by MenuBarItem */
        children?: JSX.Element;
        className?: string;
        /** Should tabs fill all width of the tabs. Default value: true */
        stretchTabs?: boolean;
    }
    /** @internal Represents a row of tabs (only links, without tab content management)
      * Tab items should be rendered with TabsNavPanelItem.
      * Usage example:
      *  <TabsNavPanel expanded={this.state.menuBarExpanded} >
      *     <TabsNavPanelItem active={this.state.activeTab == 0} onClick={() => this.setState({ activeTab: 0 }); } >
      *        Tab 1
      *     </TabsNavPanelItem>
      *     <TabsNavPanelItem active={this.state.activeTab == 1} onClick={() => this.setState({ activeTab: 1 });} >
      *        Tab 2
      *     </TabsNavPanelItem>
      *  </TabsNavPanel>
      */
    const TabsNavPanel: (props: ITabsNavPanelProps) => JSX.Element;
    /** @internal */
    const TabsNavPanelItem: (props: ITabsNavPanelItemProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface ITypeaheadProps {
        /** Curreint input value. */
        searchText: string;
        /** Child elements, containing input. */
        content?: any;
        /** Event, that translate input key down events */
        inputKeyDown: BasicEvent<React.KeyboardEvent>;
        /** Function, that send search request to the server. */
        findItems: (query: ITypeaheadSearchQuery) => JQueryDeferred<ITypeaheadSearchResult>;
        /** User selected some variant. */
        onSelected: (selectedVariant: ITypeaheadVariant) => void;
        /** Makes control readonly */
        disabled?: boolean;
        /** Callback function, that should focus input. */
        focusInput?: Function;
        /** How many symbols should user enter, before search request will be sent. Default value: 3 */
        searchIndex?: number;
        /** How often should send search requests, while user entereing text. Time interval in ms. Default value: 500ms. */
        searchTimeout?: number;
        /** Count of items shown, before 'show more' clicked. Default value: 8 */
        firstPageSize?: number;
        /** Count of items, loaded when user clicked 'show more' button. Default value 15 */
        nextPageSize?: number;
        /** Show clear button, or not. Default value: true */
        clearButton?: boolean;
        /** Show 'show variants' button, or not. Default value: false */
        showVariantsButton?: boolean;
        /** Custom class for show variants button. Default value: dv-ico ico-arrow-down */
        showVariantsButtonIconClass?: string;
        /** Special text, that will be sent in search query when requested all available results. Default value: null */
        showAllSearchText?: string;
        /** How loading queries should be performed. Default value: LoadOnlyNewItems */
        paginatorLoadLogic?: PaginatorLoadLogic;
        /** Some extra buttons info, that would be showed at the right side of the control */
        extraButtons?: IBoxWithButtonsButtonInfo[];
        /** Show buttons inside the box with absolute positioning. Defautl value: false */
        buttonsInside?: boolean;
        /** Tooltip */
        title?: string;
        /** Custom class for the control */
        className?: string;
        /** Control name, for the autotesting purposes */
        name?: string;
    }
    enum PaginatorLoadLogic {
        LoadOnlyNewItems = 0,
        LoadAllItems = 1,
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITypeaheadState {
        requestHelper: RequestHelper;
        variantsDropdownOpen: boolean;
        variants: TypeaheadItem[];
        hasMore: boolean;
        page: number;
        searchTimerHandle: number;
        loadingNextPage: boolean;
        focusedItem: TypeaheadItem;
        focusedShowMore: boolean;
        dropdownElem: HTMLElement;
        lastKeyDownProcessed: boolean;
        mounted: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    class Typeahead extends React.Component<ITypeaheadProps, ITypeaheadState> {
        static FirstPageSize: number;
        static NextPageSize: number;
        static SearchTimeout: number;
        constructor(props: ITypeaheadProps);
        componentWillUnmount(): void;
        componentDidMount(): void;
        closeDropdown(): void;
        openDropdown(): void;
        showAll(): void;
        protected onClearValueClick(): void;
        componentWillReceiveProps(nextProps: ITypeaheadProps, nextContext: any): void;
        protected getTextValue(): string;
        protected getFirstPageSize(): number;
        protected getNextPageSize(): number;
        protected getSearchIndex(): number;
        protected createItem(data: ITypeaheadVariant): TypeaheadItem;
        protected onSelected(item: TypeaheadItem): void;
        protected select(item: TypeaheadItem): void;
        protected loadVariants(searchText: string, page: number): Promise<ITypeaheadSearchResult>;
        protected readonly searchTimeout: number;
        protected onInputChange(newText: string): void;
        private documentClick(ev);
        protected onShowMore(): Promise<ITypeaheadSearchResult>;
        protected onShowVariants(): void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected onItemClick(ev: React.MouseEvent, item: TypeaheadItem): void;
        /** Contains logic for keyboard navigation */
        protected onDropdownKeydown(ev: React.KeyboardEvent): void;
        private rednerVariantText(item);
        protected renderVariant(x: TypeaheadItem): JSX.Element;
        protected attachDropdown(elem: HTMLElement): void;
        protected getFavoredVariants(): TypeaheadItem[];
        protected getUsualVariants(): TypeaheadItem[];
        protected getButtons(): IBoxWithButtonsButtonInfo[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal Query data, that would be sent by typeahead */
    interface ITypeaheadSearchQuery {
        /** Search text, entered by user in quick search field */
        searchText?: string;
        /** Count of items to skip (paginator logic) */
        skipCount: number;
        /** Max items count in the result */
        maxCount: number;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITypeaheadSearchResult {
        items: ITypeaheadVariant[];
        hasMore: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITypeaheadVariant {
        name: string;
        value: string;
        iconCssClass?: string;
        title?: string;
        favored?: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    class TypeaheadItem {
        data: ITypeaheadVariant;
        constructor(data: ITypeaheadVariant);
        getName(): string;
        getTitle(): string;
        getIconCssClass(): string;
        getValue(): string;
        getFavored(): boolean;
        htmlElement: HTMLElement;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITreeBaseProps<TreeNodeDataT extends ITreeNodeData> {
        data?: TreeNodeDataT[];
        levelIdent?: string;
        expandedToggleMarkerClass?: string;
        collapsedToggleMarkerClass?: string;
        multiSelect?: boolean;
        className?: string;
        toggleOnDisabledNodesClick?: boolean;
        expandedByDefault?: boolean;
        /** Callback function, that called, when node selected */
        nodeSelected?: (node: TreeNode) => void;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITreeBaseState {
        nodes: TreeNode[];
        selectedNodes: TreeNode[];
    }
}
declare namespace WebClient {
    /** @internal */
    class TreeBase<TreeNodeDataT extends ITreeNodeData, TProps extends ITreeBaseProps<TreeNodeDataT>, TState extends ITreeBaseState> extends React.Component<TProps, TState> {
        nodeExpandedEvent: SimpleEvent<TreeNode>;
        nodeCollapsedEvent: SimpleEvent<TreeNode>;
        nodeSelectedEvent: SimpleEvent<TreeNode>;
        constructor(props: TProps);
        setNodes(nodesData: TreeNodeDataT[], parentNode?: TreeNode): void;
        addNodes(nodesData: TreeNodeDataT[], parentNode?: TreeNode): void;
        selectNode(node: TreeNode, resetOthers?: boolean): void;
        toggleNode(node: TreeNode, expand: boolean, raiseEvent?: boolean): void;
        clearSelection(): void;
        readonly nodes: TreeNode[];
        readonly selectedNodes: TreeNode[];
        readonly selectedNode: TreeNode;
        readonly nodeSelected: SimpleEvent<TreeNode>;
        readonly nodeExpanded: SimpleEvent<TreeNode>;
        readonly nodeCollapsed: SimpleEvent<TreeNode>;
        findNode(predicat: (node: TreeNode) => boolean): TreeNode;
        findNodes(predicat: (node: TreeNode) => boolean): TreeNode[];
        protected findAllNodes(predicat: (node: TreeNode) => boolean, currentNodes: TreeNode[], result: TreeNode[]): void;
        protected onNodeSelected(node: TreeNode): void;
        protected onNodeExpanded(node: TreeNode): void;
        protected onNodeCollapsed(node: TreeNode): void;
        protected readonly levelIdent: string;
        protected readonly expandedToggleMarkerClass: string;
        protected readonly collapsedToggleMarkerClass: string;
        protected readonly multiSelect: boolean;
        protected isNodeSelected(node: TreeNode): boolean;
        protected loadData(data: ITreeNodeData[], level: number): TreeNode[];
        protected createNode(data: ITreeNodeData, level: number, children?: TreeNode[]): TreeNode;
        protected onToggleClick(node: TreeNode, event: React.SyntheticEvent): void;
        protected onNodeClick(node: TreeNode, event: React.MouseEvent): void;
        componentWillReceiveProps(nextProps: ITreeBaseProps<TreeNodeDataT>, nextContext: any): void;
        protected renderToggleMarker(node: TreeNode): JSX.Element;
        protected renderNode(node: TreeNode): any;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    class Tree extends TreeBase<ITreeNodeData, ITreeBaseProps<ITreeNodeData>, ITreeBaseState> {
        constructor(props: ITreeBaseProps<ITreeNodeData>);
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITreeNodeData {
        displayName: string | JSX.Element;
        uniqueId: string;
        iconClass: string;
        children: ITreeNodeData[];
        nodeClass?: string;
        disabled?: boolean;
        expandedByDefault?: boolean;
        title?: string;
    }
}
declare namespace WebClient {
    /** @internal */
    class TreeNode {
        constructor(data: ITreeNodeData, level: number, children?: TreeNode[]);
        children: TreeNode[];
        data: ITreeNodeData;
        level: number;
        expanded: boolean;
        htmlEement: HTMLElement;
        readonly displayName: string | JSX.Element;
        readonly title: string;
        readonly uniqueId: string;
        readonly iconClass: string;
        readonly nodeClass: string;
        readonly disabled: boolean;
        readonly expandedByDefault: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITableHelperProps {
        mode: TableHelperMode;
        className?: string;
        /** Children tags, created by TableRow, TableHeaderRow */
        children?: JSX.Element;
        /** Should row to be higlighted on hover. Default value: false */
        notHighlightOnHover?: boolean;
    }
    /** @internal */
    interface ITableHelperBodyProps {
        className?: string;
        /** Children tags, created by TableRow, TableHeaderRow */
        children?: JSX.Element;
    }
    /** @internal */
    enum TableHelperMode {
        /** Use flex-box for layout. Width should be provided for all cells */
        Blocks = 0,
        /** Use display: table. */
        Table = 1,
    }
    /** @internal */
    const TableHelper: (props: ITableHelperProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface ITableHelperHeaderRowProps {
        className?: string;
        /** Children tags, created by TableRowCell */
        children?: JSX.Element;
        /** Show header row only on hover. Default value: false */
        showOnHover?: boolean;
        key?: string;
        /** Value of data-row-name attribute for autotesting purposes */
        name?: string;
    }
    /** @internal */
    interface ITableHeaderCellHelperProps {
        /** Width in percent, pixel, as css calc() etc. */
        width: string;
        className?: string;
        /** Text or JSX.Element that repersents cell content */
        children?: any;
        key: string;
        /** Tooltip */
        title?: string;
    }
    /** @internal */
    const TableHelperHeaderRow: (props: ITableHelperHeaderRowProps) => JSX.Element;
    /** @internal */
    const TableHelperHeaderCell: (props: ITableHeaderCellHelperProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface ITableRowHelperProps {
        className?: string;
        /** Children tags, created by TableRowCell */
        children?: JSX.Element;
        /** Highlight row as selected. Default value: false */
        selected?: boolean;
        /** Fix row height to 50px. Default value: true */
        standardHeight?: boolean;
        key?: string;
        /** Value of data-row-name attribute for autotesting purposes */
        name?: string;
    }
    /** @internal */
    interface ITableRowCellHelperProps {
        /** Width in percent, pixel, as css calc() etc. */
        width: string;
        className?: string;
        /** Text or JSX.Element that repersents cell content */
        children?: any;
        key: string;
    }
    /** @internal */
    const TableHelperRow: (props: ITableRowHelperProps) => JSX.Element;
    /** @internal */
    const TableHelperCell: (props: ITableRowCellHelperProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface IPopoverProps {
        /** Element, where popover will be located around */
        target: HTMLElement;
        /** Show accept and decline buttons or not */
        showSaveCancelButtons?: boolean;
        /** Show save cancel buttons on the top of the popover. Default value: Top */
        saveCancelButtonsLocation?: SaveCancelButtonsLocation;
        /** Close button in right top corner visiblity */
        showCloseButton?: boolean;
        key?: string;
        width?: string;
        maxHeight?: string;
        maxWidth?: string;
        /** Popover title */
        title?: string;
        /** Enter key is equal to ok button click if true. By default is true. */
        acceptByEnter?: boolean;
        /** Esc key is equal to cancel button click if true. By default is true. */
        hideByEsc?: boolean;
        /** Minimal distance in pixels from window borders. */
        screenPadding?: number;
        className?: string;
        /** Class, that will be added to hidden popover.
          * Default value: hide
          */
        hideClassName?: string;
        /** Should popover close, when user click outside of the popover
          * Default value: false
          */
        hideByClickOutside?: boolean;
        /** Where popover should appear.
          * Default value: PopoverMode.Above
          */
        mode?: PopoverMode;
        /** Static position correctin by x in pixels */
        xShift?: number;
        /** If specified, popover do not calculate itself width, but use this value */
        forceWidth?: number;
    }
    /** @internal */
    enum SaveCancelButtonsLocation {
        /** Show buttons in the header of the popover */
        Top = 0,
        /** Show buttons at the right of the content */
        Right = 1,
    }
}
declare namespace WebClient {
    /** @internal */
    interface IPopoverState {
        waiting: boolean;
        currentTarget: HTMLElement;
        offScreenX: boolean;
        offScreenY: boolean;
        visible: boolean;
        showButtonsOption: boolean;
        hideByEscOption: boolean;
        acceptByEnterOption: boolean;
        showSaveCancelButtons: boolean;
        showCloseButton: boolean;
        title: string;
        screenPadding: number;
        hideClassName: string;
        mode: PopoverMode;
        /** Should popover close, when user click outside of the popover
          * Default value: false
          */
        hideByClickOutside?: boolean;
        acceptingEvent: CancelableEvent<IEventArgs>;
        acceptedEvent: SimpleEvent<IEventArgs>;
        cancelingEvent: CancelableEvent<IEventArgs>;
        canceledEvent: SimpleEvent<IEventArgs>;
        showingEvent: CancelableEvent<IEventArgs>;
        shownEvent: SimpleEvent<IEventArgs>;
        hiddingEvent: CancelableEvent<IEventArgs>;
        hiddenEvent: SimpleEvent<IEventArgs>;
    }
}
declare namespace WebClient {
    /** @internal */
    class Popover extends React.Component<IPopoverProps, IPopoverState> {
        private contentRoot;
        private wrapper;
        private root;
        constructor(props: IPopoverProps);
        componentWillUnmount(): void;
        componentWillReceiveProps(nextProps: IPopoverProps, nextContext: any): void;
        readonly showing: ICancelableEvent<IEventArgs>;
        readonly shown: IBasicEvent<IEventArgs>;
        readonly accepting: ICancelableEvent<IEventArgs>;
        readonly accepted: IBasicEvent<IEventArgs>;
        readonly canceling: ICancelableEvent<IEventArgs>;
        readonly canceled: IBasicEvent<IEventArgs>;
        readonly hidding: ICancelableEvent<IEventArgs>;
        readonly hidden: IBasicEvent<IEventArgs>;
        /** Create InPlaceEditPopover instance.
          * After creating popover use 'contentElement' property to set popover content, and 'show', 'hide' methods to manage popover.
          */
        static CreatePopover(popoverOptions: IPopoverProps): Popover;
        readonly contentElement: HTMLElement;
        show(): JQueryDeferred<any>;
        hide(): void;
        visible: boolean;
        hideByClickOutside: boolean;
        hideByEsc: boolean;
        acceptByEnter: boolean;
        clearContent(): void;
        dispose(): void;
        private onDocumentClick(event);
        private onDocumentKeyDown(ev);
        private attachContentRoot(elem);
        private attachRoot(elem);
        protected hideInternal(): void;
        protected accept(): void;
        protected cancel(): void;
        protected subscribeGlobalEvents(keydown: boolean, click: boolean, position: boolean): void;
        protected unsubscribeGlobalEvents(keydown: boolean, click: boolean, position: boolean): void;
        protected onOkClick(): void;
        protected onCancelClick(): void;
        protected onPageScroll(): void;
        protected onWindowResize(): void;
        protected updatePositions(): void;
        protected updateTopPosition(target: any): void;
        protected updateLeftPosition: (target: any) => void;
        protected getLeft(target: any): {
            targetLeft: number;
            popoverLeft: number;
        };
        protected getTop(target: any): number;
        protected readonly saveCancelButtonsLocation: SaveCancelButtonsLocation;
        renderSaveCancelButtons(): JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    enum PopoverMode {
        Above = 0,
        LeftSide = 1,
    }
}
declare namespace WebClient {
    /** @internal */
    interface ILoadingIconState {
    }
    /** @internal */
    interface ILoadingIconProps {
        state: LoadingState;
        className?: string;
        /** Css class, that adds loading icon as background
          * Default value: dv-ico icon-spin loader-animate
          */
        loadingIconClassName?: string;
        /** Css class, that adds error icon as background
          * Default value: dv-ico ico-approval-decision-cancellation
          */
        errorClassName?: string;
        /** Loading icon color */
        color?: LoadincIconColor;
    }
    /** @internal */
    enum LoadincIconColor {
        Blue = 0,
        White = 1,
        Black = 2,
    }
    /** @internal */
    class LoadingIcon extends React.Component<ILoadingIconProps, ILoadingIconState> {
        constructor(props: ILoadingIconProps);
        getLoadingIconClass(): string;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDynamicTreeProps extends ITreeBaseProps<IDynamicTreeNodeData> {
        /** If parentNode specified, shoudl load child nodes, else root nodes */
        loadNodes: (parentNode?: ITreeNodeData) => JQueryDeferred<IDynamicTreeNodeData[]>;
        className?: string;
        expandedByDefault?: boolean;
    }
    /** @internal */
    interface IDynamicTreeState extends ITreeBaseState {
        tree?: Tree;
        rootLoading?: LoadingState;
    }
    /** @internal */
    class DynamicTree extends TreeBase<IDynamicTreeNodeData, IDynamicTreeProps, IDynamicTreeState> {
        constructor(props: IDynamicTreeProps);
        componentDidMount(): void;
        toggleNode(node: TreeNode, expand: boolean, raiseEvent?: boolean): void;
        protected createNode(data: ITreeNodeData, level: number, children?: TreeNode[]): DynamicTreeNode;
        protected renderToggleMarker(node: TreeNode): JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    class DynamicTreeNode extends TreeNode {
        loading: LoadingState;
        constructor(data: IDynamicTreeNodeData, level: number, children?: TreeNode[]);
        readonly dynamicChildren: DynamicTreeNode[];
        readonly childrenLoaded: boolean;
        readonly iconClass: string;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDynamicTreeNodeData extends ITreeNodeData {
        childrenLoaded: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ILoadNodesResult {
        nodes: ITreeNodeData[];
        /** How deep children was loaded. 1 - only nodes, 2 - nodes and its children, etc. */
        treeLevelDown: number;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDisclosureProps {
        header: string;
        expanded: boolean;
        onClick(event: React.MouseEvent): void;
        visible?: boolean;
        collapsible?: boolean;
        children?: any;
    }
    /** @internal Represents header of collapsable area. */
    const DisclosureHead: (props: IDisclosureProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    class DisclosureBody extends React.Component<IDisclosureBodyProps, IDisclosureBodyState> {
        protected refItems: HTMLElement;
        constructor(props: IDisclosureBodyProps);
        componentWillReceiveProps(nextProps: IDisclosureBodyProps, nextContext: any): void;
        toggleCollapsed(duration?: number, easing?: string, animate?: boolean): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDisclosureBodyProps {
        expanded: boolean;
        animate?: boolean;
        duration?: number;
        easing?: string;
        children?: any;
        className?: string;
        style?: React.CSSProperties;
        visible?: boolean;
        onCollapsing?: () => JQueryDeferred<any>;
        onCollapsed?: Function;
        onExpanding?: () => JQueryDeferred<any>;
        onExpanded?: Function;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDisclosureBodyState {
        expanded: boolean;
    }
}
declare namespace WebClient {
    class ControlSelector extends React.Component<IControlSelectorProps, any> {
        constructor(props: any);
        componentWillMount(): void;
        componentWillReceiveProps?(nextProps: IControlSelectorProps, nextContext: any): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IControlSelectorProps {
        properties: any;
        children: IControlSelectorProps[];
        controlTypeName: string;
    }
}
declare namespace WebClient {
    interface IControlSelectorState {
        component: typeof React.Component;
    }
}
declare namespace WebClient {
    interface IExtendedControlSelectorProps extends IControlSelectorProps {
        operations: IEditOperation[];
    }
}
declare namespace WebClient {
    /** @internal Represents command list, that can be expanded and collapsed with slide animation.
      * Command items should be rendered with CommandBarItem.
      * Usage example:
      * <CommandBar expanded={this.state.commandBarExpanded} >
      *    <CommandBarItem onClick={() => console.info("Command 1 clicked") } >
      *       Command 1
      *    </CommandBarItem>
      *    <CommandBarItem onClick={() => console.info("Command 2 clicked")} >
      *       Command 2
      *    </CommandBarItem>
      * </CommandBar>
      * See also: CommandBarButton
      */
    class CommandBar extends React.Component<ICommandBarProps, ICommandBarState> {
        constructor(props: ICommandBarProps);
        componentWillReceiveProps(nextProps: ICommandBarProps, nextContext: any): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ICommandBarItemProps {
        /** Tooltip of the command */
        title?: string;
        /** Text or JSX.Element that repersents command look */
        children?: any;
        /** Command action */
        onClick(event: React.MouseEvent): void;
        /** Class "hide" will be added to command if visible = false */
        visible?: boolean;
        /** ReactJS key */
        key: string;
        /** Value of attribute data-button-name for autotesting purposes */
        name?: string;
    }
    /** @internal See CommandBar */
    const CommandBarItem: (props: ICommandBarItemProps) => JSX.Element;
}
declare namespace WebClient {
    /** @internal */
    interface ICommandBarProps {
        /** Initial value (after control loaded) should be undefined,
          * then it should change to "true", then to "false" and etc.
          * If your control do not follow this convention correct animations are not guarantee.
          */
        expanded: boolean;
        /** Children tags, created by CommandBarItem */
        children?: JSX.Element;
        /** Additional class */
        className?: string;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ICommandBarState {
        expandInProgress: boolean;
    }
}
declare namespace WebClient {
    enum DateFormats {
        Date = 0,
        Time = 1,
        DateTime = 2,
    }
}
declare namespace WebClient {
    /**
    * Возможные режимы редактирования значения элемента управления.
    */
    enum EditMode {
        /** По месту. В данном режиме изменение значение осуществляется в отдельном диалоговом окне. */
        EditInPlace = 0,
        /** Без редактирование. В данном режиме изменение значения недоступно. */
        View = 1,
        /** Редактирование. Стандартный режим редактирования значения, осуществляемого непосредственно в элементе управления. */
        Edit = 2,
    }
}
declare namespace WebClient {
    class LayoutControlFactory {
        protected controlMap: IControlMap;
        register(name: string, createFunction: () => typeof React.Component, replaceExisting?: boolean): void;
        get(name: string): typeof React.Component;
    }
}
declare var controlFactory: WebClient.LayoutControlFactory;
declare namespace WebClient {
    enum LoadingStatus {
        None = 1,
        Loading = 2,
        Done = 3,
        Error = 4,
    }
    class LoadingState {
        constructor(status?: LoadingStatus, message?: string);
        readonly loading: boolean;
        readonly error: boolean;
        readonly done: boolean;
        update(status: LoadingStatus, message?: string): void;
        status: LoadingStatus;
        message: string;
    }
}
declare namespace WebClient {
    function classIf(condition: boolean, css: string): string;
    function classIfNot(condition: boolean, css: string): string;
    function classIfDefined(css: string): string;
    function showIf(condition: boolean): string;
    function hideIf(condition: boolean): string;
    function classIfElse(condition: boolean, trueCss: string, falseCss: string): string;
    function cloneObject(obj: any): any;
    function dateTimeToString(dateTime: Date, format: DateFormats): string;
    function whenAll(deferreds: JQueryDeferred<any>[]): JQueryDeferred<any>;
    function getFunctionByName(name: string): any;
    /** @internal */
    function getFunctionByNameEx(name: string): any;
    function bubbleSort<T>(items: T[], comparator: (x1: T, x2: T) => number): T[];
    /** Returns newValue if variable is undefined, or vairable otherwise */
    function newValueIfUndefined(variable: any, newValue: any): any;
    function slideAnimation(elem: HTMLElement, isSlideUp: boolean, duration?: number, easing?: string, completeCallback?: Function): void;
    function slideAnimations(items: NodeListOf<Element>, isSlideUp: boolean, duration?: number, easing?: string, completeCallback?: Function, endCallback?: Function): void;
    function renderModalContent(window: WebClient.ModalWindow, content: JSX.Element, showCloseButton?: boolean): void | Element | React.Component<any, React.ComponentState>;
    function getBindingResult(binding: IBindingResult<any>, value: any): IBindingResult<any>;
    function isEmptyGuid(guid: string): boolean;
    /**
     * Returns function, that should be set to "ref" parameter of the react elemnt, providing its tipso tooltip. Uses @see setTooltip.
     * @param text Tooltip text.
     */
    function attachTooltip(text: string, extraOptions?: Object): (elem: HTMLElement) => void;
    /**
     * Returns function, that should be set to "ref" parameter of the react elemnt, providing its tipso tooltip. Uses @see setTooltip.
     * The text of tooltip gets from element textContent property.
     */
    function attachTooltipFromContent(extraOptions?: Object): (elem: HTMLElement) => void;
    /**
     * Providing elemnt with tipso tooltip.
     * @param elem
     */
    function setTooltip(elem: HTMLElement, text: string, extraOptions?: any): void;
    function genearateGuid(): string;
    function MakeDeferred<T>(job: (resolve: (data: T) => JQueryDeferred<T> | void, reject: (data: T) => JQueryDeferred<T> | void) => void): JQueryDeferred<T>;
    /**
      * Лямбда функция вида () => obj.someProperty или (obj) => obj.someProperty.
      * Функция getFieldName способна конвертировать данное выражение в имя свойства (напр. "someProperty").
      */
    type FieldSpec<TModel, TResult> = ((model?: TModel) => TResult) | string;
    /**
     * Преобразует функцию вида () => obj.someProperty или (obj) => obj.someProperty в имя свойства (напр. "someProperty")
     * Данная функция используется для того, чтобы получить имя свойства, создав при этом TypeScript-ссылку на это свойство.
     * TypeScript-ссылка позволяет использовать инструменты VisualStudio для рефакторинга и исследования кода (например, переименование).
     * @param fieldSpec функция вида () => obj.someProperty или (obj) => obj.someProperty или строка (возвращается без изменений)
     */
    function getFieldName<TModel, TResult>(fieldSpec: FieldSpec<TModel, TResult>): string;
}
declare namespace WebClient {
    interface IUrlCollection {
        getUrls(urlResolver: UrlResolver): IUrlMap;
    }
}
declare namespace WebClient {
    interface IUrlMap {
        [id: string]: string;
    }
}
declare namespace WebClient {
    class UrlResolver {
        protected siteUrl: string;
        constructor(siteUrl: string);
        resolveUrl(action: string, controller: string): string;
        resolveApiUrl(action: string, controller: string): string;
    }
}
declare namespace WebClient {
    class UrlStore {
        protected urls: IUrlMap;
        protected urlResolverField: UrlResolver;
        constructor(siteUrl: string);
        registerUrlCollection(urlCollection: IUrlCollection): void;
        readonly urlResolver: UrlResolver;
    }
}
declare var urls: WebClient.IUrlMap;
declare var urlStore: WebClient.UrlStore;
declare namespace WebClient {
    /** @internal */
    function action(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
    /** @internal */
    function apiAction(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
    /** @internal */
    function controllerAction(url: string): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
    /** @internal */
    function arg(name: string): (target: Object, propertyKey: string, parameterIndex: number) => void;
    /** @internal */
    function postData(target: Object, propertyKey: string, parameterIndex: number): void;
    /** @internal */
    var ServiceActionPostDataArgumentName: string;
    /** @internal */
    function controller(name: string): (target: Object) => void;
}
declare namespace WebClient {
    /** @internal */
    enum RequestMethods {
        Post = 0,
        Get = 1,
    }
}
declare namespace WebClient {
    /** @internal */
    interface IServiceActionParameterInfo {
        index: number;
        name: string;
    }
}
declare namespace WebClient {
    /** @internal */
    class IRequestInfo {
        url: string;
        data: any;
        method: RequestMethods;
    }
}
declare namespace WebClient {
    /** @internal */
    class ServiceActionMetaData {
        type: string;
        url: string;
        parametersInfo: [IServiceActionParameterInfo];
    }
    /** @internal */
    var ServiceActionMetaDataTypeName: string;
}
declare namespace WebClient {
    interface IResourcesMap {
        [id: string]: string;
    }
}
declare var resources: WebClient.IResourcesMap;
declare namespace WebClient {
    interface ICommonResponse<ResponseModelT> {
        success: boolean;
        timestamp: number;
        notification: INotificationModel;
        data: ResponseModelT;
    }
}
declare namespace WebClient {
    interface INotificationModel {
        type: ErrorNotificationType;
        text: string;
    }
}
declare namespace WebClient {
    /**
      * Class, that makes syntax sugar for the performing requests to the server and managing it's state.
      * Separate instance should be created for every qeury, that should not be sent at same time.
      */
    class RequestHelper {
        private mLoadingState;
        private mLastQuery;
        private mStateChanged;
        constructor(onStateChanged?: (state?: LoadingState) => void);
        /**
         * Calls sendFunc, and updates it's state on request progress. If previous request has not finished, call will be ignored.
         * @param sendFunc Function, that will send request to the server.
         * @param done Callback, called when request finished succesfully.
         * @param fail Callback, called when request failed.
         */
        send<T>(sendFunc: () => JQueryDeferred<T>, done: (data: T) => void, fail?: (err) => void): LoadingState;
        /** Event, that raised every time request state changed (loading, done, fail). It's good idea to call forceUpdate() there. */
        readonly stateChanged: IBasicEvent<LoadingState>;
        /** Current state of the request. Can be passed to {@link LoadingIcon} component as parameter. */
        readonly state: LoadingState;
        /** Current state of the request. Can be passed to {@link LoadingIcon} component as parameter. */
        readonly status: LoadingStatus;
        readonly loading: boolean;
        readonly error: boolean;
        readonly done: boolean;
    }
}
declare namespace WebClient {
    class RequestManager {
        private bootstrapp;
        private lastQeury;
        constructor(bootstrapp: LayoutManager);
        get<TResponse>(url: string): JQueryDeferred<TResponse>;
        post<TResponse>(url: string, data: any): JQueryDeferred<TResponse>;
        rawRequest(url: string, data: any, method: RequestMethods, routeChangeProtection?: boolean): JQueryDeferred<XMLHttpRequest>;
        readonly busy: boolean;
        processRawResponse<T>(rawResponse: any, showSuccessNotification?: boolean): ICommonResponse<T>;
        processResponse<T>(response: ICommonResponse<T>, showSuccessNotification?: boolean): void;
        showNotification(notification: INotificationModel, showSuccess?: boolean): any;
        processErrorResponse(httpRequest: XMLHttpRequest): void;
        processRequestComplete(httpRequest: any, successCallback: any, routeTimestamp?: number): boolean;
        protected makeRequest<TResponse>(url: string, data: any, method: RequestMethods, routeChangeProtection?: boolean): JQueryDeferred<TResponse>;
    }
}
declare var requestManager: WebClient.RequestManager;
declare namespace WebClient {
    interface ILayoutContainerParams {
        rootElementId: string;
        layoutCardModel: ILayoutCardModel;
    }
}
declare namespace WebClient {
    class LayoutContainer {
        private readonly layoutContainerParams;
        private layoutResolver;
        /**
        * Возвращает разметку карточки.
        */
        readonly layout: Layout;
        /**
        * Возвращает идентификатор корневого элемента, в котором расположена разметка.
        */
        readonly rootElementId: string;
        /**
        * Возвращает корневой элемент, в котором расположена разметка.
        */
        readonly rootElement: HTMLElement;
        /** Модель разметки, поступившая с сервера Web-клиента. */
        readonly layoutCardModel: ILayoutCardModel;
        constructor(layoutContainerParams: ILayoutContainerParams);
        /**
         * Уничтожение разметки.
         */
        destroy(): JQueryDeferred<any>;
        /**
         * Инициализация разметки.
         */
        initialize(): void;
        protected mapLayout(layoutResolver: () => Layout): void;
        protected reactJsUnmount(): void;
        protected renderLayout(): void;
        protected prepareModel(): void;
    }
}
declare namespace WebClient {
    interface ILayoutBootstrapperParams {
        rootElementId: string;
    }
}
declare namespace WebClient {
    class LayoutBootstrapper {
        private readonly layoutBootstrapperParams;
        readonly rootElementId: string;
        readonly rootElement: HTMLElement;
        constructor(layoutBootstrapperParams: ILayoutBootstrapperParams);
        initilialize(): void;
    }
}
declare namespace WebClient {
    class ExtensionManager {
        private extensions;
        registerExtension(extension: IExtension): void;
        readonly Extensions: IExtension[];
    }
}
declare var extensionManager: WebClient.ExtensionManager;
declare namespace WebClient {
    interface IExtension extends IUrlCollection {
        initialize(): any;
    }
}
declare namespace WebClient {
    type BasicApiEvent<T> = string | IBasicEvent<T> | BasicEventHandler<T>;
    type CancelableApiEvent<T> = string | ICancelableEvent<T> | CancelableEventHandler<T>;
}
declare namespace WebClient {
    abstract class BasicEvent<T> implements IBasicEvent<T> {
        protected handlers: BasicEventHandler<T>[];
        private mDefaultSender;
        constructor(sender: any, subscribers?: BasicEventHandler<T>[]);
        subscribe(handler: BasicEventHandler<T>): void;
        unsubscribe(handler: BasicEventHandler<T>): void;
        defaultSender: any;
        protected triggerAll(sender?: any, data?: T): void;
    }
}
declare namespace WebClient {
    class CancelableEvent<T> extends BasicEvent<ICancelableEventArgs<T>> {
        private deffered;
        constructor(sender?: any, subscribers?: {
            (sender: any, args?: ICancelableEventArgs<T>): void;
        }[]);
        triggerWithArgs(sender: any, argsP: ICancelableEventArgs<T>): void;
        triggerWith(sender: any, data?: T): CancelableEventArgs<T>;
        trigger(data?: T): CancelableEventArgs<T>;
        createArgs(data?: T): CancelableEventArgs<T>;
        static cast<T>(event: ICancelableEvent<T> | CancelableApiEvent<T>): CancelableEvent<T>;
        static Create<T>(sender: any, subscriberFunc?: CancelableApiEvent<T>): CancelableEvent<T>;
    }
}
declare namespace WebClient {
    class CancelableEventArgs<T> implements ICancelableEventArgs<T> {
        private dataField;
        private deferredObj;
        private autoAcceptSetting;
        constructor(data?: T, callbackAccepted?: (data?: T) => void, callbackCanceled?: (data?: T) => void);
        accepted(callback: (data?: T) => void): CancelableEventArgs<T>;
        canceled(callback: (data?: T) => void): CancelableEventArgs<T>;
        cancel(): void;
        accept(): void;
        wait(): void;
        readonly data: T;
        autoAcceptEnabled: boolean;
        readonly state: CancelableEventState;
        readonly deffered: JQueryDeferred<T>;
    }
}
declare namespace WebClient {
    enum CancelableEventState {
        Pending = 0,
        Accepted = 1,
        Canceled = 2,
    }
}
declare namespace WebClient {
    class SimpleEvent<T> extends BasicEvent<T> {
        constructor(sender?: any, subscribers?: {
            (sender: any, args?: T): void;
        }[]);
        trigger(data?: T): void;
        triggerWith(sender: any, data?: T): void;
        static cast<T>(event: IBasicEvent<T> | BasicApiEvent<T>): SimpleEvent<T>;
        static Create<T>(sender: any, subscriberFunc?: BasicApiEvent<T>): SimpleEvent<T>;
    }
}
declare namespace WebClient {
    type BasicEventHandler<T> = (sender, args?: T) => void;
    interface IBasicEvent<T> {
        subscribe(handler: BasicEventHandler<T>): any;
        unsubscribe(handler: BasicEventHandler<T>): any;
    }
    function getEvent<T>(event: BasicApiEvent<T>): IBasicEvent<T>;
}
declare namespace WebClient {
    type CancelableEventHandler<T> = BasicEventHandler<ICancelableEventArgs<T>>;
    type ICancelableEvent<T> = IBasicEvent<ICancelableEventArgs<T>>;
}
declare namespace WebClient {
    interface ICancelableEventArgs<T> {
        cancel(): void;
        accept(): void;
        wait(): void;
        data: T;
        autoAcceptEnabled: boolean;
    }
}
declare namespace WebClient {
    interface IEventArgs {
    }
}
declare namespace WebClient {
    interface ICardSavingEventArgs {
        saveControlData: ISaveControlData;
    }
}
declare namespace WebClient {
    interface ICardStateChangingEventArgs {
        operationId: string;
    }
}
declare namespace WebClient {
    class CommonBuiltInOperations {
        static Delete: string;
    }
}
declare namespace WebClient {
    /** @internal */
    class EditOperationStore implements IEditOperationStore {
        protected editOperations: IEditOperationMap;
        protected builtInEditOperations: IEditOperationMap;
        protected emptyGuidValue: string;
        add(editOpeation: IEditOperation): void;
        addRange(editOpeations: IEditOperation[]): void;
        remove(id: string): void;
        available(id: string): boolean;
        availableBuiltIn(builtInOperationId: string): boolean;
        get(id: string): IEditOperation;
        getAll(): IEditOperation[];
        protected prepareId(id: string): string;
    }
}
declare namespace WebClient {
    /**
    * Содержит данные операции редактирования, зарегистрированной в *Конструкторе состояний*.
    */
    interface IEditOperation {
        /** Идентификатор операции редактирования в *Конструкторе состояний*. */
        id: string;
        /** Идентификатор встроенной (в карточку) операции редактирования. */
        builtInId?: string;
        /** Отображаемое название операции редактирования. */
        caption: string;
        /** Флаг, указывающий, что операция доступна для текущего состояния карточки: true - доступна, false - не доступна. */
        available: boolean;
    }
}
declare namespace WebClient {
    interface IEditOperationMap {
        [id: string]: IEditOperation;
    }
}
declare namespace WebClient {
    /**
    * Содержит данные и методы хранилища операций редактирования.
    */
    interface IEditOperationStore {
        /**
        * Проверяет доступность операции редактирования.
        * @param id Идентификатор операции редактирования.
        * @returns true - операция доступна, false - операция не доступна.
        */
        available(id: string): boolean;
        /**
        * Проверяет доступность встроенной операции редактирования.
        * @param id Идентификатор встроенной операции редактирования.
        * @returns true - операция доступна, false - операция не доступна.
        */
        availableBuiltIn(builtInOperationId: string): boolean;
        /**
       * Возвращает операцию редактирования с указанным идентификатором.
       * @param id Идентификатор операции редактирования.
       * @returns Операция редактирования.
       */
        get(id: string): IEditOperation;
        /**
        * Возвращает все операции редактирования, зарегистрированные в *Конструкторе состояний* для текущего вида карточки.
        * @returns Массив операций редактирования.
        */
        getAll(): IEditOperation[];
    }
}
declare namespace WebClient {
    class ControlStore {
        protected controlCollection: IControlWrapperMap;
        protected controlsList: ApiControlWrapper<any, any>[];
        readonly controls: IControlWrapperMap;
        add(nameSrc: string, control: BaseControl<any, any>): ApiControlWrapper<any, any>;
        remove(name: string): void;
        removeControl(control: BaseControl<any, any>): void;
        onSaving(): JQueryDeferred<any>;
        onSaved(): JQueryDeferred<any>;
        protected collectControlData(func: (control: ApiControlWrapper<any, any>) => void): void;
        protected callSaveCallbacks(beforeSave: boolean): JQueryDeferred<any>;
    }
}
declare namespace WebClient {
    type LayoutControlWrapper = ApiControlWrapper<any, any>;
    class ApiControlWrapper<P extends BaseControlParams, S extends BaseControlState> {
        control: BaseControl<P, S>;
        constructor(control: BaseControl<P, S>);
        static onSaving(controlWrapper: ApiControlWrapper<any, any>): JQueryDeferred<any>;
        static onSaved(controlWrapper: ApiControlWrapper<any, any>): JQueryDeferred<any>;
        protected static mapControlProperty(controlWrapper: ApiControlWrapper<any, any>, sourcePropertyName: string): void;
        protected static mapProperty(controlWrapper: ApiControlWrapper<any, any>, sourcePropertyName: string, allowRead: boolean, allowWrite: boolean): void;
        protected static mapPropertyInternal(controlWrapper: ApiControlWrapper<any, any>, apiProperty: IApiPropertyDescriptor): void;
    }
}
declare namespace WebClient {
    interface IApiPropertyDescriptor {
        propertyName: string;
        get?(): any;
        set?(v: any): void;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IControlMap {
        [name: string]: () => typeof React.Component;
    }
}
declare namespace WebClient {
    interface IControlWrapperMap {
        [name: string]: LayoutControl | LayoutControl[];
    }
}
declare namespace WebClient {
    class CardTypeResolver {
        protected CardTypeMap: ICardTypeMap;
        protected unknownCardType: {
            id: string;
            name: string;
            cssClass: string;
            caption: string;
        };
        registerCardType(cardTypeInfo: ICardTypeInfo): void;
        getCardTypeInfo(cardTypeId: string): ICardTypeInfo;
    }
}
declare var cardTypeResolver: WebClient.CardTypeResolver;
declare namespace WebClient {
    interface ICardTypeInfo {
        id: string;
        name: string;
        cssClass: string;
        caption: string;
    }
}
declare namespace WebClient {
    interface ICardTypeMap {
        [id: string]: ICardTypeInfo;
    }
}
declare namespace WebClient {
    interface IBindingMetadata {
        key: string;
        value: string;
    }
}
declare namespace WebClient {
    interface IBindingResult<T> {
        name: string;
        values: string[];
        value: T;
        editOperation: string;
        metadata: IBindingMetadata[];
    }
}
declare namespace WebClient {
    interface IBindingsWriteRequest {
        /** Layout control name */
        controlName: string;
        /** Name of the control, that initiates write request. It can be edit-in-place control copy */
        actualControlName: string;
        controlTypeName: string;
        bindingResults: IBindingResult<any>[];
    }
}
declare namespace WebClient {
    /**  Inidicates that property included in public control api, awailable for partners scripts. */
    function api(target: Object, propertyKey: string | symbol): void;
    function isPublicApi(control: BaseControl<any, any>, propertyKey: string): boolean;
}
declare namespace WebClient {
    function getPropertyDescriptor(control: Object, propertyKey: string): PropertyDescriptor;
    function getMetadataValue(obj: any, propertyKey: string, metadataKee: string): any;
    function declareSimpleProperty(target: Object, propertyKey: string): void;
}
declare namespace WebClient {
    function apiEvent(target: Object, propertyKey: string | symbol): void;
    function isEvent(control: any, propertyKey: string): boolean;
}
declare namespace WebClient {
    function handler(paramNameSpec: FieldSpec<any, any>): (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
    function getHandlerProperty(control: any, propertyKey: string): string;
    /**
     * Используется для формирования объекта {@link FieldSpec} при вызове функции {@link getFieldName}.
     * Функция преобразует ссылку на имя класса в ссылку на объект класса. Это необходимо для получения
     * ссылки на свойство, понятное TypeScript.
     * @param typeName Имя класса
     */
    function at<T>(typeName: {
        new (): T;
    }): T;
}
declare namespace WebClient {
    /**  Inidicates that property included in public control api as readonly */
    function r(target: Object, propertyKey: string | symbol): void;
    function isReadonly(control: any, propertyKey: string): boolean;
}
declare namespace WebClient {
    /**  Inidicates that property included in public control api as readonly */
    function rw(target: Object, propertyKey: string | symbol): void;
    function isReadWrite(control: any, propertyKey: string): boolean;
}
declare namespace WebClient {
    /**
     * Базовый класс для описания публичных свойств контрола.
     *
     * Публичные свойства должны объявляться использованием
     * одного из трех декораторов: {@link r} (свойство, котрое запрещено изменять после создания контрола), {@link rw} (разрешено изменять) или {@link event} (событие). Например:
     *
     *     @r isLoaded?: boolean;
     *     @rw visibility?: boolean = true;
     *     @event click?: BasicApiEvent<IClickEventArgs>;
     *
     * Свойства, которые не существенны для контрола (либо имеют значения по умолчанию) должны быть помечены как необязательные
     * (с помощью знака вопроса, например `@rw compactMode?: boolean = false;`). Это позволит не указывать данные свойства при создании контрола
     * через JSX из скриптов.
     *
     * Получение и запись значения публичных свойств можно переопределить в методах {@link BaseControl.setParamValue}, {@link BaseControl.getParamValue}, либо при помощи
     * объявления свойств с декоратором {@link handler}.
     */
    class BaseControlParams {
        /** Возвращает ссылку на родительский элемент управления. @see {@link BaseControl.parent} */
        parent: BaseControl<BaseControlParams, BaseControlState>;
        /** Возвращает имя класса элемента управления. */
        controlTypeName?: string;
        /** Возвращает уникальное (для текущей разметки) имя элемента управления. */
        name?: string;
        /** Возвращает набор стандартных классов, определяющих стиль элемента управления. Стандартные классы, указываемые по умолчанию для всех элементов управления, не могут быть изменены. */
        standardCssClass?: string;
        /** Пользовательские классы стилей элемента управления, дополняющие стили из {@link BaseControlParams.standardCssClass}. */
        customCssClasses?: string;
        /** Определяет, отображается ли элемент управления на странице: `true` - отображается, `false` - скрыт. */
        visibility?: boolean;
        /** Определяет, должен ли элемент управления получать фокус при переходе по Tab: `true` - должен, `false` - не должен. @see {@link BaseControlImpl.getTabIndex} */
        tabStop?: boolean;
        /** Определяет, должен ли элемент управления оторажаться в компактном режиме, в котором у элемента отсутствуют отступы и т.п. Компактный режим, например, используется при отрисовке контролов в таблице (см. {@link Table}). */
        compactMode?: boolean;
        /** Стиль родительского (по отношению к данному элементу управления) div-элемента. */
        customCssStyle?: React.CSSProperties;
        /** Определяет, завершена ли инициализация элемента управления: `true` - объект {@link BaseControl.controlImpl} создан, `false` - инициализация завершена. */
        isLoaded?: boolean;
        /** Событие, возникающее при щелчке мышью в области элемента управления. */
        click?: BasicApiEvent<IClickEventArgs>;
        /** Событие, возникающее при попадании мыши в область элемента управления. */
        mouseOver?: BasicApiEvent<IMouseOverEventArgs>;
        /** Событие, возникающее при выведении мыши из области элемента управления. */
        mouseOut?: BasicApiEvent<IMouseOutEventArgs>;
        /** Событие, возникающее при получении элементом управления фокуса. */
        focus?: BasicApiEvent<IFocusEventArgs>;
        /** Событие, возникающее при потере элементом управления фокуса. */
        blur?: BasicApiEvent<IBlurEventArgs>;
        /** Событие, возникающее, когда свойство {@link isLoaded} устанавливается в `true`. */
        loaded?: BasicApiEvent<IEventArgs>;
        /** Событие, возникающее при удалении элемента управления из разметки. */
        unloading?: BasicApiEvent<IEventArgs>;
        /** Интерфейсный компонент контрола (см. описание класса {@link BaseControl}). */
        wrapper?: BaseControl<BaseControlParams, BaseControlState>;
    }
    /** Базовый интерфейс для описания состояния интерфейсного компонента элемента управления. */
    interface BaseControlState extends BaseControlParams {
        layout: Layout;
    }
    /** Синоним `BaseControl<any, any>` */
    type LayoutControl = BaseControl<any, any>;
    /**
     * Базовый класс элементов управления модуля Web-клиент.
     *
     * Элементы управления Модуля состоят из двух классов: интерфейсного и реализации. Интерфейсная часть наследуется от данного класса,
     * а реализация от {@link BaseControlImpl}. Интерфейсный компонент обеспечивает взаимодействие контрола с внешним миром (работа с binding,
     * обращения к серверу, к разметке, в которой находится контрол и т.д.), в то время как компонент реализации содержит логику контрола,
     * абстрагированную от внешнего окружения.
     *
     * Публичные свойства контрола объявляются в специальном классе, наследующемся от {@link BaseControlParams}. Данные свойства
     * доступны через объект {@link BaseControl.params}. Публичные методы контрола объявляются в классе с использованием декоратора {@link api}.
     *
     * @param P Класс, наследующийся от {@link BaseControlParams} и описывающий публичные свойства компонента.
     * @param S Интерфейс, расширяющий {@link BaseControlState} и описывающий внутренние переменные инетрфейсного компонента.
     */
    abstract class BaseControl<P extends BaseControlParams, S extends BaseControlState> extends React.Component<P, S> {
        /** Если значение данного поля `false`, то вызов метода {@link forceUpdate} не инициирует перерисовку компонента. Используется методом {@link batchUpdate}. */
        protected shouldUpdate: boolean;
        private paramsObject;
        private propertyGetHandlers;
        private propertySetHandlers;
        private controlImplRef;
        /**
         * Инициализирует контрол
         * @param props Свойства, переданные контролу
         */
        constructor(props: P);
        /**
         * При переопределении в дочернем классе должен возвращать новый
         * экземпляр параметров компонента, созданный через оператор new (например: `new MyControlParams()`)
         * Данный объект будет присвоен свойству this.state.
         */
        protected abstract createParams(): P;
        /**
         * Аналог свойства {@link BaseControl.params}.
         */
        protected getParams(): P;
        /** @internal */
        abstract render(): any;
        /** @internal */
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        /** @internal */
        protected unregisterChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        /** @internal */
        protected registerControl(child: BaseControl<BaseControlParams, BaseControlState>): void;
        /** @internal */
        protected unregisterControl(child: BaseControl<BaseControlParams, BaseControlState>): void;
        /** Компонент реализации (см. описание класса {@link BaseControl})
          * @see {@link getParamValue}, {@link setParamValue}, {@link attachControl},
          */
        protected controlImpl: BaseControlImpl<BaseControlParams, BaseControlImplState>;
        /**
         * Получает значения через метод {@link getBindingsWriteRequests} и сохраняет их на сервере.
         */
        save(): JQueryDeferred<any>;
        /**
          * Публичные свойства элемента управления.
          * Обращения к параметрам через данный объект обрабатываются функциями {@link getParamValue} и {@link setParamValue}.
          * Свойства данного объекта объявляются в методе {@link setupParamsAccessors}.
          * Сам объект создается в методе {@link createParams}
          */
        readonly params: P;
        /**
         * Устанавливает значение {@ controlImpl}, в соответствии с идиомой Pimpl.
         * Метод должен передаваться в качестве значения ref в функции render. Например:
         *
         *     <MyControlImpl ref={this.attachControl} />;
         *
         * @param control Reference to contorl implementation
         */
        protected attachControl(control: any): void;
        /** См. [документацию React](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) */
        componentWillMount(): void;
        /** См. [документацию React](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) */
        componentDidMount(): void;
        /** Разметка, в которой находится компонент. */
        readonly layout: Layout;
        /**
         * Родительский компонент. Отношение родитель-потомок определяет, прежде всего, логику {@link getBindingsWriteRequests}.
         *
         * Внимание! Отношение родитель-потомок может отличаться от логической вложенности компонентов (например, дочерние компоненты, вложенные один в другой
         * могут иметь общего родителя).
         */
        readonly parent: BaseControl<BaseControlParams, BaseControlState>;
        /** См. [документацию React](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) */
        componentWillUnmount(): void;
        /** См. [документацию React](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) */
        componentWillReceiveProps(nextProps: P, nextContext: any): void;
        /**
         * Вызывает перерисовку компонента.
         * Присваивание параметрам новых значений автоматически вызывает перерисовку, и в таких случаях вызывать метод не следует.
         * Данный метод нужно вызывать только в том случае, когда либо меняются поля объекта параметра, либо устанавливается значение state.
         * @param callBack Функция, которая будет вызвана после того, как перерисовка компонента завершится.
         * @see [Документация React](https://facebook.github.io/react/docs/react-component.html#other-apis)
         */
        forceUpdate(callBack?: () => any): void;
        /**
         * Позволяет установить значение нескольких параметров, вызвав только одну перерисовку компонента.
         * В методе нет необходимости, если значения параметров меняются в рамках обработки одного React-события (в этом случае
         * React автоматически предотвращает многократную перерисовку компонента).
         * @param updateLogic Функция, который выполняет изменение параметров
         * @param callback Функция, которая вызывается после обновления компонента (передается параметром в forceUpdate)
         */
        batchUpdate(updateLogic: Function, callback: () => any): void;
        /** @internal */
        protected getApiProperties(): IApiPropertyDescriptor[];
        /** @internal */
        private readonly isLoaded;
        /**
         * Вызывается перед сохранением карточки.
         * @returns Сохранение будет продолжено только после того, как данный объект перейдет в состояние "resolved".
         */
        onSaving(): JQueryDeferred<any>;
        /**
         * Вызывается после сохранения карточки.
         * @returns Логика после сохранения карточки продолжит выполняться только после того, как данный объект перейдет в состояние "resolved".
         */
        onSaved(): JQueryDeferred<any>;
        /**
         * Подготавливает собственные значения и значения всех дочерних контролов для отправки на сервер.
         * Метод вызывает {@link getBindings} для получения значений.
         * @param withChildren Включать в результат значения дочерних контролов или нет.
         */
        getBindingsWriteRequests(withChildren?: boolean): IBindingsWriteRequest[];
        /**
         * При переопределнии в дочерних классах, должен возвращать все значения,
         * которые контрол должен отправлять на сервер при сохранении.
         */
        protected getBindings(): IBindingResult<any>[];
        /**
         * Проверяет корректность значения элемента управления.
         *
         * К примеру, если у элемента управления с флагом "обязательный" отсутствует значение,
         * валидация не будет пройдена (см. {@link InputBasedControl}). При этом можно показать предупреждающее сообщение.
         * @param params Параметры выполнения валидации. Например, показывать ли сообщение о неудаче в UI или нет.
         */
        validate(params: any): IValidationResult[];
        /**
         * Производится обнаружение и регистрация всех свойств, объявленных с декоратором {@link handler}.
         */
        protected registerParamHandlers(): void;
        /**
         * Возвращает значение параметра при обращении через {@link params} объект.
         * По умолчанию реализуется следующая логика:
         * 1. Если объявлено get-свойство с декоратором {@link handler}, то возвращается значение данного свойства
         * 2. Если свойство controlImpl содержит объект, то возвращается реультат вызова {@link BaseControlImpl.getParamValue}.
         * 3. Если свойство controlImpl равно undefined, то выдается предупреждение, о том что controlImpl еще не инициализирован.
         *    Данная ситуация может возникнуть, если обращение к свойству происходит до вызова componentDidMount.
         * @param paramName Имя параметра, значение которого необходимо получить
         * @returns Значение параметра
         */
        protected getParamValue(paramName: string): any;
        /**
         * Обрабатывает новые значения свойств. Вызывается в `componentWillMount` и `componentWillReceiveProps`.
         * @param newProps Новые значения props компонента при вызове из componentWillReceiveProps или this.props при вызове из componentWillMount.
         * @param initial Значение истино, если метод вызывается при инициализации компонента (из componentWillMount).
         */
        protected setParamValues(newProps: BaseControlParams, initial: boolean): void;
        /**
         * Обработчик, вызываемый всякий раз, когда установливается значение параметра.
         * Происходить это может в следующих случаях:
         * 1. При инициализации компонента (см. {@link setParamValues})
         * 2. При получении новых props компонента (ситуация возможна при создании компонента из скриптов через JSX-синтаксис, см. {@link setParamValues}).
         * 3. При установке значения через объект {@link params} (например `params.visiblity = false`).
         *
         * Метод Реализует следующую логику:
         * 1. Если параметр является событием (объявлен с декоратором {@link event}), то вызывается {@link setEventValue}.
         * 2. Если запись не разрешена (параметр только для чтения (объявлен с декоратором {@link r}) и initial = false), то сообщается об ошибке.
         * 3. Если запись разрешена, то
         * а) Ищется set-свойство в текущем классе с декоратором {@link handler} для данного параметра, и если оно присутствует, то вызывается оно.
         * б) Если свойство не найдено, значение параметра помещается в `state`. В методе `render` значения из `state` обычно передаются в {@link controlImpl}.
         * @param paramName Имя параметра, значение которого нужно установить.
         * @param value Значение параметра
         * @param initial Значение истино, если метод вызывается при инициализации компонента (из componentWillMount).
         */
        protected setParamValue(paramName: string, value: any, initial: boolean): void;
        /**
         * Вызывается методом {@link setParamValue}, в случае если параметр является событием (объявлен с декоратором {@link event}).
         * @param paramName Имя события
         * @param newVal Функция-обработчик события
         * @param initial Значение истино, если метод вызывается при инициализации компонента (из componentWillMount).
         */
        protected setEventValue(paramName: string, val: BasicEventHandler<any> | string, initial: boolean): void;
        /**
         * Инициализирует объект {@link params}.
         * В объекте объявляются get и set акссессоры для всех параметров, которые вызывают
         * методы {@link getParamValue} и {@link setParamValue}.
         * Для успешной настройки параметров они должны быть объявлены с декоратором {@link r}, {@link rw} или {@link event}.
         */
        protected setupParamsAccessors(): void;
    }
}
declare namespace WebClient {
    class InputBasedControlParams<ModelT> extends BaseControlParams {
        /** Значение элемента управления. */
        value?: ModelT;
        /** Флаг, определяющий возможность изменения значения элемента управления: true - разрешено (разрешена настроенная операция редактирования), false - не разрешено. */
        canEdit?: boolean;
        /**
        * Флаг, определяющий, что элемент управления находится в модальном окне редактирования значения элемента управления в режиме редактирования {@link EditMode.EditInPlace}.
        *
        * Элемент управления, расположеный в модальном окне редактирования, доступен по названию: `названиеЭУ**_modal_control**`
        */
        modalMode?: boolean;
        /** Возвращает значение по умолчанию */
        default?: any;
        /** Возвращает режим редактирования. */
        editMode?: EditMode;
        /** Текст всплывающей подсказки */
        tip?: string;
        /**
        * Текст заполнителя.
        *
        * Заполнитель отображается в элементе управления, когда его (элемента управления) значение не задано.
        */
        placeHolder?: string;
        /**
        * Текст метки.
        *
        * Метка - текст отображаемый рядом (слева или вверху) с элементом управления.
        */
        labelText?: string;
        /** Флаг, определяющий, что метка должна отображаться, когда значение элемента управления не задано: true - отображать, false - не отображать. */
        showEmptyLabel?: boolean;
        /** Флаг, указывающий, обязательно ли должно быть задано значение элемента управления: true - обязательно, false - не обязательно. */
        required?: boolean;
        /** Флаг, определяющий, должно ли переноситься на следующую строку тектовое содержимое, когда оно не помещается в одну строку: true - переносить, false - не переносить.  */
        wrapLongValueUnderLabel?: boolean;
        /** Флаг, определяющий, что модальное окно редактирования значения открыто: true - открыто, false - не открыто.  */
        isEditDialogShown?: boolean;
        /** Событие возникает при изменении значения элемента управления. */
        dataChanged?: BasicApiEvent<IDataChangedEventArgs>;
        /** Событие возникает при открытии модального окна редактирования. */
        inPlaceEditOpeninig?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает после открытия модального окна редактирования. */
        inPlaceEditOpened?: BasicApiEvent<IEventArgs>;
        /** Событие возникает при закрытии диалогового окна редактирования. */
        inPlaceEditClosinig?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает после закрытия диалогового окна редактирования. */
        inPlaceEditClosed?: BasicApiEvent<IEventArgs>;
        /** Событие возникает при сохранении изменения значения в модальном окна редактирования. */
        editPopoverAccepting?: CancelableApiEvent<any>;
        /** @internal Specifies control name, that should be placed into binding. Used in edit-in-place scenario. */
        editInPlaceCreatorControlName?: string;
    }
    interface InputBasedControlState<ModelT> extends InputBasedControlParams<ModelT>, BaseControlState {
    }
    /**
     * Базовый класс элементов управления, поддерживающих ввод данных.
     *
     * @param P Класс, наследующийся от {@link InputBasedControlParams} и описывающий публичные свойства компонента.
     * @param S Интерфейс, расширяющий {@link InputBasedControlState} и описывающий внутренние переменные инетрфейсного компонента.
     */
    abstract class InputBasedControl<ModelT, P extends InputBasedControlParams<ModelT>, S extends InputBasedControlState<ModelT>> extends BaseControl<P, S> {
        constructor(props: P);
        private defaultValue;
        private readonly myControlImpl;
        /**
         * Проверяет возможность отображения диалогового окна редактирования.
         * @returns true - если операция редактирования доступна и элемент управления находится в режиме редактирования "По месту"; иначе - false.
         */
        canShowEditDialog(): boolean;
        /**
         * Открывает диалоговое окно редактирования значения.
         */
        showEditDialog(): void;
        /**
         * Закрывает диалоговое окно редактирования значения.
         */
        hideEditDialog(): void;
        /**
         * Проверяет наличие значения у элемента управления.
         * @returns true - если значение элемента управления установлено, иначе - false.
         */
        hasValue(): boolean;
        validate(params: IValidationParams): IValidationResult[];
        componentDidMount(): void;
        private readonly myGenericControlImpl;
        onEditPopoverAccepting(sender: any, event: ICancelableEventArgs<IEventArgs>): void;
        getBindingsWriteRequests(): IBindingsWriteRequest[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class TextControlBaseParams extends InputBasedControlParams<string> {
    }
    interface TextControlBaseState extends TextControlBaseParams, InputBasedControlState<string> {
        binding: IBindingResult<string>;
    }
    abstract class TextControlBase<P extends TextControlBaseParams, S extends TextControlBaseState> extends InputBasedControl<string, P, S> {
        /** @internal */
        protected binding: IBindingResult<string>;
        protected getBindings(): IBindingResult<string>[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** Базовый интерфейс, для описания состояния контролов, наследующихся от {@link BaseControlImpl} */
    interface BaseControlImplState extends BaseControlParams {
    }
    /**
     * Базовый класс для реализации контролов Web-клиента.
     * Реализация контрола содержит логику, без привязки к окружению (взаимодействие с сервером, с разметкой и т.д.).
     * Реализация используется основным, 'интерфейсным' классом контрола, наследующимся от {@link BaseControl}, который обеспечивает связь
     * контрола с внешним миром.
     *
     * @param P Класс или интерфейс, наследующийся от {@link BaseControlParams} и описывающий параметры компонента реализации.
     * @param S Интерфейс, расширяющий {@link BaseControlImplState} и описывающий внутренние переменные компонента реализации.
     */
    abstract class BaseControlImpl<P extends BaseControlParams, S extends BaseControlImplState> extends React.Component<P, S> {
        /** @internal */
        protected componentDOMNode: Element;
        private propertyHandlers;
        /**
         * Инициализирует объект.
         *
         * В конструкторе необходимо создать объекты событий. Например:
         *
         *     this.state.inPlaceEditOpeninig = CancelableEvent.Create(props.wrapper);
         *     this.state.inPlaceEditOpened = SimpleEvent.Create(props.wrapper);
         *
         * **Внимание!** Значения свойств контрола (`props`) автоматически копируются в `state` в методе `componentWillUnmount`
         * (при помощи {@link setParamValue}), который вызывается после того, как конструктор завершил выполнение.
         * Соответственно, в теле конструктора значения в `state` еще недоступны, и нужно обращаться к `props`.
         *
         * ** Внимание!** При вызове конструктора объект `this.props` еще недоступен, необходимо обращаться к параметру `props`.
         *
         * @param props Параметры, переданные компоненту.
         */
        constructor(props: P);
        /**
         * Производится обнаружение и регистрация всех свойств, объявленных с декоратором {@link handler}.
         */
        protected registerPropHandlers(): void;
        /**
         * При переопределении в дочерних классах, должен содержать логику отрисовки контрола. Например:
         *
         *     renderControl() {
         *          return <span> {this.state.text} </span>
         *     }
         */
        protected abstract renderControl(): any;
        /** См. [документацию React](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) */
        componentDidMount(): void;
        /** См. [документацию React](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) */
        componentWillUnmount(): void;
        /** См. [документацию React](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) */
        componentWillMount(): void;
        /** См. [документацию React](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle) */
        componentWillReceiveProps(nextProps: P, nextContext: any): void;
        /**
         * Данный метод вызывается из {@link BaseControl.getParamValue}.
         *
         * По умолчанию реализуется следующая логика:
         * 1. Если объявлено get-свойство с декоратором {@link handler}, то возвращается значение данного свойства;
         * 2. Иначе возвращается значение из `state`.
         * @param paramName Имя параметра, значение которого необходимо получить
         */
        getParamValue(paramName: string): any;
        /**
         * Обработчик, вызываемый всякий раз, когда установливается значение параметра.
         * Происходить это может в следующих случаях:
         * 1. При инициализации компонента (из метода `componentWillMount`).
         * 2. При получении новых props компонента (из метода `componentWillReceiveProps`). Как правило, новые свойства
         *    передаются интерфейсным компонентом при вызове {@link BaseControl.setParamValue}.
         *
         * Метод Реализует следующую логику:
         * 1. Если объявлено set-свойство с декоратором {@link handler}, то возвращается значение данного свойства;
         * 2. Иначе устаналивается значение в `state`.
         * @param paramName Имя параметра, значение которого нужно установить.
         * @param value Значение параметра
         * @param initial Значение истино, если метод вызывается при инициализации компонента (из componentWillMount).
         */
        protected setParamValue(propName: string, newVal: any, initial: boolean): void;
        /** Обработчик события `click` по области контрола. Генерирует событие {@link BaseControlParams.click}. */
        protected handleClick(event: React.MouseEvent): void;
        /** Обработчик события `mouseover` в области контрола. Генерирует событие {@link BaseControlParams.mouseOver}. */
        protected handleMouseOver(event: React.MouseEvent): void;
        /** Обработчик события `mouseout` в области контрола. Генерирует событие {@link BaseControlParams.mouseOut}. */
        protected handleMouseOut(event: React.MouseEvent): void;
        /** Обработчик события `focus`. Генерирует событие {@link BaseControlParams.focus}. */
        protected handleFocus(event: React.FocusEvent): void;
        /** Обработчик события `blur`. Генерирует событие {@link BaseControlParams.blur}. */
        protected handleBlur(event: React.FocusEvent): void;
        /** Формирует список классов для основного html-тэга контрола. */
        protected getCssClass(): string;
        /** Формирует словарь стилей для основного html-тэга контрола (см. [документацию React](https://facebook.github.io/react/docs/dom-elements.html#style)) */
        protected getCssStyle(): React.CSSProperties;
        /**
         * Возвращает 0 если {@link BaseControlParams.tabStop} == true, и -1 в противном случае. По умолчанию данный метод не используется,
         * он может быть использован производным классом при отрисовке интерактивных элементов.
         */
        protected getTabIndex(): 0 | -1;
        /**
         * Возвращает полное наименование внутреннего контрола, которое следует передать
         * при его отрисовке в функции Render.
         * @param innerControlName наименование внутреннего контрола
         */
        protected getInnerControlFullName(innerControlName: string): string;
        /**
         * Выполняет отрисовку главного html-тега контрола, внутрь которого помещается содержимое параметра.
         * @param controlContent Обычно результат вызова {@link renderControl}
         */
        renderControlRoot(controlContent: any): JSX.Element;
        /**
         * Основной метод, выполняющий отрисовку контрола.
         * Возвращает результат вызова {@link renderControlRoot}, передавая ему параметром результат вызова {@link renderControl}.
         */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface InputBasedControlImplState<ModelT> extends BaseControlImplState, InputBasedControlState<ModelT> {
        currentValue: ModelT;
        inputText: string;
        inputFocused: boolean;
        validationMessage: string;
        hadValue: boolean;
    }
    abstract class InputBasedControlImpl<ModelT, PropsT extends InputBasedControlParams<ModelT>, StateT extends InputBasedControlImplState<ModelT>> extends BaseControlImpl<PropsT, StateT> {
        editPopoverControl: InputBasedControl<ModelT, any, any>;
        text: HTMLElement;
        /** Edit popover, that showed copy of control in edit-in-place mode */
        editPopover: Popover;
        /** Edit popover, where control currently located */
        containingEditPopover: Popover;
        input: HTMLElement;
        constructor(props: PropsT);
        canShowEditDialog(): boolean;
        showEditDialog(): void;
        hideEditDialog(): void;
        hasValue(): boolean;
        protected onDataChanged(eventArgs: IDataChangedEventArgs): void;
        protected onInPlaceEditOpening(callback: () => void): void;
        protected onInPlaceEditOpened(): void;
        protected onInPlaceEditClosinig(sender: any, args: ICancelableEventArgs<any>): void;
        protected onInPlaceEditClosed(): void;
        validate(params: any): IValidationResult;
        protected readonly editAvailable: boolean;
        protected getTabIndex(): 0 | -1;
        protected attachInput(elem: HTMLElement): void;
        protected getInputElem(): HTMLElement;
        protected attachText(textElem: any): void;
        protected showEditPopover(popoverOptions?: IPopoverProps): void;
        protected onEditPopoverShowed(control: InputBasedControlImpl<any, PropsT, StateT>): void;
        componentWillUnmount(): void;
        protected getCssClass(): string;
        protected onInputFocus(event: React.FocusEvent): void;
        protected onInputBlur(event: React.FocusEvent): void;
        protected onPlaceholderClick(event: any): void;
        protected onValueClick(event: any): void;
        protected renderValidationMessage(): JSX.Element;
        protected getInputTitle(): string;
        protected renderInputWithPlaceholder(): JSX.Element;
        protected updateValidationMessage(): void;
        protected editModeRender(): JSX.Element;
        protected getValueTitle(): string;
        protected renderWithText(): JSX.Element;
        protected editInPlaceModeRender(): JSX.Element;
        protected viewModeRender(): JSX.Element;
        renderControl(): JSX.Element;
        private readonly isEditDialogShown;
        value: ModelT;
        protected abstract getTextValue(): string;
        protected abstract renderInto(props: PropsT, container: HTMLElement): InputBasedControl<ModelT, any, any>;
        protected getDefaultValue(): ModelT;
        protected onInputChange(event: any): void;
        protected readonly editPopoverControlImpl: InputBasedControlImpl<ModelT, any, any>;
        protected setValue(value: ModelT, redraw: boolean): void;
        protected getValue(): ModelT;
        protected getEditAvailable(): boolean;
        protected initEditPopover(popover: Popover): void;
        protected renderEditPopover(popover: Popover): InputBasedControl<ModelT, PropsT, StateT>;
        protected renderPlaceholder(): JSX.Element;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected renderInput(): JSX.Element;
        protected readonly editInPlaceAvailable: boolean;
        private readonly defaultValue;
    }
}
declare namespace WebClient {
    interface TextControlBaseImplState extends InputBasedControlImplState<string>, TextControlBaseState {
    }
    abstract class TextControlBaseImpl<PropsT extends TextControlBaseParams, StateT extends TextControlBaseImplState> extends InputBasedControlImpl<string, PropsT, StateT> {
        constructor(props: PropsT);
        protected abstract renderInto(props: TextControlBaseParams, container: HTMLElement): TextControlBase<any, any>;
        protected onInputChange(event: any): void;
        protected getTextValue(): string;
        protected getCssClass(): string;
    }
}
declare namespace WebClient {
    class TextBoxParams extends TextControlBaseParams {
        standardCssClass?: string;
    }
    /** @internal */
    interface TextBoxState extends TextBoxParams, TextControlBaseState {
    }
    class TextBox extends TextControlBase<TextBoxParams, TextBoxState> {
        protected createParams(): TextBoxParams;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface TextBoxImplState extends TextControlBaseImplState, TextBoxParams {
    }
    /** @internal */
    class TextBoxImpl extends TextControlBaseImpl<TextBoxParams, TextBoxImplState> {
        constructor(props: TextBoxParams);
        protected renderInto(props: TextBoxParams, container: HTMLElement): TextBox;
        protected showEditPopover(popoverOptions?: IPopoverProps): void;
    }
}
declare namespace WebClient {
    class TextAreaParams extends TextControlBaseParams {
        standardCssClass?: string;
    }
    /** @internal */
    interface TextAreaState extends TextAreaParams, TextControlBaseState {
    }
    class TextArea extends TextControlBase<TextAreaParams, TextAreaState> {
        protected createParams(): TextAreaParams;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface TextAreaImplState extends TextControlBaseImplState, TextAreaState {
    }
    /** @internal */
    class TextAreaImpl extends TextControlBaseImpl<TextAreaParams, TextAreaImplState> {
        constructor(props: TextAreaParams);
        protected setValue(value: string, redraw: boolean): void;
        protected renderInput(): JSX.Element;
        protected renderInto(props: TextAreaParams, container: HTMLElement): TextArea;
        protected showEditPopover(popoverOptions?: IPopoverProps): void;
        protected attachInput(inputElem: any): void;
    }
}
declare namespace WebClient {
    /** @internal */
    interface TextAreaAutosize {
        autosize(el: Element): void;
    }
}
declare namespace WebClient {
    class TasksParams extends BaseControlParams {
        tasks: ITaskListItem[];
        standardCssClass?: string;
        viewKinds?: any;
        canCreateTask?: boolean;
        canCreateTaskGroup?: boolean;
        header?: string;
        digestView?: boolean;
        isExpanded: boolean;
        tasksCreateInfo?: ITaskCreateInfo[];
        addTaskAllowed?: boolean;
        collapsing?: CancelableApiEvent<IEventArgs>;
        collapsed?: BasicApiEvent<IEventArgs>;
        expanding?: CancelableApiEvent<IEventArgs>;
        expanded?: BasicApiEvent<IEventArgs>;
        taskCreating?: CancelableApiEvent<ITaskCreatingEventArgs>;
    }
    /** @internal */
    interface TasksState extends TasksParams, BaseControlState {
    }
    class Tasks extends BaseControl<TasksParams, TasksState> {
        protected createParams(): TasksParams;
        private readonly tasksImpl;
        private binding;
        private createKindsBinding;
        addTask(taskCreateInfoId: string): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface TasksImplState extends BaseControlImplState, TasksState {
    }
    /** @internal */
    class TasksImpl extends BaseControlImpl<TasksParams, TasksImplState> {
        protected taskList: TaskListComponent;
        constructor(props: TasksParams);
        canAddTask(): boolean;
        addTask(taskCreateInfoId: string): void;
        protected handleHeaderClick(): void;
        protected handleCreateTask(item: ITaskCreateInfo): void;
        renderControl(): JSX.Element;
        isExpanded: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITaskListItemProps {
        taskListItem: ITaskListItem;
        digestView: boolean;
        tabStop: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITaskListItemState {
        endDate: Date;
    }
}
declare namespace WebClient {
    /** @internal */
    class TaskListItemComponent extends React.Component<ITaskListItemProps, ITaskListItemState> {
        constructor(props: any);
        protected getClassName(): string;
        protected groupTaskIconClassName(): string;
        protected getTaskStateIconClassName(): string;
        protected getUrl(): string;
        protected getEndDate(): string;
        protected getEndDateClassName(): string;
        protected inState(taskState: TaskStateType[], taskGroupState: TaskGroupStateType[]): boolean;
        protected getTabIndex(): 0 | -1;
        render(): JSX.Element;
        protected renderFullView(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITaskListProps {
        digestView: boolean;
        tabStop: boolean;
        items: ITaskListItem[];
    }
}
declare namespace WebClient {
    /** @internal */
    interface ITaskListState {
        taskListItems: ITaskListItem[];
    }
}
declare namespace WebClient {
    /** @internal */
    class TaskListComponent extends React.Component<ITaskListProps, ITaskListState> {
        protected refItems: HTMLElement;
        constructor(props: any);
        protected getTaskListItems(): JSX.Element[];
        render(): JSX.Element;
        protected getClassName(): string;
        protected renderEmptyItemList(): JSX.Element;
        protected renderItemList(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ITaskCreatingEventArgs {
        cardTypeId: string;
        cardKindId: string;
    }
}
declare namespace WebClient {
    interface ITaskCreateInfo {
        displayName: string;
        isTemplate: boolean;
        createRouteName: string;
        id: string;
        cardTypeId: string;
        layoutAvailable: boolean;
    }
}
declare namespace WebClient {
    interface ITaskListItem {
        cardId: string;
        kindId: string;
        taskName: string;
        viewRouteName: string;
        isGroupTask: boolean;
        stateDisplayName: string;
        stateType: number;
        stateClassName: string;
        performerDisplayName: string;
        startDate: string;
        endDate: string;
    }
}
declare namespace WebClient {
    enum TaskGroupStateType {
        Preparation = 0,
        Performance = 1,
        Completed = 2,
        Recalled = 3,
    }
}
declare namespace WebClient {
    enum TaskStateType {
        Draft = 0,
        InWork = 1,
        Completed = 2,
        Rejected = 3,
        OnAgreement = 4,
        Agreed = 5,
        Unknown = 6,
        NotAgreed = 7,
        OnAcceptance = 8,
        OnModification = 9,
        Deferred = 10,
        Recalled = 11,
        Delegated = 12,
        ReturnedFromDelegation = 13,
        Started = 14,
        Stopped = 15,
    }
}
declare namespace WebClient {
    /** @internal */
    class CommandMenuComponent extends React.Component<ICommandMenuProps, ICommandMenuState> {
        constructor(props: any);
        protected componentWillUnmount(): void;
        protected handleComponentClick(event?: Event): void;
        protected handleCommandMenuClick(event?: React.MouseEvent): void;
        protected onMenuItemClick(item: ITaskCreateInfo, ev: React.MouseEvent): void;
        protected getCommandMenuItems(filter: (ICommandMenuItem) => boolean): JSX.Element[];
        protected getKindItems(): JSX.Element[];
        protected getTemplates(): JSX.Element[];
        protected attachCommandBarButton(elem: any): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ICommandMenuProps {
        createKinds: ITaskCreateInfo[];
        isVisible: boolean;
        createTask: (item: ITaskCreateInfo) => void;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ICommandMenuState {
        expanded: boolean;
        commandMenuItems: ITaskCreateInfo[];
        commandBarBtn: any;
        popover: Popover;
    }
}
declare namespace WebClient {
    class PanelParams extends BaseControlParams {
        standardCssClass?: string;
        width?: number;
        minWidth?: number;
        order?: number;
        childControls?: any[];
    }
    interface PanelState extends PanelParams, BaseControlState {
    }
    abstract class Panel<P extends PanelParams, S extends PanelState> extends BaseControl<P, S> {
        private children;
        protected childrenHandler: any;
        private readonly childControls;
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected unregisterChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        getBindingsWriteRequests(withChildren?: boolean): IBindingsWriteRequest[];
        validate(params: any): IValidationResult[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class TableParams extends PanelParams {
        standardCssClass?: string;
        rows: string[];
        tip: string;
        header: string;
        editMode: EditMode;
        hasMore: boolean;
        columns: ILayoutTableColumnInfo[];
        maxRowCount: number;
        editAllowed: boolean;
        childControlsNames: string[];
        collapsible: boolean;
        isExpanded: boolean;
        rowAdding: CancelableApiEvent<IEventArgs>;
        rowAdded: BasicApiEvent<IRowEventArgs>;
        rowRemoving: CancelableApiEvent<IRowEventArgs>;
        rowRemoved: BasicApiEvent<IRowEventArgs>;
        collapsing: CancelableApiEvent<IEventArgs>;
        collapsed: BasicApiEvent<IEventArgs>;
        expanding: CancelableApiEvent<IEventArgs>;
        expanded: BasicApiEvent<IEventArgs>;
    }
    /** @internal */
    interface TableState extends TableParams, PanelState {
        binding: IBindingResult<ILayoutTableBindingModel>;
        model: ILayoutTableBindingModel;
        saveAndReloadTable: () => JQueryDeferred<any>;
        saveTable: () => JQueryDeferred<any>;
    }
    class Table extends Panel<TableParams, TableState> {
        constructor(props: TableParams);
        protected createParams(): TableParams;
        /** @internal */
        componentDidMount(): void;
        /** @internal */
        componentWillUnmount(): void;
        protected getBindingResultData(): ILayoutTableBindingModel;
        protected getBindings(): IBindingResult<any>[];
        protected saveAndReloadTable(): JQueryDeferred<any>;
        protected saveTable(): JQueryDeferred<any>;
        private readonly tableImpl;
        private binding;
        setColumnHeader(columnNumber: number, header: string): void;
        setColumnWidth(columnNumber: number, columnWidth: string): void;
        setColumnTip(columnNumber: number, tip: string): void;
        setColumnVisibility(columnNumber: number, visibility: boolean): void;
        getRowIndex(rowId: string): number;
        /** Add new row. */
        addRow(): JQueryDeferred<any>;
        removeRow(rowId: string): JQueryDeferred<any>;
        protected onCardSaving(sender: any, args: ICancelableEventArgs<ISaveControlData>): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface PanelImplState extends BaseControlState, PanelState {
    }
    abstract class PanelImpl<P extends PanelParams, S extends PanelImplState> extends BaseControlImpl<P, S> {
        constructor(props: P);
        componentWillMount(): void;
        protected renderChildren(children?: ILayoutModel[]): JSX.Element[];
        protected prepareChildren(children?: ILayoutModel[]): void;
        protected getCssStyle(): React.CSSProperties;
        protected getCssClass(): string;
        children: any[];
    }
}
declare namespace WebClient {
    /** @internal */
    interface TableImplState extends PanelImplState, TableState {
        tableRows: IRowInfo[];
        newRowTemplate: IRowInfo;
        isExpanded: boolean;
        collapsible: boolean;
        addRowState: LoadingState;
        columnWrappers: TableColumnWrapper[];
        header: string;
        tip: string;
    }
    /** @internal */
    class TableImpl extends PanelImpl<TableParams, TableImplState> {
        constructor(props: TableParams);
        protected prepareChildren(): void;
        protected parseRows(children: ILayoutModel[]): void;
        setColumnProperty(columnIndex: number, propertyName: string, propertyValue: any): void;
        protected readonly editMode: boolean;
        protected onDisclosureClick(): void;
        protected toggleCollapsed(): void;
        protected onCollapsed(): void;
        protected onExpanded(): void;
        protected canAddRows(): boolean;
        protected canRemoveRows(): boolean;
        addRowInternal(): JQueryDeferred<any>;
        protected onAddRowClick(ev: React.MouseEvent): void;
        removeRowIntenral(rowIndex: number): JQueryDeferred<any>;
        protected onRemoveRowClick(row: IRowInfo): void;
        protected getCssClass(): string;
        renderControl(): JSX.Element;
        getRowIndex(rowId: string): number;
        /** Get list of row id, currently shown in the table */
        readonly rows: string[];
        isCollapsed: boolean;
        readonly columns: TableColumnWrapper[];
    }
}
declare namespace WebClient {
    class TableColumnParams extends PanelParams {
        standardCssClass?: string;
    }
    interface TableColumnState extends TableColumnParams, PanelState {
        table: TableImpl;
        columnNumber: number;
        columnWidth: string;
    }
    class TableColumn extends Panel<TableColumnParams, TableColumnState> {
        protected createParams(): TableColumnParams;
        componentDidMount(): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface TableColumnImplState extends PanelState, TableColumnState {
    }
    /** @internal */
    class TableColumnImpl extends PanelImpl<TableColumnParams, TableColumnImplState> {
        constructor(props: TableColumnParams);
        protected prepareChildren(): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ILayoutTableBindingModel {
        sectionId: string;
        skippedCount: number;
        hasMore: boolean;
        loadedRows: string[];
        addedRows: string[];
        deletedRows: string[];
    }
}
declare namespace WebClient {
    interface ILayoutTableColumnInfo {
        header: string;
        columnWidth: string;
        tip: string;
        visibility: boolean;
    }
}
declare namespace WebClient {
    interface IRowEventArgs {
        rowId: string;
    }
}
declare namespace WebClient {
    interface IRowInfo {
        rowId: string;
        htmlElem: HTMLElement;
        columns: ILayoutModel[];
        removeRowHelper: RequestHelper;
    }
}
declare namespace WebClient {
    class TableColumnWrapper implements ILayoutTableColumnInfo {
        private _private;
        constructor(info: ILayoutTableColumnInfo, table: Table, columnNumber: number);
        header: string;
        columnWidth: string;
        tip: string;
        visibility: boolean;
    }
}
declare namespace WebClient {
    class TabParams extends PanelParams {
        standardCssClass?: string;
        mainTabOnMobile: boolean;
        defaultPageIndex: number;
        tabPages: TabPageInfo[];
        activeTabPage: TabPageInfo;
        activeTabChange: BasicApiEvent<IActiveTabChangeEventArgs>;
    }
    /** @internal */
    interface TabState extends TabParams, PanelState {
    }
    class Tab extends Panel<TabParams, TabState> {
        protected createParams(): TabParams;
        private readonly tabImpl;
        /** @internal */
        protected childrenHandler: any[];
        setTabPageHeader(tab: TabPageInfo, header: string): void;
        loadTabPage(tab: TabPageInfo): JQueryDeferred<TabPageInfo>;
        openTabPage(tabNumber: number): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface TabImplState extends PanelImplState, TabState {
        requestHelper: RequestHelper;
    }
    /** @internal */
    class TabImpl extends PanelImpl<TabParams, TabImplState> {
        constructor(props: TabParams);
        openTab(tab: TabPageInfo): void;
        loadTab(tab: TabPageInfo): JQueryDeferred<TabPageInfo>;
        protected parseTabs(props: TabParams): void;
        protected onTabClick(tab: TabPageInfo): void;
        protected activateTab(tab: TabPageInfo): void;
        protected updateMobileTab(tab: TabPageInfo): void;
        renderNavPanelMobileTabs(): void;
        protected shouldTabsToBeMobile(): boolean;
        renderTabsPanel(): JSX.Element;
        renderControl(): JSX.Element;
        activeTabPage: any;
        setTabPageHeader(tab: TabPageInfo, header: string): void;
        loadTabPage(tab: TabPageInfo): JQueryDeferred<TabPageInfo>;
        openTabPage(tabNumber: number): void;
    }
}
declare namespace WebClient {
    class TabPageParams extends PanelParams {
        standardCssClass?: string;
        tip?: string;
    }
    /** @internal */
    interface TabPageState extends TabPageParams, PanelState {
    }
    class TabPage extends Panel<TabPageParams, TabPageState> {
        protected createParams(): TabPageParams;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface TabPageImplState extends PanelImplState, TabPageState {
    }
    /** @internal */
    class TabPageImpl extends PanelImpl<TabPageParams, TabPageImplState> {
        constructor(props: TabPageParams);
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IActiveTabChangeEventArgs {
        oldTabIndex: number;
        newTabIndex: number;
    }
}
declare namespace WebClient {
    class TabPageInfo {
        header: string;
        key: string;
        data: ILayoutModel;
        loadingState: LoadingState;
        mobileTab: HTMLElement;
        constructor(data: ILayoutModel);
        readonly loaded: boolean;
    }
}
declare namespace WebClient {
    class StateButtonsParams extends BaseControlParams {
        standardCssClass?: string;
        operations: IOperationData[];
        tabStop?: boolean;
        verticalOrientation?: boolean;
        buttonsLimit?: number;
    }
    /** @internal */
    interface StateButtonsState extends StateButtonsParams, BaseControlState {
    }
    class StateButtons extends BaseControl<StateButtonsParams, StateButtonsState> {
        protected createParams(): StateButtonsParams;
        private readonly stateButtonsImpl;
        private bindingStateButtons;
        showMenu(): void;
        hideMenu(): void;
        performClick(operationId: string): void;
        add(operationData: IOperationData): void;
        remove(operationId: string): void;
        protected processEditOperations(operationsData: IOperationData[]): IOperationData[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface StateButtonsImplState extends BaseControlImplState, StateButtonsState {
    }
    /** @internal */
    class StateButtonsImpl extends BaseControlImpl<StateButtonsParams, StateButtonsImplState> {
        protected sidebar: RightSidebar;
        protected sidebarRoot: HTMLElement;
        constructor(props: StateButtonsParams);
        protected initSidebar(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        showMenu(): void;
        hideMenu(): void;
        performClick(operationId: string): void;
        add(operationData: IOperationData): void;
        remove(operationId: string): void;
        protected getStateButtons(): JSX.Element[];
        protected getSidebarButtons(): JSX.Element[];
        protected getCssClass(): string;
        protected getMenuButtonClassName(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IOperationData {
        operationId: string;
        displayName: string;
        tooltip: string;
    }
}
declare namespace WebClient {
    class StateParams extends BaseControlParams {
        standardCssClass?: string;
        value: IStateDataModel;
        tip: string;
        labelText: string;
    }
    /** @internal */
    interface StateState extends StateParams, BaseControlState {
    }
    class State extends BaseControl<StateParams, StateState> {
        protected createParams(): StateParams;
        private binding;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface StateImplState extends BaseControlImplState, StateState {
    }
    /** @internal */
    class StateImpl extends BaseControlImpl<StateParams, StateImplState> {
        constructor(props: StateParams);
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IStateDataModel {
        stateId: string;
        caption: string;
    }
}
declare namespace WebClient {
    class SavingButtonsParams extends BaseControlParams {
        standardCssClass?: string;
        okButtonText: string;
        cancelButtonText: string;
        okButtonDisabled: boolean;
        cancelButtonDisabled: boolean;
    }
    /** @internal */
    interface SavingButtonsState extends SavingButtonsParams, BaseControlState {
        performSave: Function;
        performCancel: Function;
        cardIsSaving: boolean;
    }
    class SavingButtons extends BaseControl<SavingButtonsParams, SavingButtonsState> {
        constructor(props: SavingButtonsParams);
        protected createParams(): SavingButtonsParams;
        componentDidMount(): void;
        componentWillUnmount(): void;
        private readonly savingButtonsImpl;
        performSave(): JQueryDeferred<any>;
        performCancel(): void;
        protected onCardSaving(): void;
        protected onCardSavedOrFailed(): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface SavingButtonsImplState extends BaseControlImplState, SavingButtonsState {
        savingHelper: RequestHelper;
        cardIsSaving: boolean;
    }
    /** @internal */
    class SavingButtonsImpl extends BaseControlImpl<SavingButtonsParams, SavingButtonsImplState> {
        constructor(props: SavingButtonsParams);
        onSave(): void;
        onCancel(): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class NumeratorParams extends InputBasedControlParams<INumberInfo> {
        standardCssClass?: string;
        generationRule: string;
        allowManualEdit: boolean;
    }
    /** @internal */
    interface NumeratorState extends NumeratorParams, InputBasedControlState<INumberInfo> {
        numeratorBinding: IBindingResult<INumberInfo>;
        bindingInfo: IBindingInfoExt;
    }
    class Numerator extends InputBasedControl<INumberInfo, NumeratorParams, NumeratorState> {
        protected createParams(): NumeratorParams;
        private readonly numeratorImpl;
        private numeratorBinding;
        /** Set the name of the current value of the control*/
        setNumberText(number: string): void;
        /** Send request to the server to generate new number, with sepcified rule.
        * With default parameters values equal to press generate button.
        * @param saveToTheCard Should be new number saved as the current card number or not.
        * @param ruleId Generation rule id.
        * @param saveCardBefore Should control save the card, before generate number.
        *        Saving a card required, because card fields can be used in number generation rule.
        */
        generateNewNumber(saveToTheCard?: boolean, saveCardBefore?: boolean): JQueryDeferred<INumberInfo>;
        clearNumber(): JQueryDeferred<any>;
        protected getBindings(): IBindingResult<any>[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface NumeratorImplState extends InputBasedControlImplState<INumberInfo>, NumeratorState {
        requestHelper: RequestHelper;
        currentValueGeneratedNumber: string;
    }
    /** @internal */
    class NumeratorImpl extends InputBasedControlImpl<INumberInfo, NumeratorParams, NumeratorImplState> {
        constructor(props: NumeratorParams);
        generateNewNumber(saveToTheCard: boolean, prepareAction: () => JQueryDeferred<any>): JQueryDeferred<INumberInfo>;
        componentDidMount(): void;
        protected getTextValue(): string;
        protected onInputChange(event: any): void;
        clearNumber(): JQueryDeferred<any>;
        protected renderInto(props: NumeratorParams, container: HTMLElement): Numerator;
        protected readonly editAvailable: boolean;
        protected readonly withInputMode: boolean;
        protected getCssClass(): string;
        protected onGenerateClick(): void;
        protected onClearClick(): void;
        protected onValueClick(event: any): void;
        protected getButtons(): IBoxWithButtonsButtonInfo[];
        protected renderWithText(): JSX.Element;
        protected renderInputWithPlaceholder(): JSX.Element;
    }
}
declare namespace WebClient {
    class NumberParams extends InputBasedControlParams<number> {
        standardCssClass?: string;
        fractionDigits?: number;
    }
    /** @internal */
    interface NumberState extends NumberParams, InputBasedControlState<number> {
        binding: IBindingResult<number>;
    }
    class NumberControl extends InputBasedControl<number, NumberParams, NumberState> {
        protected createParams(): NumberParams;
        private readonly RealNumberImpl;
        private RealNumberBinding;
        protected getBindings(): IBindingResult<any>[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface NumberImplState extends InputBasedControlImplState<number>, NumberState {
    }
    /** @internal */
    class NumberImpl extends InputBasedControlImpl<number, NumberParams, NumberImplState> {
        constructor(props: NumberParams);
        protected trimFractionDigits(val: number): number;
        protected numberToString(value: number, useGrouping: boolean): string;
        protected prepareValueForSettingToInput(value: number): string;
        protected getTextValue(): string;
        protected renderInto(props: NumberParams, container: HTMLElement): NumberControl;
        protected onInputChange(event: React.KeyboardEvent): void;
        protected setInputValue(value: string): void;
        protected setValue(value: number, redraw: boolean): void;
        protected attachInput(elem: HTMLInputElement): void;
        protected onInputBlur(event: React.FocusEvent): void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected renderInput(): JSX.Element;
    }
}
declare namespace WebClient {
    class LinksParams extends BaseControlParams {
        standardCssClass?: string;
        links?: LinkItem[];
        createLinkAvailable?: boolean;
        addLinkAvailable?: boolean;
        deleteLinkAvailable?: boolean;
        editLinkAvailable?: boolean;
        /** Заголовок блока ссылок */
        header?: string;
        showOpened?: boolean;
        saveHardLink?: boolean;
        createLinkEnabled?: boolean;
        addLinkEnabled?: boolean;
        isExpanded?: boolean;
        commandBarExpanded?: boolean;
        addLinkLinkTypes?: ILinkType[];
        createLinkKinds?: IAllowedCardKind[];
        createLinkLinkTypes?: ILinkType[];
        addLinkCardTypes?: string[];
        linkAdding?: CancelableApiEvent<IEventArgs>;
        linkDeleting?: CancelableApiEvent<ILinkEventArgs>;
        linkCardCreating?: CancelableApiEvent<IEventArgs>;
        linkInfoOpening?: CancelableApiEvent<ILinkEventArgs>;
        linkInfoClosing?: CancelableApiEvent<ILinkEventArgs>;
        linkInfoEditing?: CancelableApiEvent<ILinkEventArgs>;
        linkFilePreviewing?: CancelableApiEvent<ILinkEventArgs>;
        linkCardOpening?: CancelableApiEvent<ILinkEventArgs>;
        collapsing?: CancelableApiEvent<IEventArgs>;
        expanding?: CancelableApiEvent<IEventArgs>;
        linkAdded?: BasicApiEvent<ILinkEventArgs>;
        linkDeleted?: BasicApiEvent<ILinkEventArgs>;
        linkInfoEdited?: BasicApiEvent<ILinkEventArgs>;
        linkFilePreviewed?: BasicApiEvent<ILinkEventArgs>;
        collapsed?: BasicApiEvent<IEventArgs>;
        expanded?: BasicApiEvent<IEventArgs>;
    }
    /** @internal */
    interface LinksState extends LinksParams, BaseControlState {
        model: ILinksDataModel;
        bindingInfo: ISimpleBindingInfo;
    }
    class Links extends BaseControl<LinksParams, LinksState> {
        protected createParams(): LinksParams;
        private readonly linksImpl;
        private addLinkEnabled;
        private createLinkEnabled;
        private binding;
        private createLinkOperationBinding;
        private addLinkOperationBinding;
        private removeLinkOperationBinding;
        private editLinkOperationBinding;
        private createLinkLinkTypes;
        private createLinkKinds;
        private addLinkLinkTypes;
        private showOpened;
        openAddExitingCardDialog(): void;
        openAddNewCardDialog(): void;
        openFilePreview(linkItem: LinkItem): void;
        getLinkUrl(linkItem: LinkItem): string;
        deleteLink(linkItem: LinkItem): void;
        protected setParamValues(props: BaseControlParams, initial: boolean): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface LinksImplState extends BaseControlImplState, LinksState {
        addExistingCardLinkDialog: ExistingCardLinkDialog;
    }
    /** @internal */
    class LinksImpl extends BaseControlImpl<LinksParams, LinksImplState> {
        constructor(props: LinksParams);
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected closeAllMenus(): void;
        protected loadLinksModel(model: ILinksDataModel): void;
        protected model: ILinksDataModel;
        protected getCardCreateLink(cardTypeId: string, kindId: string, linkTypeId: string, layoutAvailable: boolean): string;
        protected onDocumentClick(ev: any): void;
        protected onLinkClick(linkItem: LinkItem): void;
        protected onHeaderClick(): void;
        protected onCollapsed(): void;
        protected onExpanded(): void;
        protected onCommandBarClick(ev?: React.MouseEvent): void;
        onAddNewCardLinkClick(ev?: React.MouseEvent): void;
        onAddExistingCardLinkClick(ev?: React.MouseEvent): void;
        protected onViewFileMenuClick(linkItem: LinkItem): void;
        onDeleteMenuClick(linkItem: LinkItem): void;
        protected onLinkMenuClick(linkItem: LinkItem): void;
        protected getLinkIconClass(linkItem: LinkItem): "dv-ico icon-spin loader-animate" | "dv-ico ico-dv-card" | "dv-ico ico-file";
        protected attachInfoIcon(iconElem: HTMLElement, linkItem: LinkItem): void;
        protected showInfoPopover(linkItem: LinkItem): void;
        protected renderHeader(): JSX.Element;
        protected renderLinksTable(): JSX.Element;
        protected renderSettingsMenu(linkItem: LinkItem): JSX.Element;
        renderControl(): JSX.Element;
        isExpanded: boolean;
        commandBarExpanded: boolean;
        openFilePreview(linkItem: LinkItem): void;
        getLinkUrl(linkItem: LinkItem): string;
    }
}
declare namespace WebClient {
    /** @internal */
    interface INewCardLinkDialogProps {
        kinds: IKindModel[];
        linkTypes: ILinkType[];
    }
}
declare namespace WebClient {
    /** @internal */
    interface INewCardLinkDialogState {
        selectedKind: IKindModel;
        selectedLinkType: ILinkType;
        treeNodes: KindTreeNodeData[];
        tree: Tree;
        root: HTMLElement;
    }
}
declare namespace WebClient {
    /** @internal */
    class NewCardLinkDialog extends React.Component<INewCardLinkDialogProps, INewCardLinkDialogState> {
        buttonOkEvent: SimpleEvent<NewCardLinkDialogArgs>;
        kindSelectedEvent: SimpleEvent<NewCardLinkDialogArgs>;
        constructor(props: INewCardLinkDialogProps);
        readonly buttonOkClicked: SimpleEvent<NewCardLinkDialogArgs>;
        readonly selectedKind: IKindModel;
        readonly selectedLinkType: ILinkType;
        static ShowDialog(kinds: IKindModel[], linkTypes: ILinkType[], uniqueControlKey: string, okCallback: (sender: any, data: NewCardLinkDialogArgs) => void): void;
        protected loadTreeNodes(kinds: IKindModel[]): KindTreeNodeData[];
        protected attachTree(tree: Tree): void;
        protected onKindSelected(sender: any, node: TreeNode): void;
        protected onLinkTypeSelect(val: LinkTypeComboBoxVariant): void;
        protected getLinkTypeComboBoxProps(): any;
        componentDidMount(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    class LinkInfoPopover extends React.Component<ILinkInfoPopoverProps, ILinkInfoPopoverState> {
        constructor(props: ILinkInfoPopoverProps);
        onPopoverHidden(): void;
        onTextClick(event: React.MouseEvent): void;
        beginEdit(): void;
        saveComment(): void;
        onSaveClick(): void;
        onCommentChange(event: React.SyntheticEvent): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ILinkInfoPopoverProps {
        linkItem: LinkItem;
        bindingInfo: ISimpleBindingInfo;
        iconClass: string;
        editAvailable: boolean;
        onSaved: (model: ILinksDataModel) => void;
        maxCommentLength?: number;
        linkInfoEditing: CancelableEvent<ILinkEventArgs>;
        linkInfoEdited: SimpleEvent<ILinkEventArgs>;
        ownedLayout: Layout;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ILinkInfoPopoverState {
        editInProcess: boolean;
        saving: boolean;
        commentText: string;
        tooLongError: boolean;
        maxCommentLength: number;
        commentEditInput: HTMLTextAreaElement;
    }
}
declare namespace WebClient {
    /** @internal */
    class ExistingCardLinkDialog {
        ownedLayout: Layout;
        bindingInfo: ISimpleBindingInfo;
        saveHardLink: boolean;
        allowedLinkTypes: string[];
        allowedCardTypes: string[];
        constructor(ownedLayout: Layout, bindingInfo: ISimpleBindingInfo, saveHardLink: boolean, allowedLinkTypes: string[], allowedCardTypes: string[]);
        showExistingCardLinkDialog(doneCallback: (model: ILinksDataModel) => void): void;
    }
}
declare namespace WebClient {
    interface ILinkEventArgs {
        linkItem: ILinkItem;
    }
}
declare namespace WebClient {
    interface NewCardLinkDialogArgs {
        kind: IKindModel;
        linkType: ILinkType;
    }
}
declare namespace WebClient {
    enum LinkItemState {
        Saving = 0,
        Saved = 1,
    }
}
declare namespace WebClient {
    enum LinkKind {
        Card = 0,
        File = 1,
    }
}
declare namespace WebClient {
    interface ILinkItem {
        data: ILinkItemData;
        state: LinkItemState;
    }
}
declare namespace WebClient {
    /** @internal */
    class KindTreeNodeData implements ITreeNodeData {
        kindModel: IKindModel;
        children: KindTreeNodeData[];
        trimmedName: string;
        constructor(kind: IKindModel, children: KindTreeNodeData[]);
        readonly displayName: string;
        readonly uniqueId: string;
        readonly iconClass: string;
        readonly disabled: boolean;
        private trimName(fullName);
    }
}
declare namespace WebClient {
    class LinkItem implements ILinkItem {
        data: ILinkItemData;
        state: LinkItemState;
        settingsMenuExpanded: boolean;
        infoIcon: HTMLElement;
        popover: Popover;
    }
}
declare namespace WebClient {
    /** @internal */
    class LinkTypeComboBoxVariant implements IComboBoxVariant {
        data: ILinkType;
        constructor(val: ILinkType);
        readonly displayName: any;
        readonly uniqueId: string;
    }
}
declare namespace WebClient {
    class LayoutParams extends PanelParams {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Событие возникает при открытии карточки. */
        cardOpening?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает после открытия карточки. */
        cardOpened?: BasicApiEvent<IEventArgs>;
        /** Событие возникает при сохранении карточки. */
        cardSaving?: CancelableApiEvent<ISaveControlData>;
        /** Событие возникает после сохранения карточки. */
        cardSaved?: BasicApiEvent<IEventArgs>;
        /** Событие возникает, если при сохранении карточки возникли ошибки. */
        cardSaveFailed?: BasicApiEvent<IEventArgs>;
        /** Событие возникает перед изменением состояния карточки. */
        cardStateChanging?: CancelableApiEvent<ICardStateChangingEventArgs>;
        /** Событие возникает перед изменением разметки карточки. */
        cardLayoutSwitching?: CancelableApiEvent<IEventArgs>;
        /** @internal */
        mapLayout?: (layoutResolver: () => Layout) => void;
    }
    /** @internal */
    interface LayoutState extends LayoutParams, PanelState {
        isInitialized: boolean;
        controlStore: ControlStore;
        cardInfo: ICardInfoModel;
        layoutInfo: ILayoutInfoModel;
        layoutContainer: LayoutContainer;
        editOperations: IEditOperationStore;
        saved: boolean;
    }
    /**
     * Класс разметки карточки.
     *
     * Предоставляет доступ к элементам управления, расположенным на разметке, а также методы управления и события карточки.
     */
    class Layout extends Panel<LayoutParams, LayoutState> {
        constructor(props: LayoutParams);
        protected createParams(): LayoutParams;
        /** @internal */
        componentDidMount(): void;
        /** Возвращает элементы управления разметки. */
        readonly controls: IControlWrapperMap;
        private cardInfoHandler;
        /** Возвращает модель данных карточки. */
        readonly cardInfo: ICardInfoModel;
        private layoutInfoHandler;
        /** Возвращает модель данных разметки. */
        readonly layoutInfo: ILayoutInfoModel;
        private layoutContainerHandler;
        /** Возвращает контейнер разметки. */
        readonly layoutContainer: LayoutContainer;
        private editOperationsrHandler;
        /** Предоставляет доступ к хранилищу операций редактирования. */
        readonly editOperations: IEditOperationStore;
        /** Возвращает текущую разметку. */
        readonly layout: Layout;
        /** Возвращает отображаемое название типа карточки. */
        readonly cardTypeName: string;
        protected readonly control: LayoutImpl;
        protected registerControl(control: BaseControl<BaseControlParams, BaseControlState>): void;
        protected unregisterControl(control: BaseControl<BaseControlParams, BaseControlState>): void;
        /**
         * Сохраняет изменения всей разметки (карточки) или конкретного элемента управления.
         * @param control Элемент управления который требуется сохранить. Если не указан, будет сохранена вся разметка.
         * @param doNotMarkAsSaved Флаг, указывающий, что карточка должна сохранить признак "не сохранена": true - карточка остается с признаком "не сохранена", false - карточка сохраняется в обычном режиме.
         */
        saveCard(control?: BaseControl<BaseControlParams, BaseControlState>, doNotMarkAsSaved?: boolean): JQueryDeferred<any>;
        /**
         * Изменяет состояние карточки, по полученной операции редактирования.
         * @param operationId Идентификатор операции редактирования.
         */
        changeState(operationId: string): void;
        /**
         * Проверяет, что карточка заблокирована и есть изменения.
         * @return done срабатывает, когда карточка заблокирована и есть изменения; иначе - срабатывает fail.
         */
        checkLockAndModified(): JQueryDeferred<any>;
        protected handleCardOpening(): void;
        protected handleCardOpened(): void;
        protected handleCardSaving(saveControlData: ISaveControlData): JQueryDeferred<any>;
        protected handleCardSaved(): void;
        protected handleCardSaveFailed(): void;
        protected handleCardStateChanging(operationId: string, callback: () => void): void;
        protected handleCardLayoutSwitching(callback: () => void): void;
        /**
        * Возвращает флаг, указывающий, что карточка была сохранена после загрузки разметки: true - была сохранена, false - не была сохранена.
        */
        readonly saved: boolean;
        componentWillMount(): void;
        deinit(): JQueryDeferred<any>;
        /** @internal */
        render(): JSX.Element;
        protected setParamValues(props: BaseControlParams, initial: boolean): void;
    }
}
declare namespace WebClient {
    /** @internal */
    interface LayoutImplProps extends LayoutParams {
        cardTypeName: string;
    }
    /** @internal */
    interface LayoutImplState extends PanelImplState, LayoutState, LayoutImplProps {
    }
    /** @internal */
    class LayoutImpl extends PanelImpl<LayoutImplProps, LayoutImplState> {
        constructor(props: LayoutImplProps);
        protected readonly wrapper: Layout;
        protected prepareChildren(): void;
        protected getCssClass(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    /**
    * Содержит публичные свойства элемента управления [Метка]{@link Label}.
    */
    class LabelParams extends BaseControlParams {
        /** Текст метки. */
        text: string;
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
    }
    /** @internal */
    interface LabelState extends LabelParams, BaseControlState {
    }
    /**
     * Класс элемента управления Метка.
     *
     * Добавляет в web-разметку текстовый не редактируемый элемент.
     */
    class Label extends BaseControl<LabelParams, LabelState> {
        protected createParams(): LabelParams;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface LabelImplState extends BaseControlImplState, LabelState {
    }
    /** @internal */
    class LabelImpl extends BaseControlImpl<LabelParams, LabelImplState> {
        constructor(props: LabelParams);
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IDataChangedEventArgs {
        oldValue: any;
        newValue: any;
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Выбор папки]{@link Folder}.
     */
    class FolderParams extends BaseControlParams {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Текст всплывающей подсказки. */
        tip?: string;
        /** Текст заполнителя. */
        placeHolder?: string;
        /** Текст метки. */
        labelText?: string;
        /** Флаг, определяющий, что метка должна отображаться, когда значение элемента управления не задано: true - отображать, false - не отображать. */
        showEmptyLabel?: boolean;
        /** Флаг, указывающий, обязательно ли должно быть задано значение элемента управления: true - обязательно, false - не обязательно. */
        required?: boolean;
        /** Возвращает метод выбора папки по умолчанию. */
        folderMode?: FolderMode;
        currentFolderForbidden?: boolean;
        currentFolder?: string;
        /** Данные выбранной папки. */
        value?: IFolderInfo;
        /** Идентификатор карточки, для которой выбирается размещение. */
        cardId?: string;
        /** Событие возникает после выбора папки. */
        dataChanged?: BasicApiEvent<IDataChangedEventArgs>;
    }
    /** @internal */
    interface FolderState extends FolderParams, BaseControlState {
        checkFolderForAvailable: (folderId: string) => JQueryDeferred<ICheckResult>;
    }
    /**
     * Класс элемента управления Выбор папки.
     *
     * Добавляет в web-разметку ссылку, при нажатии которой вызывается диалог выбора папки для размещения создаваемой карточки.
     */
    class Folder extends BaseControl<FolderParams, FolderState> {
        constructor(props: FolderParams);
        protected createParams(): FolderParams;
        private readonly folderImpl;
        private visibility;
        /**
         * Закрывает диалоговое окно выбора папки.
         */
        hide(): void;
        /**
         * Отменяет выбор папки.
         */
        clear(): void;
        /**
         * Открывает диалоговое окно выбора папки.
         */
        show(): void;
        /** @internal */
        onSaving(): JQueryDeferred<any>;
        protected checkFolderForAvailable(folderId: string): JQueryDeferred<ICheckResult>;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface FolderImplState extends BaseControlImplState, FolderState {
        dialog: WebClient.ModalWindow;
    }
    /** @internal */
    class FolderImpl extends BaseControlImpl<FolderParams, FolderImplState> {
        constructor(props: FolderParams);
        protected handleDataChanged(eventArgs: IDataChangedEventArgs): void;
        show(): void;
        hide(): void;
        clear(): void;
        protected changeFolder(newFolder: IFolderInfo): void;
        protected onFolderSelected(controlInModal: FolderModal, window: WebClient.ModalWindow): void;
        protected getFolderInfo(folderId: string): IFolderInfo;
        protected renderLabel(): JSX.Element;
        protected renderValue(): JSX.Element;
        protected renderClearButton(): JSX.Element;
        protected getCssClass(): string;
        renderControl(): JSX.Element;
        value: IFolderInfo;
    }
}
declare namespace WebClient {
    /** @internal */
    class FolderModal extends React.Component<any, IFolderModalState> {
        folderSelectedEvent: SimpleEvent<IFolderInfo>;
        constructor(props: any);
        componentDidMount(): void;
        readonly selectedFolder: IFolderInfo;
        readonly folderSelected: IBasicEvent<IFolderInfo>;
        protected loadFolderData(callback: Function, folderId?: string): void;
        protected attachTreeControl(control: Tree): void;
        protected onFolderExpaded(sender: any, node: TreeNode): void;
        protected onFolderSelected(sender: any, node: TreeNode): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IFolderModalState {
        tree: Tree;
        folders: FolderNodeData[];
    }
}
declare namespace WebClient {
    /** @internal */
    class FolderNodeData implements ITreeNodeData {
        data: IFolderInfo;
        readonly name: string;
        readonly folderId: string;
        readonly additionalId: string;
        readonly folderType: FolderType;
        readonly disabled: boolean;
        children: FolderNodeData[];
        static Create(data: IFolderInfo): FolderNodeData;
        readonly displayName: string;
        readonly uniqueId: string;
        readonly iconClass: string;
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Список файлов]{@link FileListControl}.
     */
    class FileListControlParams extends BaseControlParams {
        /** Стандартный CSS класс со стилями элемента управления. */
        standardCssClass?: string;
        /** Выбранные файлы. */
        files: FileListItem[];
        /** Флаг, указывающий на наличие ЭЦП на основных файлах: true - файлы подписаны, false - не подписаны. */
        hasAnySignature: boolean;
        /** Флаг, определяющий раскрыт ли блок со списком основных файлов: true - раскрыт, false - свернут. */
        mainFilesExpanded: boolean;
        /** Флаг, определяющий раскрыт ли блок со списком дополнительных файлов: true - раскрыт, false - свернут. */
        extraFilesExpanded: boolean;
        /** Флаг, определяющий отображается ли меню добавления файлов: true - отображается, false - скрыто. */
        fileCommandBarExpanded: boolean;
        /** Флаг, определяющий отображается ли меню подписания файлов: true - отображается, false - скрыто. */
        signCommandBarExpanded: boolean;
        /** Возвращает режим редактирования элемента управления. */
        editMode: EditMode;
        /** Флаг, указывающий, разрешено ли добавлять основные файлы: true - разрешено, false - не разрешено. */
        canAddMain: boolean;
        /** Флаг, указывающий, разрешено ли добавлять дополнительные файлы: true - разрешено, false - не разрешено. */
        canAddExtra: boolean;
        /** Флаг, указывающий, разрешено ли подписывать файлы: true - разрешено, false - не разрешено. */
        canSign: boolean;
        /** Флаг, указывающий, разрешено ли открывать журнал подписей: true - разрешено, false - не разрешено. */
        canViewSign: boolean;
        /** Событие возникает при добавлении основного файла. */
        mainFileAdding: CancelableApiEvent<IMainFileAddingArgs>;
        /** Событие возникает при добавлении дополнительного файла. */
        extraFileAdding: CancelableApiEvent<IExtraFileAddingArgs>;
        /** Событие возникает при удалении основного файла. */
        mainFileDeleting: CancelableApiEvent<IMainFileDeletingArgs>;
        /** Событие возникает при удалении дополнительного файла. */
        extraFileDeleting: CancelableApiEvent<IExtraFileDeletingArgs>;
        /** Событие возникает при скачивании версии файла. */
        fileVersionDownloading: CancelableApiEvent<IFileVersionDownloadingArgs>;
        /** Событие возникает при загрузке версии файла. */
        fileVersionUploading: CancelableApiEvent<IFileVersionUploadingArgs>;
        /** Событие возникает при открытии файла через WebDAV. */
        fileOpening: CancelableApiEvent<IFileOpeningArgs>;
        /** Событие возникает при открытии журнала подписей. */
        signatureListViewing: CancelableApiEvent<ISignatureListViewingArgs>;
        /** Событие возникает при подписании файла. */
        signatureCreating: CancelableApiEvent<ISignatureCreatingArgs>;
        /** Событие возникает при добавлении комментария к версии файла. */
        fileVersionCommentAdding: CancelableApiEvent<IFileVersionCommentAddingArgs>;
        /** Событие возникает при удалении комментария к версии файла. */
        fileVersionCommentDeleting: CancelableApiEvent<IFileVersionCommentDeletingArgs>;
        /** Событие возникает при открытии окна предварительного просмотра файла. */
        filePreviewing: CancelableApiEvent<IFilePreviewingArgs>;
        /** Событие возникает после удаления основного файла. */
        mainFileDeleted: BasicApiEvent<IMainFileDeletedArgs>;
        /** Событие возникает после удаления дополнительного файла. */
        extraFileDeleted: BasicApiEvent<IExtraFileDeletedArgs>;
        /** Событие возникает после скачивания версии файла. */
        fileVersionDownloaded: BasicApiEvent<IFileVersionDownloadedArgs>;
        /** Событие возникает после загрузки версии файла. */
        fileVersionUploaded: BasicApiEvent<IFileVersionUploadedArgs>;
        /** Событие возникает после открытии файла через WebDAV. */
        fileOpened: BasicApiEvent<IFileOpenedArgs>;
        /** Событие возникает после открытия журнала подписей. */
        signatureListViewed: BasicApiEvent<ISignatureListViewedArgs>;
        /** Событие возникает после подписания файла. */
        signatureCreated: BasicApiEvent<ISignatureCreatedArgs>;
        /** Событие возникает после добавления комментария к версии файла. */
        fileVersionCommentAdded: BasicApiEvent<IFileVersionCommentAddedArgs>;
        /** Событие возникает после удаления комментария к версии файла. */
        fileVersionCommentDeleted: BasicApiEvent<IFileVersionCommentDeletedArgs>;
        /** Событие возникает после добавления основного файла. */
        mainFileAdded: BasicApiEvent<IMainFileAddedArgs>;
        /** Событие возникает после добавления дополнительного файла. */
        extraFileAdded: BasicApiEvent<IExtraFileAddedArgs>;
        /** Событие возникает после открытия окна предварительного просмотра файла. */
        filePreviewed: BasicApiEvent<IFilePreviewedArgs>;
    }
    /** @internal */
    interface FileListControlState extends FileListControlParams, BaseControlState {
        logic: FileListControlLogic;
        autoUpload: boolean;
    }
    /**
     * Класс элемента управления Список файлов.
     *
     * Добавляет в web-разметку компонент для управления основными и дополнительныеми файлами карточки.
     * В разметку режима чтения добавляет компонент для добавления основных файлов.
     */
    class FileListControl extends BaseControl<FileListControlParams, FileListControlState> {
        constructor(props: FileListControlParams);
        protected createParams(): FileListControlParams;
        private readonly fileListImpl;
        private bindingEditOperation;
        /**
         * Открывает меню добавления основных файлов.
         */
        openAddMainFileDialog(): void;
        /**
         * Открывает меню добавления дополнительных файлов.
         */
        openAddExtraFileDialog(): void;
        /**
         * Открывает журнал подписей.
         */
        openSignListDialog(): void;
        /**
         * Открывает диалоговое окно подписания файлов.
         */
        openSignDialog(): void;
        /**
         * Проверяет возможность открытия указанного файла.
         * @param fileItem Файл.
         * @return true - открытие возможно, иначе - false.
         */
        canRead(fileItem: FileListItem): boolean;
        /**
         * Проверяет возможность редактирования указанного файла.
         * @param fileItem Файл.
         * @return true - редактирование возможно, иначе - false.
         */
        canEdit(fileItem: FileListItem): boolean;
        /**
         * Проверяет возможность удаления указанного файла.
         * @param fileItem Файл.
         * @return true - удаление возможно, иначе - false.
         */
        canDelete(fileItem: FileListItem): boolean;
        /**
         * Проверяет возможность блокировки указанного файла.
         * @param fileItem Файл.
         * @return true - блокировка возможна, иначе - false.
         */
        canLock(fileItem: FileListItem): boolean;
        /**
         * Проверяет возможность комментирования указанного файла.
         * @param fileItem Файл.
         * @return true - комментирование возможно, иначе - false.
         */
        canComment(fileItem: FileListItem): boolean;
        /**
         * Удаляет файл из списка.
         * @param fileItem Файл.
         */
        removeFile(fileItem: FileListItem): JQueryDeferred<any>;
        /**
         * Блокирует файл.
         * @param fileItem файл.
         */
        lockFile(fileItem: FileListItem): void;
        /**
         * Снимает установленную блокировку с файла.
         * @param fileItem Файл.
         */
        unlockFile(fileItem: FileListItem): void;
        /**
         * Открывает диалоговое окно комментирования версии файла.
         * @param fileItem Файл.
         * @param fileVersion Версия файла. Если пропущен, то будет комментироваться текущая версия.
         */
        openCommentsDialog(fileItem: FileListItem, fileVersion?: IFileVersion): void;
        /**
         * Проверяет раскрыт ли список версий указанного файла.
         * @param fileItem Файл.
         * @return true - раскрыт, false - свернут.
         */
        getVersionsListExpanded(fileItem: FileListItem): boolean;
        /**
         * Сворачивает раскрытый список версий файлов или раскрывает свернутый.
         * @param fileItem Файл.
         */
        toggleVersionsList(fileItem: FileListItem): void;
        /**
         * Открывает предварительный просмотр указанной версии файла.
         * @param fileItem Файл.
         * @param fileVersion Версия файла. Если пропущен, то будет открыта текущая версия.
         */
        openPreview(fileItem: FileListItem, fileVersion?: IFileVersion): void;
        /**
         * Скачивает (на компьютер) указанную версию файла.
         * @param fileItem Файл.
         * @param fileVersion Версия файла. Если пропущен, то будет скачана текущая версия.
         */
        download(fileItem: FileListItem, fileVersion?: IFileVersion): void;
        /**
         * Открывает файл с использованием технологии WebDAV.
         * @param fileItem Файл.
         */
        openWebDav(fileItem: FileListItem): void;
        /** @internal */
        onSaved(): JQueryDeferred<any>;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface FileListImplState extends BaseControlImplState, FileListControlState {
    }
    /** @internal */
    class FileListControlImpl extends BaseControlImpl<FileListControlParams, FileListImplState> {
        mainAttach: FileListAttachedElements;
        extraAttach: FileListAttachedElements;
        signButton: HTMLElement;
        viewSignButton: HTMLElement;
        fileSignLogic: WebClient.FileSign;
        readonly logic: FileListControlLogic;
        constructor(props: FileListControlParams);
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected getCssClass(): string;
        protected getFilesSignInfo(): WebClient.IFileSignInfo[];
        renderUploadForm(attach: FileListAttachedElements, action: string, main?: boolean, fileItem?: FileListItem): JSX.Element;
        protected renderEditModeFileList(): JSX.Element;
        protected onDropzoneClick(): void;
        protected renderEditMode(): JSX.Element;
        protected onDocumentClick(ev: any): void;
        protected onToggleTableClick(main: boolean): void;
        protected onToggleCommandBarClick(ev?: React.MouseEvent): void;
        onAddClick(main: boolean, ev?: React.MouseEvent): void;
        protected attachSignButton(element: HTMLElement): void;
        protected attachViewSignButton(element: HTMLElement): void;
        protected onSignButtonClick(ev: React.MouseEvent): void;
        protected onToggleSignPanelClick(ev?: React.MouseEvent): void;
        protected renderViewModeTitle(mainFiles: boolean): JSX.Element;
        protected renderViewModeCommandBar(): JSX.Element;
        protected renderViewModeSignPanel(): JSX.Element;
        protected renderViewModeFilesHeader(): JSX.Element;
        protected renderViewModeFiles(main: boolean): JSX.Element;
        protected renderViewModeMain(): JSX.Element;
        protected renderViewModeExtra(): JSX.Element;
        protected renderViewMode(): JSX.Element;
        renderControl(): JSX.Element;
        mainFilesExpanded: boolean;
        extraFilesExpanded: boolean;
        fileCommandBarExpanded: boolean;
        signCommandBarExpanded: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    class FileListControlLogic {
        mainAttach: FileListAttachedElements;
        extraAttach: FileListAttachedElements;
        initialized: boolean;
        lastSaveDeffered: JQueryDeferred<any>;
        parent: FileListControlImpl;
        filesToRemove: FileListItem[];
        constructor();
        init(_mainAttach: FileListAttachedElements, _extraAttach: FileListAttachedElements, _parent: FileListControlImpl): void;
        loadFilesFromModel(model: IFileListDataModel, oldFiles?: FileListItem[]): FileListItem[];
        loadFileModel(model: IFileListDataModel): void;
        onSaved(): JQueryDeferred<any>;
        uploadNewFiles(): JQueryPromise<any>;
        sendRequest(sendFunc: () => JQueryDeferred<IFileListDataModel>, savingItems: FileListItem[]): JQueryDeferred<any>;
        getFiles(mainFiles: boolean): FileListItem[];
        initJQueryUploaderForAddFiles(attach: FileListAttachedElements, main: boolean): void;
        initJQueryUploaderForAddFileVersions(attach: FileListAttachedElements, fileItem: FileListItem): void;
        download(fileItem: FileListItem, fileVersion: IFileVersion, action: string): void;
        webDav(fileItem: FileListItem, canEdit: boolean): void;
        /**
         * Mark file for remove, or send remove request imediately
         * @param fileItem File to remove
         * @param immediately Send request to the server right now, or wait onSaved
         */
        removeFile(fileItem: FileListItem, immediately: boolean): JQueryDeferred<any>;
        protected removeFileFromServer(fileItem: FileListItem): JQueryDeferred<any>;
        showPreviewIfSupported(fileItem: FileListItem, version?: IFileVersion): void;
        lockFile(fileItem: FileListItem): void;
        unlockFile(fileItem: FileListItem): void;
        showCommentsDialog(fileItem: FileListItem, versionId: string, enableAddComments: boolean): void;
        getFilePreviewUrl(fileItem: FileListItem, action: string, version?: IFileVersion, pageIndex?: number): string;
        closeAllMenusBut(fileItem: FileListItem): void;
        removeFileItem(index: number): void;
        clearFileItems(): void;
        protected readonly state: FileListImplState;
        protected readonly props: FileListControlParams;
        protected deinitFileItem(item: FileListItem): void;
        protected initJQueryUploader(attach: FileListAttachedElements, options: IFileUploadOptions): void;
        protected onFilesAdded(main: boolean, attach: FileListAttachedElements, e: any, data: any): void;
        protected onFileVersionAdded(fileItem: FileListItem, attach: FileListAttachedElements, data: any): void;
        protected sendFiles(attach: FileListAttachedElements, items: FileListItem[]): JQueryDeferred<any>;
        protected processResponse(responseData: IFileListDataModel, deffered: JQueryDeferred<any>, uploadingItems: FileListItem[]): void;
        protected getItemsToUpload(): FileListItem[];
    }
}
declare namespace WebClient {
    /** @internal */
    class FileListItemComponent extends React.Component<FileListItemProps, any> {
        logic: FileListControlLogic;
        downloadAction: string;
        constructor(props: FileListItemProps);
        canRead(fileItem: FileListItem): boolean;
        canEdit(fileItem: FileListItem): boolean;
        canDelete(fileItem: FileListItem): boolean;
        canLock(fileItem: FileListItem): boolean;
        canComment(fileItem: FileListItem): boolean;
        onLockOperationClick(fileItem: FileListItem): void;
        onUnlockOperationClick(fileItem: FileListItem): void;
        protected onDeleteOperationClick(fileItem: FileListItem): void;
        protected onFileMenuClick(fileItem: FileListItem): void;
        protected onDownloadOperationClick(fileItem: FileListItem): void;
        onAddCommentClick(fileItem: FileListItem): void;
        onEditModeRemoveClick(fileItem: FileListItem): void;
        render(): JSX.Element;
        protected getFileVersionText(version: IFileVersion): string;
        onVersionClick(fileItem: FileListItem): void;
        protected onNameClick(fileItem: FileListItem): void;
        protected onVersionNumberClick(fileItem: FileListItem, version: IFileVersion): void;
        protected onDownloadVersionClick(fileItem: FileListItem, version: IFileVersion): void;
        onWebDavFileClick(fileItem: FileListItem): void;
        protected renderViewMode(): JSX.Element;
        protected renderVersionList(fileItem: FileListItem): JSX.Element;
        protected renderEditMode(item: FileListItem): JSX.Element;
        protected renderMenuItems(fileItem: FileListItem): JSX.Element[];
        protected renderViewModeFileMenu(fileItem: FileListItem): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    class FileListItemProps {
        fileListItem: FileListItem;
        mode: EditMode;
        autoUpload: boolean;
        logic: FileListControlLogic;
        renderUploadForm: (attach: FileListAttachedElements, action: string, main?: boolean, fileItem?: FileListItem) => any;
        key: string;
    }
}
declare namespace WebClient {
    /** @internal */
    enum FileListItemState {
        /** Added, not uploaded yet */
        New = 0,
        /** Uploading */
        Saving = 1,
        /** Uploaded to the server */
        Saved = 2,
    }
}
declare namespace WebClient {
    interface IFileListItem {
        data: ILayoutFileModel;
        file: File;
        state: FileListItemState;
    }
}
declare namespace WebClient {
    interface IExtraFileAddedArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IExtraFileAddingArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IExtraFileDeletedArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IExtraFileDeletingArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IFileOpenedArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IFileOpeningArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IFilePreviewedArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IFilePreviewingArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IFileVersionCommentAddedArgs {
        fileItem: IFileListItem;
        commentText: string;
    }
}
declare namespace WebClient {
    interface IFileVersionCommentAddingArgs {
        fileItem: IFileListItem;
        commentText: string;
    }
}
declare namespace WebClient {
    interface IFileVersionCommentDeletedArgs {
        fileItem: IFileListItem;
        commentId: string;
    }
}
declare namespace WebClient {
    interface IFileVersionCommentDeletingArgs {
        fileItem: IFileListItem;
        commentId: string;
    }
}
declare namespace WebClient {
    interface IFileVersionDownloadedArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IFileVersionDownloadingArgs {
        fileItem: IFileListItem;
        version: IFileVersion;
    }
}
declare namespace WebClient {
    interface IFileVersionUploadedArgs {
        fileItem: IFileListItem;
        version: IFileVersion;
    }
}
declare namespace WebClient {
    interface IFileVersionUploadingArgs {
        fileItem: IFileListItem;
        file: File;
    }
}
declare namespace WebClient {
    interface IMainFileAddedArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IMainFileAddingArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IMainFileDeletedArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IMainFileDeletingArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IMainFileNewVersionCreatedArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface IMainFileNewVersionCreatingArgs {
        fileItem: IFileListItem;
    }
}
declare namespace WebClient {
    interface ISignatureCreatedArgs {
    }
}
declare namespace WebClient {
    interface ISignatureCreatingArgs {
    }
}
declare namespace WebClient {
    interface ISignatureListViewedArgs {
    }
}
declare namespace WebClient {
    interface ISignatureListViewingArgs {
    }
}
declare namespace WebClient {
    class FileListBuiltInOperations {
        static ViewSignList: string;
        static EditMainFile: string;
        static ReadExtraFile: string;
        static LockMainFile: string;
        static AddExtraFile: string;
        static SignDocument: string;
        static RemoveMainFile: string;
        static AddMainFile: string;
        static AddCommentToMainFileVersion: string;
        static ReadMainFile: string;
        static RemoveExtraFile: string;
    }
}
declare namespace WebClient {
    /** @internal */
    class FileListAttachedElements {
        form: HTMLElement;
        filesContainer: HTMLElement;
        filesInput: HTMLElement;
        filesInputLabel: HTMLElement;
        dropZone: HTMLElement;
        timestampInput: HTMLInputElement;
        allElementsHasAttached: SimpleEvent<any>;
        constructor();
        attachForm(elem: HTMLElement): void;
        attachFilesContainer(elem: HTMLElement): void;
        attachFilesInput(elem: HTMLElement): void;
        attachFilesInputLabel(elem: HTMLElement): void;
        attachDropZone(elem: HTMLElement): void;
        attachTimestampInput(elem: HTMLInputElement): void;
        protected onElemAttached(): void;
        readonly allElementsAttached: boolean;
    }
}
declare namespace WebClient {
    /**
     * Предоставляет данные файла для элемента управления [Список файлов]{@link FileListControl}.
     */
    class FileListItem implements IFileListItem {
        data: ILayoutFileModel;
        settingsMenuExpaned: boolean;
        versionsListExanded: boolean;
        versionsListAnimating: boolean;
        uploadVersionAttachedElements: FileListAttachedElements;
        versionListElement: HTMLElement;
        itemComponent: FileListItemComponent;
        file: File;
        state: FileListItemState;
    }
}
declare namespace WebClient {
    /** @internal */
    class EmployeeLoader {
        private employeeVisualizer;
        private favoritesStorage;
        private mUnitId;
        constructor(employeeVisualizer: EmployeeVisualizer, favoritesStorage?: FavoriteEmployeesStorage, mUnitId?: string);
        unitId: string;
        findItems(query: ITypeaheadSearchQuery): JQueryDeferred<ITypeaheadSearchResult>;
        protected convertFindResultItem(data: IFindEmployeeResultItem): IEmployeeData;
    }
}
declare namespace WebClient {
    /** @internal */
    class EmployeeVisualizer {
        private tipMode;
        constructor(tipMode: EmployeeTooltipMode);
        getTooltip(employeeData: IEmployeeData): string;
        getDisplayName(employee: IEmployeeData): string;
    }
}
declare namespace WebClient {
    /** @internal */
    class FavoriteEmployeesStorage {
        private storageName;
        constructor(storageName: string);
        getFavorites(query: ITypeaheadSearchQuery): IEmployeeData[];
        favoriteEmployees: IEmployeeData[];
        addToFavorite(item: IEmployeeData): void;
        private arrayUnique(array);
    }
}
declare namespace WebClient {
    /**
     *  Содержит публичные свойства элемента управления [Сотрудники]{@link MultipleEmployees}.
     */
    class MultipleEmployeesParams extends InputBasedControlParams<IEmployeeData[]> {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Массив выбранных сотрудников. */
        value?: IEmployeeData[];
        /** Формат отображения во всплывающей подсказке информации о выбранном сотруднике. */
        tipMode?: EmployeeTooltipMode;
        /** Флаг, указывающий, что при быстром поиске последние выбранные сотрудники должны отображаться в начале списка: true - отображать сначала последних выбранных, false - обычный порядок отображения сотрудников.  */
        supportFavourites?: boolean;
        /** Идентификатор подразделения, из которого можно выбирать сотрудников. Если значение не указано, то можно выбирать из любого подразделения. */
        restrictUnitId?: string;
        /** Список последних выбранных в элементе управления сотрудников. */
        favoriteMultipleEmployeess?: IEmployeeData[];
        /** Флаг, определяющий формат отображения выбранных сотрудников в элементе управления:
        * true - выбранные сотрудники отображаются в виде вертикального списка; false - в виде горизонтального списка.
        */
        verticalOrientation?: boolean;
        /** Путь к полю карточки с идентификатором сотрудника. */
        fieldPath?: string;
        /** События возникает при добавлении сотрудника. */
        addingEmployee?: CancelableApiEvent<IEmployeeData>;
        /** События возникает после добавления сотрудника. */
        addedEmployee?: BasicApiEvent<IEmployeeData>;
        /** События возникает при удалении сотрудника из списка. */
        removingEmployee?: CancelableApiEvent<IEmployeeData>;
        /** События возникает после удаления сотрудника из списка. */
        removedEmployee?: BasicApiEvent<IEmployeeData>;
    }
    /** @internal */
    interface MultipleEmployeesState extends MultipleEmployeesParams, InputBasedControlState<IEmployeeData[]> {
        binding: IBindingResult<IMultipleEmployeeData>;
    }
    /**
     * Класс элемента управления Сотрудники.
     *
     * Добавляет в web-разметку поле ввода с кнопкой вызова диалогового окна для выбора нескольких сотрудников из *Справочника сотрудников*.
     */
    class MultipleEmployees extends InputBasedControl<IEmployeeData[], MultipleEmployeesParams, MultipleEmployeesState> {
        protected createParams(): MultipleEmployeesParams;
        private readonly multipleEmployeeImpl;
        private employeeBinding;
        private defaultMultipleEmployeesBinding;
        /**
         * Добавляет указанного сотрудника в список последних выбранных.
         * @param item Добавляемый сотрудник.
         */
        addToFavorite(item: IEmployeeData): void;
        protected getBindings(): IBindingResult<any>[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface MultipleEmployeesImplState extends InputBasedControlImplState<IEmployeeData[]>, MultipleEmployeesState {
        lastEmployees: IEmployeeData[];
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
        favoritesStorage: FavoriteEmployeesStorage;
        employeeVisualizer: EmployeeVisualizer;
        employeeLoader: EmployeeLoader;
    }
    /** @internal */
    class MultipleEmployeesImpl extends InputBasedControlImpl<IEmployeeData[], MultipleEmployeesParams, MultipleEmployeesImplState> {
        constructor(props: MultipleEmployeesParams);
        protected setValue(value: IEmployeeData[], redraw: boolean): void;
        protected initHelpers(props: MultipleEmployeesParams): void;
        protected getTextValue(): string;
        hasValue(): boolean;
        protected renderInto(props: MultipleEmployeesParams, container: HTMLElement): MultipleEmployees;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected showEditPopover(popoverOptions?: IPopoverProps): void;
        protected getFavoritesStorageName(props: MultipleEmployeesParams): string;
        protected onSelected(typeaheadVariant: ITypeaheadVariant): void;
        protected onRemoveEmployeeClick(empl: IEmployeeData, ev: React.MouseEvent): void;
        protected findItems(query: ITypeaheadSearchQuery): JQueryDeferred<ITypeaheadSearchResult>;
        protected getEmployeeTooltip(empl: IEmployeeData): string;
        protected renderViewEmployeeList(): JSX.Element;
        protected renderWithText(): JSX.Element;
        protected renderEditEmployeeList(): JSX.Element;
        protected renderInputWithPlaceholder(): JSX.Element;
        addToFavorite(item: IEmployeeData): void;
        /** Restricts selection of employees by this department only */
        restrictUnitId: string;
        tipMode: any;
        supportFavourites: any;
        favoriteEmployees: IEmployeeData[];
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Сотрудник]{@link Employee}.
     */
    class EmployeeParams extends InputBasedControlParams<IEmployeeData> {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Формат отображения во всплывающей подсказке информации о выбранном сотруднике. */
        tipMode?: EmployeeTooltipMode;
        /** Флаг, указывающий, что при быстром поиске последние выбранные сотрудники должны отображаться в начале списка: true - отображать сначала последних выбранных, false - обычный порядок отображения сотрудников.  */
        supportFavourites?: boolean;
        /** Идентификатор подразделения, из которого можно выбирать сотрудников. Если значение не указано, то можно выбирать из любого подразделения. */
        restrictUnitId?: string;
        /** Список последних выбранных в элементе управления сотрудников. */
        favoriteEmployees?: IEmployeeData[];
    }
    /** @internal */
    interface EmployeeState extends EmployeeParams, InputBasedControlState<IEmployeeData> {
        binding: IBindingResult<IEmployeeData>;
    }
    /**
     * Класс элемента управления Сотрудник.
     *
     * Добавляет в web-разметку поле ввода с кнопкой вызова диалогового окна для выбора сотрудника из *Справочника сотрудников*.
     */
    class Employee extends InputBasedControl<IEmployeeData, EmployeeParams, EmployeeState> {
        protected createParams(): EmployeeParams;
        private readonly employeeImpl;
        private employeeBinding;
        private defaultEmployeeBinding;
        /**
         * Добавляет указанного сотрудника в список последних выбранных.
         * @param item Добавляемый сотрудник.
         */
        addToFavorite(item: IEmployeeData): void;
        protected getBindings(): IBindingResult<any>[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface EmployeeImplState extends InputBasedControlImplState<IEmployeeData>, EmployeeState {
        lastEmployees: IEmployeeData[];
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
        favoritesStorage: FavoriteEmployeesStorage;
        employeeVisualizer: EmployeeVisualizer;
        employeeLoader: EmployeeLoader;
    }
    /** @internal */
    class EmployeeImpl extends InputBasedControlImpl<IEmployeeData, EmployeeParams, EmployeeImplState> {
        constructor(props: EmployeeParams);
        protected setValue(value: IEmployeeData, redraw: boolean): void;
        protected initHelpers(props: EmployeeParams): void;
        static validValue(value: IEmployeeData): boolean;
        protected getTextValue(): string;
        protected renderInto(props: EmployeeParams, container: HTMLElement): Employee;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected getValueTitle(): string;
        protected showEditPopover(popoverOptions?: IPopoverProps): void;
        protected getFavoritesStorageName(props: EmployeeParams): string;
        protected onSelected(typeaheadVariant: ITypeaheadVariant): void;
        protected renderInputWithPlaceholder(): JSX.Element;
        /** Restricts selection of employees by this department only */
        restrictUnitId: string;
        tipMode: any;
        supportFavourites: any;
        favoriteEmployees: IEmployeeData[];
        addToFavorite(item: IEmployeeData): void;
    }
}
declare namespace WebClient {
    /**
    * Предоставляет данные сотрудника для элементов управления [Сотрудник]{@link Employee} и [Сотрудники]{@link MultipleEmployees}.
    */
    interface IEmployeeData {
        /** Идентификатор сотрудника в Docsvision. */
        id: string;
        /** Имя сотрудника. */
        firstName: string;
        /** Отчество сотрудника. */
        middleName: string;
        /** Фамилия сотрудника. */
        lastName: string;
        /** Должность сотрудника. */
        position: string;
        /** Отображаемое имя сотрудника. Формат отображаемого имени определяется настройками в Справочнике сотрудников.*/
        displayName: string;
        /** Путь к полю карточки с идентификатором сотрудника. */
        fieldPath: string;
    }
}
declare namespace WebClient {
    interface IFindEmployeeResult {
        employees: IFindEmployeeResultItem[];
        hasMore: boolean;
    }
}
declare namespace WebClient {
    interface IFindEmployeeResultItem {
        Id: string;
        FullName: string;
        FirstName: string;
        MiddleName: string;
        LastName: string;
        IsMyself: boolean;
        Position: string;
        IsFavoritePerformer: boolean;
    }
}
declare namespace WebClient {
    interface IMultipleEmployeeData {
        employees: IEmployeeData[];
        fieldPath: string;
    }
}
declare namespace WebClient {
    /**
    * Определяет возможные форматы отображения информации о выбранном сотруднике во всплывающей подсказке.
    */
    enum EmployeeTooltipMode {
        /** Отображать ФИО. */
        Fio = 0,
        /** Отображать ФИО и должность. */
        FioAndPosition = 1,
        /** Не отображать данные о сотруднике. */
        None = 2,
    }
}
declare namespace WebClient {
    /** @internal */
    class EmployeeTypeaheadVariant implements ITypeaheadVariant {
        data: IEmployeeData;
        mTitle: string;
        mFavored: boolean;
        constructor(data: IEmployeeData, title: string, favored?: boolean);
        readonly name: string;
        readonly value: string;
        readonly iconCssClass: string;
        readonly title: string;
        readonly favored: boolean;
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Строка конструктора справочников]{@link DirectoryDesignerRow}.
     */
    class DirectoryDesignerRowParams extends InputBasedControlParams<IDirectoryDesignerRowInfo> {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Флаг, указывающий на состояние окна выбора строки: true - открыто, false - закрыто. */
        isDictionaryShown?: boolean;
        /** Идентификатор узла Конструктора справочников, из которого выбираются записи.
        *
        * Если ограничение по узлам отсутствует, то свойство имеет значение Guid.Empty.
        */
        itemType?: string;
        /**  Область выбора (и поиска) элементов из Конструктора справочников. */
        selectionArea?: DirectoryDesignerAreas;
        /** Минимальное количество символов в строке ввода для выполнения быстрого поиска. */
        quickSearchIndex?: number;
    }
    /** @internal */
    interface DirectoryDesignerRowState extends DirectoryDesignerRowParams, InputBasedControlState<IDirectoryDesignerRowInfo> {
        binding: IBindingResult<IDirectoryDesignerRowInfo>;
    }
    /**
     * Класс элемента управления Строка конструктора справочников.
     *
     * Добавляет в web-разметку поле ввода с кнопкой вызова диалогового окна для выбора записи из *Конструктора справочников*.
     */
    class DirectoryDesignerRow extends InputBasedControl<IDirectoryDesignerRowInfo, DirectoryDesignerRowParams, DirectoryDesignerRowState> {
        private readonly departmentImpl;
        protected createParams(): DirectoryDesignerRowParams;
        private DirectoryDesignerRowBinding;
        /**
        * Проверяет возможность открытия модального окна выбора строки.
        * @return true - возможно (если значение редактируемое), false - невозможно.
        */
        canShowDictionary(): boolean;
        /**
        * Открывает окно выбора строки.
        */
        showDictionary(): void;
        /**
        * Закрывает окно выбора строки.
        */
        hideDictionary(): void;
        protected getBindings(): IBindingResult<any>[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface DirectoryDesignerRowImplState extends InputBasedControlImplState<IDirectoryDesignerRowInfo>, DirectoryDesignerRowState {
        dialog: WebClient.ModalWindow;
        requestHelper: RequestHelper;
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
    }
    /** @internal */
    class DirectoryDesignerRowImpl extends InputBasedControlImpl<IDirectoryDesignerRowInfo, DirectoryDesignerRowParams, DirectoryDesignerRowImplState> {
        static FirstPageSize: number;
        static NextPageSize: number;
        static SearchTimeout: number;
        constructor(props: DirectoryDesignerRowParams);
        protected getTextValue(): string;
        protected renderInto(props: DirectoryDesignerRowParams, container: HTMLElement): DirectoryDesignerRow;
        protected showEditPopover(popoverOptions?: IPopoverProps): void;
        protected findItems(typeaheadQuery: ITypeaheadSearchQuery): JQueryDeferred<ITypeaheadSearchResult>;
        protected onSelected(variant: ITypeaheadVariant): void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected renderInputWithPlaceholder(): JSX.Element;
        showDictionary(): void;
        canShowDictionary(): boolean;
        hideDictionary(): void;
        readonly isDictionaryShown: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    class DirectoryDesignerRowSelectDialog extends React.Component<IDirectoryDesignerRowSelectDialogProps, IDirectoryDesignerRowSelectDialogState> {
        static LoadTreeLevelDown: number;
        static LevelsToExapndByDefault: number;
        constructor(props: IDirectoryDesignerRowSelectDialogProps);
        readonly selectedDepartment: DirectoryDesignerTreeNode;
        protected loadTree(parentNode?: ITreeNodeData): JQueryDeferred<IDynamicTreeNodeData[]>;
        protected searchTree(searchText: string, resultNumber: number): JQueryDeferred<IDirectoryDesignerSearchTreeResult>;
        protected expandFirstLevels(nodes: DirectoryDesignerTreeNode[], currentLevel: number, expandLevel?: number): void;
        protected onNodeSelected(node: TreeNode): void;
        componentDidMount(): void;
        protected onNextResultClick(): void;
        protected onPrevResultClick(): void;
        protected onInputChange(ev: React.KeyboardEvent): void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected getSearchResultLabel(): string;
        renderSearchResult(nodeName: string, searchText: string, matchedPropertyName: string, matchedPropertyValue: string): JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDirectoryDesignerRowSelectDialogProps {
        nodeSelected: (node: DirectoryDesignerTreeNode) => void;
        quickSearchIndex: number;
        node: string;
        selectionArea: DirectoryDesignerAreas;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDirectoryDesignerRowSelectDialogState {
        requestHelper: RequestHelper;
        searchRequestHelper: RequestHelper;
        selectedNode: DirectoryDesignerTreeNode;
        treeWrapper: HTMLElement;
        searchResultCount: number;
        searchResultNumber: number;
        showingSearchResults: boolean;
        searchText: string;
        tree: DynamicTree;
        searchTimerHandle: number;
    }
}
declare namespace WebClient {
    /** @internal */
    class DirectoryDesignerTreeNode implements IDynamicTreeNodeData {
        mData: IDirectoryDesignerTreeNodeDigest;
        mChildren: DirectoryDesignerTreeNode[];
        mName: string | JSX.Element;
        static Create(data: IDirectoryDesignerTreeNodeDigest): DirectoryDesignerTreeNode;
        static CreateMany(dataArray: IDirectoryDesignerTreeNodeDigest[]): DirectoryDesignerTreeNode[];
        readonly data: IDirectoryDesignerTreeNodeDigest;
        displayName: string | JSX.Element;
        readonly uniqueId: string;
        readonly iconClass: string;
        readonly children: ITreeNodeData[];
        expandedByDefault: boolean;
        childrenLoaded: boolean;
        readonly disabled: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    class DirectoryDesignerTypeaheadVariant implements ITypeaheadVariant {
        data: IDirectoryDesignerRowDigest;
        constructor(data: IDirectoryDesignerRowDigest);
        readonly name: string;
        readonly value: string;
        readonly iconCssClass: string;
        readonly title: string;
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Подразделение]{@link Department}.
     */
    class DepartmentParams extends InputBasedControlParams<IDepartmentInfo> {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Флаг, указывающий, что из справочника разрешено выбирать организации: true - разрешено, false - не разрешено. */
        selectOrganisations?: boolean;
        /** Флаг, указывающий, что из справочника разрешено выбирать подразделения: true - разрешено, false - не разрешено. */
        selectDepartments?: boolean;
        /** Минимальное количество символов в строке ввода для выполнения быстрого поиска. */
        quickSearchIndex?: number;
        /** Справочник, из которого осуществляется выбор организации/подразделения. */
        source?: DepartmentSource;
        /** Флаг, указывающий на состояние окна выбора организации/подразделения: true - открыто, false - закрыто. */
        isDictionaryShown?: boolean;
    }
    /** @internal */
    interface DepartmentState extends DepartmentParams, InputBasedControlState<IDepartmentInfo> {
        binding: IBindingResult<IDepartmentInfo>;
    }
    /**
     * Класс элемента управления Подразделение.
     *
     * Добавляет в web-разметку поле ввода с кнопкой вызова диалогового окна для выбора записи из *Справочника сотрудников* или *Справочника контрагентов*.
     */
    class Department extends InputBasedControl<IDepartmentInfo, DepartmentParams, DepartmentState> {
        protected createParams(): DepartmentParams;
        private readonly departmentImpl;
        private DepartmentBinding;
        /**
         * Проверяет возможность открытия модального окна выбора организации/подразделения.
         * @return true - возможно (если значение редактируемое), false - невозможно.
         */
        canShowDictionary(): boolean;
        /**
         * Открывает окно выбора организации/подразделения.
         */
        showDictionary(): void;
        /**
         * Закрывает окно выбора организации/подразделения.
         */
        hideDictionary(): void;
        protected getBindings(): IBindingResult<any>[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface DepartmentImplState extends InputBasedControlImplState<IDepartmentInfo>, DepartmentState {
        requestHelper: RequestHelper;
        directoryModalWindow: WebClient.ModalWindow;
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
    }
    /** @internal */
    class DepartmentImpl extends InputBasedControlImpl<IDepartmentInfo, DepartmentParams, DepartmentImplState> {
        static FirstPageSize: number;
        static NextPageSize: number;
        static SearchTimeout: number;
        constructor(props: DepartmentParams);
        protected readonly source: DepartmentSource;
        protected getTextValue(): string;
        protected getValueTitle(): string;
        protected getInputTitle(): string;
        protected renderInto(props: DepartmentParams, container: HTMLElement): Department;
        protected showEditPopover(popoverOptions?: IPopoverProps): void;
        protected readonly itemTypes: SearchDepartmentType;
        protected findItems(typeaheadQuery: ITypeaheadSearchQuery): JQueryDeferred<ITypeaheadSearchResult>;
        protected openDictionaryDialog(): void;
        protected onSelected(variant: ITypeaheadVariant): void;
        showDictionary(): void;
        hideDictionary(): void;
        readonly isDictionaryShown: boolean;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected renderInputWithPlaceholder(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    class DepartmentSelectDialog extends React.Component<IDepartmentSelectDialogProps, IDepartmentSelectDialogState> {
        static LoadTreeLevelDown: number;
        static LevelsToExapndByDefault: number;
        constructor(props: IDepartmentSelectDialogProps);
        readonly selectedDepartment: DepartmentTreeNodeData;
        protected loadTree(parentNode?: ITreeNodeData): JQueryDeferred<IDynamicTreeNodeData[]>;
        protected searchTree(searchText: string, resultNumber: number): JQueryDeferred<ISearchDepartmentsTreeResult>;
        protected expandFirstLevels(nodes: DepartmentTreeNodeData[], currentLevel: number, expandLevel?: number): void;
        protected onNodeSelected(node: TreeNode): void;
        componentDidMount(): void;
        protected onNextResultClick(): void;
        protected onPrevResultClick(): void;
        protected onInputChange(ev: React.KeyboardEvent): void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected getSearchResultLabel(): string;
        renderSearchResult(nodeName: string, searchText: string, matchedPropertyName: string, matchedPropertyValue: string): JSX.Element;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDepartmentSelectDialogProps {
        itemTypes: SearchDepartmentType;
        departmentSelected: (node: DepartmentTreeNodeData) => void;
        quickSearchIndex: number;
        /** Where to perform the search */
        source: DepartmentSource;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IDepartmentSelectDialogState {
        requestHelper: RequestHelper;
        searchRequestHelper: RequestHelper;
        selectedNode: DepartmentTreeNodeData;
        treeWrapper: HTMLElement;
        searchResultCount: number;
        searchResultNumber: number;
        showingSearchResults: boolean;
        searchText: string;
        tree: DynamicTree;
        searchTimerHandle: number;
    }
}
declare namespace WebClient {
    /** @internal */
    class DepartmentTreeNodeData implements IDynamicTreeNodeData {
        mData: IDepartmentTreeDigest;
        mChildren: DepartmentTreeNodeData[];
        mName: string | JSX.Element;
        disabled: boolean;
        static Create(data: IDepartmentTreeDigest, enabledItemTypes: SearchDepartmentType): DepartmentTreeNodeData;
        static CreateMany(dataArray: IDepartmentTreeDigest[], enabledItemTypes: SearchDepartmentType): DepartmentTreeNodeData[];
        readonly data: IDepartmentTreeDigest;
        displayName: string | JSX.Element;
        readonly uniqueId: string;
        readonly title: string;
        readonly iconClass: string;
        readonly children: ITreeNodeData[];
        expandedByDefault: boolean;
        childrenLoaded: boolean;
    }
}
declare namespace WebClient {
    /** @internal */
    class DepartmentTypeaheadVariant implements ITypeaheadVariant {
        data: IDepartmentDigest;
        constructor(data: IDepartmentDigest);
        readonly name: string;
        readonly value: string;
        readonly iconCssClass: string;
        readonly title: string;
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Дата/время]{@link DateTimePicker}.
     */
    class DateTimePickerParams extends InputBasedControlParams<Date> {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Режим представления данных в элементе управления. */
        dateTimePickerMode?: DateTimePickerMode;
        /** Флаг, указывающий, что для значения по умолчанию должны использоваться текущие дата и время: true - использовать текущие дату и время, false - использовать предустановленное {@link defaultDateTime} в значение.*/
        defaultCurrentDateTime?: boolean;
        /** Возвращает строку с датой и временем, которые по умолчанию устанавливаются в значение.*/
        defaultDateTime?: string;
        /** Возвращает смещение времени (в часах) для значения времени по умолчанию.
        *
        * Значение *defaultDateTimeShift* прибавляется к часам в значении {@link defaultDateTime}.
        * В элементе управления отображается итоговое значение.
        */
        defaultDateTimeShift?: number;
        /** Возвращает максимальная дату, которая может быть выбрана. */
        minDate?: Date;
        /** Возвращает минимальную дату, которая может быть выбрана. */
        maxDate?: Date;
    }
    /** @internal */
    interface DateTimePickerState extends DateTimePickerParams, InputBasedControlState<Date> {
        binding: IBindingResult<Date>;
        showClearButton: boolean;
    }
    /**
     * Класс элемента управления Дата/время.
     *
     * Добавляет в web-разметку элемент управления для изменения значения даты и времени.
     */
    class DateTimePicker extends InputBasedControl<Date, DateTimePickerParams, DateTimePickerState> {
        protected createParams(): DateTimePickerParams;
        private readonly dateTimePickerImpl;
        private dateTimePickerBinding;
        private dateTimePickerMode;
        /**
         * Проверяет возможность очистки значения элемента управления.
         * @return true - значение может быть очищено (если оно установлено и его можно изменять), false - если значение не может быть очищено.
         */
        canClear(): boolean;
        /**
         * Очищает значение (выбранную дату).
         */
        clear(): void;
        protected getBindings(): IBindingResult<any>[];
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface DateTimePickerImplState extends InputBasedControlImplState<Date>, DateTimePickerState {
        timeInput: HTMLInputElement;
        dateTimeFormat: DateTimeFormat;
        timeInputText: string;
        clearButton: HTMLElement;
    }
    /** @internal */
    class DateTimePickerImpl extends InputBasedControlImpl<Date, DateTimePickerParams, DateTimePickerImplState> {
        constructor(props: any);
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected addGlobalListeners(): void;
        protected removeGlobalListeners(): void;
        protected getTextValue(): string;
        protected renderInto(props: DateTimePickerParams, container: HTMLElement): DateTimePicker;
        protected getDefaultValue(): Date;
        protected getDateString(): string;
        protected getTimeString(): string;
        protected readonly dateInput: HTMLInputElement;
        protected onInPlaceEditOpened(): void;
        protected onEditPopoverShowed(control: any): void;
        protected showEditPopover(popoverOptions?: IPopoverProps): void;
        protected setValue(value: Date, redraw: boolean): void;
        protected updateTimeForSelectedDate(date: Date): Date;
        protected initializeJQuryDatePicker(): void;
        protected onCalendarIconClick(): void;
        protected onTimeInputKeypress(ev: React.KeyboardEvent): void;
        protected hideCalendar(): void;
        protected onTimeInputChange(ev: any): void;
        protected onTimeInputBlur(): void;
        protected onDateInputFocus(ev: React.FocusEvent): void;
        protected getCssClass(): string;
        protected renderInputWithPlaceholder(): JSX.Element;
        protected renderInput(): JSX.Element;
        clear(): void;
        canClear(): boolean;
    }
}
declare namespace WebClient {
    /**
    * Определяет возможные варианты представления данных в элементе управления Дата/время (см. {@link DateTimePickerParams}).
    */
    enum DateTimePickerMode {
        /** Дата и время. */
        DateTime = 0,
        /** Только дата. */
        Date = 1,
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Кнопка]{@link CustomButton}.
     */
    class CustomButtonParams extends BaseControlParams {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Текст, отображаемый в Кнопке. */
        text?: string;
        /** Текст всплывающей подсказки. */
        tip?: string;
        /** Имя CSS класса, в котором определен путь к иконке, отображаемой в Кнопке. */
        iconClass?: string;
        /** Флаг, определяющий, что Кнопка может быть нажата: true - разрешено (разрешена настроенная операция редактирования), false - не разрешено. */
        canClick?: boolean;
        /**
        * Флаг, указывающий, что для Кнопки должен применяться основной стиль карточки: true - использовать основной стиль, false - использовать стандартный стиль.
        *
        * Если свойство primary в значении true, то при открытии карточки определенного типа, к кнопке будет применен стиль с названием `.ИМЯ_СТИЛЯ_КАРТОЧКИ button.button-helper.primary-button`.
        * Данный стиль предопределен для типов карточек: Документ, Задание и Группа заданий.
        * Чтобы создать основной стиль Кнопки для собственного типа, добавьте CSS класс:
        *
        *    `.document button.button-helper.primary-button {
        *    color: white;
        *    background: rgba(0, 149, 218, 0.8);
        *    }
        *    .document button.button-helper.primary-button.disabled { color: lightgray; }`
        *
        */
        primary?: boolean;
        /** Флаг, указывающий, должна ли Кнопка "растягиваться" на всю доступную ширину: true - кнопка будет занимать всю доступную ширину, false - ширина кнопки определяется содержимым. */
        stretchWidth?: boolean;
    }
    /** @internal */
    interface CustomButtonState extends CustomButtonParams, BaseControlState {
    }
    /**
     * Класс элемента управления Кнопка.
     *
     * Добавляет в web-разметку кнопку для вызова произвольной функции из скрипта карточки.
     */
    class CustomButton extends BaseControl<CustomButtonParams, CustomButtonState> {
        constructor(props: CustomButtonParams);
        protected createParams(): CustomButtonParams;
        private readonly myControlImpl;
        private bindingEditOperation;
        /**
         * Вызывает настроенный обработчик нажатия Кнопки.
         */
        performClick(): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface CustomButtonImplState extends BaseControlImplState, CustomButtonState {
        loading: boolean;
    }
    /** @internal */
    class CustomButtonImpl extends BaseControlImpl<CustomButtonParams, CustomButtonImplState> {
        constructor(props: CustomButtonParams);
        loading: boolean;
        performClick(event?: React.MouseEvent): void;
        /** Переопределяет базовый метод, отменяя его логику (для данного контрола она отлична от базовой версии). */
        protected handleClick(event: React.MouseEvent): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    class ComboBoxParams extends InputBasedControlParams<IComboBoxVariant> {
        standardCssClass?: string;
        selectedValue: IComboBoxVariant;
        variants: IComboBoxVariant[];
        expanded: boolean;
        onSelect?: (variant: IComboBoxVariant) => void;
        className?: string;
    }
    /** @internal */
    interface ComboBoxState extends ComboBoxParams, InputBasedControlState<IComboBoxVariant> {
        items: IComboBoxItem[];
    }
    /** @internal */
    class ComboBox extends InputBasedControl<IComboBoxVariant, ComboBoxParams, ComboBoxState> {
        protected createParams(): ComboBoxParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ComboBoxImplState extends InputBasedControlImplState<IComboBoxVariant>, ComboBoxState {
    }
    /** @internal
     * Control is not completed.
     */
    class ComboBoxImpl extends InputBasedControlImpl<IComboBoxVariant, ComboBoxParams, ComboBoxImplState> {
        constructor(props: ComboBoxParams);
        protected loadItems(variants: IComboBoxVariant[]): void;
        variants: IComboBoxVariant[];
        protected getCssClass(): string;
        protected initEditPopover(popover: Popover): void;
        protected onValueBoxClick(): void;
        protected renderEditPopover(popover: Popover): any;
        protected onItemClick(item: IComboBoxItem): void;
        protected renderInputWithPlaceholder(): JSX.Element;
        protected getTextValue(): string;
        protected renderInto(props: any, container: HTMLElement): any;
    }
}
declare namespace WebClient {
    interface IComboBoxItem {
        data: IComboBoxVariant;
        selected: boolean;
    }
}
declare namespace WebClient {
    interface IComboBoxVariant {
        displayName: string;
        uniqueId: string;
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Флажок]{@link CheckBox}.
     */
    class CheckBoxParams extends InputBasedControlParams<boolean> {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Текст, отображаемый в элементе управления в режиме "Без редактирования", если значение равно `true`. */
        yesText?: string;
        /** Текст, отображаемый в элементе управления в режиме "Без редактирования", если значение равно `false`. */
        noText?: string;
    }
    /** @internal */
    interface CheckBoxState extends CheckBoxParams, InputBasedControlState<boolean> {
        binding: IBindingResult<boolean>;
    }
    /**
     * Класс элемента управления Флажок.
     *
     * Добавляет в web-разметку элемент управления для изменения значение булевого типа.
     */
    class CheckBox extends InputBasedControl<boolean, CheckBoxParams, CheckBoxState> {
        constructor(props: CheckBoxParams);
        protected createParams(): CheckBoxParams;
        componentDidMount(): void;
        protected onDataChanged(): void;
        private readonly checkBoxImpl;
        private CheckBoxBinding;
        private checkboxDefault;
        protected getBindings(): IBindingResult<any>[];
        canShowEditDialog(): boolean;
        showEditDialog(): void;
        hideEditDialog(): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface CheckBoxImplState extends InputBasedControlImplState<boolean>, CheckBoxState {
        saveHelper: RequestHelper;
        yesText: string;
        noText: string;
    }
    /** @internal */
    class CheckBoxImpl extends InputBasedControlImpl<boolean, CheckBoxParams, CheckBoxImplState> {
        constructor(props: CheckBoxParams);
        protected getTextValue(): string;
        protected renderInto(props: CheckBoxParams, container: HTMLElement): CheckBox;
        protected onInputChange(event: any): void;
        protected editInPlaceModeRender(): JSX.Element;
        protected renderInput(): JSX.Element;
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Управление карточкой]{@link CardManagement}.
     */
    class CardManagementParams extends BaseControlParams {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Флаг, указывающий на возможность изменения карточки: true - изменение разрешено (разрешена настроенная операция редактирования), false - изменение не разрешено.*/
        canEdit?: boolean;
        /** Флаг, указывающий на возможность удаления карточки: true - удаление разрешено (разрешена операция удаления карточки), false - удаление не разрешено. */
        canDelete?: boolean;
    }
    /** @internal */
    interface CardManagementState extends CardManagementParams, BaseControlState {
        refresh: Function;
        deleteAndRedirect: Function;
        goToEdit: Function;
    }
    /**
     * Класс элемента управления Управление карточкой.
     *
     * Добавляет в web-разметку автоматически скрываемые кнопки удаления, изменения и обновления карточки.
     */
    class CardManagement extends BaseControl<CardManagementParams, CardManagementState> {
        constructor(props: CardManagementParams);
        protected createParams(): CardManagementParams;
        /**
         * Загружает данные карточки с сервере и обновляет отображаемое содержимое.
         */
        refresh(): void;
        /**
         * Удаляет текущую карточку.
         */
        delete(): void;
        /**
         * Переоткрывает текущую карточку в режиме редактирования.
         */
        edit(): void;
        private bindingEditOperation;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface CardManagementImplState extends BaseControlImplState, CardManagementState {
    }
    /** @internal */
    class CardManagementImpl extends BaseControlImpl<CardManagementParams, CardManagementImplState> {
        constructor(props: CardManagementParams);
        onEdit(): void;
        onDelete(): void;
        onRefresh(): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    /**
   * Содержит публичные свойства элемента управления [Вид карточки]{@link CardKind}.
   */
    class CardKindParams extends BaseControlParams {
        /** Вид карточки. */
        value: ICardKindDataModel;
        /** Текст всплывающей подсказки. */
        tip?: string;
        /** Текст метки.*/
        labelText?: string;
        /** Стандартный CSS класс со стилями элемента управления. */
        standardCssClass?: string;
    }
    /** @internal */
    interface CardKindState extends CardKindParams, BaseControlState {
    }
    /**
     * Класс элемента управления Вид карточки.
     *
     * Добавляет в web-разметку текстовый блок с меткой, в котором отображается название текущего вида карточки.
     */
    class CardKind extends BaseControl<CardKindParams, CardKindState> {
        protected createParams(): CardKindParams;
        private cardKindData;
        private value;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /**
    * Содержит данные элемента управления [Вид карточки]{@link CardKind}.
    */
    interface ICardKindDataModel {
        /** Отображаемое названием вида карточки. */
        cardKindName: string;
        /** Идентификатор вида карточки. */
        cardKindId: string;
        /** Содержимое ошибки, если она возникла при загрузке информации о виде карточки (например, CardKindId не задан). */
        loadingError: string;
    }
}
declare namespace WebClient {
    /**
    * Содержит публичные свойства элемента управления [Блок]{@link Block}.
    */
    class BlockParams extends PanelParams {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Заголовок, отображаемый над элементом управления. */
        header?: string;
        /** Флаг, определяющий, возможность сворачивания Блока: true - Блок может быть свернут (отображается кнопка сворачивания), false - Блок не может быть свернут. */
        collapsible: boolean;
        /** Флаг, указывающий, что содержимое Блока должно быть выровнено по левой стороне: true - выравнивание влево, false - выравнивание вправо.*/
        alignment: boolean;
        /** флаг, указывающий, что Блок должен отделяться от других элементов управления дополнительными отступами: true - с отступами, false - без отступов. */
        paddings: boolean;
        /** Флаг, определяющий текущее состояние блока: true - Блок свернут (содержимое не отображается), false - Блок раскрыт. */
        isCollapsed: boolean;
        /** Событие возникает при сворачивании Блока. */
        collapsing?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает после сворачивания Блока. */
        collapsed?: BasicApiEvent<IEventArgs>;
        /** Событие возникает при раскрытии Блока. */
        expanding?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает после раскрытия Блока. */
        expanded?: BasicApiEvent<IEventArgs>;
    }
    /** @internal */
    interface BlockState extends BlockParams, PanelState {
    }
    /**
     * Класс элемента управления Блок.
     *
     * Добавляет в web-разметку сворачиваемый элемент управления с заголовком, предназначенный для встраивания других элементов управления.
     */
    class Block extends Panel<BlockParams, BlockState> {
        protected createParams(): BlockParams;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface BlockState extends PanelState, BaseControlState {
    }
    /** @internal */
    class BlockImpl extends PanelImpl<BlockParams, BlockState> {
        constructor(props: BlockParams);
        protected handleHeaderClick(event: React.MouseEvent): void;
        toggleCollapsed(): CancelableEventArgs<IEventArgs>;
        protected getCssClass(): string;
        protected onCollapsed(): void;
        protected onExpanded(): void;
        protected getItemsStyle(): {
            textAlign: string;
        };
        renderControl(): JSX.Element;
        isCollapsed: boolean;
    }
}
declare namespace WebClient {
    interface ControlImplProps extends BaseControlParams {
        controlImplStateObj?: BaseControlImplState;
        ref?: any;
    }
    class ControlImpl extends BaseControlImpl<ControlImplProps, BaseControlState> {
        constructor(props: ControlImplProps);
        renderControl(): React.ReactNode;
    }
}
declare namespace WebClient {
    interface IBlurEventArgs extends React.FocusEvent {
    }
}
declare namespace WebClient {
    interface IClickEventArgs extends React.MouseEvent {
    }
}
declare namespace WebClient {
    interface IFocusEventArgs extends React.FocusEvent {
    }
}
declare namespace WebClient {
    interface IMouseOutEventArgs extends React.MouseEvent {
    }
}
declare namespace WebClient {
    interface IMouseOverEventArgs extends React.MouseEvent {
    }
}
declare namespace WebClient {
    interface ChangedPropertyInfo {
        name: string;
        oldValue: any;
        newValue: any;
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Управление согласованием]{@link AgreementManagement}.
     */
    class AgreementManagementParams extends BaseControlParams {
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Флаг, определяющий, что запуск согласования разрешен: true - разрешен (элемент управления связан с данными и разрешена настроенная операция старта согласования), false - не разрешен. */
        startAllowed?: boolean;
        /** Флаг, определяющий, что управление согласованием разрешено: true - разрешено (элемент управления связан с данными и разрешена настроенная операция управления согласованием), false - не разрешено. */
        manageAllowed?: boolean;
        /** Флаг, определяющий, что запуск согласования разрешен: true - разрешен (карточка является новой и {@link startAllowed} в true), false - не разрешен. */
        canStart?: boolean;
        /** Событие возникает при изменении маршрута согласования. */
        approvingPathChanging?: CancelableApiEvent<IApprovingPathEventArgs>;
        /** Событие возникает при открытии панели отправки согласования. */
        approvingPanelOpening?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает при нажатии кнопки Start the approval на панели отправки согласования. */
        approvingStarting?: CancelableApiEvent<IAgreementEventArgs>;
        /** Событие возникает при вызове команды остановки согласования. */
        approvingPausing?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает при вызове команды отмены согласования. */
        approvingCancelling?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает при добавлении нового согласующего. */
        approverAdding?: CancelableApiEvent<IApproverEventArgs>;
        /** Событие возникает при удалении согласующего. */
        approverDeleting?: CancelableApiEvent<IApproverDeletionEventArgs>;
        /** Событие возникает при нажатии кнопки Отмена на панели отправки согласования. */
        approvingStartCancelling?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает при вызове команды завершения согласования. */
        approvingCompleting?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает при вызове команды продолжения остановленного согласования. */
        approvingResuming?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает после изменения маршрута согласования. */
        approvingPathChanged?: BasicApiEvent<IApprovingPathEventArgs>;
        /** Событие возникает после открытия панели отправки согласования. */
        approvingPanelOpened?: BasicApiEvent<IEventArgs>;
        /** Событие возникает после добавления нового согласующего. */
        approverAdded?: BasicApiEvent<IApproverEventArgs>;
        /** Событие возникает после удаления согласующего. */
        approverDeleted?: BasicApiEvent<IApproverDeletionEventArgs>;
        /** Событие возникает после нажатия кнопки Отмена на панели отправки согласования. */
        approvingStartCancelled?: BasicApiEvent<IEventArgs>;
    }
    /** @internal */
    interface AgreementManagementState extends AgreementManagementParams, BaseControlState {
        model: ILayoutAgreementManagementModel;
    }
    /**
     * Класс элемента управления Управление согласованием.
     *
     * Добавляет в web-разметку набор кнопок для управления согласования.
     */
    class AgreementManagement extends BaseControl<AgreementManagementParams, AgreementManagementState> {
        protected createParams(): AgreementManagementParams;
        private readonly myControlImpl;
        private agreementManagementData;
        private agreementManagementOperationBinding;
        private agreementStartOperationBinding;
        /**
         * Возвращает массив команд управления согласованием, которые применимы для текущего согласования.
         * @return Команды управления.
         */
        getAvailableOperations(): ApprovalOperationKind[];
        /**
         * Запускает остановленное согласование.
         */
        resume(): void;
        /**
         * Останавливает запущенное согласование.
         */
        pause(): void;
        /**
         * Завершает запущенное согласование.
         */
        complete(): void;
        /**
         * Отменяет запущенное согласование.
         */
        cancel(): void;
        /**
         * Запускает согласование.
         *
         * После вызова метода будет открыта стандартная панель отправки согласования для выбора согласующих.
         */
        start(): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface AgreementManagementImplState extends BaseControlState, AgreementManagementState {
        IsTemplateDataReceived: boolean;
        startLoading: boolean;
    }
    /** @internal */
    class AgreementManagementImpl extends BaseControlImpl<AgreementManagementParams, AgreementManagementImplState> {
        private rootControl;
        private startBtn;
        constructor(props: AgreementManagementParams);
        getAvailableOperations(): ApprovalOperationKind[];
        readonly canStart: boolean;
        start(): void;
        onManageButtonClick(buttonKind: ApprovalOperationKind): void;
        renderControl(): JSX.Element;
        protected getCssClass(): string;
        protected attachStartBtn(elem: any): void;
        protected renderCreateView(): JSX.Element;
        protected getAgreementUrl(res: any): string;
        protected renderManageView(): JSX.Element;
        protected onApprovingPanelOpening(): JQueryDeferred<any>;
        protected handleStartAgreement: (e: Event) => void;
    }
}
declare namespace WebClient {
    interface IAgreementEventArgs extends IAgreementParams {
    }
}
declare namespace WebClient {
    interface IApproverDeletionEventArgs {
        employeeId: string;
    }
}
declare namespace WebClient {
    interface IApproverEventArgs {
        employeeInfo: IEmployeeItemData;
    }
}
declare namespace WebClient {
    interface IApprovingPathEventArgs {
        agreementTemplateId: string;
        agreementTemplateDisplayName: string;
    }
}
declare namespace WebClient {
    enum AgreementStateType {
        Draft = 0,
        Started = 1,
        Stopped = 2,
        Agreed = 3,
        Other = 4,
    }
}
declare namespace WebClient {
    /**
    * Возможные команды управления ходоом согласования.
    */
    enum ApprovalOperationKind {
        /** Запустить остановленное согласование. */
        Resume = 0,
        /** Завершить согласование. */
        Complete = 1,
        /** Остановить согласование. */
        Pause = 2,
        /** Отменить согласование. */
        Cancel = 3,
    }
}
declare namespace WebClient {
    /**
     * Содержит публичные свойства элемента управления [Лист согласования]{@link AgreementList}.
     */
    class AgreementListParams extends BaseControlParams {
        /** Стандартный CSS класс со стилями элемента управления. */
        standardCssClass?: string;
        /** Данные листа согласования. */
        data?: IAgreementListDataModel;
        /** Текст, отображаемый на кнопке открытия листа согласования. */
        buttonText?: string;
        /** Флаг, определяющий возможность отображения листа согласования: true - возможно (если данные для отображения доступны и разрешена настроенная операция редактирования), false - невозможно.*/
        canShowReport?: boolean;
        /** Идентификатор текущей карточки. */
        cardId?: string;
        /** События возникает при открытии окна листа согласования. */
        agreementReportOpening?: CancelableApiEvent<IAgreementListReportOpeningEventArgs>;
        /** События возникает при закрытии окна листа согласования. */
        agreementReportClosing?: CancelableApiEvent<IEventArgs>;
        /** События возникает после открытия окна листа согласования. */
        agreementReportOpened?: BasicApiEvent<IAgreementListReportOpenedEventArgs>;
        /** События возникает после закрытия окна листа согласования. */
        agreementReportClosed?: BasicApiEvent<IEventArgs>;
    }
    /** @internal */
    interface AgreementListState extends AgreementListParams, BaseControlState {
        getAgreementList: () => JQueryDeferred<IAgreementListDataModel>;
    }
    /**
     * Класс элемента управления Лист согласования.
     *
     * Добавляет в web-разметку кнопку, при нажатии которой открывается окно просмотра листа согласования.
     */
    class AgreementList extends BaseControl<AgreementListParams, AgreementListState> {
        constructor(props: AgreementListParams);
        protected createParams(): AgreementListParams;
        /** @internal */
        protected readonly myControlImpl: AgreementListImpl;
        /**
        * Проверяет, что лист согласования открыт для просмотра.
        * @return true - открыт, false - закрыт.
        */
        readonly isReportShown: boolean;
        /**
         * Закрывает лист согласования.
         */
        hideReport(): void;
        /**
         * Открывает лист согласования.
         */
        showReport(): void;
        /** @internal */
        private bindingEditOperation;
        /** @internal */
        protected getAgreementList(): JQueryDeferred<IAgreementListDataModel>;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface AgreementListImplState extends AgreementListState, BaseControlImplState {
        loading: boolean;
        dialog: ModalWindow;
        lastLoadedData: IAgreementListDataModel;
    }
    /** @internal */
    class AgreementListImpl extends BaseControlImpl<AgreementListParams, AgreementListImplState> {
        constructor(props: AgreementListParams);
        getCssClass(): string;
        showReport(): void;
        hideReport(): void;
        showModalWindow(data: IAgreementListDataModel): void;
        printTable(content: AgreementListContent): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IAgreementListRenderEventArgs {
        model: IAgreementListDataModel;
        columns: IAgreementListTableColumn[];
    }
}
declare namespace WebClient {
    interface IAgreementListReportOpenedEventArgs {
        model: IAgreementListDataModel;
        contentControl: AgreementListContent;
    }
}
declare namespace WebClient {
    interface IAgreementListReportOpeningEventArgs {
        model: IAgreementListDataModel;
    }
}
declare namespace WebClient {
    interface IAgreementListTableColumn {
        class?: string;
        name: any;
        weight: number;
        calculatedWidth?: string;
        value: (item: IAgreementListItemModel) => string;
        hidden?: boolean;
        order: number;
    }
}
declare namespace WebClient {
    /** @internal */
    class AgreementListContent extends React.Component<IAgreementListContentProps, IAgreementListContentState> {
        rootElem: HTMLElement;
        constructor(props: IAgreementListContentProps);
        readonly onRender: IBasicEvent<IAgreementListRenderEventArgs>;
        readonly root: HTMLElement;
        columns: IAgreementListTableColumn[];
        commentColumn: IAgreementListTableColumn;
        protected preRenderPrepareColumns(columns: IAgreementListTableColumn[]): IAgreementListTableColumn[];
        protected calculateWidths(columns: IAgreementListTableColumn[]): void;
        protected renderTable(columnsParam: IAgreementListTableColumn[]): JSX.Element;
        protected renderHeader(columns: IAgreementListTableColumn[]): JSX.Element;
        protected renderRow(item: IAgreementListItemModel, columns: IAgreementListTableColumn[]): JSX.Element;
        protected getCaption(): string;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IAgreementListContentProps {
        data: IAgreementListDataModel;
        documentNumber: string;
        documentName: string;
        title: string;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IAgreementListContentState {
        columns: IAgreementListTableColumn[];
        commentColumn: IAgreementListTableColumn;
        onRender: IBasicEvent<IAgreementListRenderEventArgs>;
    }
}
declare namespace WebClient {
    /**
    * Содержит публичные свойства элемента управления [Ход согласования]{@link AgreementHistory}.
    */
    class AgreementHistoryParams extends BaseControlParams {
        /** Текст, отображаемый на кнопке открытия хода согласования.*/
        buttonText: string;
        /** Стандартный CSS класс со стилями элемента управления */
        standardCssClass?: string;
        /** Возвращает состояние окна хода согласования: `true` - окно с ходом согласования открыто, `false` - закрыто. */
        isReportShown?: boolean;
        /** Определяет, возможно ли показать ход согласования: `true` - возможно (элемент управления связан с данными и разрешена настроенная операция редактирования), `false` - невозможно. */
        showReportAllowed?: boolean;
        /** Событие возникает при открытии окна хода согласования. */
        approvingReportOpening?: CancelableApiEvent<IApprovingReportOpeningEventArgs>;
        /** Событие возникает при закрытии окна хода согласования. */
        approvingReportClosing?: CancelableApiEvent<IEventArgs>;
        /** Событие возникает при обновлении данных хода согласования. */
        approvingReportRefreshing?: CancelableApiEvent<IApprovingReportRefreshingEventArgs>;
        /** Событие возникает после открытия окна хода согласования. */
        approvingReportOpened?: BasicApiEvent<IApprovingReportOpenedEventArgs>;
        /** Событие возникает после закрытия окна хода согласования. */
        approvingReportClosed?: BasicApiEvent<IEventArgs>;
        /** Событие возникает после обновления данных хода согласования. */
        approvingReportRefreshed?: BasicApiEvent<IApprovingReportRefreshedEventArgs>;
    }
    /** @internal */
    interface AgreementHistoryState extends BaseControlState, AgreementHistoryParams {
        model: IAgreementHistoryDataModel;
    }
    /**
    * Класс элемента управления Ход согласования.
    *
    * Добавляет в web-разметку кнопку, при нажатии которой открывается окно просмотра хода согласования.
    */
    class AgreementHistory extends BaseControl<AgreementHistoryParams, AgreementHistoryState> {
        protected createParams(): AgreementHistoryParams;
        private readonly myControlImpl;
        private agreementHistoryData;
        private binding;
        /**
         * Открывает окно просмотра хода согласования
         */
        showReport(): void;
        /**
         * Закрывает окно просмотра хода согласования.
         */
        hideReport(): void;
        /**
         * Проверяет возможность показа окна хода согласования.
         *
         * @return true - возможно (если данные для отображения доступны и операция разрешена), false - невозможно.
         */
        canShowReport(): void;
        /**
         * Загружает с сервера новые данные по ходу согласования и обновляет содержимое окна просмотра хода согласования.
         */
        refreshReport(): void;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface AgreementHistoryImplState extends BaseControlImplState, AgreementHistoryState {
        dialog: WebClient.ModalWindow;
        isHistoryDataReceived: boolean;
        loading: boolean;
        lastLoadedData: ApprovalHistoryViewModel;
    }
    /** @internal */
    class AgreementHistoryImpl extends BaseControlImpl<AgreementHistoryParams, AgreementHistoryImplState> {
        constructor(props: AgreementHistoryParams);
        showReport(): void;
        hideReport(): void;
        canShowReport(): boolean;
        loadData(): JQueryDeferred<ApprovalHistoryViewModel>;
        renderDialogContent(dialog: ModalWindow, data: ApprovalHistoryViewModel): void;
        refreshReport(): void;
        renderControl(): JSX.Element;
        readonly isReportShown: boolean;
    }
}
declare namespace WebClient {
    interface IApprovingReportOpenedEventArgs extends ApprovalHistoryViewModel {
    }
}
declare namespace WebClient {
    interface IApprovingReportOpeningEventArgs {
    }
}
declare namespace WebClient {
    interface IApprovingReportRefreshedEventArgs {
        cycleNumber: number;
        cycleInfo: ApprovalHistoryCycleModel;
    }
}
declare namespace WebClient {
    interface IApprovingReportRefreshingEventArgs {
        cycleNumber: number;
    }
}
declare namespace WebClient {
    class ApprovalHistorySimpleCycleModel {
        isCurrent: boolean;
        number: number;
    }
}
declare namespace WebClient {
    class ApprovalHistoryCycleModel extends ApprovalHistorySimpleCycleModel {
        stages: ApprovalHistoryStageModel[];
        ownerCardId: string;
    }
}
declare namespace WebClient {
    class ApprovalHistorySimpleFileModel {
        name: string;
        key: {
            fileId: string;
        };
    }
}
declare namespace WebClient {
    class ApprovalHistoryStageItemModel {
        decision: DecisionSemantics;
        decisionName: string;
        decisionDate: Date;
        employeeText: string;
        comment: string;
        hasComment: boolean;
        addedFileCardModels: any[];
        commentFileData: ApprovalHistorySimpleFileModel;
    }
    enum DecisionSemantics {
        Positive = 1,
        Negative = 2,
        Neutral = 3,
        Cancellation = 4,
        NewCycle = 5,
        Completion = 100,
    }
}
declare namespace WebClient {
    class ApprovalHistoryStageModel {
        name: string;
        approvalType: string;
        isExpandedByDefault: boolean;
        stageItems: ApprovalHistoryStageItemModel[];
    }
}
declare namespace WebClient {
    class ApprovalHistoryViewModel {
        approvalReconcileCardId: string;
        approvalTaskCardId: string;
        currentCycle: ApprovalHistoryCycleModel;
        cycles: ApprovalHistorySimpleCycleModel[];
    }
}
declare namespace WebClient {
    interface IAgreementHistoryDataModel {
        historyExists: boolean;
        agreementCardId: any;
    }
}
declare namespace WebClient {
    /** @internal */
    class ApprovalStageItemRow extends React.Component<IApprovalStageItemRowProps, any> {
        private decisionText;
        private decisionClass;
        constructor(props: any);
        handleCommentClick(): void;
        handleCorrectionFileClick(file: any): void;
        handleStageRowClick(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IApprovalStageItemRowProps {
        stageItem: ApprovalHistoryStageItemModel;
        ownerCardId: string;
    }
}
declare namespace WebClient {
    /** @internal */
    class ApprovalStageItemComment extends React.Component<ApprovalHistoryStageItemModel, any> {
        constructor(props: any);
        hanldeCommentFileClick(e: any): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    class ApprovalStageInfo extends React.Component<any, any> {
        constructor(props: any);
        protected handleHeaderClick(event: React.MouseEvent): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    class ApprovalHistoryTable extends React.Component<IApprovalHistoryTableProps, any> {
        constructor(props: IApprovalHistoryTableProps);
        componentWillReceiveProps(nextProps: IApprovalHistoryTableProps, nextContext: any): void;
        handleCycleClick(cycleNumber: any): void;
        loadCycleData(cycleNumber: any): void;
        onRefreshClick(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface IApprovalHistoryTableProps {
        data: ApprovalHistoryViewModel;
        approvingReportRefreshing: CancelableEvent<IApprovingReportRefreshingEventArgs>;
        approvingReportRefreshed: SimpleEvent<IApprovingReportRefreshedEventArgs>;
        refreshRequested: Function;
    }
}
declare namespace WebClient {
    /** @internal */
    class ApprovalHistoryFullStageInfo extends React.Component<any, any> {
        constructor(props: any);
        render(): JSX.Element;
        renderComment(): JSX.Element;
        renderCommentFile(): JSX.Element;
        renderCorrections(): JSX.Element;
        handleCorrectionFileClick(file: any): void;
        hanldeCommentFileClick(e: any): void;
    }
}
declare namespace WebClient {
    /** @internal */
    class ApprovalCycleList extends React.Component<ApprovalCycleListProps, any> {
        constructor(props: ApprovalCycleListProps);
        private renderItem(item);
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface ApprovalCycleListProps {
        cycles: ApprovalHistorySimpleCycleModel[];
        currentCycle: any;
        onCycleClick: Function;
    }
}
declare namespace WebClient {
    /** @internal */
    class ApprovalCycleInfo extends React.Component<ApprovalHistoryCycleModel, any> {
        constructor(props: any);
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class AcquaintanceManagementParams extends PanelParams {
        sendAcquaintanceButtonText: string;
        standardCssClass?: string;
        canSend?: boolean;
        opening?: CancelableApiEvent<IEventArgs>;
        opened: BasicApiEvent<IEventArgs>;
        closing: CancelableApiEvent<IEventArgs>;
        closed: BasicApiEvent<IEventArgs>;
    }
    /** @internal */
    interface AcquaintanceManagementState extends AcquaintanceManagementParams, PanelState {
        cardId: string;
        children: ILayoutModel[];
        lastLoading: JQueryDeferred<ILayoutModel[]>;
        isOpened: boolean;
        receivers: MultipleEmployees;
        considerationDate: DateTimePicker;
    }
    class AcquaintanceManagement extends Panel<AcquaintanceManagementParams, AcquaintanceManagementState> {
        constructor(props: AcquaintanceManagementParams);
        protected createParams(): AcquaintanceManagementParams;
        /** @internal */
        private Binding;
        /** @internal */
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    /** @internal */
    interface AcquaintanceManagementImplState extends PanelState, AcquaintanceManagementState {
        loading: boolean;
    }
    /** @internal */
    class AcquaintanceManagementImpl extends PanelImpl<AcquaintanceManagementParams, AcquaintanceManagementImplState> {
        constructor(props: AcquaintanceManagementParams);
        open(): void;
        close(): void;
        readonly isOpened: boolean;
        attachReceivers(control: any): void;
        attachConsiderationDate(control: any): void;
        onMainButtonClick(): void;
        onSendClick(): void;
        onCancelClick(): void;
        renderControl(): JSX.Element;
    }
}
