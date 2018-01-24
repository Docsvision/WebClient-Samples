/// <reference path="jquery.d.ts" />
/// <reference path="jquery.cookie.d.ts" />
/// <reference path="jquery.validation.d.ts" />
/// <reference path="jquery-validation-unobtrusive.d.ts" />
/// <reference path="sammyjs.d.ts" />
/// <reference path="extenders.d.ts" />
declare class DocumentManagementPatnerControlSync {
    senderInternalChange: boolean;
    updateEmployeeFromDepartment(employee: WebClient.Partner, department: WebClient.Department): Promise<void>;
    updateDepartmentFromEmployee(department: WebClient.Department, employee: WebClient.Partner): void;
}
declare function documentCreateMainFileAdding(sender: WebClient.LayoutControl, e: WebClient.ICancelableEventArgs<WebClient.IMainFileAddingArgs>): void;
declare var incomingDocumentPartnerSync: DocumentManagementPatnerControlSync;
declare function incomingDocument_partnerDepartmentChanged(senderDepartment: WebClient.Department, e: WebClient.IDataChangedEventArgsEx<WebClient.IDepartmentInfo>): Promise<void>;
declare function incomingDocument_partnerEmployeeChanged(senderEmployee: WebClient.Partner, e: WebClient.IDataChangedEventArgsEx<WebClient.IBasicEmployeeInfo>): void;
declare var outgoingDocumentPartnerSync: DocumentManagementPatnerControlSync;
declare function outgoingDocument_loadPartnerDepartmentsInfo(sender: WebClient.LayoutControl): Promise<void>;
declare function outgoingDocument_updatePartnerDepartmentsOnEdit(sender: WebClient.LayoutControl): Promise<void>;
declare function outgoingDocument_clearEmptyPartnersTableRows(sender: WebClient.LayoutControl): JQueryPromise<{}>;
declare function outgoingDocumentViewCardOpened(sender: WebClient.LayoutControl, e: WebClient.IEventArgs): void;
declare function outgoingDocumentSaving(sender: WebClient.LayoutControl, e: WebClient.ICancelableEventArgs<WebClient.ISaveControlData>): void;
declare function outgoingDocument_partnerDepartmentChanged(sender: WebClient.Department, e: WebClient.IDataChangedEventArgsEx<WebClient.IDepartmentInfo>): void;
declare function outgoingDocument_partnerEmployeeChanged(sender: WebClient.Partner, e: WebClient.IDataChangedEventArgsEx<WebClient.IBasicEmployeeInfo>): void;
declare function documentViewCardOpened(sender: WebClient.LayoutControl, e: WebClient.IEventArgs): void;
declare function documentViewHeaderMouseOver(sender: WebClient.LayoutControl, e: WebClient.IEventArgs): void;
declare function documentViewHeaderMouseOut(sender: WebClient.LayoutControl, e: WebClient.IEventArgs): void;
declare function documentSaving(sender: WebClient.LayoutControl, e: WebClient.ICancelableEventArgs<WebClient.ISaveControlData>): boolean;
declare namespace WebClient {
    abstract class BasicEvent<T> implements IBasicEvent<T> {
        protected handlers: BasicEventHandler<T>[];
        private mDefaultSender;
        private mEventInfo;
        constructor(sender: any, subscribers?: BasicEventHandler<T>[]);
        subscribe(handler: BasicEventHandler<T>): void;
        unsubscribe(handler: BasicEventHandler<T>): void;
        defaultSender: () => BaseControl<BaseControlParams, any>;
        protected triggerAll(sender?: any, data?: T): void;
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
    class SammyHelper {
        private sammy;
        private requestData;
        private searchPanel;
        private currentRouteInfo;
        private currentRouteInfoChangedEvent;
        private traceProvider;
        private routeHandlers;
        private pendingRouteTypeMappers;
        private routeTypeMappers;
        static MainContentElementId: string;
        private static MainContentElementDefaultClasses;
        private static NewCardRoutePartName;
        private static CardViewRoutePartName;
        private static CardEditRoutePartName;
        private static ExtendedLayoutRoutePartName;
        private mainContentChangingListeners;
        private runHandlersUpdate;
        private runHandlersWorking;
        private internalLocationUpdate;
        private lastRouteProcessing;
        private lastSetMainContentProcessing;
        private currentRouteProcessingMapper;
        private currentUnmountingRoute;
        private currentUrl;
        private isReplacingUrlWithoutNotification;
        static CurrentRouteStoreKey: string;
        static RouterInitialization: IBasicEvent<void>;
        constructor(searchPanel: SearchPanel);
        readonly dangerouslyUrl: string;
        addHandler<T>(routeType: RouteType, handler: IRouteHandler<T>): void;
        removeHandler<T>(routeType: RouteType, handler: IRouteHandler<T>): void;
        getHandlers<T>(routeType: RouteType): IRouteHandler<T>[];
        addRouteTypeMapper(mapper: IRouteTypeMapper<any>): void;
        getCurrentRoute<T>(): IRouteInfo<T>;
        setCurrentRoute<T>(info: IRouteInfo<T>): void;
        readonly currentRouteInfoChanged: IBasicEvent<IRouteInfo<any>>;
        private onCurrentRouteInfoChanged();
        private runHandlers(routeInfo);
        private runHandlersWith(handlers, method, routeInfo);
        private reportError(err, showError?);
        private shutdownCurrentRoute();
        private processRoute(sammyContext, mapper);
        private processRouteImpl(sammyContext, mapper, prevProcessing);
        private unmountCurrentRoute();
        private getPathFromRouteMapper(routeInfo);
        private updateUrl<T>(routeInfo);
        goTo(route: string, refresh?: boolean, callback?: Function): Promise<void>;
        GetLocation(): string;
        getLocationFromRoute(route: string): string;
        goToRoute(context: any): void;
        goToDashboard(context: any): void;
        refresh(callback?: Function): Sammy.Application;
        LoadContent(url: string, requestData: any, contentElement: HTMLElement, showOverlay?: boolean, callback?: Function): void;
        LoadMainContent(url: string, requestData: any, showOverlay?: boolean, get?: boolean, callback?: (isError?: boolean) => void): void;
        LoadContnentFromRoute(cardId: any): void;
        SetMainContentElement(elem: HTMLElement, doneCallback?: Function, newContentCssClass?: string): JQueryDeferred<void>;
        SetMainContentHtml(html: string, doneCallback?: Function, newContentCssClass?: string): JQueryDeferred<any>;
        PrepareMainContentChange(): JQueryDeferred<any>;
        AddMainContentChangingListener(listener: () => JQueryDeferred<any>): void;
        RemoveMainContentChangingListener(listener: () => JQueryDeferred<any>): void;
        AddMainContentEventListener(eventType: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
        RemoveMainContentEventListener(eventType: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
        private CardLayoutsUrlCheck(url);
        private LayoutUrlCheck(url);
        private LoadData(url, requestData, showOverlay, get, callback, customErrorCallback?);
        private SetContent(contentElement, html);
        private OnMainContentChanging();
        private ClearAndGetMainContent();
        LoadCardContent(uri: string): void;
        SetTopPanelCardStyle(cardTypeWeb: any): void;
        private ClearFromFolderView();
        private showNotFound();
        replaceUrlWithoutNotification(url: string): void;
        initialize(): void;
    }
}
declare namespace WebClient {
    class DefaultRouteHandlers {
        static registerAll(sammy: SammyHelper): void;
    }
}
declare namespace WebClient {
    type RouteType = keyof StandardRoutes | string;
}
declare namespace WebClient {
    class StandardRoutes {
        static AllRoutes: string;
        static Folder: string;
        static CustomPage: string;
        static LayoutPage: string;
        static SearchResult: string;
        static Dashboard: string;
        static RecentCards: string;
        static LayoutCard: string;
    }
}
declare namespace WebClient {
    interface ISearchRouteData {
        searchContextOption?: string;
        searchText?: string;
        fullTextFilter?: string;
        deviceType?: DeviceType;
        oldStoreId?: string;
        currentPage?: any;
        sortingColumn?: any;
        sortIsDesc?: any;
        gridModel?: any;
    }
}
declare namespace WebClient {
    class SearchRouteHandler implements IRouteHandler<ISearchRouteData> {
        name: string;
        prepareRouteDataLoad(routeData: Partial<ISearchRouteData>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        loadRouteData(routeData: Partial<ISearchRouteData>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        mountRoute(data: ISearchRouteData, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: ISearchRouteData, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    interface IRecentCardsRouteData {
        searchContextOption?: string;
        searchText?: string;
        gridModel?: any;
    }
}
declare namespace WebClient {
    class RecentCardsRouteHandler implements IRouteHandler<IRecentCardsRouteData> {
        name: string;
        protected gridModelLoader: (requestData: any, isMobile: boolean) => JQueryDeferred<any>;
        loadRouteData(knownRouteData: Partial<IRecentCardsRouteData>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        mountRoute(data: IRecentCardsRouteData, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: IRecentCardsRouteData, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    interface ILayoutPageRouteData {
        header?: string;
        color?: string;
        position?: string;
        layoutModel?: ILayoutViewModel;
    }
}
declare namespace WebClient {
    class LayoutPageRouteConstants {
        static PositionParameter: string;
        static HeaderParameter: string;
        static ColorParameter: string;
        static HashPattern: string;
    }
}
declare namespace WebClient {
    class LayoutPageRouteHandler implements IRouteHandler<ILayoutPageRouteData> {
        name: string;
        loadRouteData(knownRouteData: Partial<ILayoutPageRouteData>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        mountRoute(data: ILayoutPageRouteData, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: ILayoutPageRouteData, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    class LayoutPageRouteHelpers {
        static makeRouteUrl(position: string, header: string, color: string): string;
        static loadLayout(position: string): JQueryDeferred<ILayoutViewModel>;
    }
}
declare namespace WebClient {
    class LayoutPageRouteTypeMapper implements IRouteTypeMapper<ILayoutPageRouteData> {
        hashPattern: string;
        resolve(path: string, parameters: {
            [id: string]: string;
        }): JQueryDeferred<IRouteInfo<ILayoutPageRouteData>>;
        tryGetUrl(route: IRouteInfo<ILayoutPageRouteData>): string | undefined;
    }
}
declare namespace WebClient {
    class DefaultFolderRouteHandler implements IRouteHandler<IFolderRouteData> {
        name: string;
        prepareRouteDataLoad(knownRouteData: Partial<IFolderRouteData>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        loadRouteData(knownRouteData: Partial<IFolderRouteData>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        mountRoute(data: IFolderRouteData, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: IFolderRouteData, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    class FolderAsWebPageRouteHandler implements IRouteHandler<IFolderRouteData> {
        name: string;
        mountRoute(data: IFolderRouteData, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: IFolderRouteData, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    class FolderCountersRouteHandler implements IRouteHandler<IFolderRouteData> {
        name: string;
        protected timer: any;
        protected grid: Grid;
        protected isNotificating: boolean;
        mountRoute(data: IFolderRouteData, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: IFolderRouteData, routeType: RouteType): JQueryDeferred<{}>;
        protected createTimer(gridModel: any, refreshTimeout: number): number;
        protected clearTimer(): void;
        protected onGridRefresh: () => void;
    }
}
declare namespace WebClient {
    class FolderRouteHelpers {
        static openFolder(folderId: string): void;
        static makeFolderUrl(folderId: string, color?: string): string;
        static getRecentCardsUrl(): string;
        static makeFolderRouteData(folderId?: string, color?: string): IFolderRouteData;
        static mountGrid(gridModel: any, options?: Partial<GridOptions>): JQueryDeferred<{}>;
        static mountGridTo(gridModel: any, gridContainer: HTMLElement, options?: Partial<GridOptions>): void;
        static getGridContainer(id?: string): Grid;
    }
}
declare namespace WebClient {
    class FolderRouteParameters {
        static FolderId: string;
        static Color: string;
    }
}
declare namespace WebClient {
    class FolderRouteTypeMapper implements IRouteTypeMapper<IFolderRouteData> {
        static SearchResultsId: string;
        static RecentCardsId: string;
        hashPattern: string;
        resolve(path: string, parameters: {
            [id: string]: string;
        }): JQueryDeferred<IRouteInfo<IFolderRouteData>>;
        tryGetUrl(route: IRouteInfo<IFolderRouteData>): string | undefined;
    }
}
declare namespace WebClient {
    interface ICommonFolderInfo {
        folderId?: string;
        folderName?: string;
        folderColor?: string;
        hasSubfolders?: boolean;
        hasSearchParameters?: boolean;
        folderType?: FolderType;
        defaultStyle?: FolderNodeStyle;
        defaultViewId?: string;
        url?: string;
        parentFolders?: string[];
        refreshTimeout?: number;
        forceVirtualFolderSearch?: boolean;
        folderUri?: string;
        navigatorFolderType?: NavigatorFolderType;
        sourceType?: string;
        queryId?: string;
    }
}
declare namespace WebClient {
    interface ICommonFolderViewInfo {
        viewId?: string;
        searchContextOption?: string;
        fullTextFilter?: string;
        filter?: any;
        currentPage?: any;
        sortingColumn?: any;
        sortIsDesc?: any;
        parameters?: any;
        deviceType?: DeviceType;
        oldStoreId?: string;
        viewSourceId?: string;
        querySearchId?: string;
        searchId?: string;
    }
}
declare namespace WebClient {
    interface IFolderRouteData {
        gridModel?: any;
        folderInfo?: ICommonFolderInfo;
        folderViewInfo?: ICommonFolderViewInfo;
    }
}
declare namespace WebClient {
    class DashboardRouteHelpers {
        static goToDashboard(): void;
    }
}
declare namespace WebClient {
    class DashboardRouteTypeMapper implements IRouteTypeMapper<ILayoutPageRouteData> {
        private dashboardPosition;
        hashPattern: string;
        resolve(path: string, parameters: {
            [id: string]: string;
        }): JQueryDeferred<IRouteInfo<ILayoutPageRouteData>>;
        tryGetUrl(route: IRouteInfo<ILayoutPageRouteData>): string | undefined;
    }
}
declare namespace WebClient {
    class CustomHtmlPageRouteConstants {
        static UrlParameter: string;
        static HeaderParameter: string;
        static ColorParameter: string;
        static HashPattern: string;
    }
}
declare namespace WebClient {
    class CustomHtmlPageRouteHandler implements IRouteHandler<ICustomHtmlPageRouteData> {
        name: string;
        mountRoute(data: ICustomHtmlPageRouteData, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: ICustomHtmlPageRouteData, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    class CustomHtmlPageRouteHelpers {
        static makeRouteUrl(url: string, header: string, color: string): string;
        static openCustomWebPage(folderUrl: string, headerText: string, color: string): JQueryDeferred<void>;
    }
}
declare namespace WebClient {
    class CustomHtmlPageRouteTypeMapper implements IRouteTypeMapper<ICustomHtmlPageRouteData> {
        hashPattern: string;
        resolve(path: string, parameters: {
            [id: string]: string;
        }): JQueryDeferred<IRouteInfo<ICustomHtmlPageRouteData>>;
        tryGetUrl(route: IRouteInfo<ICustomHtmlPageRouteData>): string | undefined;
    }
}
declare namespace WebClient {
    interface ICustomHtmlPageRouteData {
        header?: string;
        color?: string;
        url?: string;
    }
}
declare namespace WebClient {
    class CardInfoModel {
        CadId: string;
        Timestamp: string;
    }
}
declare namespace WebClient {
    enum CardType {
        Document = 0,
        Task = 1,
        GroupTask = 2,
        Unknown = 4,
    }
}
declare namespace WebClient {
    class DateTimeFormat {
        Date: string;
        Time: string;
        readonly DateTime: string;
    }
}
declare namespace WebClient {
    enum DeviceType {
        Desktop = 0,
        Smartphone = 1,
        Tablet = 2,
    }
}
declare namespace WebClient {
    class EncryptedInfo {
        private thumbprint;
        private attirbutes;
        private signedFiles;
        constructor(thumbprint: string);
        readonly Thumbprint: string;
        readonly Attirbutes: Array<EncryptedAttribute>;
        SignedFiles: any;
    }
    class EncryptedAttribute {
        private name;
        private value;
        private oid;
        constructor(oid: string, value: string);
        readonly Oid: string;
        readonly Name: string;
        readonly Value: string;
    }
}
declare namespace WebClient {
    enum ErrorNotificationType {
        Success = 0,
        Warning = 1,
        Error = 2,
    }
}
declare namespace WebClient {
    enum FolderStyles {
        None = 0,
        FolderView = 1,
        FolderCard = 2,
        FolderURL = 4,
        FolderDigest = 8,
        All = 15,
    }
}
declare namespace WebClient {
    class FolderUnreadRequest {
        Id: string;
        Type: string;
        Count: string;
        SearchId: string;
    }
}
declare namespace WebClient {
    class FolderViewRequestViewModel {
        private folderId;
        private folderUri;
        private queryId;
        private viewid;
        private searchId;
        private sourceType;
        private viewSourceId;
        private folderType;
        private searchContextOption;
        private fullTextFilter;
        private querySearchId;
        hasSearchParametrs: boolean;
        parameters: any;
        PageNumber: string;
        SortedColumnName: string;
        IsDescending: string;
        oldStoreId: string;
        RefreshView: boolean;
        folderRefreshTimeout: number;
        forceVirtualFolderSearch: boolean;
        constructor();
        readonly FolderType: NavigatorFolderType;
        FolderId: string;
        ViewId: string;
        SearchContextOption: string;
        FullTextFilter: string;
        ViewSourceId: string;
        QuerySearchId: string;
        SearchId: string;
        GetFolderData(element: HTMLElement): void;
    }
}
declare namespace WebClient {
    class GroupTaskCardUpdateModel {
        TaskGroupId: string;
        PerformerId: string;
        Name: string;
        Description: string;
        StartDate: string;
        EndDate: string;
        ControlDate: string;
        Duration: string;
        ExecutionType: string;
        OnControl: boolean;
        ControllerId: string;
        ControlHour: string;
        RequiresAcceptance: boolean;
        IsNew: boolean;
        Timestamp: string;
        KindId: string;
        IsStartTask: boolean;
        ParentCardKey: ParentCardKey;
        DocumentsId: Array<string>;
        PerformerSettingUpdateModels: Array<PerformerSettingUpdateModel>;
    }
    class ParentCardKey {
        CardId: string;
        CardTypeId: string;
    }
    class PerformerSettingUpdateModel {
        PerformerId: string;
        StartDate: string;
        EndDate: string;
        Duration: string;
        Description: string;
    }
}
declare namespace WebClient {
    interface IFileSignInteractionModel {
        documentId: string;
        getTimestamp: () => number;
        setTimestamp: (timestamp: number) => void;
        getFiles: () => IFileSignInfo[];
        signButton: HTMLElement;
        viewSignButton: HTMLElement;
        beforeSignCallback: () => JQueryDeferred<any>;
        beforeViewSignCallback: () => JQueryDeferred<any>;
        afterSignCallback: Function;
        afterViewSignCallback: Function;
    }
}
declare namespace WebClient {
    interface IFileSignInfo {
        fileId: string;
        versionId: string;
        fileCardId: string;
    }
}
declare namespace WebClient {
    class ModalWindowParams {
        modalType: ModalWindowType;
        modalClassName: string;
        content: string;
        contentClassName: string;
        headerText: string;
        buttonsClassName: string;
        buttonsReverse: boolean;
        buttonOkClassName: string;
        buttonOkShow: boolean;
        buttonOkText: string;
        buttonOkFunction: Function;
        buttonCancelClassName: string;
        buttonCancelShow: boolean;
        buttonCancelText: string;
        buttonCancelFunction: Function;
        buttons: Array<ModalButton>;
        replaceDefaultButtons: boolean;
        beforeShowCallback: Function;
        afterShowCallback: Function;
        beforeCloseCallback: Function;
        closingCallback: () => JQueryDeferred<any>;
        afterCloseCallback: Function;
        afterDestroyCallback: Function;
    }
    class ModalButton {
        buttonClassName: string;
        buttonShow: boolean;
        buttonText: string;
        buttonFunction: Function;
        constructor(text: string, callback: Function, className?: string, visible?: boolean);
        Visible: boolean;
        Text: string;
        CssClassName: string;
        Callback: Function;
        static DefaultButtonOK(text: string, callback: Function): ModalButton;
        static DefaultButtonCancel(text: string, callback: Function): ModalButton;
    }
}
declare namespace WebClient {
    enum ModalWindowType {
        Info = 0,
        Warning = 1,
        Error = 2,
        Default = 3,
    }
}
declare namespace WebClient {
    class NavigatorFolderRequest {
        private folderId;
        private folderType;
        constructor(id: string, folderType: NavigatorFolderType);
        readonly FolderId: string;
        readonly FolderType: NavigatorFolderType;
    }
}
declare namespace WebClient {
    enum NavigatorFolderType {
        UserFolder = 0,
        ServiceFolder = 1,
    }
}
declare namespace WebClient {
    enum RequestReadyStateType {
        Unitialized = 0,
        Loading = 1,
        Loaded = 2,
        Interactive = 3,
        Complete = 4,
    }
}
declare namespace WebClient {
    enum SearchContextOption {
        None = -1,
        CurrentFolder = 0,
        CurrentFolderAndSubFolders = 1,
        SearchInSearchResults = 2,
        EveryWhere = 3,
    }
}
declare namespace WebClient {
    enum SourceFolderType {
        Generic = 0,
        Folder = 1,
        VirtualFolder = 2,
    }
}
declare namespace WebClient {
    class StorageSetting {
        Name: string;
        Value: any;
    }
}
declare namespace WebClient {
    enum TaskExecutionType {
        Serial = 0,
        Parallel = 1,
    }
}
declare namespace WebClient {
    class ViewFilterSetting {
        private id;
        currentPage: number;
        sortingColumn: string;
        sortIsDesc: boolean;
        constructor();
    }
}
declare namespace WebClient {
    class Constants {
        static DeviceTypePrefixName: string;
        static HeaderWrapperElementId: string;
        static HeaderFolderNameElementId: string;
        static CompanyLogoElementId: string;
        static SidebarButtonCloseId: string;
        static SidebarButtonPinnId: string;
        static SidebarButtonOpen: string;
        static SidebarElementId: string;
        static SidebarButtonSwitchViewId: string;
        static FilePreviewElementId: string;
        static FileLinkClassName: string;
        static CommandsElementId: string;
        static SearchPanelId: string;
        static SearchInputId: string;
        static SearchTextInputId: string;
        static SearchClearButtonId: string;
        static SearchMobileContainerId: string;
        static SearchButtonId: string;
        static SearchDropdownId: string;
        static ResourcesGlobalContainterId: string;
        static ProgressBarElementId: string;
        static ProgressBarSpinnerElementId: string;
        static HeaderAddItemButton: string;
        static HeaderBackButton: string;
        static GridContainerId: string;
        static GridTableId: string;
        static GridDefaultPageSize: number;
        static MobileGridDefaultSize: number;
        static GridFilterDivId: string;
        static GridFilterContainerId: string;
        static SelectViewsContainerId: string;
        static SelectViewsBtnId: string;
        static SelectViewsListId: string;
        static NavigatorButtonsClass: string;
        static NavigatorPanelBtnTitleClass: string;
        static UserMenuId: string;
        static UserMenuButtonId: string;
        static UserMenuAboutButtonId: string;
        static UserMenuExitButtonId: string;
        static UserMenuChangeUserButtonId: string;
        static MobileSizeBorder: number;
        static GuidEmpty: string;
        static NewDigestId: string;
        static SearchResultsFolder: string;
        static SizeInKBytes: number;
        static SizeInMBytes: number;
        static SizeInGBytes: number;
        static DocumentCard: string;
        static TaskCard: string;
    }
}
declare namespace WebClient {
    class Sidebar {
        private mainMenuLayoutPosition;
        private mainMenuElementId;
        private model;
        private content;
        private btnPinn;
        private btnOpen;
        private linkSwitchView;
        private isPinned;
        private isClosed;
        private canResize;
        private maxResizeWidth;
        private minResizeWidth;
        private deviceType;
        private isBusy;
        private traceProvider;
        toggle?: BasicApiEvent<boolean>;
        constructor();
        readonly IsClosed: boolean;
        readonly CanResize: boolean;
        IsPinned: boolean;
        DeviceType: DeviceType;
        readonly Model: HTMLElement;
        readonly MinResizeWidth: number;
        readonly MaxResizeWidth: number;
        close(): void;
        open(): void;
        SaveSettings(): void;
        LoadSettings(): void;
        LoadLayout(): void;
        private SwitchView();
        private Initialize();
        private AddHideOnDocumentClickEvent();
        private toogle(element, hide?, isInline?);
        ResetSettings(): void;
        ReInitialize(): void;
    }
}
interface ActiveXObject {
    new (s: string): any;
}
declare var ActiveXObject: ActiveXObject;
declare namespace WebClient {
    class Helpers {
        constructor();
        static GetTarget(event: Event): HTMLElement;
        static GetDateSeparator(): string;
        static HideCaption(): void;
        static ShowCaption(): void;
        static UpdateCaption(headerText?: string, color?: string): void;
        static GetKindNameFromFullString(string: string): string;
        static GetFileExtension(fileName: string): string;
        static SetNumericControl(control: HTMLElement, callback?: Function): void;
        static InsertAfter(newElement: any, targetElement: any): void;
        static CapitalizeFirstLatter(str: string): string;
        private toogle(element, hide?, isInline?);
        static RunScripts(element: HTMLElement): void;
        private static RunScriptsHelper(element);
        static DisplayFileSize(fileSize: number): string;
        static CheckCardModified(cardId: string, timestamp: string, callback?: Function): void;
        static CheckCardLocked(cardId: string, callback: Function): void;
        static CheckKindCreatable(cardTypeId: string, cardKindId: string, callback: Function): void;
        static ShowFilePreview(url: any, title: any, delCommentUrl?: string, editCommentUrl?: string): void;
        static ShowFilePreviewEx(previewContent: any, title: any, delCommentUrl?: string, editCommentUrl?: string): void;
        static ValidateForm(form: HTMLFormElement): boolean;
        static FindParentElement(element: HTMLElement, parentClassName: string): HTMLElement;
        static SupressEvents(e: Event): void;
        static FloatToCultureStr(num: number, precision?: number): string;
        static ParseFloatCultureStr(str: string): number;
        private static LegacyValidation(field);
        static Base64Encode(arrayBuffer: any): string;
        static Base64ArrayBuffer(arrayBuffer: any): string;
        static IsEdge(): boolean;
        static SetTooltip(element: HTMLElement): void;
        static SetTooltipFor(element: HTMLElement, text: string, extraOptions?: Object): void;
        static DestroyTooltips(element: HTMLElement): void;
        static ClearTips(): void;
        static LocationReload(): void;
        static GetCurrentDeviceType(): DeviceType;
        static GetOriginalDeviceType(): DeviceType;
        static GetIEVersion(): {};
        static CallCancelableIf(callback: Function, ...args: any[]): JQueryDeferred<any>;
        static CallIf(callback: Function, ...args: any[]): any;
        static WhenAll(deferreds: JQueryDeferred<any>[]): JQueryDeferred<any>;
        static guidPattern: RegExp;
        static validGuid(guid: string): RegExpMatchArray;
        static iterateAsync<T>(collection: T[], func: (item: T) => JQueryDeferred<any>): JQueryDeferred<any>;
        private static iterateAsyncNext<T>(collection, func, currentIndex, total);
        static promiseToDeferred<T>(promise: Promise<T>): JQueryDeferred<T>;
        static deferredtoPromise<T>(def: JQueryDeferred<T>): Promise<T>;
        static getHashCode(str: string): number;
    }
    class Animate {
        static SetEndCallback(htmlElement: HTMLElement, func: any): void;
    }
    class LocalStorage {
        static SupportsLocalStorage(): boolean;
        static SaveData(id: string, obj: any): boolean;
        static LoadData(id: string): any;
    }
    class SessionStorage {
        static SupportsSessionStorage(): boolean;
        static SaveData(id: string, obj: any): boolean;
        static LoadData(id: string): any;
    }
    class ErrorHelper {
        static ThrowIfElementNotFound(htmlElement: HTMLElement): void;
        static ThrowIfElementIdNotFound(elementWithId: string): void;
        static ThrowIfNull(request: XMLHttpRequest): void;
        static RequestNotSupported(): void;
        static RequestError(errorText: string): void;
        static CertificateNotFound(errorText: string): void;
    }
    class ResourcesHelper {
        static ResourcesContainerName: string;
        static GetGlobalResource(resourceName: string): string;
        static SetGlobalResource(resourceName: string, resourceValue: any): void;
        static GetResource(container: HTMLElement, resourceName: string): string;
    }
    class ProgressOverlay {
        private progressOverlay;
        private overlayTimeout;
        private static OverlayElementId;
        Timeout: number;
        ShowOverlay(): void;
        HideOverlay(): void;
        private DestroyOverlay();
        private GetOrCreteateOverlay();
    }
    type RequestCustomCompleteCallback = (request: XMLHttpRequest, callerCallback: Function) => void;
    enum LoadingBarValues {
        Start = 1,
        OneFourth = 25,
        Half = 50,
        AfterHalf = 60,
        ThreeFourth = 75,
        Full = 100,
        None = 0,
    }
    class Request {
        private static ActiveRequests;
        private static LoadingBarElementId;
        private static LoadingBarWrapperElementId;
        static ContentTypeForm: string;
        private isAsync;
        private responseType;
        private contentType;
        private dataType;
        private isShowOverlay;
        private isShowLoadingBar;
        private customErrorCallback;
        private customCriticalErrorCallback;
        private customCompleteCallback;
        private progressOverlay;
        private isForm;
        private noCache;
        constructor();
        IsAsync: boolean;
        NoCache: boolean;
        ContentType: string;
        CustomErrorCallback: Function;
        CustomCriticalErrorCallback: Function;
        CustomCompleteCallback: RequestCustomCompleteCallback;
        ResponseType: XMLHttpRequestResponseType;
        IsShowOverlay: boolean;
        IsShowLoadingBar: boolean;
        ShowLoadingBar: boolean;
        private SetLoadingBar(value);
        DataType: string;
        PostData(url: string, requestData: any, callback: Function): void;
        PostDataEx(url: string, requestData: any): JQueryDeferred<any>;
        PostDataSilent(url: string, requestData: any): JQueryDeferred<any>;
        GetData(url: string, requestData: any, callback: Function): void;
        GetDataEx(url: string, requestData: any): JQueryDeferred<any>;
        private ProcessRequest(url, requestData, callback, method);
        private ProcessRequestEx(url, requestData, method, showErrorDialog?);
        private static ParseError(httpRequest, customErrorCallback, customCriticalErrorCallback?);
        private static GetRequestInstance();
    }
    class TabsHelper {
        static AddTabEvents(tabElement: HTMLElement): void;
    }
    class CardCommandButtonsHelper {
        static AddRefreshButtonEvents(selectorQuery: string): void;
        static AddEditButtonEvents(selectorQuery: string, widgetId?: string): void;
        static AddDeleteButtonEvents(selectorQuery: string, widgetId?: string): void;
    }
    class DateTimeHelper {
        static GetLocaleFormat(locale: string): DateTimeFormat;
    }
    class EventHelper {
        static Change(element: HTMLElement): void;
        static WindowResize(): void;
    }
}
declare namespace WebClient {
    class Grid {
        private targetElement;
        private rootElement;
        private tableHeader;
        private tableBody;
        private gridFooter;
        private isMobileBuilt;
        private isDesktopBuilt;
        private htmlBuilder;
        model: any;
        options: GridOptions;
        private readonly IsMobileBuilt;
        private readonly IsDesktopBuilt;
        constructor(element: HTMLElement, model: any, options: GridOptions, htmlBuilder: IGridHtmlBuilder);
        onModelChange: (sender: any, model: any) => void;
        private initialize();
        private refreshLayoutToMakeIEBugsRunAway(mainTable);
        rebuildIfNeeded(): void;
        applyFilters(): void;
        getChanges(): Promise<any>;
        showUpdateRequest(show?: boolean): void;
        readonly refreshed: SimpleEvent<void>;
        isSearching(): any;
        static isEqual(model1: any, model2: any, ignoreMeta?: boolean, ignoreReadStatus?: boolean, paramsToCheck?: string[]): boolean;
    }
}
declare var layoutManager: WebClient.LayoutManager;
declare namespace WebClient {
    class App {
        private locale;
        private keepAlivePollingInterval;
        private fullTextSearchEnabled;
        private deviceType;
        private defaultDeviceType;
        private installedCSP;
        private applicationTimestamp;
        private localization;
        private siteUrl;
        private layoutManager;
        private sidebar;
        private searchPanel;
        private sammyHelper;
        private navBar;
        private request;
        private addItemModal;
        private folders;
        private folderViews;
        private unreadCounters;
        private realtimeCommunicationService;
        private canPromise;
        private static isIE10;
        private static routeTimestampVal;
        private static isMobileSafary;
        private traceProvider;
        static Instance: App;
        constructor();
        readonly CurrentFolderUri: string;
        LastSearchRequest: string;
        UserMenu: UserMenu;
        readonly Sidebar: Sidebar;
        readonly FolderViews: FolderViews;
        readonly SearchPanel: SearchPanel;
        readonly NavBar: NavBar;
        readonly CompanyLogo: HTMLElement;
        readonly FullTextSearchEnabled: boolean;
        readonly SammyHelper: SammyHelper;
        readonly Folders: Folders;
        readonly UnreadCounters: UnreadCounter;
        readonly DeviceType: DeviceType;
        readonly DefaultDeviceType: DeviceType;
        InstalledCSP: boolean;
        readonly ApplicationTimestamp: number;
        readonly Localization: any;
        readonly SiteUrl: string;
        readonly LayoutManager: any;
        readonly RealtimeCommunicationService: RealtimeCommunicationService;
        static readonly IsIE10: boolean;
        static readonly RouteTimestamp: number;
        static UpdateRouteTimestamp(): void;
        static readonly IsMobileSafary: boolean;
        readonly CurrentEmployeeId: string;
        initialize(): void;
        GoToDashBoard(refresh?: boolean): void;
        HideLogo(): void;
        ShowLogo(): void;
        ResetSettings(): void;
        private AddBackButtonEventClick(buttonId);
        private isApple();
        private DetectBrowsers();
    }
}
declare namespace WebClient {
    class ApplicationInfo {
        constructor();
    }
}
declare namespace WebClient {
    class CommentVersionDialog {
        private dialog;
        private dialogParams;
        private url;
        private postFormUrl;
        private deleteUrl;
        private callbacks;
        private addCommentsEnabled;
        private onClosedCallback;
        private fileComment;
        private traceProvider;
        constructor();
        FormActionUrl: string;
        DeleteUrl: string;
        AddCommentsEnabled: boolean;
        OnClosedCallback: (dialog: CommentVersionDialog) => void;
        readonly CommentsChanged: boolean;
        private Initialize();
        ShowDialog(item: Element): void;
        ShowDialogEx(isPreview: string, cardId: string, fileCardId: string, timestamp: string, versionId: string, callbacks?: IFileCommentCallbacks): void;
        private SaveButtonEventHandler(dialog);
        private EnableAddComment(enable);
    }
}
declare namespace WebClient {
    enum SignatureItemType {
        MainFileSignaturePartType = 0,
        MainFileWithContentSignaturePartType = 1,
        DocumentFieldsSignaturePartType = 2,
    }
    class Crypto {
        static LabelOIDAttirbute: string;
        static ProviderName: string;
        static ProviderType: string;
        static CAPICOM_CERT_INFO_TYPE_SUBJECT_SIMPLE_NAME: number;
        static CAPICOM_CERT_INFO_TYPE_ISSUER_SIMPLE_NAME: number;
        static CAPICOM_CURRENT_USER_STORE: number;
        static CAPICOM_MY_STORE: string;
        static CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED: number;
        static CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME: number;
        static CAPICOM_CERTIFICATE_FIND_SHA1_HASH: number;
        static CADESCOM_BASE64_TO_BINARY: number;
        static CADESCOM_CADES_BES: number;
        static CADESCOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_NAME: number;
        static CAPICOM_AUTHENTICATED_ATTRIBUTE_DOCUMENT_DESCRIPTION: number;
        static CADESCOM_ATTRIBUTE_OTHER: number;
        private static CertListContainerPrefix;
        private widgetId;
        private widget;
        private certListElement;
        private static async_code_included;
        private static async_Promise;
        private static async_resolve;
        constructor();
        static include_async_code(): void;
        static GetCertificateByThumbprint(thumbprint: any): any;
        static GetCertificateInfoByThumbprint(thumbprint: any): any;
        private static GetCertificateByThumbprint_NPAPI(thumbprint);
        static CheckForPlugIn(): any;
        static SignFilesWithCertificate(encryptedInfo: EncryptedInfo, files: NodeListOf<Element>): Promise<any>;
        static SignFilesWithCertificateEx(encryptedInfo: EncryptedInfo, files: IFileSignInfo[]): Promise<any>;
        static SignData(encryptedInfo: EncryptedInfo, dataToSign: any): any;
        private static Verify(sSignedMessage, dataToVerify);
        static GetCertsList(): Promise<any>;
        private static GetCertsList_NPAPI();
        private static CheckForPlugIn_NPAPI();
        private static GetBlobInBase64(fileId);
        static VerifySign(signHash: any, fileId: any): Promise<{}>;
        static GetPluginInfo(): any;
        static SetPluginInfo_NAPI(): void;
        private static SignData_NPAPI(encryptedInfo, dataToSign);
    }
}
declare namespace WebClient {
    class Dashboard {
        static SaveLastUserFolder(folderId: string, folderName: string): void;
        static RemoveFromLastUserFolder(folderId: string): void;
        private static GetUserSettings();
    }
}
declare namespace WebClient {
    class FileComment {
        private fileCommentContainer;
        private buttonsContainer;
        private errorSpan;
        private url;
        private traceProvider;
        private callbacks;
        private commentsChanged;
        private commentEditArea;
        constructor(root: HTMLElement, buttonsContainer: HTMLElement, headerTitle: string, callbacks?: IFileCommentCallbacks);
        private Init();
        SetPostUrl(value: string): void;
        SetDeleteUrl(value: string): void;
        readonly CommentsChanged: boolean;
        SaveComment(): void;
        private readonly RequestData;
        private readonly TextArea;
        EditMode: boolean;
        private Refresh(requestData);
        private InitItemEventHandlers(container);
        private EditCommentEventHandler(item);
        private GetRemoveData(item);
        private RemoveCommentEventHandler(item, requestData);
        private ScrollToButton();
    }
}
declare namespace WebClient {
    class FilePreview {
        private static PageButtonCssClass;
        private static APagesCssClass;
        private static InputPagesCssClass;
        private static PageViewId;
        private static CommentsContainerCssClass;
        private filePreviewContainer;
        private url;
        private urlPage;
        private pageIndex;
        private pageCount;
        private fileComment;
        private traceProvider;
        constructor(rootId: string, url: string, pageIndex: number, pageCount: number, urlPage?: string);
        Init(): void;
        private addScaleParameterToPageUrl(url);
        private PageButtonEventClick(item);
        private PageLinkEventClick(item);
        private PageInputEventsInit(item);
        private LoadPage();
        private PageViewLoadEventHandler(pageView);
    }
}
declare namespace WebClient {
    class FileSign {
        private static SignAllButton;
        private static SignLogButton;
        private filePanel;
        private crypto;
        private traceProvider;
        private interactionModel;
        constructor(filePanel: Element, interactionModel?: IFileSignInteractionModel);
        private Initialize();
        ShowSignDialog(item: HTMLElement, url: any, requestData: any): void;
        private AddSelectedSignatureRowEventHandler(rows, context);
        private ProcessSigns(dialog);
        private ShowSignLogDialog(item);
        private GetDialogParams(item);
        private ShowDialog(dialogParams, response);
        protected SignData(selectedThumbprint: string, dialog: ModalWindow): Promise<any>;
        private static AttachSign(dialog, encryptedInfo, interactionModel?);
        static ShowSignWarningDialog(okFunction: Function): void;
    }
}
declare namespace WebClient {
    class Folders {
        private LoadedFolderInfo;
        registerFolderInfo(folderId: string, info: IFolderItemNodeData): void;
        unregisterFolderInfo(folderId: string, info: IFolderItemNodeData): void;
        getCachedFolderInfo(folderId: string): IFolderItemNodeData;
        getFolderInfo(folderId: any): JQueryDeferred<IFolderItemNodeData>;
        getCurrentFolderId(): string | undefined;
        static SaveFolderSettings(folderId: any, settingName: any, value: any): void;
        static LoadFolderSetting(folderId: any, settingName: any): any;
    }
}
declare namespace WebClient {
    interface IFileCommentCallbacks {
        beforeAddCallback: (commentText: string) => JQueryDeferred<any>;
        beforeDeleteCallback: (commentId: string) => JQueryDeferred<any>;
        afterAddCallback: (commentText: string) => void;
        afterDeleteCallback: (commentId: string) => void;
    }
}
declare class JQueryDeferred<T> {
    constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
}
declare namespace WebClient {
    interface IModalWindowCreatorOptions {
        withoutAnimation?: boolean;
    }
    class ModalWindow {
        private traceProvider;
        private params;
        private overlay;
        private modal;
        private modalHeader;
        private modalContent;
        private modalOkButton;
        private modalCancelButton;
        private modalCloseButton;
        private buttonsDiv;
        private content;
        private isOpened;
        static lastError: ModalWindow;
        constructor(params: ModalWindowParams);
        readonly IsOpened: boolean;
        readonly ModalElement: HTMLElement;
        readonly ModalContentElement: HTMLElement;
        readonly OkButtonElement: HTMLElement;
        readonly CancelButtonElement: HTMLElement;
        Show(withoutAnimation?: boolean): void;
        Hide(whithCallbacks?: boolean, withoutAnimation?: boolean): void;
        HideOverlay(): void;
        private Initialize();
        private CreateOverlay();
        private CreateModal();
        private CreateModalContent();
        private CreateModalCloseButton();
        private CreateModalHeader();
        private CreateModalButtonsDiv();
        private CreateModalOkButton();
        private CreateModalButton(btn);
        private CreateModalCancelButton();
        private Destroy();
        static ShowErorDialog(message: string, options?: IModalWindowCreatorOptions): ModalWindow;
        static ShowConfirmDialog(message: string, yesButton?: Function, cancelButton?: Function, options?: IModalWindowCreatorOptions): ModalWindow;
        static ShowInformationDialog(message: string, headerText?: string, options?: IModalWindowCreatorOptions): ModalWindow;
        static ShowWarningDialog(message: string, headerText?: string, okButton?: Function, cancelButton?: Function, options?: IModalWindowCreatorOptions): ModalWindow;
    }
}
interface String {
    format: (...codes: any[]) => string;
    contains: (substr: string) => boolean;
}
interface Array<T> {
    equals: (array: any) => boolean;
    containsArrayElement: (element: T) => number;
}
declare function UploadFile(formName: Element, filesContainer: string, onSuccess: Function, onFileAdded: Function, dropZoneId: string): void;
declare function CreateTaskIntervalManager(): TaskIntervalManager;
declare function CreateTaskInterval(): TaskInterval;
declare function CheckForPlugIn_Async(): Promise<any>;
declare function GetCertsList_Async(): any;
declare function GetCertificateByThumbprint_Async(thumbprint: any): any;
declare function SignData_Async(certThumbprint: any, dataToSign: any): any;
declare function Verify_Async(sSignedMessage: any, dataToVerify: any): any;
declare function SetPluginInfo_Async(): void;
declare var cadesplugin: any;
declare var iNoBounce: any;
declare function HackTouch(): any;
declare namespace WebClient {
    class NewCardDialog {
        static AddNewItemEventClick(buttonId: string): void;
        private static GetItemKindsEventClick(button, parentModal);
        private static GetRoute(cardType, href, kindId, folderId, createInFolder, isLayoutAvailable, isTemplate);
    }
}
declare namespace WebClient {
    class NotFoundPage {
        private readonly MIN_IMAGE_HEIGHT;
        render(): HTMLElement;
        protected handleImageVisibility($imageWrapper: JQuery, $image: JQuery): void;
    }
}
declare namespace WebClient {
    class SearchParametrsDialog {
        private static DialogElementId;
        private folderViewRequestViewModel;
        private dialog;
        private dialogParams;
        private url;
        private traceProvider;
        constructor(folderViewRequestViewModel: FolderViewRequestViewModel);
        ShowDialog(): JQueryDeferred<any>;
        private clearBtnClickHandler();
        private afterShowCallback(dialog);
        private SaveParamsInStorage(dialog);
        private LoadParamsFromStorage();
        private GetQueryParameters2(dialog);
        private GetQueryParameters();
    }
}
declare namespace WebClient {
    class SelectCertificateDialog {
        private selectedThumbprint;
        private okButtonFunction;
        private dialogParamsContainer;
        private isSimpleSign;
        private defaultPersonalThumbprint;
        private url;
        private traceProvider;
        constructor(url: string, dialogParamsContainer: HTMLElement);
        ShowDialog(requestData?: any): void;
        readonly SelectedThumbprint: string;
        readonly IsSimpleSign: boolean;
        OkDialogButton: Function;
        ShowSelectCertificateDialog(container: HTMLElement): void;
        private readonly DefaultPersonalThumbprint;
        private GetDialogParams();
        private SetSelectedCertificateDisplayName(element, certificate);
        private SetSingInfoMessage(container, message);
        private FillTableRow(certificate);
        private GetSelectCertificateDialogParams(widget);
        private CheckPersonalCertificate();
        private AddRowHandlers(dialog);
    }
}
declare namespace WebClient {
    class ServerErrorPage {
        errorMessage: string;
        private readonly MIN_IMAGE_HEIGHT;
        constructor(errorMessage?: string);
        getFilteredErrorMessage(): string;
        render(): HTMLElement;
        protected handleImageVisibility($imageWrapper: JQuery, $image: JQuery): void;
    }
}
declare module WebClient {
    class TraceProvider {
        private static GetTraceSetting();
        static Enabled: boolean;
        private static traceObjects;
        private GetLoggableFunction(func, name);
        AddToTrace(namespaceObject: any): void;
        private static GetClassName(obj);
    }
}
declare namespace WebClient {
    class TrackCardChanges {
        private webClientHub;
        private traceProvider;
        constructor();
        Initialize(): void;
        GetLinkedCardIds(): Array<string>;
        GetMainCardId(): string;
        RefreshPage(): void;
        GetCurrentEmployee(): string;
    }
}
declare namespace WebClient {
    class UserMenu {
        private userMenu;
        private userMenuButton;
        private aboutButtons;
        private exitButtons;
        private traceProvider;
        private hideHandler;
        constructor();
        Show(): void;
        UserModal: ModalWindow;
        private Initialize();
        private CloseMenu();
        private onRouteChanges();
        private AddUserMenuButtonEventClick();
        private AddAboutButtonEventClick();
        private AddExitButtonEventClick();
        private AddSidebarUserMenuEventClick();
    }
}
declare namespace WebClient {
    interface IFoldersToCountData {
        folders: IFolderToCount[];
    }
    interface IFolderToCount {
        id: string;
        sourceId: string;
        forceVirtualFolderSearch?: boolean;
        refreshTimeout: number;
    }
}
declare namespace WebClient {
    interface IFolderToCountOptions {
        forceVirtualFolderSearch?: boolean;
        refreshTimeout: number;
    }
}
declare namespace WebClient {
    interface ILocalCounter {
        localCount?: number;
        localCountTimestamp?: number;
    }
    interface ILocalCounterData {
        folderId: string;
        counter: ILocalCounter;
    }
}
declare namespace WebClient {
    type IUnreadCountersData = {
        [folderId: string]: IUnreadCounter;
    };
    interface IUnreadCounter extends ILocalCounter {
        count: number;
        timestamp?: number;
    }
}
declare namespace WebClient {
    class UnreadCounter {
        private updateTimeout;
        private realtimeCommunicationService;
        private globalTabsFolders;
        private sessionStorageKey;
        private foldersToCountData;
        private foldersToCountChangedEvent;
        private unreadCountersData;
        private unreadCountersDataChangedEvent;
        private static CurrentUnreadCountersMessage;
        private static RequestCurrentCountersMessage;
        private static SendLocalCountsMessage;
        constructor(realtimeCommunicationService: RealtimeCommunicationService);
        foldersToCount: IFoldersToCountData;
        readonly foldersToCountChanged: IBasicEvent<IFoldersToCountData>;
        addFolderToCount(folderId: string, sourceId: string, options: IFolderToCountOptions): void;
        removeFolderToCount(folderId: string, sourceId: string): void;
        unreadCardCounters: IUnreadCountersData;
        readonly unreadCardCountersChanged: IBasicEvent<IUnreadCountersData>;
        setLocalCount(folderId: string, value: number, timestamp?: number, shouldNotify?: boolean): void;
        protected onUpdateLocalCounts: (message: IRealTimeCommunicationMessage<ILocalCounterData>) => void;
        incrementLocalCount(folderId: string, timestamp?: number, shouldNotify?: boolean): void;
        decrementLocalCount(folderId: string, timestamp?: number, shouldNotify?: boolean): void;
        getUnreadCardsCount(folderId: string): number | undefined;
        protected Initialize(): void;
        protected readonly serverResponseMessage: string;
        protected onFoldersToCountChanged(): void;
        protected sendCurrentCountersToOtherTab: (messageItem: IRealTimeCommunicationMessage<string>) => void;
        protected onReceivedCurrentCounters: (message: IRealTimeCommunicationMessage<IUnreadCountersData>) => void;
        protected onConnected: (message: IRealTimeCommunicationMessage<any>) => void;
        protected sendFoldersToService(): void;
        protected sendFoldersToServer: (message: IRealTimeCommunicationMessage<any>, hub: IRealtimeCommunicationHub) => void;
        protected processResponse: (response: IRealTimeCommunicationMessage<UnreadCountersResponse>) => void;
        protected getCurrentEmployee(): string;
    }
    class UnreadCountersRequest {
        EmployeeId: string;
        RealtimeSessionId: string;
        PartialRequest: boolean;
        ClientFolders: Array<IUnreadCountersFolderInfo>;
    }
    class UnreadCountersResponse {
        EmployeeId: string;
        RealtimeSessionId: string;
        ClientFolders: Array<ClientFolderCounter>;
    }
    class ClientFolderCounter {
        FolderId: string;
        Counter?: number;
        ForceVirtualFolderSearch?: boolean;
    }
    class IUnreadCountersFolderInfo {
        FolderId: string;
        ForceVirtualFolderSearch?: boolean;
        RefreshTimeout: number;
    }
}
declare namespace WebClient {
    class UnreadCounterRouteHandler implements IRouteHandler<IFolderRouteData> {
        protected currentFolderCounter: IUnreadCounter;
        protected currentFolderId: string;
        protected popupNotification: Noty;
        name: string;
        mountRoute(data: IFolderRouteData, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: IFolderRouteData, routeType: RouteType): JQueryDeferred<{}>;
        protected onUnreadCountersChanged: () => void;
    }
}
declare namespace WebClient {
    class SearchPanel {
        private isNotOpened;
        private fullTextSearchEnabled;
        private dropdown;
        private isMobile;
        private timer;
        private traceProvider;
        private hidden;
        private prevNavBarMode;
        private searchText;
        constructor();
        ShouldResetInstanceBeforeSearch: boolean;
        DeviceType: DeviceType;
        readonly IsDashboard: boolean;
        readonly IsSearchResults: boolean;
        readonly Dropdown: SearchDropdown;
        readonly IsNotOpened: boolean;
        readonly FullTextSearchEnabled: boolean;
        Hide(): void;
        Expand(): void;
        Show(): void;
        SearchText: string;
        SearchTextFromInput: string;
        Search(refresh?: boolean): void;
        Reset(): void;
        Clear(): void;
        Rebuild(): void;
        private OnExpaned();
        private OnClosed();
        private readonly SearchButton;
        readonly SearchInput: HTMLElement;
        readonly SearchTextInput: HTMLInputElement;
        private readonly SearchClearButton;
        private Initialize();
        private onSearchAreaSelected(oldVal, newVal);
        private AddSearchInputClickEvent();
        private AddSearchInputMissClickEvent();
        private AddSearchButtonClickEvent();
        private readonly Expanded;
        private Toggle();
        private UpdateCaption();
        private AddClearButtonClickEvent();
        private AddOnTextInputEvent();
        private ToggleClearButton();
        private CheckFullTextSearchAvailability();
    }
}
declare namespace WebClient {
    class SearchPanelRouteHandler implements IRouteHandler<any> {
        name: string;
        prepareRouteDataLoad(routeData: any, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        mountRoute(data: any, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
    }
}
declare namespace WebClient {
    interface IRouteHandler<T> {
        name: string;
        prepareRouteDataLoad?(routeData: Partial<T>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        loadRouteData?(routeData: Partial<T>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        prepareRouteMount?(routeData: T, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        mountRoute?(data: T, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute?(data: T, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    interface IRouteInfo<T> {
        routeType: RouteType;
        identity: string;
        data: T;
    }
}
declare namespace WebClient {
    interface IRouteTypeMapper<T> {
        hashPattern: string;
        resolve(path: string, parameters: {
            [id: string]: string;
        }): JQueryDeferred<IRouteInfo<T>>;
        tryGetUrl(route: IRouteInfo<T>): string | undefined;
    }
}
declare namespace WebClient {
    enum RouteHandleResults {
        MissingRequiredData = 0,
        Done = 1,
    }
    type RouteHandleResult = RouteHandleResults | void;
}
declare namespace WebClient {
    class RouteHelpers {
        static makeHashPattern(path: string, parameters: string[]): string;
        static makeUrlFromHashPattern(hashPattern: string, parameters: {
            name: string;
            value: string;
        }[], queryParameters?: {
            name: string;
            value: string;
        }[]): string;
        static someIsUndefined(...args: any[]): boolean;
        static assignIfUndefined<SourceT, TargetT>(target: TargetT, map?: [{
            value: FieldSpec<SourceT, any>;
            field: FieldSpec<TargetT, any>;
        }]): void;
        static makeIdentity(...values: any[]): string;
    }
}
declare namespace WebClient {
    class IncomingLocalStorageCommunicationChanel {
        protected localStorageKey: string;
        protected chanelType: string;
        protected chanelId: string;
        protected receivedMessages: IRealTimeCommunicationMessage<any>[];
        protected _tabId: string;
        protected subscribers: {
            [messageType: string]: RealtimeSubsriber<any>[];
        };
        protected subscribersToAll: RealtimeSubsriber<any>[];
        protected serverMessageSubscribers: {
            [messageType: string]: RealtimeSubsriber<any>[];
        };
        protected lastMessage: Date;
        constructor(type: string, id: string, tabId: string, userId: string);
        readonly tabId: string;
        enableStorageMonitoring(): void;
        disableStorageMonitoring(): void;
        readonly type: string;
        readonly id: string;
        subscribe<T>(messageType: string, callback: RealtimeSubsriber<T>): void;
        unsubscribe<T>(messageType: string, callback: RealtimeSubsriber<T>): void;
        subscribeToAll<T>(callback: RealtimeSubsriber<T>): void;
        unsubscribeFromAll<T>(callback: RealtimeSubsriber<T>): void;
        subscribeToServerMessages<T>(messageType: string, callback: RealtimeSubsriber<T>): void;
        unsubscribeFromServerMessages<T>(messageType: string, callback: RealtimeSubsriber<T>): void;
        processMessage<T>(item: IRealTimeCommunicationMessage<T>): void;
        lastActivity: Date;
        dispose(): void;
        removeStorageItem(): void;
        protected onStorageChanged: () => void;
        protected processIncomingMessage<T>(received: IRealTimeCommunicationMessage<T>): void;
        protected onReceivedMessage<T>(item: IRealTimeCommunicationMessage<T>, forServer: boolean): void;
        protected getQueue(): IRealTimeCommunicationMessage<any>[];
    }
}
declare namespace WebClient {
    interface IRealtimeCommunicationHub {
        client: IRealtimeCommunicationHubClient;
        server: IRealtimeCommunicationHubServer;
    }
    interface IRealtimeCommunicationHubServer {
        register(userId: string, sessionId: string): any;
        sendMessage(message: IRealTimeCommunicationMessage<string>): any;
    }
    interface IRealtimeCommunicationHubClient {
        sendMessage<T>(message: IRealTimeCommunicationMessage<T>): any;
    }
}
declare namespace WebClient {
    interface IRealTimeCommunicationMessage<T> {
        Data?: T;
        MessageType: string;
        MessageId?: string;
        TargetTabs?: string[];
        TargetServer?: boolean;
        SenderTab?: string;
        Timestamp?: Date;
    }
}
declare namespace WebClient {
    class OutcomingLocalStorageCommunicationChanel {
        protected localStorageKey: string;
        protected tabId: string;
        protected maxMessageLife: number;
        protected pingTimer: any;
        protected relatedIncoming: IncomingLocalStorageCommunicationChanel;
        constructor(type: string, id: string, tabId: string, userId: string);
        sendMessage<T>(message: IRealTimeCommunicationMessage<T>, sync?: boolean): void;
        startPing(intervalMs: number): void;
        stopPing(): void;
        dublicateMessagesTo: IncomingLocalStorageCommunicationChanel;
        removeStorageItem(): void;
        protected setQueue(data: IRealTimeCommunicationMessage<any>[]): void;
        protected getQueue(): IRealTimeCommunicationMessage<any>[];
    }
}
declare namespace WebClient {
    interface IRealtimeMasterTabInfo {
        masterTabId?: string;
        connectionId?: string;
        masterLastSeen?: Date;
        tabs: string[];
    }
    interface IReceivedRealtimeMessageQueueItem {
        message: IRealTimeCommunicationMessage<any>;
        receivedTime: Date;
        targetTabs?: string[];
    }
    interface ISendRealtimeMessageQueueItem {
        message: IRealTimeCommunicationMessage<any>;
        senderTabId: string;
    }
    interface ITabClosedData {
        isMaster: boolean;
        tabId: string;
    }
    type RealtimeSubsriber<T> = (message: IRealTimeCommunicationMessage<T>, receivedTime?: Date) => void;
    type RealtimeServerSender<T> = (messageItem: IRealTimeCommunicationMessage<T>, hub?: IRealtimeCommunicationHub) => void;
    class RealtimeCommunicationService {
        private userId;
        private static MasterChanelType;
        private static TabChanelType;
        private static RegisterTabChanel;
        private static RegisterTabMessage;
        private static TabRegisteredMessage;
        private static TabUnregisteredMessage;
        static ConnectedMessage: string;
        static DisconnectedMessage: string;
        static ReconnectTimeout: number;
        static TabClosed: string;
        private mainLocalStorageKey;
        private messagesFromMaster;
        private messagesFromTabs;
        private messagesToMaster;
        private masterBroadcast;
        private registerTabChanel;
        private customSenders;
        private tabId;
        private masterTabMonitorTimer;
        private masterTabMonitorInterval;
        private tabChanelTimeToDead;
        private hub;
        private lastMasterTabId;
        private registeredAsSlave;
        private isClosing;
        private reconnectTimeout;
        constructor(userId: string);
        readonly sessionId: string;
        sendToServer<T>(message: IRealTimeCommunicationMessage<T>): void;
        sendBetweenTabs<T>(message: IRealTimeCommunicationMessage<T>, targetTabs?: string[], sync?: boolean): void;
        sendToTab<T>(tabId: string, message: IRealTimeCommunicationMessage<T>): void;
        sendToMasterTab<T>(message: IRealTimeCommunicationMessage<T>): void;
        subscribe<T>(messageType: string, callback: RealtimeSubsriber<T>): void;
        unsubscribe<T>(messageType: string, callback: RealtimeSubsriber<T>): void;
        setServerSender(messageType: string, processor: RealtimeServerSender<any>): void;
        getServerSender(messageType: string): RealtimeServerSender<any>;
        initialized(): boolean;
        readonly isMasterTab: boolean;
        readonly currentTabId: string;
        readonly masterTabId: string;
        protected onMonitorMasterTabTimerTick: () => void;
        protected onInitializeSlaveTab(info: IRealtimeMasterTabInfo): void;
        protected onRegisteredAsSlave: (message: IRealTimeCommunicationMessage<string>) => void;
        protected onUnregisteredAsSlave: (message: IRealTimeCommunicationMessage<string>) => void;
        protected onInitializeMasterTab(info: IRealtimeMasterTabInfo): void;
        protected ensureDeinitializedMaster(): void;
        protected onHubMessage: (message: IRealTimeCommunicationMessage<any>) => void;
        protected onMessageToServer: (message: IRealTimeCommunicationMessage<any>) => void;
        protected onMessageToTabs(item: IRealTimeCommunicationMessage<any>, sync?: boolean): void;
        protected onTabOpened: (message: IRealTimeCommunicationMessage<string>) => void;
        protected onCurrentTabClose: () => void;
        protected onTabClose: (message: IRealTimeCommunicationMessage<ITabClosedData>) => void;
        protected closeChanelFromTab(tabId: string): void;
        protected openChanelFromTab(tabId: string): void;
        protected getMasterTabInfo(): IRealtimeMasterTabInfo;
        protected setMasterTabInfo(data: IRealtimeMasterTabInfo): void;
        protected getCurrentEmployee(): string;
        static readonly EnableSignalRLogging: boolean;
        static log(msg: string): void;
        static logMessage(caption: string, message: IRealTimeCommunicationMessage<any>): void;
    }
}
declare namespace WebClient {
    class NavBar {
        private TabsMobileContainerId;
        private NavBarId;
        private NavBarButtonsId;
        private mode;
        private modeLock;
        SetMode(navBarMode: NavBarMode): void;
        GetMode(): NavBarMode;
        readonly ModeLocked: string;
        LockMode(lockComment: string): void;
        ReleaseModeLock(): void;
        AddMobileTabs(tabsElement: HTMLElement): void;
        HideBackButton(): void;
        ShowBackButton(): void;
        OnDashboardLoad(): void;
        OnGoToRoute(): void;
    }
}
declare namespace WebClient {
    enum NavBarMode {
        NavButtons = 0,
        SearchMobile = 1,
        TabsMobile = 2,
        SelectView = 3,
    }
}
declare namespace WebClient {
    class NavBarRouteHandler implements IRouteHandler<any> {
        name: string;
        mountRoute?(data: any, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
    }
}
declare namespace WebClient {
    class HeaderRouteHandler implements IRouteHandler<any> {
        name: string;
        mountRoute?(data: any, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
    }
}
declare namespace WebClient {
    enum ColumnType {
        Int = 0,
        String = 1,
        Double = 2,
        DateTime = 3,
        Image = 4,
        Boolean = 5,
        Html = 6,
    }
}
declare namespace WebClient {
    enum FormFactor {
        Desktop = 1,
        Mobile = 2,
    }
}
declare namespace WebClient {
    class GridOptions {
        tableClass: string;
        wrapRow: boolean;
        currentPage: number;
        enablePaging: boolean;
        enableSorting: boolean;
        enableGrouping: boolean;
        enableFiltering: boolean;
        enableItemDetails: boolean;
        enableMobileFormat: boolean;
        isMobileFormat: boolean;
        currentMobilePage: number;
        urlGetItemsList: string;
        cardSourceId: string;
        folderId: string;
        searchFilter: string;
        filter: any;
        folderHeader: string;
        dataLoader: (requestData: any, isMobile: boolean) => JQueryDeferred<any>;
    }
}
declare namespace WebClient {
    interface IGridHtmlBuilder {
        getModel: () => any;
        refreshed: SimpleEvent<void>;
        modelChanged: SimpleEvent<any>;
        buildTableBody(options: GridOptions, tableBodyContainer: HTMLElement, callback?: (model: any) => void): void;
        buildTableHeader(options: GridOptions, tableHeaderContainer: HTMLElement, callback?: (model: any) => void): void;
        buildGridFooter(options: GridOptions, gridFooterContainer: HTMLElement, callback?: (model: any) => void): void;
        buildFilters(options: GridOptions): void;
        buildMobileGrid(options: GridOptions, rootElement: HTMLElement): void;
        applyGridFilter(): void;
        buildHeader(options: GridOptions, targetElement: HTMLElement, rootElement: HTMLElement): any;
        getChanges(): Promise<any>;
        showUpdateRequest(show: boolean): any;
    }
}
declare namespace WebClient {
    class MainCardGridHtmlBuilder implements IGridHtmlBuilder {
        private folderId;
        private viewId;
        private allowRowResize;
        private pageSize;
        private dateMinWidth;
        private tableHeaderContainer;
        private tableBodyContainer;
        private gridFooterContainer;
        private mobileGridContainer;
        private refreshButton;
        private loader;
        private rootElement;
        private options;
        private selectedCards;
        private colspanValue;
        private groupColumnList;
        private employeeId;
        private cardShowLink;
        private popupNotification;
        getModel: () => any;
        refreshed: SimpleEvent<void>;
        modelChanged: SimpleEvent<any>;
        filters: any;
        static RowDefaultHeight: string;
        static DefaultForeColor: string;
        static DefaultBackColor: string;
        private traceProvider;
        constructor(filters: any);
        buildMobileGrid(options: GridOptions, rootElement: HTMLElement): void;
        getCurrentPage(): number | null;
        private AddDisclosureEvent(arrow, content);
        private AddShowCardMobileEvent(rowEl);
        private destroyMobileGrid();
        private destroyGrid();
        private buildMobilePaging();
        private destroyMobilePaging();
        private AddLoadMoreClick(element);
        private AddPage(model);
        buildTableHeader(options: GridOptions, tableHeaderContainer: HTMLElement, callback?: (model: any) => void): void;
        private removeLoader();
        private addLoader();
        buildTableBody(options: GridOptions, tableBodyContainer: HTMLElement, callback?: (model: any) => void): void;
        buildHeader(options: GridOptions, targetElement: HTMLElement, rootElement: HTMLElement): void;
        private buildSwitcher(compact, wrap, model, rootElement);
        buildGridFooter(options: GridOptions, gridFooterContainer: HTMLElement, callback?: (model: any) => void): void;
        static destroyFilters(): void;
        buildFilters(options: GridOptions): void;
        private checkExternalClick(e);
        private updateFilters(element, title);
        applyGridFilter(): void;
        private getDateMinWidth();
        private initHeaderCell(cell);
        private getDataFromServer(params, callback, isMobile?);
        private desktopCallback;
        private getSelectedFiltersData();
        private getValueByKey(gridItem, key, itemType?);
        private getSortedModel(model, sortingColumnName, isDescending, columnType?);
        private divide(values, groupingColumnName, columnType);
        private getGroups(group, columnNames, columns, level?);
        private buildGroupingBody(body, groups, colspanValue, visibleStringGroupIDs?, groupId?, groupLevelIndent?, groupNamesChain?, isOpen?, groupStorage?);
        private initGroupingElement(element);
        private dotDotDotInit();
        private updateHtmlRowReadStatus(itemID, setRead);
        private iniItemSelector(element, itemID);
        private buildPageNavigator(pageCount, currentPage, itemCount);
        private initPageLink(element);
        private activateOneStep(element, isNext);
        private activateCounter(element, pageCount);
        private getPageData(pageNumber, instanceId, model, cb);
        private getPage(pageNumber, refresh?);
        getChanges(): Promise<any>;
        private getSortingColumn();
        private saveGridState();
        private onRefresh();
        showUpdateRequest(show?: boolean): void;
        private initRowClick(cardID, element);
    }
}
declare namespace WebClient {
    class FolderViews {
        private selectViewBtnId;
        private viewsContainerId;
        private selectViewListId;
        private folderId;
        private viewSourceId;
        private searchId;
        private currentViewId;
        private currentViewName;
        private views;
        private viewFolderId;
        private isListOpened;
        private traceProvider;
        private readonly SelectViewBtn;
        private readonly SelectViewList;
        private readonly SelectViewContainer;
        constructor(viewsContainerId: string, selectViewsBtnId: string, selectViewListId: string);
        readonly HasViews: boolean;
        Build(folderId: string, viewSourceId: string, searchId: string, currentViewId?: string, currentViewName?: string): void;
        Destroy(): void;
        private Initialize();
        private BuildViewsList();
        private static GetViewsListForFolder(folderId);
        private SetCurrentView(currentView);
        private selectView(element);
        private checkExternalClick(e);
    }
}
declare namespace WebClient {
    class FolderViewHandler implements IRouteHandler<any> {
        name: string;
        mountRoute(data: any, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: any, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    type BasicApiEvent<T> = string | IBasicEvent<T> | BasicEventHandler<T>;
    type CancelableApiEvent<T> = string | ICancelableEvent<T> | CancelableEventHandler<T>;
}
declare namespace WebClient {
    class CancelableEvent<T> extends BasicEvent<ICancelableEventArgs<T>> {
        private deferred;
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
        readonly deferred: JQueryDeferred<T>;
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
    class AgreementSidebar {
        private static TemplateContentClassName;
        private static AgreementBtnClassName;
        private static CancelBtnClassName;
        private static TemplateSelectClassName;
        private traceProvider;
        private callbacks;
        private agreementStarted;
        SelectingCallbackFunc: (employeeData: IEmployeeItemData) => JQueryDeferred<any>;
        SelectedCallbackFunc: (employeeData: IEmployeeItemData) => void;
        DeletingCallbackFunc: (employeeId: string) => JQueryDeferred<any>;
        DeletedCallbackFunc: (employeeId: string) => void;
        private static SecondStepId;
        private static TemplateSpanId;
        private static SubmitBtnId;
        private rootElement;
        private agreementBtn;
        private templateSelect;
        private templateSpan;
        private sidebarElement;
        private templateContent;
        private submitBtn;
        private sidebar;
        private readonly SelectedTemplate;
        constructor(root: HTMLElement, callbacks?: IAgreementSidebarCallbacks);
        OpenSidebar(): void;
        private Init();
        private LoadTemplateContent();
        private ShowCreateBtn();
        private ParseAgreementParams(formData);
        private SubmitForm();
        private ValidateControls();
    }
}
declare namespace WebClient {
    class DocumentPanel {
        private static FileSettingsCssClass;
        private static FileLinkCssClass;
        private static FileDocumentLinkCssClass;
        private static DocumentUnLinkCssClass;
        private static FileIconCssClass;
        private static AdditionalFileCssClass;
        private static FileOperationCssClass;
        private static VersionCommentCssClass;
        private documentPanel;
        private currentSettings;
        private traceProvider;
        constructor(documentPanelId: string);
        private Initialize();
        private readonly GetDocumentItems;
        private FileOperationWithoutDialog(item);
        private AddFileCommentEventHandler(item);
        private SettingEventHandler(documentItem);
        private DetachDocumentFromTask(documentItem);
        private ShowFileSettingsEventClick(item);
        private ShowFileSettings(item, show?);
        private WrapperEventHandler();
        private SuppressEvents(e);
        private PreviewFileEventHandler(item);
        private FileDocumentEventHandler(item);
    }
}
declare namespace WebClient {
    class FilePanel {
        private static FileVersionCssClass;
        private static FileSettingsCssClass;
        private static CommandExpandCssClass;
        private static CommandBarCssClass;
        private static FileDeleteOperationCssClass;
        private static FileOperationCssClass;
        private static FileLinkCssClass;
        private static VersionCommentCssClass;
        private static FileOpenCssClass;
        private fileSign;
        private filePanel;
        private selectedElement;
        private currentCommandBar;
        private currentSettings;
        private traceProvider;
        constructor(filePanelId: string);
        private Initialize();
        private PreviewFileEventHandler(item);
        private VersionEventHandler(fileItem);
        private SettingEventHandler(fileItem);
        private ToggleCommandBar(selectedCommandBar?);
        private ClearAllAnimation(commands);
        private CommandExpandEventHandler(item);
        private readonly GetFileItems;
        private SelectEventClick(item);
        private ShowVersions(item, show?);
        private RestoreVersionsExpandedInfo();
        private StoreVersionsExpandedInfo(item, show, append);
        private ResetVersionsExpandedInfo();
        private GetVersionsExpandedInfo();
        private SaveVersionsExpandedInfo(data);
        private GetLocalStorageId();
        private ShowFileSettingsEventClick(item);
        private ShowFileSettings(item, show?);
        private DeleteFileEventHandler(item);
        private FileOperationWithoutDialog(item);
        private AddFileCommentEventHandler(item);
        private WrapperEventHandler();
        private OpenEventHandler(item);
        private SuppressEvents(e);
    }
}
declare namespace WebClient {
    class FolderTree {
        static DefaultContainerClassName: string;
        protected TreeContainerClassName: string;
        protected url: string;
        protected ExpandFolderFunction: Function;
        protected OpenFolderFunction: Function;
        protected AfterFolderSelect: Function;
        protected ExludeSearchParamFoldes: boolean;
        private lastSelectedFolder;
        constructor();
        protected SelectTreeFolder(element: HTMLElement, expand: boolean): void;
        protected UnselectTreeFolder(element: HTMLElement): void;
        protected TreeFolderSelected(element: HTMLElement): Boolean;
        protected ExpandFolder(element: HTMLElement): void;
        protected LoadData(requestData: any, callback: Function): void;
        protected ClearSelectedFolders(): void;
        protected GetSelectedFolders(): NodeListOf<Element>;
        protected GetAllVisibleFolders(): NodeListOf<Element>;
        protected AddExpandFolderButtonEventClick(elements: NodeListOf<Element>): void;
        protected AddOpenFolderButtonEventClick(elements: NodeListOf<Element>): void;
    }
}
declare namespace WebClient {
    interface IAgreementSidebarCallbacks {
        approvingPathChanging: (newAgreementTemplateId: string, newAgreementTemplateDisplayName: string) => JQueryDeferred<any>;
        approverAdding: (selectingEmployeeData: IEmployeeItemData) => JQueryDeferred<any>;
        approverDeleting: (deletingEmployeeId: string) => JQueryDeferred<any>;
        approvingStartCancelling: () => JQueryDeferred<any>;
        approvingStarting: (params: IAgreementParams) => JQueryDeferred<any>;
        approvingPanelOpening: () => JQueryDeferred<any>;
        approvingPathChanged: (agreementTemplateId: string, agreementTemplateDisplayName: string) => void;
        approverAdded: (addedEmployeeId: IEmployeeItemData) => void;
        approverDeleted: (deletedEmployeeId: string) => void;
        approvingStartCancelled: () => void;
        approvingPanelOpened: () => void;
    }
}
declare namespace WebClient {
    class LinkControl {
        private linkControl;
        private static DeleteLinkCssClass;
        private static AddExistingCardCssClass;
        private static AddNewFileCssClass;
        private static AddNewCardCssClass;
        private static SelectCardDlgClass;
        private static SelectCardDlgWidth;
        private static FileLinkCssClass;
        private cardId;
        private isReportMode;
        private selectCardModal;
        private traceProvider;
        BeforeAddNewCardFunc: Function;
        BeforeAddExistedCardFunc: Function;
        static CommandExpandCssClass: string;
        constructor(rootElementId: string);
        IsReportMode: boolean;
        AddFileLink(documentIds: any): void;
        private Init();
        private InitAttachFileLink();
        private CommandAddExistingCard(item);
        private CommandAddNewCard(item);
        protected GetLayoutCardCreateLink(cardId: string, timestamp: string, cardTypeId: string, kindId: string): string;
        private AttachLink(url, formData, onSuccess);
        private CommandDeleteLink(item);
        private DeleteLink(url);
        private RefreshLinks(response?);
        private CommandExpandEventHandler(item);
        private PreviewFileEventHandler(item);
    }
    class FolderTreeElement extends FolderTree {
        constructor();
        AfterOpenFolderFunction: Function;
        private AddOpenOverride(elements);
        LoadTreeToContainer(container: HTMLElement): void;
    }
}
declare namespace WebClient {
    class RightSidebar {
        rootElement: HTMLElement;
        private closeButton;
        private content;
        private overlay;
        private useOverlay;
        private destroyOnClose;
        private title;
        private onCloseCallback;
        private onClosingCallback;
        constructor(title?: string);
        OnCloseCallback: Function;
        OnClosingCallback: () => JQueryDeferred<any>;
        UseOverlay: boolean;
        DestroyOnClose: boolean;
        Content: string;
        readonly IsOpened: boolean;
        AppendToContent(element: HTMLElement): void;
        SetClassName(className: string): void;
        Open(callback?: Function): void;
        Close(): void;
        private Initialize();
    }
}
declare namespace WebClient {
    class SearchDropdown {
        private dropdown;
        private optionList;
        private options;
        private selectedText;
        private selectedElement;
        private selectedValue;
        private callback;
        private DROP_DOWN_ICO;
        constructor(dropdown: HTMLElement, callback: (oldVal?: SearchContextOption, newVal?: SearchContextOption) => void);
        UpdateDropDownVisibility(): void;
        ShowOptions(selectedOption: string, displayOptions?: Array<SearchContextOption>): void;
        Hide(): void;
        readonly SearchContext: string;
        readonly Element: HTMLElement;
        private Initialize();
        Show(): void;
        private AddDropdownMissClickEvent();
        private AddDropdownClickEvent();
        private AddOptionListClickEvent();
        private UpdateSelectedOption();
    }
}
declare namespace WebClient {
    class SelectCardLinkDialog {
        private selectCardModal;
        private container;
        private searchInput;
        private sourceCardId;
        private selectedFolder;
        private loader;
        private nextPageLoader;
        private cardsScrollContainer;
        private cardsTableItemsContainer;
        private allowedCardTypesField;
        private wrapRows;
        private sortingColumnName;
        private sortDescending;
        private searchMode;
        private currentPageNumber;
        private lastQueryTimestamp;
        private columnHeaders;
        private modalClosed;
        private requestFinished;
        constructor();
        private readonly firstPage;
        allowedCardTypes: string[];
        ShowDialog(sourceCardId: string, allowedLinkTypes: string[], okCallback: (window: ModalWindow) => void, shownCallback?: (window: ModalWindow) => void, closingCallback?: () => JQueryDeferred<any>, closeCallback?: () => void): void;
        private InitDialog();
        private UpdateShortcuts(resetPageIndex);
        private InitCardRow(item);
        private ButtonOkEnabled;
        private LoadFolder(folder, resetPageIndex);
        private LoadSearch(resetPageIndex);
        private GetServerResults(folderRoot);
        private LoaderLogic();
        private GetResultsFromServer(data);
        private ClearCardsTableItems();
        private SetSorting(colName, descending, loadRows?);
        private SetRowWrapMode(wrap, compactRowsSwitch, wrapRowsSwitch);
        private OnSearchInputKeyDown(ev);
        private onCardsScroll(ev);
    }
}
declare namespace WebClient {
    class SelectFolderModalDialog extends FolderTree {
        private static DialogContainerClassName;
        private onClose;
        private dialog;
        constructor(onClose?: (folders: string[]) => void);
        ShowDialog(): void;
        private AttachFolder();
        protected ClearSelectedFolders(): void;
    }
}
declare namespace WebClient {
    type DocumentKindSelectedCallback = (window: ModalWindow, cardTypeId: string, kindId: string) => void;
    class SelectNewDocumentDialog {
        private createDocumentModal;
        private container;
        private selectedNode;
        private dialogOkButton;
        private ExpadedToggleMarkerClass;
        private CollapsedToggleMarkerClass;
        constructor();
        readonly SelectedKindId: string;
        readonly SelectedCardTypeId: string;
        ShowDialog(title: string, okCallback: DocumentKindSelectedCallback, shownCallback?: (window: ModalWindow) => void): void;
        private InitDialog();
        private onOkButtonClick(callback);
        private selectNode(node);
    }
}
declare namespace WebClient {
    class SelectUserFolderModalDialog extends FolderTree {
        private dialog;
        private rootElement;
        private input;
        private button;
        private clearBtn;
        constructor(element: HTMLElement);
        private Initialize();
        ShowDialog(): void;
        private SelectFolder();
        private UpdateFolder();
        private AddExpandOverride(elements);
        private AddOpenOverride(elements);
        private AddShowDialogButtonEventClick();
        private AddClearButtonEventClick();
    }
}
declare namespace WebClient {
    interface IAgreementParams {
        agreementTemplateId: string;
        stages: AgreementStageModel[];
    }
}
declare namespace WebClient {
    interface IAgreementStage {
        stageId: string;
        fieldId: string;
        participants: string[];
    }
}
declare namespace WebClient {
    interface IControl {
        rootElement: HTMLElement;
        ID(value?: string): string;
        isInit: boolean;
        Init(onComplete?: () => void): void;
        Destroy(): void;
    }
}
declare namespace WebClient {
    interface IEmployeeItemData {
        Id: string;
        FullName: string;
        FirstName: string;
        MiddleName: string;
        LastName: string;
        IsMyself: boolean;
        Position: string;
    }
}
declare namespace WebClient {
    interface ILabelControl extends IControl {
        Text(value?: string): string;
        HTML(value?: string): string;
    }
}
declare namespace WebClient {
    interface ILabelTextareaControl extends IControl {
        Label: ILabelControl;
        Textarea: ITextareaControl;
    }
}
declare namespace WebClient {
    interface ILabelTextControl extends IControl {
        Label: ILabelControl;
        Text: ITextControl;
    }
}
declare namespace WebClient {
    interface ITextareaControl extends IControl {
        OnTextChange: Function;
        OnKeyPress: Function;
        Text(value?: string): string;
    }
}
declare namespace WebClient {
    interface ITextControl extends IControl {
        OnTextChange: Function;
        Text(value?: string): string;
    }
}
declare namespace WebClient {
    class AutoCompleteItem {
        constructor(label: string, value: string, isFav: boolean, data: IEmployeeItemData);
        label: string;
        value: string;
        isFavorite: boolean;
        data: IEmployeeItemData;
    }
}
declare namespace WebClient {
    class Control implements IControl {
        rootElement: HTMLElement;
        isInit: boolean;
        ID(value?: string): string;
        constructor(root: HTMLElement);
        Init(onComplete?: () => void): void;
        Destroy(): void;
    }
}
declare namespace WebClient {
    class BooleanControl extends Control {
        selectElement: HTMLSelectElement;
        constructor(root: HTMLElement, value?: boolean);
        Value(value?: boolean): string;
        Init(onComplete?: () => void): void;
        OnValueChange: Function;
    }
}
declare namespace WebClient {
    class ControlFactory {
        static CreateTextControl(root: HTMLElement, value?: string): any;
        static CreateLabelTextareaControl(root: HTMLElement, labelText?: string, textValue?: string): any;
        static CreateLabelTextControl(root: HTMLElement, labelText?: string, textValue?: string): any;
        static CreateRadioListControl(root: HTMLElement, selectedValue?: string): any;
        static CreateHiddenControl(root: HTMLElement, value?: string): any;
        static CreateBooleanControl(root: HTMLElement, value?: boolean): any;
        static CreateNumericControl(root: HTMLElement, value?: string): any;
        static CreateDatepickerControl(root: HTMLElement, time: string, minDate?: Date, maxDate?: Date): DatepickerControl;
        static CreateSelectControl(root: HTMLElement, value: string): any;
        static CreateDecisionControl(root: HTMLElement): any;
        static CreateDropdownControl(root: HTMLElement, disabled?: string): WebClient.DropdownControl;
        static CreateEmployeeSelectControl(root: HTMLElement): WebClient.EmployeeAutoComplete;
        static CreateBaseUniversalSelectControl(root: HTMLElement): WebClient.UniversalAutoComplete;
        static CreateDateRangeControl(root: HTMLElement): WebClient.DateRangeControl;
        static CreateDisclosureControl(root: HTMLElement): WebClient.DisclosureHeader;
        static GetFromData(root: HTMLElement): any;
    }
}
declare namespace WebClient {
    enum ControlType {
        Text = 0,
        Label = 1,
        LabelText = 2,
        Textarea = 3,
        LabeledTextarea = 4,
        Hidden = 5,
        Boolean = 6,
        Select = 7,
        Numeric = 8,
        DateTime = 9,
        LabeledText = 10,
        Radio = 11,
        RadioList = 12,
        EmployeeSelect = 13,
        BaseUniversalSelect = 14,
    }
}
declare namespace WebClient {
    class DatepickerControl extends Control {
        private hiddenInput;
        private dateInput;
        private timeInput;
        private dateTimeBox;
        private clearButton;
        private currentTime;
        private dateTimeFormat;
        private minDate;
        private maxDate;
        private lastValidTime;
        constructor(root: HTMLElement, time: string, minDate?: Date, maxDate?: Date);
        Update(time?: Date): void;
        Clear(): void;
        SetMinMaxDate(minDate?: Date, maxDate?: Date): void;
        Disable(): void;
        private Initialize();
        readonly Value: Date;
        private CheckDateTime();
        private GetDateAttribute(element, name);
        private ClearBtnShow();
        private ClearBtnHide();
    }
}
declare namespace WebClient {
    class DateRangeControl extends Control {
        private currentZeroDuration;
        private startDateControl;
        private endDateControl;
        private durationControl;
        constructor(root: HTMLElement);
        IntervalManager: TaskIntervalManager;
        OnChangeCallback: Function;
        readonly Duration: number;
        readonly StartDate: Date;
        readonly EndDate: Date;
        UpdateView(intervalManager: TaskIntervalManager): void;
        private Initialize();
        private DateRangeCreateTasksIntervalManager();
    }
}
declare namespace WebClient {
    class DecisionControl extends Control {
        private buttons;
        private moreButton;
        private moreButtonInnerText;
        private sidebar;
        private taskDecision;
        constructor(root: HTMLElement);
        private Initialize();
        protected InitiDecision(): void;
        protected TaskDecision: Cards.TaskDecision;
        private AddMoreButton();
    }
}
declare namespace WebClient {
    class DisclosureHeader extends Control {
        private id;
        private arrow;
        private content;
        constructor(root: HTMLElement);
        Init(): void;
        private AddHeaderClickFunction();
    }
}
declare namespace WebClient {
    class DropdownControl extends Control {
        private optionList;
        private options;
        private selectedText;
        private selectedElement;
        private selectedValue;
        private isDisabled;
        private DATA_VALUE;
        SelectingItemCallback: (value: string, name: string) => JQueryDeferred<any>;
        SelectItemCallback: (value: string, name: string) => void;
        constructor(root: HTMLElement, disabled: string);
        ShowOptions(selectedOption: string, displayOptions?: Array<SearchContextOption>): void;
        Hide(): void;
        Show(): void;
        readonly SelectedValue: string;
        readonly SelectedOption: HTMLElement;
        readonly Element: HTMLElement;
        private Initialize();
        private AddDropdownMissClickEvent();
        private AddDropdownClickEvent();
        private AddOptionListClickEvent();
        private UpdateSelectedOption();
        private SetSelectedText();
    }
}
declare namespace WebClient {
    class EmployeeAutoComplete extends WebClient.Control {
        inputElement: HTMLInputElement;
        hiddenElement: HTMLInputElement;
        hiddenLabel: HTMLElement;
        private selectedItemsContainer;
        selectedItemsList: HTMLElement;
        private allBtn;
        private MoreBtn;
        private DirectoryBtn;
        private ErrorSpan;
        private labelElement;
        private itemCount;
        private favoriteStorage;
        private useStorage;
        private hasMore;
        private kindId;
        private allowMultiple;
        private selectCallback;
        private deleteItemCallback;
        private filter;
        private showAllItemsIfNoResultsOnNextLoad;
        private noResultsOnLastLoad;
        private isSelected;
        private OnSelectValidation;
        private employeeInfo;
        private dropDownMinWidth;
        constructor(root: HTMLElement);
        SelectCallback: (employeeData: IEmployeeItemData) => void;
        SelectingCallback: (employeeData: IEmployeeItemData) => JQueryDeferred<any>;
        FocusoutCallback: Function;
        DeletingItemCallback: (employeeId: string) => JQueryDeferred<any>;
        DeleteItemCallback: (employeeId: string) => void;
        SetFilter(filter: string[]): void;
        readonly AllowMultiple: boolean;
        KindId: string;
        readonly Value: string;
        getEmloyeeInfo(id: string): any;
        private needValidate;
        readonly NeedValidate: boolean;
        private readonly LastMenu;
        private FavoriteEmployees;
        private CloseAutoComplete();
        private onItemsLoaded(event, ui);
        Init(): void;
        private hasAdditionalValidate;
        SetFocus(): void;
        DisableOnKeyUpValidation(): void;
        Validate(throwError?: boolean): boolean;
        ResetValidationError(): void;
        private DeleteItem(deleteBtn);
        private AddToFavorite(item);
        private LoadAll(useStorage, directoryBtn?);
        private GetEmployeesList(term);
        private arrayUnique(array);
        private GetEmployeeFromServer(term, limitCount);
    }
}
declare namespace WebClient {
    class HiddenControl extends Control {
        textInput: HTMLInputElement;
        constructor(root: HTMLElement, value?: string);
        Text(value?: string): string;
        Init(onComplete?: () => void): void;
    }
}
declare namespace WebClient {
    class LabelControl extends Control implements ILabelControl {
        constructor(root: HTMLElement, value?: string);
        Text(value?: string): string;
        HTML(value?: string): string;
    }
}
declare namespace WebClient {
    class LabelTextareaControl extends Control implements ILabelTextareaControl {
        Label: ILabelControl;
        Textarea: ITextareaControl;
        private r;
        constructor(root: HTMLElement, labelText?: string, textValue?: string);
        Init(onComplete?: () => void): void;
    }
}
declare namespace WebClient {
    class LabelTextControl extends Control implements ILabelTextControl {
        Label: ILabelControl;
        Text: ITextControl;
        constructor(root: HTMLElement, labelText?: string, textValue?: string);
        Init(onComplete?: () => void): void;
    }
}
declare namespace WebClient {
    class LinkedTaskControl extends Control {
        private plusButton;
        private aside;
        constructor(root: HTMLElement);
        private Initialize();
    }
}
declare namespace WebClient {
    class NumericControl extends Control {
        textInput: HTMLInputElement;
        constructor(root: HTMLElement, value?: string);
        Text(value?: string): string;
        Init(onComplete?: () => void): void;
        OnTextChange: Function;
        SetNumericControl(control: HTMLElement, callback?: Function): void;
    }
}
declare namespace WebClient {
    class RadioListControl extends Control {
        radioControls: NodeListOf<Element>;
        constructor(root: HTMLElement, selectedValue?: string);
        Value(value?: string): string;
        private SetValue(value);
        private GetValue();
    }
}
declare namespace WebClient {
    class SelectControl extends Control {
        selectElement: HTMLSelectElement;
        constructor(root: HTMLElement, value?: string);
        Value(value?: string): string;
        Init(onComplete?: () => void): void;
        OnValueChange: Function;
    }
}
declare namespace WebClient {
    class TextareaControl extends Control implements ITextareaControl {
        textInput: HTMLInputElement;
        constructor(root: HTMLElement, value?: string);
        Text(value?: string): string;
        Init(onComplete?: () => void): void;
        OnTextChange: Function;
        OnKeyPress: Function;
    }
}
declare namespace WebClient {
    class TextControl extends Control implements ITextControl {
        textInput: HTMLInputElement;
        constructor(root: HTMLElement, value?: string);
        Text(value?: string): string;
        Init(onComplete?: () => void): void;
        OnTextChange: Function;
    }
}
declare namespace WebClient {
    class UniversalAutoComplete extends WebClient.Control {
        inputElement: HTMLInputElement;
        hiddenElement: HTMLInputElement;
        hiddenLabel: HTMLElement;
        private selectedItemsContainer;
        selectedItemsList: HTMLElement;
        private allBtn;
        private MoreBtn;
        private DirectoryBtn;
        private ErrorSpan;
        private labelElement;
        private itemCount;
        private favoriteStorage;
        private useStorage;
        private hasMore;
        private itemTypeId;
        private allowMultiple;
        private selectCallback;
        private deleteItemCallback;
        private filter;
        private noResults;
        private OnSelectValidation;
        constructor(root: HTMLElement);
        SelectCallback: Function;
        SetFilter(filter: string[]): void;
        readonly AllowMultiple: boolean;
        ItemTypeId: string;
        readonly Value: string;
        private needValidate;
        readonly NeedValidate: boolean;
        private readonly LastMenu;
        private FavoriteItems;
        Init(): void;
        private hasAdditionalValidate;
        DisableOnKeyUpValidation(): void;
        Validate(throwError?: boolean): boolean;
        private DeleteItem(deleteBtn);
        private AddToFavorite(item);
        private LoadAll(useStorage, directoryBtn?);
        private GetItemsList(term);
        private arrayUnique(array);
        private GetItemsFromServer(term, limitCount);
    }
}
declare namespace WebClient.Cards {
    class TaskCardCreate {
        protected form: HTMLFormElement;
        protected url: string;
        protected parentCardId: HTMLInputElement;
        protected controllerForm: HTMLElement;
        protected saving: boolean;
        private saveButtonElement;
        private submiteButtonElement;
        private cancelButtonElement;
        private controllerCheckBox;
        private acceptanceCheckBox;
        private addFileCheckBox;
        private sendTaskInput;
        private uploadFilePanel;
        private documentsBlock;
        private performerControl;
        private controllerControl;
        private dropDownContainer;
        private dropdownControl;
        protected traceProvider: TraceProvider;
        constructor(formName: HTMLFormElement);
        static DisableButtons(): void;
        static EnableButtons(): void;
        static AddDocumentId(documentPanel: string, documentId: string): void;
        Save(): void;
        protected Initialize(): void;
        protected SendRequest(form: any): void;
        protected readonly ControllerCheckBox: HTMLInputElement;
        protected readonly AcceptanceCheckBox: HTMLInputElement;
        protected readonly ControllerControl: EmployeeAutoComplete;
    }
}
declare namespace WebClient.Cards {
    class TaskCardView {
        private static DelegateListClassName;
        private static ReportPanelClassName;
        private static ShowCommentsButtonId;
        private static CommentFormId;
        private static TaskCommentsId;
        private static TaskCommentCountId;
        private widget;
        private widgetId;
        private commentForm;
        private reportPanel;
        constructor(widgetId: string);
        private Initialize();
        private ShowDelegateList(element);
        private SaveComment();
        private RefreshComments(response);
        private readonly CommentsContainer;
        private readonly CommentData;
        readonly CardInfo: CardInfoModel;
        private InitializeCommentsPanel();
        private AnimateCommentButtons(needShow);
        private EditComment(item);
        private DeleteComment(item);
        EditCommentMode: boolean;
        private ExpandCommentsEventHandler();
    }
    class TaskReportPanel {
        private static ReportContainerClassName;
        private static ReportTextClassName;
        private static DropZoneWithReportContentClassName;
        private static DropZoneWithFilesClassName;
        private static CommandExpandCssClass;
        private static FileLinkCssClass;
        private panel;
        private widget;
        private reportContainer;
        private commandBtn;
        private reportText;
        private dropZoneWithFiles;
        private dropZoneWithReportContent;
        private linkControl;
        private reportForm;
        private traceProvider;
        constructor(widget: TaskCardView, element: Element);
        private Initialize();
        private SaveTextReport();
        private SaveReportButton(button, refresh?, isAsync?);
        private CancelReportButton(button);
        private GetTextReportData();
        private readonly ReportInput;
        private ShowReportInput();
        private CommandExpandEventHandler(item);
        private PreviewFileEventHandler(item);
    }
    class TaskDecision {
        static WidgetClassName: string;
        private static DecisionSelector;
        private selectedDecisionItem;
        private reverseBtn;
        private widget;
        constructor(widgetId: string, needReverseBtn?: boolean);
        private Initialize();
        protected RunDecision(item: HTMLElement): void;
        protected ShowPanel(response: any): void;
        private SubmitForm(form, panel);
        protected SendFormData(form: HTMLFormElement, panel: RightSidebar): void;
        protected ExcecuteDecision(url: string, needShowDialog: boolean): void;
        protected readonly SelectedDecision: HTMLElement;
        protected readonly Widget: HTMLElement;
    }
}
declare namespace WebClient.Cards {
    class GroupTaskCardCreate extends TaskCardCreate {
        private dateRange;
        private executionType;
        private localResourses;
        private performersTable;
        private dateTimeFormat;
        private onControlDate;
        private responsePerformer;
        private employeeAutocomplete;
        private changePerformerControls;
        private allowResponsiveAcceptance;
        private allowAcceptance;
        private controlHour;
        constructor(formName: HTMLFormElement);
        Save(): void;
        private ValidateAndSend(validated, acceptanceInerrupt, $form);
        private ShowAcceptanceNotAllowedDlg(acceptanceInerrupt);
        protected Initialize(): void;
        protected SendRequest(form: any): void;
        private UpdateIntervalManager(tasksIntervalsManager);
        private UpdateIntervalsView(tasksIntervalsManager);
        private fixHelper(e, ui);
        private CompareTaskIntervals(a, b);
        private GetExistingPerformers(except?);
        private ChangeExecutionTypeEventHandler();
        private EditTaskIntervalEventHandler();
        private UpdateTaskInterval(changeDateInfo, currentTaskInterval, startDateControl, endDateControl, durationControl, rootElement);
        private EditTaskDescriptionEventHandler();
        private RemovePerformerEventHandler();
        private MoveUpPerformerEventHandler();
        private MoveDownPerformerEventHandler();
        private ChangePerformerEventHandler();
        private ChangePerformerResponseEventHandler();
        private CreateGroupTaskModelFromView();
    }
}
declare namespace WebClient.Cards {
    class TaskGroupCardView extends TaskCardView {
        constructor(widgetId: string);
    }
}
declare namespace WebClient.Approval {
    class ApprovaDecisionControl extends WebClient.DecisionControl {
        protected InitiDecision(): void;
    }
}
declare namespace Approval {
    class ApprovalFilePanel {
        private static FileLinkCssClass;
        private static FileSettingsCssClass;
        private static FileItemCssClass;
        private static FileVersionCssClass;
        private static VersionSettingsCssClass;
        private static SettingMenuCssClass;
        private static VersionSettingMenuCssClass;
        private static CopyToFinalCmdCssClass;
        private static DeleteFileVersionCssClass;
        private static VersionCommentCssClass;
        private static MenuVersionCommentCssClass;
        private filePanel;
        private currentSettings;
        private selectedElement;
        constructor(filePanelId: string);
        private Initialize();
        private readonly GetFileItems;
        private readonly GetFileVersions;
        private SelectEventClick(item);
        private SettingEventHandler(fileItem);
        private UpdatePanel();
        private VersionEventHandler(fileItem);
        private ShowVersions(item, show?);
        private DeleteFileVersionEventHandler(item);
        private AddCopyToFinalEventHandler(item);
        private VersionsSettingsEventHandlers(versionItem);
        private ShowSettingsEventClick(item);
        private ShowSettings(item, show?);
        private PreviewFileEventHandler(item);
        private AddFileCommentEventHandler(item);
        private SuppressEvents(e);
        private WrapperEventHandler();
    }
}
declare namespace Approval {
    class ApprovalHistory {
        private rootElement;
        private selectedCycleNumber;
        private tabElement;
        private cycleUl;
        private elementId;
        constructor(elementId: string);
        private SetSelectedCycleNumber();
        private buildCyclePaginator(cycleUl, current);
        private createCycleLi(text, cycleNumber, cycleUl, isActive);
        private AttachEventHandlers();
        private LoadCycle();
        private SetActiveCycle(currentCycleNumber);
    }
}
declare namespace WebClient.Cards {
    class ApprovalHistoryCycle {
        private rootElement;
        private static FileLinkCssClass;
        private static ApprovalStageItemCssClass;
        private static DecisionInfoCssClass;
        constructor(root: HTMLElement);
        private Initialize();
        private InitGetFullInfo();
        private InitStageItem(item);
        private ShowFullStageInfo(item);
        private InitComments();
        private InitCommentButton(item);
        private ShowCommentDialog(item);
        private InitializeCommentDialogContent(clone, item);
        private PreviewFileEventHandler(item);
    }
}
declare namespace WebClient {
    class ApprovalPanel {
        private static CommandButtonsSelector;
        private rootElement;
        constructor(root: HTMLElement);
        private Init();
    }
}
declare namespace WebClient.Approval {
    class ApprovalTaskDecision extends WebClient.Cards.TaskDecision {
        protected ExcecuteDecision(url: string, needShowDialog: boolean): void;
        private SignData(url, taskId, timestamp, comment, decisionId, encryptedInfo, isSimpleSign, callBack);
        protected SendFormData(form: HTMLFormElement, panel: RightSidebar): void;
        private ShowSelectCertificateDialog(url, taskId, timestamp, comment, decisionId, callback?);
    }
}
declare namespace Approval.Cards {
    class ApprovalTaskView {
        private widget;
        private widgetId;
        private decision;
        constructor(widgetId: string);
        private Initialize();
    }
}
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
        protected addLegacyCardTypes(): void;
        protected getCaption(name: string): string;
        getUrls(urlResolver: UrlResolver): IUrlMap;
    }
}
declare namespace WebClient {
    class LayoutManager {
        protected layoutContainer: LayoutContainer;
        protected rootElementId: string;
        protected siteUrl: string;
        protected applicationTimestamp: number;
        protected pageLeaveConfirmationDisabled: boolean;
        protected layoutContainers: ILayoutContainerMap;
        protected layoutCardLayoutPosition: string;
        protected layoutUnloading: CancelableEvent<IEventArgs>;
        protected layoutUnloaded: SimpleEvent<IEventArgs>;
        protected prevConfirmationModal: ModalWindow;
        constructor(layoutManagerParams: ILayoutManagerParams);
        readonly RootHtmlElement: HTMLElement;
        readonly IsCardSaved: boolean;
        readonly cardLayout: Layout;
        readonly LayoutUnloading: ICancelableEvent<IEventArgs>;
        readonly LayoutUnloaded: SimpleEvent<IEventArgs>;
        showCard(model: ILayoutCardModel): void;
        show(rootElementId: string, layoutPosition: string, model: ILayoutViewModel): void;
        getLayout(layoutPositionName: string): Layout;
        disablePageLeaveConfirmation(): void;
        deleteCard(cardId?: string): JQueryDeferred<any>;
        back(): void;
        protected unmountCallback(positionName: string): void;
        protected loadExtensions(): void;
        protected initialize(model: ILayoutCardModel): void;
        destroy(positionName?: string): JQueryDeferred<any>;
        protected updateFolderStyle(cardTypeId: string): void;
        protected reactJsUnmount(): void;
        onBeforeWindowUnload(e: any): string;
        onWindowUnload(ev: any): void;
    }
}
declare var layoutManager: WebClient.LayoutManager;
declare namespace WebClient {
    interface IBasicEmployeeInfo {
        id: string;
        firstName: string;
        middleName: string;
        lastName: string;
        position: string;
        displayName: string;
        pathInDirectory?: IDepartmentInfo[];
    }
}
declare namespace WebClient {
    interface ILayoutManagerParams {
        rootElementId: string;
        applicationTimestamp: number;
        siteUrl: string;
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
    class BodyContainerProvider {
        static ActiveContainers: HTMLElement[];
        private mContainer;
        constructor(id: string);
        private getContainer(id);
        dispose(): void;
        createElement(className?: string): HTMLElement;
        freeElement(elem: HTMLElement): JQueryDeferred<any>;
    }
}
declare namespace WebClient {
    interface IBoxWithButtonsProps {
        title?: string;
        children?: any;
        className?: string;
        key?: string;
        loadingState?: LoadingState;
        buttons: IBoxWithButtonsButtonInfo[];
        buttonsInside?: boolean;
    }
    interface IBoxWithButtonsButtonInfo extends IIconButtonProps {
        showOnlyOnHover?: boolean;
    }
    class BoxWithButtonsDefault {
        static clearButton(props?: IBoxWithButtonsButtonInfo): IBoxWithButtonsButtonInfo;
    }
    const BoxWithButtons: (props: IBoxWithButtonsProps) => JSX.Element;
}
declare namespace WebClient {
    interface IButtonProperties {
        text?: string;
        iconClass?: string;
        loading?: boolean;
        loadingIconClass?: string;
        visible?: boolean;
        className?: string;
        onClick?: (ev: React.MouseEvent) => void;
        onKeyDown?: (ev?) => void;
        onFocus?: (ev?) => void;
        onBlur?: (ev?) => void;
        stretchWidth?: boolean;
        title?: string;
        primaryButton?: boolean;
        align?: ButtonAlignModes;
        tabIndex?: number;
        children?: any;
        attach?: (instance: HTMLElement) => any;
        name?: string;
        disabled?: boolean;
    }
    enum ButtonAlignModes {
        Center = 0,
        Left = 1,
    }
    const Button: (props: IButtonProperties) => JSX.Element;
}
declare namespace WebClient {
    interface ICommandBarButtonProps {
        expanded: boolean;
        onClick(event: React.MouseEvent): void;
        className?: string;
        visible?: boolean;
        name?: string;
        title?: string;
    }
    const CommandBarButton: (props: ICommandBarButtonProps) => JSX.Element;
}
declare namespace WebClient {
    class Debouncer {
        private timerHandle;
        private callback;
        private timeout;
        constructor(callback: Function, timeout?: number);
        trigger(): void;
        clear(): void;
    }
}
declare namespace WebClient {
    namespace Styled {
        namespace Helpers {
            const withProps: <U>() => <P, T, O>(fn: styled.ThemedStyledFunction<P, T, O>) => styled.ThemedStyledFunction<P & U, T, O & U>;
            const isStyled: (component: any) => boolean;
            const combineMixins: (...mixins: styled.ThemedCssFunction<any>[]) => (strings: any, ...values: any[]) => styled.InterpolationValue[];
            class ComponentBuilder<P, T = any, O = P> {
                static readonly MODIFIER_DELIMITER: string;
                protected component: styled.ThemedStyledFunction<P, T, O>;
                protected mainClassName: string;
                protected additionalClassNames: string;
                protected propsForClasses: IComponentBuilderPropsForClasses;
                constructor(component: styled.ThemedStyledFunction<P, T, O> | styled.Component<P>);
                setClasses(mainClassName: string, additionalClassNames?: string[] | string): ComponentBuilder<P, T, O>;
                setPropsForClasses(propsForClasses: IComponentBuilderPropsForClasses): this;
                protected buildClasses: (props: any) => string;
                protected attributeToClassName(attribute: string): string;
                build(): styled.ThemedStyledFunction<P, T, O>;
            }
            type AttributesForClassesHandler = (name: string, value: any) => boolean | string;
            interface IComponentBuilderPropsForClasses {
                [name: string]: void | AttributesForClassesHandler;
            }
        }
    }
}
declare namespace WebClient {
    namespace Styled {
        namespace Mixins {
            const hover: (strings: TemplateStringsArray, ...values: styled.SimpleInterpolation[]) => styled.InterpolationValue[];
            const focus: (strings: TemplateStringsArray, ...values: styled.SimpleInterpolation[]) => styled.InterpolationValue[];
            const active: (strings: TemplateStringsArray, ...values: styled.SimpleInterpolation[]) => styled.InterpolationValue[];
            const parentHover: (strings: TemplateStringsArray, ...values: styled.SimpleInterpolation[]) => styled.InterpolationValue[];
            const parentFocus: (strings: TemplateStringsArray, ...values: styled.SimpleInterpolation[]) => styled.InterpolationValue[];
            const parentActive: (strings: TemplateStringsArray, ...values: styled.SimpleInterpolation[]) => styled.InterpolationValue[];
        }
    }
}
declare namespace WebClient {
    const DirectorySearchInput: styled.StyledComponentClass<React.HTMLProps<HTMLInputElement>, any, React.HTMLProps<HTMLInputElement>>;
}
declare namespace WebClient {
    interface IEmployeeNameProps {
        name: string;
    }
    class EmployeeName extends React.Component<IEmployeeNameProps, any> {
        private updateText(name);
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IFocusableMode {
        onMount?: boolean;
        onUpdate?: boolean;
    }
    interface IFocusableProps {
        selectorToFocus?: string;
        selectorToReturnFocus?: string;
        mode?: IFocusableMode;
        notFocusOnMount?: boolean;
        disabled?: boolean;
        children?: JSX.Element;
        onFocus?: () => void;
    }
    class Focusable extends React.Component<IFocusableProps, undefined> {
        el: HTMLElement;
        prevFocusable: HTMLElement;
        prevIsVisible: boolean;
        isInitialFocused: boolean;
        static readonly DEFAULT_MODE: IFocusableMode;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(): void;
        componentWillReceiveProps(nextProps: IFocusableProps): void;
        readonly isVisible: boolean;
        readonly mode: IFocusableMode;
        protected findFocusable(): HTMLElement;
        protected findCurrentFocusableElement(): HTMLElement;
        protected focus(force?: boolean): void;
        protected returnFocus(skipVisibleCheck?: boolean): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IHighlightedSearchResultProps {
        text: string;
        searchQuery: string;
        title?: string;
        className?: string;
        key?: any;
        useEllipsis?: boolean;
    }
    const HighlightedSearchResult: (props: IHighlightedSearchResultProps) => JSX.Element;
}
declare namespace WebClient {
    interface IHighlightedSimpleSearchResult {
        text: string;
        searchQuery: string;
        title?: string;
        className?: string;
    }
    const HighlightedSimpleSearchResult: (props: IHighlightedSimpleSearchResult) => JSX.Element;
}
declare namespace WebClient {
    interface IIconButtonProps {
        title?: string;
        iconClassName?: string;
        className?: string;
        visible?: boolean;
        onClick: (event: React.MouseEvent) => void;
        onKeyDown?: (event: React.KeyboardEvent) => void;
        onFocus?: (event: React.FocusEvent) => void;
        onBlur?: (event: React.FocusEvent) => void;
        tabIndex?: number;
        name?: string;
        disabled?: boolean;
    }
    const IconButton: (props: IIconButtonProps) => JSX.Element;
}
declare namespace WebClient {
    interface ILabeledText {
        label: string;
        text: string | JSX.Element;
        showEmpty?: boolean;
        visible?: boolean;
        className?: string;
        onTextClick?: (ev: React.MouseEvent | React.KeyboardEvent) => void;
        attachText?: (elem: HTMLElement) => void;
        labelDots?: LabelDotsMode;
        wrapLongTextUnderLabel?: boolean;
        clickableText?: boolean;
        title?: string;
        valueTitle?: string;
        tabIndex?: number;
        onFocus?: (event: React.FocusEvent) => void;
        onBlur?: (event: React.FocusEvent) => void;
    }
    enum LabelDotsMode {
        Dots = 0,
        NoDots = 1,
        AutoDots = 2,
    }
    const LabeledText: (props: ILabeledText) => JSX.Element;
}
declare namespace WebClient {
    enum ModalBackdropPriority {
        Normal = 0,
        High = 1,
        VeryHigh = 2,
    }
    interface IModalBackdropProps {
        visible: boolean;
        onClick?: (ev: React.MouseEvent) => void;
        children?: JSX.Element;
        priority?: ModalBackdropPriority;
    }
    const ModalBackdrop: (props: IModalBackdropProps) => JSX.Element;
}
declare namespace WebClient {
    class ModalHost {
        private mId;
        private mContainer;
        private mRenderFunction;
        private static mModalDialogHostContainerProvider;
        private static getModalDialogHostContaier();
        constructor(className: string, render: () => JSX.Element);
        forceUpdate(): void;
        mount(): void;
        unmount(): JQueryDeferred<any>;
        private render();
    }
}
declare namespace WebClient {
    class QuickSearchLogic {
        private debouncer;
        private searchIndex;
        constructor(searchCallback: Function, searchIndex?: number, searchTimeout?: number);
        processInput(newText: string): void;
        clear(): void;
    }
}
declare namespace WebClient {
    interface ISearchBarProps {
        className?: string;
        value?: string;
        placeholder?: string;
        searchIndex?: number;
        searchTimeout?: number;
        onChange?: (value: string) => void;
        onSearch?: (value: string) => void;
        onKeyDown?: (e: React.KeyboardEvent) => void;
    }
    class SearchBar extends React.Component<ISearchBarProps, undefined> {
        protected quickSearchLogic: QuickSearchLogic;
        constructor(props: ISearchBarProps);
        componentWillReceiveProps(nextProps: ISearchBarProps): void;
        protected resetSearchLogic: () => void;
        protected onChange: (value: string) => void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ITabsNavPanelItemProps {
        active: boolean;
        onClick(event: React.MouseEvent | React.KeyboardEvent): void;
        title?: string;
        children?: any;
        visible?: boolean;
        className?: string;
        key?: string;
        name: string;
        loadingState?: LoadingState;
        tabIndex?: number;
    }
    interface ITabsNavPanelProps {
        children?: JSX.Element;
        className?: string;
        stretchTabs?: boolean;
    }
    const TabsNavPanel: (props: ITabsNavPanelProps) => JSX.Element;
    const TabsNavPanelItem: (props: ITabsNavPanelItemProps) => JSX.Element;
}
declare namespace WebClient {
    interface ITextInputProps {
        className?: string;
        value?: string;
        placeholder?: string;
        onChange?: (value: string) => void;
        onKeyDown?: (e: React.KeyboardEvent) => void;
    }
    class TextInput extends React.Component<ITextInputProps, undefined> {
        protected onChange: (e: any) => void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IUnreadCountIndicatorProps {
        count: number;
        className?: string;
    }
    const UnreadCountIndicator: (props: IUnreadCountIndicatorProps) => JSX.Element;
}
declare namespace WebClient {
    interface ITypeaheadProps {
        searchText: string;
        content?: any;
        inputKeyDown: BasicEvent<React.KeyboardEvent>;
        findItems: (query: ITypeaheadSearchQuery) => JQueryDeferred<ITypeaheadSearchResult>;
        onSelected: (selectedVariant: ITypeaheadVariant) => void;
        disabled?: boolean;
        focusInput?: Function;
        searchIndex?: number;
        searchTimeout?: number;
        firstPageSize?: number;
        nextPageSize?: number;
        clearButton?: boolean;
        showVariantsButton?: boolean;
        showVariantsButtonIconClass?: string;
        showAllSearchText?: string;
        showAllEnabled?: boolean;
        paginatorLoadLogic?: PaginatorLoadLogic;
        extraButtons?: IBoxWithButtonsButtonInfo[];
        buttonsInside?: boolean;
        title?: string;
        className?: string;
        name?: string;
        externalState?: any;
        onDropdownStateChanged?: (sender: Typeahead) => void;
    }
    enum PaginatorLoadLogic {
        LoadOnlyNewItems = 0,
        LoadAllItems = 1,
    }
}
declare namespace WebClient {
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
        lastSearchPage: number;
        lastSearchText: string;
        lastExternalState: any;
        lastSearchResult: ITypeaheadSearchResult;
    }
}
declare namespace WebClient {
    class Typeahead extends React.Component<ITypeaheadProps, ITypeaheadState> {
        static FirstPageSize: number;
        static NextPageSize: number;
        static SearchTimeout: number;
        constructor(props: ITypeaheadProps);
        componentWillUnmount(): void;
        componentDidMount(): void;
        closeDropdown(): void;
        openDropdown(): void;
        variantsDropdownOpen: boolean;
        readonly variants: TypeaheadItem[];
        showAll(): void;
        protected onShowAll(): void;
        protected onClearValueClick(): void;
        componentWillReceiveProps(nextProps: ITypeaheadProps, nextContext: any): void;
        protected getTextValue(): string;
        protected getFirstPageSize(): number;
        protected getNextPageSize(): number;
        protected getSearchIndex(): number;
        protected createItem(data: ITypeaheadVariant): TypeaheadItem;
        protected onSelected(item: TypeaheadItem): void;
        protected select(item: TypeaheadItem): void;
        protected loadVariants(searchText: string, page: number): JQueryDeferred<ITypeaheadSearchResult>;
        protected readonly searchTimeout: number;
        protected onInputChange(newText: string): void;
        private documentClick(ev);
        protected onShowMore(): JQueryDeferred<ITypeaheadSearchResult>;
        protected onShowVariants(): void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected onItemClick(ev: React.MouseEvent, item: TypeaheadItem): void;
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
    interface ITypeaheadSearchQuery {
        searchText?: string;
        skipCount: number;
        maxCount: number;
    }
}
declare namespace WebClient {
    interface ITypeaheadSearchResult {
        items: ITypeaheadVariant[];
        hasMore: boolean;
    }
}
declare namespace WebClient {
    interface ITypeaheadVariant {
        name: string;
        value: string;
        iconCssClass?: string;
        title?: string;
        favored?: boolean;
    }
}
declare namespace WebClient {
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
    interface ITreeBaseProps<TreeNodeDataT extends ITreeNodeData> {
        data?: TreeNodeDataT[];
        levelIdent?: string;
        expandedToggleMarkerClass?: string;
        collapsedToggleMarkerClass?: string;
        multiSelect?: boolean;
        className?: string;
        toggleOnDisabledNodesClick?: boolean;
        expandedByDefault?: boolean;
        nodeSelected?: (node: TreeNode) => void;
        virtualizationType?: VirtualizationType;
        treeHeight: number;
    }
    enum VirtualizationType {
        Simple = 0,
        Uniform = 1,
        Variable = 2,
    }
}
declare namespace WebClient {
    interface ITreeBaseState {
        nodes: TreeNode[];
        selectedNodes: TreeNode[];
        count: number;
    }
}
declare namespace WebClient {
    class TreeBase<TreeNodeDataT extends ITreeNodeData, TProps extends ITreeBaseProps<TreeNodeDataT>, TState extends ITreeBaseState> extends React.Component<TProps, TState> {
        nodeExpandedEvent: SimpleEvent<TreeNode>;
        nodeCollapsedEvent: SimpleEvent<TreeNode>;
        nodeSelectedEvent: SimpleEvent<TreeNode>;
        state: TState;
        constructor(props: TProps);
        componentDidMount(): void;
        setNewNodes(nodes: TreeNode[]): void;
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
        protected loadData(data: ITreeNodeData[], level: number, parent: TreeNode): TreeNode[];
        protected createNode(data: ITreeNodeData, level: number, parent: TreeNode, children?: TreeNode[]): TreeNode;
        protected onToggleClick(node: TreeNode, event: React.SyntheticEvent): void;
        protected onNodeClick(node: TreeNode, event: React.MouseEvent): void;
        componentWillReceiveProps(nextProps: ITreeBaseProps<TreeNodeDataT>, nextContext: any): void;
        protected calcTree(): void;
        protected calcTreeItem(node: TreeNode): number;
        protected getNode(index: any, nodes: TreeNode[]): TreeNode;
        protected renderToggleMarker(node: TreeNode): JSX.Element;
        protected renderNode(index: any, key: any): JSX.Element;
        getVirtualizationType(): string;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class Tree extends TreeBase<ITreeNodeData, ITreeBaseProps<ITreeNodeData>, ITreeBaseState> {
        constructor(props: ITreeBaseProps<ITreeNodeData>);
    }
}
declare namespace WebClient {
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
    class TreeNode {
        constructor(data: ITreeNodeData, level: number, parent: TreeNode, children?: TreeNode[]);
        visibleItemsCount: number;
        children: TreeNode[];
        data: ITreeNodeData;
        level: number;
        expanded: boolean;
        htmlEement: HTMLElement;
        parent: TreeNode;
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
    interface ITableHelperProps {
        mode: TableHelperMode;
        className?: string;
        children?: JSX.Element;
        notHighlightOnHover?: boolean;
    }
    interface ITableHelperBodyProps {
        className?: string;
        children?: JSX.Element;
    }
    enum TableHelperMode {
        Blocks = 0,
        Table = 1,
    }
    const TableHelper: (props: ITableHelperProps) => JSX.Element;
}
declare namespace WebClient {
    interface ITableHelperHeaderRowProps {
        className?: string;
        children?: JSX.Element;
        showOnHover?: boolean;
        key?: string;
        name?: string;
    }
    interface ITableHeaderCellHelperProps {
        width?: string;
        className?: string;
        children?: any;
        key: string;
        title?: string;
    }
    const TableHelperHeaderRow: (props: ITableHelperHeaderRowProps) => JSX.Element;
    const TableHelperHeaderCell: (props: ITableHeaderCellHelperProps) => JSX.Element;
}
declare namespace WebClient {
    interface ITableRowHelperProps {
        className?: string;
        children?: JSX.Element;
        selected?: boolean;
        standardHeight?: boolean;
        key?: string;
        name?: string;
    }
    interface ITableRowCellHelperProps {
        width?: string;
        className?: string;
        children?: any;
        key: string;
    }
    const TableHelperRow: (props: ITableRowHelperProps) => JSX.Element;
    const TableHelperCell: (props: ITableRowCellHelperProps) => JSX.Element;
}
declare namespace WebClient {
    namespace SvgIcons {
        interface IRightArrowIconProps {
            width?: string;
            height?: string;
            color?: string;
            tabIndex?: number;
            onClick?: (event: React.MouseEvent) => void;
            className?: string;
            title?: string;
            nativeTitle?: string;
        }
        const RightArrowIcon: (props: IRightArrowIconProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace SvgIcons {
        interface ISvgWrapperProps {
            svg: string;
            tabIndex?: number;
            onClick?: (event: React.MouseEvent) => void;
            className?: string;
            title?: string;
            nativeTitle?: string;
        }
        const SvgWrapper: (props: ISvgWrapperProps) => JSX.Element;
    }
}
declare namespace WebClient {
    interface ISortableProps {
        items: ISortableItem<any>[];
        onReorder: (newOrder: string[], sortedItems: ISortableItem<any>[]) => void;
        order: string[];
        axis?: 'x' | 'y';
        containment?: HTMLElement | JQuery | 'parent' | 'document' | 'window' | string;
        cursor?: string;
        disabled?: boolean;
        forceHelperSize?: boolean;
        forcePlaceholderSize?: boolean;
        handle?: string;
        opacity?: number;
        scroll?: boolean;
        scrollSensitivity?: number;
        scrollSpeed?: number;
        tolerance?: 'intersect' | 'pointer';
        zIndex?: number;
    }
    class Sortable extends React.Component<ISortableProps, undefined> {
        el: HTMLElement;
        wasCancelled: boolean;
        static readonly ITEM_ID: string;
        static readonly DEFAULT_AXIS: string;
        static readonly DEFAULT_CONTAINMENT: string;
        static readonly DEFAULT_CURSOR: string;
        static readonly DEFAULT_FORCE_HELPER_SIZE: boolean;
        static readonly DEFAULT_FORCE_PLACEHOLDER_SIZE: boolean;
        static readonly DEFAULT_HANDLE: boolean;
        static readonly DEFAULT_OPACITY: number;
        static readonly DEFAULT_SCROLL: boolean;
        static readonly DEFAULT_SCROLL_SENSITIVITY: number;
        static readonly DEFAULT_SCROLL_SPEED: number;
        static readonly DEFAULT_TOLERANCE: string;
        static readonly DEFAULT_ZINDEX: number;
        componentDidMount(): void;
        componentWillReceiveProps(nextProps: ISortableProps): void;
        componentWillUnmount(): void;
        componentWillUpdate(nextProps: ISortableProps): void;
        componentDidUpdate(): void;
        protected isItemsEqual(items1: ISortableItem<any>[], items2: ISortableItem<any>[]): boolean;
        protected updateContainmentSize(): void;
        protected getSortablePluginOptions(props: ISortableProps): {
            axis: "y" | "x";
            containment: string | HTMLElement | JQuery;
            cursor: string;
            disabled: boolean;
            forceHelperSize: boolean;
            forcePlaceholderSize: boolean;
            handle: string | boolean;
            opacity: number;
            scroll: boolean;
            scrollSensitivity: number;
            scrollSpeed: number;
            tolerance: "pointer" | "intersect";
            zIndex: number;
        };
        sortItems(items: ISortableItem<any>[], order?: string[]): ISortableItem<any>[];
        getChildren(): JSX.Element[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ISortableItem<T> {
        id: string | number;
        data: T;
        render: (data: T) => JSX.Element;
    }
}
declare namespace WebClient {
    interface SliderCheckBoxProps {
        onChange?: (newValue: boolean) => void;
        canEdit?: boolean;
        value?: boolean;
        className?: string;
        tip?: string;
        labelText?: string;
        tabStop?: boolean;
    }
    interface SliderCheckBoxState {
    }
    class SliderCheckBox extends React.Component<SliderCheckBoxProps, SliderCheckBoxState> {
        constructor(props: SliderCheckBoxProps);
        protected handleCheckBoxClick(event: any): void;
        protected getTabIndex(): 0 | -1;
        protected getCssClass(): string;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IRibbonProps {
        className?: string;
        children?: JSX.Element;
    }
    const Ribbon: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & IRibbonProps & {
        className: string;
    }, any, React.HTMLProps<HTMLDivElement> & IRibbonProps>;
}
declare namespace WebClient {
    interface IRibbonButtonProps {
        className?: string;
        children?: JSX.Element;
        visible?: boolean;
        checked?: boolean;
        onClick?: () => void;
    }
    const RibbonButton: (props: IRibbonButtonProps) => JSX.Element;
}
declare namespace WebClient {
    interface IRibbonGroupProps {
        className?: string;
        children?: JSX.Element;
    }
    const RibbonGroup: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & IRibbonGroupProps & {
        className: string;
    }, any, React.HTMLProps<HTMLDivElement> & IRibbonGroupProps>;
}
declare namespace WebClient {
    const ReactListVirtualization: {
        simple: string;
        uniform: string;
        variable: string;
    };
    interface IReactListProps {
        axis?: string;
        initialIndex?: number;
        itemRenderer?: any;
        itemSizeEstimator?: any;
        itemSizeGetter?: any;
        itemsRenderer?: any;
        length: number;
        minSize: number;
        pageSize?: number;
        scrollParentGetter?: any;
        threshold?: number;
        type: string;
        useStaticSize?: boolean;
        useTranslate3d?: boolean;
    }
    class ReactList extends React.Component<IReactListProps, any> {
        static displayName: string;
        cache: any;
        prevPrevState: any;
        unstable: boolean;
        updateCounter: number;
        updateCounterTimeoutId: any;
        items: any;
        scrollParent: any;
        static defaultProps: Partial<IReactListProps>;
        constructor(props: any);
        componentWillReceiveProps(next: any): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        maybeSetState(b: any, cb: any): any;
        componentWillUnmount(): void;
        getOffset(el: any): any;
        getScrollParent(): any;
        getScroll(): number;
        setScroll(offset: any): void;
        getViewportSize(): any;
        getScrollSize(): any;
        hasDeterminateSize(): any;
        getStartAndEnd(threshold?: number): {
            start: number;
            end: any;
        };
        getItemSizeAndItemsPerRow(): {
            itemSize: any;
            itemsPerRow: any;
        } | {};
        updateFrame(cb: any): any;
        updateScrollParent(): void;
        updateSimpleFrame(cb: any): any;
        updateVariableFrame(cb: any): void;
        updateUniformFrame(cb: any): any;
        getSpaceBefore(index: any, cache?: {}): any;
        cacheSizes(): void;
        getSizeOf(index: any): any;
        constrain(from: any, size: any, itemsPerRow: any, {length, minSize, type}: {
            length: any;
            minSize: any;
            type: any;
        }): {
            from: any;
            size: any;
        };
        scrollTo(index: any): void;
        scrollAround(index: any): void;
        getVisibleRange(): any[];
        renderItems(): any;
        render(): any;
    }
}
declare namespace WebClient {
    interface IReactListDynamicProps {
        axis?: string;
        initialIndex?: number;
        length: number;
        minSize?: number;
        threshold?: number;
        useTranslate3d?: boolean;
        style?: any;
        className?: string;
        emptyItemClassName?: string;
        loadingItemClassName?: string;
        hidden?: boolean;
        customContainer?: any;
        notLoadOnInit?: boolean;
        loadItems: (indexes: number[]) => void;
        fetchThreshold?: number;
        itemsThreshold?: number;
        itemHeight?: number | string;
        items: any[];
        renderItem: (key: number | string, itemData: any, index: number) => string | JSX.Element;
        renderEmptyItem?: (index: number, key: number | string) => string | JSX.Element;
        renderLoadingItem?: (index: number, key: number | string, state: LoadingState) => string | JSX.Element;
    }
    interface IReactListDynamicState {
        loading: {
            [index: number]: boolean;
        };
    }
    class ReactListDynamic extends React.Component<IReactListDynamicProps, IReactListDynamicState> {
        static readonly FETCH_THRESHOLD: number;
        static readonly UNDEFINED_ITEM: {};
        protected defaultContainer: any;
        protected reactList: ReactList;
        protected thresholdTimeout: any;
        constructor(props: any);
        componentDidMount(): void;
        componentWillUnmount(): void;
        loadItems: () => void;
        protected onScroll: () => void;
        protected renderItem: (index: number, key: string | number) => string | JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IReactListInfiniteScrollProps {
        axis?: string;
        initialIndex?: number;
        itemRenderer?: any;
        itemSizeEstimator?: any;
        itemSizeGetter?: any;
        minSize?: number;
        pageSize?: number;
        scrollParentGetter?: any;
        type: string;
        useStaticSize?: boolean;
        useTranslate3d?: boolean;
        style?: any;
        className?: string;
        customContainer?: any;
        items: any[];
        gap?: number;
        notFillPage?: boolean;
        notLoadOnInit?: boolean;
        initialPage?: number;
        loadPage: (pageNumber: number) => JQueryDeferred<{}>;
        nextPageExists: boolean;
    }
    class ReactListInfiniteScroll extends React.Component<IReactListInfiniteScrollProps, undefined> {
        static readonly DEFAULT_GAP: number;
        static readonly DEFAULT_CONTAINER: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
        protected page: number;
        protected container: any;
        protected loading: LoadingState;
        constructor(props: any);
        componentDidMount(): void;
        componentWillReceiveProps(nextProps: IReactListInfiniteScrollProps): void;
        protected attachContainer: (elem: any) => void;
        loadNextPage: () => void;
        protected fillPage: () => void;
        protected onScroll: (e: React.SyntheticEvent) => void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IPopoverProps {
        isOpen: boolean;
        container?: HTMLElement;
        target?: HTMLElement;
        screenPadding?: number;
        mode?: PopoverMode;
        xShift?: number;
        onClickOutside?: (ev: MouseEvent) => void;
        onEnterPressed?: (ev: KeyboardEvent) => void;
        onEscPressed?: (ev: KeyboardEvent) => void;
        children?: JSX.Element[];
    }
    interface IPopoverState {
        currentTarget: HTMLElement;
        offScreenX: boolean;
        offScreenY: boolean;
        screenPadding: number;
        mode: PopoverMode;
        hideClassName: string;
        positionCalculated: boolean;
    }
    enum PopoverMode {
        Above = 0,
        LeftSide = 1,
    }
    class Popover extends React.Component<IPopoverProps, IPopoverState> {
        private static mPopoversContainer;
        private static getPopoversContainer();
        private root;
        constructor(props: IPopoverProps);
        componentWillUnmount(): void;
        componentWillReceiveProps(nextProps: IPopoverProps, nextContext: any): void;
        private attachStub(elem);
        private onShow();
        private onHide();
        dispose(): JQueryDeferred<any>;
        private onDocumentClick(event);
        private onDocumentKeyDown(ev);
        private subscribeGlobalEvents(keydown, click, position);
        private unsubscribeGlobalEvents(keydown, click, position);
        private onPageScroll();
        private onWindowResize();
        updatePositions(): void;
        private updateTopPosition(target);
        private updateLeftPosition;
        private getLeft(target);
        private getTop(target);
        private renderPopover();
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IPopoverAcceptButtonProps {
        onClick: (ev: React.MouseEvent) => void;
    }
    const PopoverAcceptButton: (props: IPopoverAcceptButtonProps) => JSX.Element;
}
declare namespace WebClient {
    interface IPopoverBoxProps {
        children?: JSX.Element;
    }
    const PopoverBox: (props: IPopoverBoxProps) => JSX.Element;
}
declare namespace WebClient {
    interface IPopoverCancelButtonProps {
        onClick: (ev: React.MouseEvent) => void;
    }
    const PopoverCancelButton: (props: IPopoverCancelButtonProps) => JSX.Element;
}
declare namespace WebClient {
    interface IPopoverCloseButtonProps {
        onClick: (ev: React.MouseEvent) => void;
    }
    const PopoverCloseButton: (props: IPopoverCloseButtonProps) => JSX.Element;
}
declare namespace WebClient {
    interface IPopoverContentProps {
        children?: JSX.Element;
        className?: string;
    }
    const PopoverContent: (props: IPopoverContentProps) => JSX.Element;
}
declare namespace WebClient {
    interface IPopoverHeadProps {
        children?: JSX.Element;
    }
    const PopoverHead: (props: IPopoverHeadProps) => JSX.Element;
}
declare namespace WebClient {
    interface IPopoverOverflowContentProps {
        children?: JSX.Element;
    }
    const PopoverOverflowContent: (props: IPopoverOverflowContentProps) => JSX.Element;
}
declare namespace WebClient {
    interface IPopoverTitleProps {
        children?: JSX.Element;
    }
    const PopoverTitle: (props: IPopoverTitleProps) => JSX.Element;
}
declare namespace WebClient {
    class EditPopover extends React.Component<IEditPopoverProps, IEditPopoverState> {
        private contentRoot;
        private wrapper;
        constructor(props: IEditPopoverProps);
        readonly showing: ICancelableEvent<IEventArgs>;
        readonly shown: IBasicEvent<IEventArgs>;
        readonly accepting: ICancelableEvent<IEventArgs>;
        readonly accepted: IBasicEvent<IEventArgs>;
        readonly canceling: ICancelableEvent<IEventArgs>;
        readonly canceled: IBasicEvent<IEventArgs>;
        readonly hidding: ICancelableEvent<IEventArgs>;
        readonly hidden: IBasicEvent<IEventArgs>;
        static CreatePopover(popoverOptions: IEditPopoverProps): JQueryDeferred<EditPopover>;
        readonly contentElement: HTMLElement;
        show(): JQueryDeferred<any>;
        hide(): void;
        visible: boolean;
        hideByClickOutside: boolean;
        hideByEsc: boolean;
        acceptByEnter: boolean;
        clearContent(): void;
        dispose(): void;
        private onKeyEnter(ev);
        private onKeyEsc(ev);
        private attachContentRoot(elem);
        private hideInternal();
        private accept();
        private cancel();
        private onOkClick();
        private onCancelClick();
        private onClickOutside(ev);
        private renderSaveCancelButtons();
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IEditPopoverProps {
        target: HTMLElement;
        key?: string;
        width?: string;
        maxHeight?: string;
        maxWidth?: string;
        title?: string;
        acceptByEnter?: boolean;
        hideByEsc?: boolean;
        screenPadding?: number;
        className?: string;
        hideByClickOutside?: boolean;
        ignoreModalOutsideClicks?: boolean;
        mode?: PopoverMode;
        xShift?: number;
        forceWidth?: number;
        onMounted: (popover: EditPopover) => void;
    }
}
declare namespace WebClient {
    interface IEditPopoverState {
        waitingState: LoadingState;
        currentTarget: HTMLElement;
        offScreenX: boolean;
        offScreenY: boolean;
        visible: boolean;
        hideByEscOption: boolean;
        acceptByEnterOption: boolean;
        title: string;
        screenPadding: number;
        mode: PopoverMode;
        hideByClickOutside?: boolean;
        ignoreModalOutsideClicks?: boolean;
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
    interface IModalSidebarProps {
        isOpen: boolean;
        children?: JSX.Element;
        stopClickPropogation?: boolean;
    }
    const ModalSidebar: (props: IModalSidebarProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalSidebarCloseButtonProps {
        enabled?: boolean;
        onClick: (ev: React.MouseEvent) => void;
    }
    const ModalSidebarCloseButton: (props: IModalSidebarCloseButtonProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalSidebarHeaderProps {
        className?: string;
        children?: JSX.Element;
    }
    const ModalSidebarHeader: (props: IModalSidebarHeaderProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalDialogProps {
        isOpen: boolean;
        children?: JSX.Element;
        stopClickPropogation?: boolean;
    }
    const ModalDialog: (props: IModalDialogProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalDialogBoxProps {
        children?: JSX.Element;
        defaultWidth?: boolean;
    }
    const ModalDialogBox: (props: IModalDialogBoxProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalDialogButtonPanelProps {
        children?: JSX.Element[];
    }
    const ModalDialogButtonPanel: (props: IModalDialogButtonPanelProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalDialogCloseButtonProps {
        enabled?: boolean;
        onClick: (ev: React.MouseEvent) => void;
    }
    const ModalDialogCloseButton: (props: IModalSidebarCloseButtonProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalDialogContentProps {
        children?: JSX.Element;
    }
    const ModalDialogContent: (props: IModalDialogContentProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalDialogHeaderProps {
        children?: JSX.Element;
    }
    const ModalDialogHeader: (props: IModalDialogHeaderProps) => JSX.Element;
}
declare namespace WebClient {
    interface IModalDialogTopBorderProps {
        color: string;
    }
    const ModalDialogTopBorder: (props: IModalDialogTopBorderProps) => JSX.Element;
}
declare namespace WebClient {
    class MessageBox {
        private static mMessageBoxContainerProvider;
        static lastError: HTMLElement;
        static getMessageBoxContainer(): BodyContainerProvider;
        static ShowError(content: string | JSX.Element, customCaptionText?: string | JSX.Element): JQueryDeferred<any>;
        static ShowInfo(content: string | JSX.Element, customCaptionText?: string | JSX.Element): JQueryDeferred<any>;
        static ShowWarning(content: string | JSX.Element, customCaptionText?: string | JSX.Element): JQueryDeferred<any>;
        static ShowConfirmation(content: string | JSX.Element, customCaptionText?: string | JSX.Element): JQueryDeferred<any>;
        private static Show(content, msgType, customCaptionText?);
        private static renderModalHeader(caption, color, iconClass);
    }
}
declare namespace WebClient {
    interface IAdaptiveMenuBarProps {
        expanded: boolean;
        children?: JSX.Element;
        onClose?: () => void;
    }
    interface IAdaptiveMenuBarState {
        parentEl: HTMLElement;
    }
    class AdaptiveMenuBar extends React.Component<IAdaptiveMenuBarProps, IAdaptiveMenuBarState> {
        popover: Popover;
        constructor(props: IAdaptiveMenuBarProps);
        onCloseMenu: () => void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IAdaptiveMenuItemProps {
        title?: string;
        children?: any;
        onClick?(): void;
        visible?: boolean;
        padding?: boolean;
        name: string;
    }
    const AdaptiveMenuItem: (props: IAdaptiveMenuItemProps) => JSX.Element;
}
declare namespace WebClient {
    interface IDesktopMenuBarProps {
        expanded: boolean;
        children?: JSX.Element;
    }
    const DesktopMenuBar: (props: IDesktopMenuBarProps) => JSX.Element;
}
declare namespace WebClient {
    interface IDesktopMenuItemProps extends IAdaptiveMenuItemProps {
    }
    interface IDesktopMenuItemState {
    }
    class DesktopMenuItem extends React.Component<IDesktopMenuItemProps, IDesktopMenuItemState> {
        protected onKeyDown: (event: __React.KeyboardEvent) => void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IMenuBarItemProps {
        title?: string;
        children?: any;
        onClick?(event: React.MouseEvent): void;
        visible?: boolean;
        className?: string;
        key: string;
        name: string;
    }
    interface IMenuBarProps {
        expanded: boolean;
        children?: JSX.Element;
        className?: string;
    }
    const MenuBar: (props: IMenuBarProps) => JSX.Element;
    const MenuBarItem: (props: IMenuBarItemProps) => JSX.Element;
}
declare namespace WebClient {
    interface IMobileMenuBarProps {
        expanded: boolean;
        children?: JSX.Element;
    }
    const MobileMenuBar: (props: IMobileMenuBarProps) => JSX.Element;
}
declare namespace WebClient {
    interface IMobileMenuItemProps extends IAdaptiveMenuItemProps {
    }
    interface IMobileMenuItemState {
    }
    class MobileMenuItem<P extends IMobileMenuItemProps, S extends IMobileMenuItemState> extends React.Component<P, S> {
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IAdaptiveMenuContentProps {
        children?: JSX.Element;
    }
    const AdaptiveMenuContent: (props: IAdaptiveMenuContentProps) => JSX.Element;
}
declare namespace WebClient {
    interface IDesktopMenuContentProps extends IAdaptiveMenuContentProps {
    }
    const DesktopMenuContent: (props: IDesktopMenuContentProps) => JSX.Element;
}
declare namespace WebClient {
    interface IMobileMenuContentProps extends IAdaptiveMenuContentProps {
    }
    const MobileMenuContent: (props: IMobileMenuContentProps) => JSX.Element;
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IAnimatedItemHideProps {
            level: number;
            children?: any;
        }
        interface IAnimatedItemHideState {
            hide: boolean;
            animatedHide: boolean;
            timeout: number;
        }
        class AnimatedItemHide extends React.Component<IAnimatedItemHideProps, IAnimatedItemHideState> {
            constructor(props: IAnimatedItemHideProps);
            componentWillReceiveProps(newProps: IAnimatedItemHideProps): void;
            render(): JSX.Element;
        }
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IBigItemBoxProps {
            children?: any;
        }
        const BigItemBox: (props: IBigItemBoxProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IBigSpaceGapProps {
            children?: any;
        }
        const BigSpaceGap: (props: IBigSpaceGapProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IItemProps {
            onClick: (event: React.MouseEvent) => void;
            children?: any;
        }
        const Item: (props: IItemProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IItemContentProps {
            selected?: boolean;
            children?: any;
        }
        const ItemContent: (props: IItemContentProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IItemHideToggleProps {
            toggled: boolean;
            children?: any;
            onChange?: (ev: React.FormEvent) => void;
        }
        const ItemHideToggle: (props: IItemHideToggleProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IItemIconProps {
            iconClass: string;
            children?: any;
        }
        const ItemIcon: (props: IItemIconProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IItemLevelIdentProps {
            level: number;
            children?: any;
        }
        const ItemLevelIdent: (props: IItemLevelIdentProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IItemSeparatorProps {
        }
        const ItemSeparator: (props: IItemSeparatorProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface IItemTextProps {
            configuredToHide?: boolean;
            children?: any;
        }
        const ItemText: (props: IItemTextProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface INavigationLinkProps {
            href: string;
            hrefLang?: string;
            target?: string;
            accessKey?: string;
            download?: boolean;
            type?: string;
            tabIndex?: number;
            children?: any;
            onClick?: (ev: MouseEvent) => void;
            disabled?: boolean;
            className?: string;
        }
        class NavigationLink extends React.Component<INavigationLinkProps, any> {
            constructor(props: any);
            private onNavigationLinkClick;
            attachRoot: (elem: HTMLElement) => void;
            render(): JSX.Element;
        }
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        enum OverlapPanelLocation {
            Above = 1,
            Below = 2,
        }
        enum OverlapPanelSize {
            Small = 1,
            Big = 2,
        }
        enum OverlapPanelSide {
            Left = 1,
            Right = 2,
        }
        interface IOverlapPanelProps {
            children?: any;
            location?: OverlapPanelLocation;
            size?: OverlapPanelSize;
            side?: OverlapPanelSide;
        }
        const OverlapPanel: (props: IOverlapPanelProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface ISmalltemBoxProps {
            children?: any;
        }
        const SmalltemBox: (props: ISmalltemBoxProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace MainMenuHelpers {
        interface ISpaceGapProps {
            children?: any;
        }
        const SpaceGap: (props: ISpaceGapProps) => JSX.Element;
    }
}
declare namespace WebClient {
    interface ILoadingIconState {
    }
    interface ILoadingIconProps {
        state: LoadingState;
        className?: string;
        loadingIconClassName?: string;
        errorClassName?: string;
        color?: LoadincIconColor;
    }
    enum LoadincIconColor {
        Blue = 0,
        White = 1,
        Black = 2,
    }
    class LoadingIcon extends React.Component<ILoadingIconProps, ILoadingIconState> {
        constructor(props: ILoadingIconProps);
        getLoadingIconClass(): string;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IDynamicTreeProps extends ITreeBaseProps<IDynamicTreeNodeData> {
        loadNodes: (parentNode?: ITreeNodeData) => JQueryDeferred<IDynamicTreeNodeData[]>;
        className?: string;
        expandedByDefault?: boolean;
    }
    interface IDynamicTreeState extends ITreeBaseState {
        tree?: Tree;
        rootLoading?: LoadingState;
    }
    class DynamicTree extends TreeBase<IDynamicTreeNodeData, IDynamicTreeProps, IDynamicTreeState> {
        constructor(props: IDynamicTreeProps);
        componentDidMount(): void;
        toggleNode(node: TreeNode, expand: boolean, raiseEvent?: boolean): void;
        protected createNode(data: ITreeNodeData, level: number, parent: TreeNode, children?: TreeNode[]): DynamicTreeNode;
        protected renderToggleMarker(node: TreeNode): JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class DynamicTreeNode extends TreeNode {
        loading: LoadingState;
        constructor(data: IDynamicTreeNodeData, level: number, parent: TreeNode, children?: TreeNode[]);
        readonly dynamicChildren: DynamicTreeNode[];
        childrenLoaded: boolean;
        readonly iconClass: string;
    }
}
declare namespace WebClient {
    interface IDynamicTreeNodeData extends ITreeNodeData {
        childrenLoaded: boolean;
    }
}
declare namespace WebClient {
    interface ILoadNodesResult {
        nodes: ITreeNodeData[];
        treeLevelDown: number;
    }
}
declare namespace WebClient {
    class FieldNameAccessor<NodeT, ValueT> implements IAccessor<NodeT, ValueT> {
        fieldName: string;
        constructor(key: FieldSpec<NodeT, ValueT>);
        get(node: NodeT): ValueT;
        set(node: NodeT, value: ValueT): void;
    }
}
declare namespace WebClient {
    class FuncAccessor<NodeT, ValueT> implements IAccessor<NodeT, ValueT> {
        private getter;
        private setter;
        constructor(getter: (node: NodeT) => ValueT, setter: (node: NodeT, value: ValueT) => void);
        get(node: NodeT): ValueT;
        set(node: NodeT, value: ValueT): void;
    }
}
declare namespace WebClient {
    interface IAccessor<NodeT, ValueT> extends IReadonlyAccessor<NodeT, ValueT> {
        get(node: NodeT): ValueT;
        set(node: NodeT, value: ValueT): void;
    }
}
declare namespace WebClient {
    interface IReadonlyAccessor<NodeT, ValueT> {
        get(node: NodeT): ValueT;
    }
}
declare namespace WebClient {
    class MapMetaStore<NodeT, ValueT> implements IAccessor<NodeT, ValueT> {
        getId: (node: NodeT) => string;
        private store;
        constructor(getId: (node: NodeT) => string);
        get(node: NodeT): ValueT;
        set(node: NodeT, value: ValueT): void;
    }
}
declare namespace WebClient {
    interface IDisclosureProps {
        header: string;
        expanded: boolean;
        onClick(event: React.MouseEvent): void;
        visible?: boolean;
        collapsible?: boolean;
        children?: any;
        style?: React.CSSProperties;
        className?: string;
    }
    const DisclosureHead: (props: IDisclosureProps) => JSX.Element;
}
declare namespace WebClient {
    class DisclosureBody extends React.Component<IDisclosureBodyProps, IDisclosureBodyState> {
        protected refItems: HTMLElement;
        constructor(props: IDisclosureBodyProps);
        componentWillReceiveProps(nextProps: IDisclosureBodyProps, nextContext: any): void;
        toggleCollapsed(duration?: number, easing?: string, animate?: boolean): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
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
    interface IDisclosureBodyState {
        expanded: boolean;
        intialState: boolean;
    }
}
declare namespace WebClient {
    interface ICustomTreeLevelIndentProps {
        level?: number;
        levelIndent?: string;
    }
    class CustomTreeLevelIndent extends React.Component<ICustomTreeLevelIndentProps, undefined> {
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ICustomTreeNodeProps {
        tabIndex?: boolean;
        disabled?: boolean;
        level?: number;
        levelIndent?: string;
        onClick?: () => void;
        children?: JSX.Element;
    }
    class CustomTreeNode extends React.Component<ICustomTreeNodeProps, undefined> {
        onClick: () => void;
        readonly tabIndex: number;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    enum VisitResult {
        Continue = 0,
        Stop = 1,
    }
    type RecursiveVisitorCallback<NodeT> = (node: NodeT, parent?: NodeT, level?: number) => VisitResult | void;
    class RecursiveVisitor<NodeT> {
        children: IReadonlyAccessor<NodeT, NodeT[]>;
        constructor(children: IReadonlyAccessor<NodeT, NodeT[]>);
        visitDeep(node: NodeT, visitor: RecursiveVisitorCallback<NodeT>, parent?: NodeT, currentLevel?: number): VisitResult | void;
        visitWide(node: NodeT, visitor: RecursiveVisitorCallback<NodeT>, parent?: NodeT, currentLevel?: number): VisitResult | void;
        visitWideInternal(visitor: RecursiveVisitorCallback<NodeT>, node: NodeT, currentLevel?: number): VisitResult | void;
        getFlatTree<T>(tree: NodeT[], onVisitNode?: (node: NodeT) => boolean): NodeT[];
    }
}
declare namespace WebClient {
    const CustomTreeDefault: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & {
        className: string;
    }, any, React.HTMLProps<HTMLDivElement>>;
}
declare namespace WebClient {
    interface ICustomTreeNodeContentDefaultProps {
        selected?: boolean;
        className?: string;
        keepButtonStyles?: boolean;
    }
    const CustomTreeNodeContentCompact: styled.StyledComponentClass<React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps & {
        className: string;
    }, any, React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps>;
}
declare namespace WebClient {
    interface ICustomTreeNodeContentDefaultProps {
        selected?: boolean;
        className?: string;
        keepButtonStyles?: boolean;
    }
    const CustomTreeNodeContentDefault: styled.StyledComponentClass<React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps & {
        className: string;
    }, any, React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps>;
}
declare namespace WebClient {
    interface ICustomTreeNodeIconDefaultProps {
    }
    const CustomTreeNodeIconDefault: styled.StyledComponentClass<React.HTMLProps<HTMLSpanElement> & ICustomTreeNodeIconDefaultProps, any, React.HTMLProps<HTMLSpanElement> & ICustomTreeNodeIconDefaultProps>;
}
declare namespace WebClient {
    interface ICustomTreeNodeLoadingIconDefaultProps {
        className?: string;
    }
    const CustomTreeNodeLoadingIconDefault: styled.StyledComponentClass<React.HTMLProps<HTMLSpanElement> & ICustomTreeNodeIconDefaultProps & {
        className: string;
    }, any, React.HTMLProps<HTMLSpanElement> & ICustomTreeNodeIconDefaultProps>;
}
declare namespace WebClient {
    interface ICustomTreeNodeTextDefaultProps {
        className?: string;
        children?: JSX.Element;
    }
    const CustomTreeNodeTextDefault: styled.StyledComponentClass<React.HTMLProps<HTMLSpanElement> & ICustomTreeNodeTextDefaultProps, any, React.HTMLProps<HTMLSpanElement> & ICustomTreeNodeTextDefaultProps>;
}
declare namespace WebClient {
    interface ICustomTreeNodeTogglerProps {
        visible?: boolean;
        expanded?: boolean;
        className?: string;
        expandedClass?: string;
        collapsedClass?: string;
        onClick?: () => void;
    }
    class CustomTreeNodeToggler extends React.Component<ICustomTreeNodeTogglerProps, undefined> {
        render(): JSX.Element;
    }
    const CustomTreeNodeTogglerDefault: styled.StyledComponentClass<ICustomTreeNodeTogglerProps, any, ICustomTreeNodeTogglerProps>;
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
    interface IExtendedControlSelectorProps extends IControlSelectorProps {
        operations: IEditOperation[];
    }
}
declare namespace WebClient {
    class CommandBar extends React.Component<ICommandBarProps, ICommandBarState> {
        constructor(props: ICommandBarProps);
        componentWillReceiveProps(nextProps: ICommandBarProps, nextContext: any): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ICommandBarItemProps {
        title?: string;
        children?: any;
        onClick(event: React.MouseEvent): void;
        visible?: boolean;
        key: string;
        name?: string;
    }
    const CommandBarItem: (props: ICommandBarItemProps) => JSX.Element;
}
declare namespace WebClient {
    interface ICommandBarProps {
        expanded: boolean;
        children?: JSX.Element;
        className?: string;
    }
}
declare namespace WebClient {
    interface ICommandBarState {
        expandInProgress: boolean;
    }
}
declare namespace WebClient {
    interface IComboBoxBodyProps {
        className?: string;
        disabled?: boolean;
        expanded: boolean;
        boundaryTarget?: HTMLElement | string;
        onClose?: () => void;
    }
    class ComboBoxBody extends React.Component<IComboBoxBodyProps, undefined> {
        el: HTMLElement;
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected onDocumentClick: (event: MouseEvent) => void;
        protected onDocumentKeyDown: (e: any) => void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IComboBoxElementProps {
        className?: string;
        tabIndex?: boolean;
        disabled?: boolean;
        selected?: boolean;
        focused?: boolean;
        onSelect?: () => void;
        onFocus?: (event: React.FocusEvent) => void;
        onBlur?: (event: React.FocusEvent) => void;
        onFocusNext?: () => void;
        onFocusPrev?: () => void;
    }
    class ComboBoxElement extends React.Component<IComboBoxElementProps, undefined> {
        el: HTMLElement;
        componentDidMount(): void;
        componentWillReceiveProps(nextProps: IComboBoxElementProps): void;
        protected onSelect: () => void;
        protected onKeyDown: (e: __React.KeyboardEvent) => void;
        readonly tabIndex: number;
        focus: () => void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IResetedElement {
        wasReset: boolean;
        element: IComboBoxElement;
    }
    class ComboBoxHelper {
        static resetElementIfNotExists(element: IComboBoxElement, elements: IComboBoxElement[], allowEmpty?: boolean, emptyElement?: IComboBoxElement): IResetedElement;
        static resetElement(elements: IComboBoxElement[], allowEmpty?: boolean, emptyElement?: IComboBoxElement): IComboBoxElement;
        static createEmptyElement: (defaultTitle?: string) => IComboBoxElement;
    }
}
declare namespace WebClient {
    interface IComboBoxTitleProps {
        className?: string;
        disabled?: boolean;
        tabIndex?: boolean;
        expanded?: boolean;
        onClick?: () => void;
        onFocus?: (event: React.FocusEvent) => void;
        onBlur?: (event: React.FocusEvent) => void;
    }
    class ComboBoxTitle extends React.Component<IComboBoxTitleProps, undefined> {
        el: HTMLAnchorElement;
        onClick: () => void;
        onKeyDown: (e: __React.KeyboardEvent) => void;
        readonly tabIndex: number;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IComboBoxWrapperProps {
        className?: string;
        disabled?: boolean;
    }
    class ComboBoxWrapper extends React.Component<IComboBoxWrapperProps, undefined> {
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ICommonComboBoxProps {
        elements: IComboBoxElement[];
        selectedID?: string;
        defaultTitle?: string;
        allowEmpty?: boolean;
        strictMode?: boolean;
        disabled?: boolean;
        expanded?: boolean;
        tabIndex?: boolean;
        className?: string;
        onChange?: (element: IComboBoxElement) => void;
        renderWrapper?: (title: JSX.Element, body: JSX.Element) => JSX.Element;
        renderTitle?: (element: IComboBoxElement) => JSX.Element | string;
        renderElementList?: (elements: JSX.Element[]) => JSX.Element | JSX.Element[] | string;
        renderElement?: (element: IComboBoxElement, selected: boolean) => JSX.Element | string;
    }
    interface ICommonComboBoxState {
        expanded: boolean;
    }
    class CommonComboBox extends React.Component<ICommonComboBoxProps, ICommonComboBoxState> {
        el: HTMLElement;
        focusedElement: IComboBoxElement;
        constructor(props: ICommonComboBoxProps);
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: ICommonComboBoxProps): void;
        protected onElementSelected: (selectedID: string) => void;
        protected getElementByID: (id: string, disableFallbackToEmptyElement?: boolean, props?: ICommonComboBoxProps) => IComboBoxElement;
        protected onFocusElement: (element: IComboBoxElement) => IComboBoxElement;
        protected onBlurElement: (element: IComboBoxElement) => any;
        protected onFocusSiblingElement: (element: IComboBoxElement, mode: "next" | "prev") => void;
        protected createElementList(): JSX.Element[];
        protected renderTitle(): JSX.Element;
        protected renderBody(): JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IComboBoxBodyContentProps {
        className?: string;
        children?: JSX.Element;
    }
    class ComboBoxBodyContent extends React.Component<IComboBoxBodyContentProps, undefined> {
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IComboBoxElementContentProps {
        className?: string;
        children?: JSX.Element;
    }
    class ComboBoxElementContent extends React.Component<IComboBoxElementContentProps, undefined> {
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IComboBoxTitleContentProps {
        className?: string;
        children?: JSX.Element;
    }
    class ComboBoxTitleContent extends React.Component<IComboBoxTitleContentProps, undefined> {
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IComboBoxWrapperContentProps {
        className?: string;
        title?: JSX.Element;
        body?: JSX.Element;
    }
    class ComboBoxWrapperContent extends React.Component<IComboBoxWrapperContentProps, undefined> {
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IComboBoxElement {
        id: string;
        title: string;
        disabled?: boolean;
        data?: any;
    }
}
declare namespace WebClient {
    namespace Breadcrumbs {
        interface IBreadcrumbsItemProps {
            className?: string;
            style?: React.CSSProperties;
            tabIndex?: number;
            children?: JSX.Element;
            onClick?: () => void;
            disabled?: boolean;
            onFocus?: (ev?) => void;
            onBlur?: (ev?) => void;
        }
        const ButtonItem: (props: IBreadcrumbsItemProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace Breadcrumbs {
        const SimpleItemView: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & {
            className: string;
        }, any, React.HTMLProps<HTMLDivElement>>;
    }
}
declare namespace WebClient {
    namespace Breadcrumbs {
        interface ISimpleItemViewWithSeparatorProps {
            className?: string;
            first: boolean;
            title?: string;
            children?: JSX.Element;
        }
        const SimpleItemViewWithSeparator: (props: ISimpleItemViewWithSeparatorProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace Breadcrumbs {
        const SimpleSeparator: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & {
            className: string;
        }, any, React.HTMLProps<HTMLDivElement>>;
    }
}
declare namespace WebClient {
    namespace Breadcrumbs {
        const LinkItemView: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & {
            className: string;
        }, any, React.HTMLProps<HTMLDivElement>>;
    }
}
declare namespace WebClient {
    namespace Breadcrumbs {
        interface ILinkItemViewWithSeparatorProps {
            className?: string;
            first: boolean;
            title?: string;
            children?: JSX.Element;
        }
        const LinkItemViewWithSeparator: (props: ILinkItemViewWithSeparatorProps) => JSX.Element;
    }
}
declare namespace WebClient {
    namespace Breadcrumbs {
        const LinkSeparator: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & {
            className: string;
        }, any, React.HTMLProps<HTMLDivElement>>;
    }
}
declare namespace WebClient {
    interface IDevicesVisibilityProps {
        devices: DeviceType[];
        children?: JSX.Element;
    }
    const DevicesVisibility: (props: IDevicesVisibilityProps) => JSX.Element;
}
declare namespace WebClient {
    enum DateFormats {
        Date = 0,
        Time = 1,
        DateTime = 2,
    }
}
declare namespace WebClient {
    enum EditMode {
        EditInPlace = 0,
        View = 1,
        Edit = 2,
    }
}
declare namespace WebClient {
    class KeyCodes {
        static readonly ARROW_UP: number;
        static readonly ARROW_DOWN: number;
        static readonly ARROW_RIGHT: number;
        static readonly ARROW_LEFT: number;
        static readonly ESC: number;
        static readonly ENTER: number;
        static readonly SPACE: number;
        static readonly BACKSPACE: number;
    }
}
declare namespace WebClient {
    interface LayoutControlType {
        new (props: any): LayoutControl;
    }
    class LayoutControlFactory {
        protected controlMap: IControlMap;
        register(name: string, createFunction: () => LayoutControlType, replaceExisting?: boolean): void;
        get(name: string): LayoutControlType;
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
        static Loading: LoadingState;
        static None: LoadingState;
        constructor(status?: LoadingStatus, message?: string);
        readonly loading: boolean;
        readonly error: boolean;
        readonly done: boolean;
        readonly none: boolean;
        update(status: LoadingStatus, message?: string): void;
        status: LoadingStatus;
        message: string;
    }
}
declare namespace WebClient {
    class PopupNotification {
        static getDefaultOptions: () => Noty.Options;
        static create(options: Noty.Options, show?: boolean): Noty;
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
    function getFunctionByNameEx(name: string): any;
    function bubbleSort<T>(items: T[], comparator: (x1: T, x2: T) => number): T[];
    function newValueIfUndefined(variable: any, newValue: any): any;
    function slideAnimation(elem: HTMLElement, isSlideUp: boolean, duration?: number, easing?: string, completeCallback?: Function): void;
    function slideAnimations(items: NodeListOf<Element>, isSlideUp: boolean, duration?: number, easing?: string, completeCallback?: Function, endCallback?: Function): void;
    function renderModalContent(window: WebClient.ModalWindow, content: JSX.Element, showCloseButton?: boolean): void | Element | React.Component<any, React.ComponentState>;
    const DISPLAY_NAME_PROPERTY_NAME_KEY = "DisplayNamePropertyName";
    function getBindingResult(binding: IBindingResult<any>, value: any, fieldSpec: FieldSpec<any, any>): IBindingResult<any>;
    const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
    function isEmptyGuid(guid: string): boolean;
    function attachTooltip(text: string, extraOptions?: Object): (elem: HTMLElement) => any;
    function attachTooltipFromContent(extraOptions?: Object): (elem: HTMLElement) => void;
    function setTooltip(elem: HTMLElement, text: string, extraOptions?: any): void;
    function generateGuid(): string;
    function MakeDeferred<T>(job: (resolve: (data: T) => JQueryDeferred<T> | void, reject: (err: any) => JQueryDeferred<T> | void) => void): JQueryDeferred<T>;
    function ResolvedDeferred<T>(data: T): JQueryDeferred<T>;
    type FieldSpec<TModel, TResult> = ((model?: TModel) => TResult) | string;
    function getFieldName<TModel, TResult>(fieldSpec: FieldSpec<TModel, TResult>): string;
    function parseBoolean(value: string | null | undefined | boolean, defaultValue?: boolean): boolean;
    function parseNumber(value: string | null | undefined | number, defaultValue?: number): number;
    function definedNotNull(val: any): boolean;
    function colorLuminance(hex: string, lum: number): string;
    function caculateTransparentColor(foregroundColor: any, backgroundColor: any, opacity: any): string;
    function toStringDate(date: Date): string;
    function capitalizeFirstLetter(string: any): any;
    function getInnerSize(): number[];
    function getViewCardUrl(id: string): string;
    function chunkString(str: string, length: number): string[];
    function splitFirstSymbol(str: string, symbol: string): string[];
    function getDeviceName(enumValue: DeviceType): string;
    function printContent(content: string): void;
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
        resolveUrlPart(urlPart: string): string;
        resolveUrl(action: string, controller: string, isApi?: boolean): string;
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
    function action(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
    function apiAction(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
    function controllerAction(url: string): (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
    function arg(name: string): (target: Object, propertyKey: string, parameterIndex: number) => void;
    function postData(target: Object, propertyKey: string, parameterIndex: number): void;
    var ServiceActionPostDataArgumentName: string;
    function controller(name: string): (target: Object) => void;
}
declare namespace WebClient {
    enum RequestMethods {
        Post = 0,
        Get = 1,
    }
}
declare namespace WebClient {
    interface IServiceActionParameterInfo {
        index: number;
        name: string;
    }
}
declare namespace WebClient {
    class IRequestInfo {
        url: string;
        data: any;
        method: RequestMethods;
    }
}
declare namespace WebClient {
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
    class ServiceActionMetaData {
        type: string;
        url: string;
        parametersInfo: [IServiceActionParameterInfo];
    }
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
        message: string;
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
    class RequestHelper {
        private mLoadingState;
        private mLastQuery;
        private mStateChanged;
        private mLoaderDelay;
        private mPreventConcurentQueries;
        constructor(onStateChanged?: (state?: LoadingState) => void, loaderDelay?: number, preventConcurent?: boolean);
        send<T>(sendFunc: () => JQueryDeferred<T>, done: (data: T) => void, fail?: (err) => void): LoadingState;
        readonly stateChanged: IBasicEvent<LoadingState>;
        readonly state: LoadingState;
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
    interface ILayoutContainerMap {
        [layoutPositionName: string]: LayoutContainer;
    }
}
declare namespace WebClient {
    interface ILayoutContainerParams {
        rootElementId: string;
        positionName: string;
        unmountCallback: (positionName: string) => void;
        layoutCardModel: ILayoutCardModel;
    }
}
declare namespace WebClient {
    class LayoutContainer {
        private readonly layoutContainerParams;
        private layoutResolver;
        private initialized;
        readonly layout: Layout;
        readonly PositionName: string;
        readonly rootElementId: string;
        readonly rootElement: HTMLElement;
        readonly layoutCardModel: ILayoutCardModel;
        constructor(layoutContainerParams: ILayoutContainerParams);
        destroy(): JQueryDeferred<any>;
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
    class CommonBuiltInOperations {
        static Delete: string;
        static Write: string;
    }
}
declare namespace WebClient {
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
    interface IEditOperation {
        id: string;
        builtInId?: string;
        caption: string;
        available: boolean;
    }
}
declare namespace WebClient {
    interface IEditOperationMap {
        [id: string]: IEditOperation;
    }
}
declare namespace WebClient {
    interface IEditOperationStore {
        available(id: string): boolean;
        availableBuiltIn(builtInOperationId: string): boolean;
        get(id: string): IEditOperation;
        getAll(): IEditOperation[];
    }
}
declare namespace WebClient {
    class ControlStore {
        protected controlCollection: ControlWrapperMap;
        protected controlsList: LayoutControl[];
        readonly controls: ControlWrapperMap;
        add(nameSrc: string, control: LayoutControl): LayoutControl;
        remove(name: string): void;
        removeControl(control: LayoutControl): void;
        onSaving(): JQueryDeferred<any>;
        onSaved(): JQueryDeferred<any>;
        protected collectControlData(func: (control: LayoutControl) => void): void;
        protected callSaveCallbacks(beforeSave: boolean): JQueryDeferred<any>;
    }
}
declare namespace WebClient {
    type LayoutControlWrapper = ApiControlWrapper<any, any>;
    class ApiControlWrapper<P extends BaseControlParams, S extends BaseControlState> {
        control: BaseControl<P, S>;
    }
}
declare namespace WebClient {
    class ControlWrapperMap {
        [name: string]: any;
        get<T extends LayoutControl | LayoutControl[]>(name: string): T;
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
    interface IControlMap {
        [name: string]: () => LayoutControlType;
    }
}
declare namespace WebClient {
    interface IControlWrapperMap {
        [name: string]: LayoutControl | LayoutControl[];
    }
}
declare namespace WebClient {
    interface IProxyControl {
        isProxyControl: boolean;
        renderProxyChildren(): JSX.Element[];
    }
}
declare namespace WebClient {
    enum BublingEventResult {
        Continue = 0,
        StopPropogation = 1,
    }
    interface IBublingEventInfo {
        name?: string;
        bubling: boolean;
    }
    type BublingEventCallback = (actualSender: ISupportEventBubling, args: IEventArgs) => BublingEventResult | void;
    interface ISupportEventBubling {
        supportEventBubling: boolean;
        getEventInfo<T>(event: IBasicEvent<T>): IBublingEventInfo;
        triggerBublingEvent<T>(eventName: string, actualSender: ISupportEventBubling, args: T): any;
        subscribteToBublingEvent(eventName: string, callback: BublingEventCallback): any;
        unsubscribteToBublingEvent(eventName: string, callback: BublingEventCallback): any;
    }
}
declare namespace WebClient {
    interface IServerErrorResponse {
        ExceptionMessage?: string;
        ExceptionType?: string;
        Message?: string;
        StackTrace?: string;
    }
    class ServerError {
        message: string;
        type: string;
        stack: string;
        constructor(message: string, type: string, stack: string);
        static fromResponse(data: IServerErrorResponse): ServerError;
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
declare var cardTypesRaw: WebClient.ICardTypeRawMap;
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
    interface ICardTypeRaw {
        Name: string;
    }
}
declare namespace WebClient {
    interface ICardTypeRawMap {
        [id: string]: ICardTypeRaw;
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
        controlName: string;
        actualControlName: string;
        controlTypeName: string;
        bindingResults: IBindingResult<any>[];
    }
}
declare namespace WebClient {
    function api(target: Object, propertyKey: string | symbol): void;
    function isPublicApi(control: BaseControl<any, any>, propertyKey: string): boolean;
}
declare namespace WebClient {
    function bubling(target: Object, propertyKey: string | symbol): void;
    function isBublingEvent(control: any, propertyKey: string): boolean;
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
    function at<T>(typeName: {
        new (): T;
    }): T;
}
declare namespace WebClient {
    function r(target: Object, propertyKey: string | symbol): void;
    function isReadonly(control: any, propertyKey: string): boolean;
}
declare namespace WebClient {
    function rw(target: Object, propertyKey: string | symbol): void;
    function isReadWrite(control: any, propertyKey: string): boolean;
}
declare namespace WebClient {
    class BaseControlParams {
        parent: BaseControl<BaseControlParams, BaseControlState>;
        controlTypeName?: string;
        name?: string;
        standardCssClass?: string;
        customCssClasses?: string;
        visibility?: boolean;
        tabStop?: boolean;
        compactMode?: boolean;
        customCssStyle?: React.CSSProperties;
        isLoaded?: boolean;
        click?: BasicApiEvent<any>;
        mouseOver?: BasicApiEvent<IMouseOverEventArgs>;
        mouseOut?: BasicApiEvent<IMouseOutEventArgs>;
        focus?: BasicApiEvent<IFocusEventArgs>;
        blur?: BasicApiEvent<IBlurEventArgs>;
        loaded?: BasicApiEvent<IEventArgs>;
        unloading?: CancelableApiEvent<IEventArgs>;
        wrapper?: BaseControl<BaseControlParams, BaseControlState>;
    }
    interface BaseControlState extends BaseControlParams {
        layout: Layout;
    }
    type LayoutControl = BaseControl<BaseControlParams, any>;
    abstract class BaseControl<P extends BaseControlParams, S extends BaseControlState> extends React.Component<P, S> implements ISupportEventBubling {
        protected shouldUpdate: boolean;
        private paramsObject;
        private propertyGetHandlers;
        private propertySetHandlers;
        private controlImplRef;
        private bublingEventSubscribers;
        constructor(props: P);
        protected abstract createParams(): P;
        protected getParams(): P;
        init(): void;
        deinit(): void;
        abstract render(): any;
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected unregisterChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected registerControl(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected unregisterControl(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected controlImpl: BaseControlImpl<BaseControlParams, BaseControlImplState>;
        save(): JQueryDeferred<any>;
        readonly params: P;
        protected attachControl(control: any): void;
        componentWillMount(): void;
        componentDidMount(): void;
        readonly layout: Layout;
        readonly parent: BaseControl<BaseControlParams, BaseControlState>;
        componentWillUnmount(): void;
        componentWillReceiveProps(nextProps: P, nextContext: any): void;
        componentDidUpdate(): void;
        forceUpdate(callBack?: () => any): void;
        batchUpdate(updateLogic: Function, callback?: () => any): void;
        protected getApiProperties(): IApiPropertyDescriptor[];
        private readonly isLoaded;
        onSaving(): JQueryDeferred<any>;
        onSaved(): JQueryDeferred<any>;
        getBindingsWriteRequests(withChildren?: boolean): IBindingsWriteRequest[];
        protected getBindings(): IBindingResult<any>[];
        validate(params: any): IValidationResult[];
        protected registerParamHandlers(): void;
        getParamValue(paramName: string): any;
        protected setParamValues(newProps: BaseControlParams, initial: boolean): void;
        setParamValue(paramName: string, value: any, initial: boolean): void;
        protected setEventValue(paramName: string, val: BasicEventHandler<any> | string, initial: boolean): void;
        protected setupParamsAccessors(): void;
        readonly supportEventBubling: boolean;
        getEventInfo<T>(event: any): IBublingEventInfo;
        triggerBublingEvent<T>(eventName: string, actualSender: ISupportEventBubling, args: T): void;
        subscribteToBublingEvent(eventNameSpec: string | FieldSpec<any, any>, callback: BublingEventCallback): void;
        unsubscribteToBublingEvent(eventNameSpec: string | FieldSpec<any, any>, callback: BublingEventCallback): void;
    }
}
declare namespace WebClient {
    class EmptyControlStubParams extends BaseControlParams {
        standardCssClass?: string;
    }
    class EmptyControlStub extends BaseControl<BaseControlParams, any> {
        protected createParams(): EmptyControlStubParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class LayoutScriptParams extends BaseControlParams {
    }
    abstract class LayoutScript<ParamsT extends LayoutScriptParams> extends BaseControl<ParamsT, any> {
        constructor(props: ParamsT);
        componentWillMount(): void;
        render(): any;
    }
}
declare namespace WebClient {
    class InputBasedControlParams<ModelT> extends BaseControlParams {
        value?: ModelT;
        canEdit?: boolean;
        modalMode?: boolean;
        default?: any;
        editMode?: EditMode;
        tip?: string;
        placeHolder?: string;
        labelText?: string;
        showEmptyLabel?: boolean;
        required?: boolean;
        wrapLongValueUnderLabel?: boolean;
        isEditDialogShown?: boolean;
        dataChanged?: BasicApiEvent<IDataChangedEventArgsEx<ModelT>>;
        inPlaceEditOpeninig?: CancelableApiEvent<IEventArgs>;
        inPlaceEditOpened?: BasicApiEvent<IEventArgs>;
        inPlaceEditClosinig?: CancelableApiEvent<IEventArgs>;
        inPlaceEditClosed?: BasicApiEvent<IEventArgs>;
        editPopoverAccepting?: CancelableApiEvent<any>;
        editInPlaceCreatorControlName?: string;
    }
    interface InputBasedControlState<ModelT> extends InputBasedControlParams<ModelT>, BaseControlState {
    }
    abstract class InputBasedControl<ModelT, P extends InputBasedControlParams<ModelT>, S extends InputBasedControlState<ModelT>> extends BaseControl<P, S> {
        constructor(props: P);
        private defaultValue;
        private readonly myControlImpl;
        canShowEditDialog(): boolean;
        showEditDialog(): void;
        hideEditDialog(): void;
        hasValue(): boolean;
        validate(params: IValidationParams): IValidationResult[];
        componentDidMount(): void;
        private readonly myGenericControlImpl;
        onEditPopoverAccepting(sender: any, event: ICancelableEventArgs<IEventArgs>): void;
        protected getParamsToKeep(params: P): {
            value: ModelT;
        };
        getBindingsWriteRequests(): IBindingsWriteRequest[];
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
        protected binding: IBindingResult<string>;
        protected getBindings(): IBindingResult<string>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface BaseControlImplState extends BaseControlParams {
    }
    abstract class BaseControlImpl<P extends BaseControlParams, S extends BaseControlImplState> extends React.Component<P, S> {
        protected componentDOMNode: Element;
        private propertyHandlers;
        private SPACE_KEY_CODE;
        private changedParams;
        constructor(props: P);
        protected onFocusedKeyDown(event: React.KeyboardEvent, handler: () => void): void;
        protected registerPropHandlers(): void;
        protected abstract renderControl(): any;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: P, nextContext: any): void;
        getParamValue(paramName: string): any;
        prepareSetParamValue(propName: string): void;
        setParamValue(propName: string, newVal: any, initial: boolean): void;
        protected handleClick(event: React.MouseEvent): void;
        protected handleMouseOver(event: React.MouseEvent): void;
        protected handleMouseOut(event: React.MouseEvent): void;
        protected handleFocus(event: React.FocusEvent): void;
        protected handleBlur(event: React.FocusEvent): void;
        protected getCssClass(): string;
        protected getCssStyle(): React.CSSProperties;
        protected getTabIndex(): 0 | -1;
        protected getInnerControlFullName(innerControlName: string): string;
        renderControlRoot(controlContent: any): JSX.Element;
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
        editPopover: EditPopover;
        containingEditPopover: EditPopover;
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
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
        protected onEditPopoverShowed(control: InputBasedControlImpl<any, PropsT, StateT>): void;
        componentWillUnmount(): void;
        componentWillMount(): void;
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
        protected setValueInternal(value: ModelT): void;
        protected getValue(): ModelT;
        protected getEditAvailable(): boolean;
        protected initEditPopover(popover: EditPopover): void;
        protected renderEditPopover(popover: EditPopover): InputBasedControl<ModelT, PropsT, StateT>;
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
    interface TextBoxState extends TextBoxParams, TextControlBaseState {
    }
    class TextBox extends TextControlBase<TextBoxParams, TextBoxState> {
        protected createParams(): TextBoxParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface TextBoxImplState extends TextControlBaseImplState, TextBoxParams {
    }
    class TextBoxImpl extends TextControlBaseImpl<TextBoxParams, TextBoxImplState> {
        constructor(props: TextBoxParams);
        protected renderInto(props: TextBoxParams, container: HTMLElement): TextBox;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
    }
}
declare namespace WebClient {
    class TextAreaParams extends TextControlBaseParams {
        standardCssClass?: string;
    }
    interface TextAreaState extends TextAreaParams, TextControlBaseState {
    }
    class TextArea extends TextControlBase<TextAreaParams, TextAreaState> {
        protected createParams(): TextAreaParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface TextAreaImplState extends TextControlBaseImplState, TextAreaState {
    }
    class TextAreaImpl extends TextControlBaseImpl<TextAreaParams, TextAreaImplState> {
        constructor(props: TextAreaParams);
        protected setValue(value: string, redraw: boolean): void;
        protected renderInput(): JSX.Element;
        protected renderInto(props: TextAreaParams, container: HTMLElement): TextArea;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
        protected attachInput(inputElem: any): void;
    }
}
declare namespace WebClient {
    interface TextAreaAutosize {
        autosize(el: Element): void;
    }
}
declare namespace WebClient {
    class TasksTreeParams extends BaseControlParams {
        standardCssClass?: string;
        taskCardId?: string;
        buttonText?: string;
        displayMode?: TasksTreeDisplayMode;
        maxGroupTaskNumber: number;
        taskGroupWithOneTaskDisplayMode: TaskGroupWithOneTaskDisplayMode;
        viewKinds: string[];
        nodeResolveService: TasksTreeNodeResolveService;
        colors: ITasksTreeColorMap;
        groups: ITasksTreeGroupMap;
        options: vis.Options;
    }
    interface ITasksTreeState extends TasksTreeParams, BaseControlState {
        isTreeVisible: boolean;
        isFullTreeLoaded: boolean;
        isCurrentTaskFocused: boolean;
        isOverdueFiltered: boolean;
        isImportantFiltered: boolean;
        isOnControlFiltered: boolean;
        isShowBranchFiltered: boolean;
    }
    class TasksTree extends BaseControl<TasksTreeParams, ITasksTreeState> {
        constructor(props: TasksTreeParams);
        private binding;
        private viewKindsBinding;
        protected createParams(): TasksTreeParams;
        private getDefaultVisOptions();
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ITasksTreeImplState extends BaseControlImplState, ITasksTreeState {
        tasksTreeModel: ITasksTreeModel;
    }
    class TasksTreeImpl extends BaseControlImpl<TasksTreeParams, ITasksTreeImplState> {
        tasksTreeContainer: TasksTreeContainer;
        constructor(props: TasksTreeParams);
        private loadFullTreeHandler();
        componentDidMount(): void;
        private сurrentTaskFocusHandler();
        private overdueHandler();
        private importantHandler();
        private onControlHandler();
        private showBranchHandler();
        private collapseAllHandler();
        private expandAllHandler();
        private refreshHandler();
        private loadTasksTree(fullTree);
        private getTasksTree(fullTree);
        private onTasksTreeClick;
        private showTreeModal;
        private hideTreeModal;
        renderControl(): JSX.Element;
        private renderTreeModal();
        private renderTreeContent();
    }
}
declare namespace WebClient {
    interface ITasksTreeRibbon extends ITasksTreeImplState {
        onLoadFullTreeClick: () => void;
        onCurrentTaskFocusClick: () => void;
        onOverdueClick: () => void;
        onImportantClick: () => void;
        onControlClick: () => void;
        onShowBranchClick: () => void;
        onCollapseAllClick: () => void;
        onExpandAllClick: () => void;
        onRefreshClick: () => void;
    }
    const TasksTreeRibbon: (props: ITasksTreeRibbon) => JSX.Element;
}
declare namespace WebClient {
    interface IInnerWindowProps {
        className?: string;
        children?: JSX.Element;
        width?: number;
        top?: number;
        left?: number;
        visible?: boolean;
    }
    const InnerWindow: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & IInnerWindowProps & {
        className: string;
    }, any, React.HTMLProps<HTMLDivElement> & IInnerWindowProps>;
}
declare namespace WebClient {
    interface ITasksTreeContainerProps extends ITasksTreeImplState {
    }
}
declare namespace WebClient {
    interface ITasksTreeContainerState {
        network: vis.Network;
        shouldContainerUpdate: boolean;
        propertyProcessors: any;
        nodes: ITasksTreeNodeContainer[];
        edges: ITasksTreeEdgeContainer[];
        helpBoxDelegationExpanded: boolean;
        helpBoxDelegationClick: (e: React.MouseEvent) => void;
        selectedNode: ITasksTreeNodeContainer;
        helpModel: ITreeNodeHelpModel;
        data: vis.Data;
        roots: vis.IdType[];
    }
}
declare namespace WebClient {
    class TasksTreeContainer extends React.Component<ITasksTreeContainerProps, ITasksTreeContainerState> {
        state: ITasksTreeContainerState;
        private container;
        constructor(props: any);
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentWillReceiveProps(nextProps: ITasksTreeContainerProps): void;
        updateProps(nextProps: ITasksTreeContainerProps, initialize: boolean): void;
        updateContainer(): void;
        redrawNetwork(): void;
        beforeDrawing(): void;
        afterDrawing(): void;
        onClick(params: IVisClickParams): void;
        onHold(params: IVisClickParams): void;
        onSelectNode(params: IVisClickParams): Promise<void>;
        changeNodeCollapse(nodeId: vis.IdType): void;
        selectNode(selectedNodeId: vis.IdType): void;
        onDeselectNode(): void;
        setFit(): void;
        setFocus(nodeId: vis.IdType): void;
        updateNodeCollapse(nodeId: vis.IdType, hidden: boolean, forceExpand: boolean, expandChilds: boolean): void;
        updateNodeVisibility(nodeId: vis.IdType, hidden: boolean, forceExpand: boolean, expandChilds: boolean): void;
        tasksTreeModelUpdate(property: any, nextProps: ITasksTreeContainerProps): void;
        collapseAll(): void;
        expandAll(): void;
        private showHelpBox(selectedNode);
        private getRoots(nodes, edges);
        private updateNodes();
        private hideCollapsedBySettingNodes();
        private collapseBySetting(nodeId, nodes, edges);
        private collapseNodeBySetting(nodeId, nodes, edges);
        private getLinkedNode(nodeId, hiddenNodes);
        private refresh();
        private getOptions();
        private getColor(colorAlias);
        private getData();
        private getTasksTreeNodeHelpModel(cardId, cardTypeId);
        private helpBoxDelegationClick(e);
        private getHeight(helpBox);
        private hideNode(nodeId);
        private showNode(nodeId, includeChilds);
        private findNode(array, nodeId);
        render(): JSX.Element;
        renderHelpBox(): JSX.Element;
    }
}
declare namespace WebClient {
    const TasksTreeContainerStyle: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
}
declare namespace WebClient {
    function getIndicator(parentId: vis.IdType, indicatorType: IndicatorType, image: string, hidden?: boolean): ITasksTreeNodeContainer;
    function openTask(id: string): void;
    function openLink(linkItemData: ILinkItemData): void;
}
declare namespace WebClient {
    const DOCUMENT_CARD_TYPE_ID: string;
    const TASK_CARD_TYPE_ID: string;
    const GROUP_TASK_CARD_TYPE_ID: string;
    const GROUP_TYPE_BOX: string;
    const GROUP_TYPE_GREY: string;
    const GROUP_TYPE_RED: string;
    const GROUP_TYPE_ORANGE: string;
    const GROUP_TYPE_GREEN: string;
    const GROUP_TYPE_BLUE: string;
    const GROUP_TYPE_LIGHT_BLUE: string;
    const GROUP_TYPE_ICON: string;
    const COLOR_OVERDUE_BORDER: string;
    const TASKSTREE_TASK_LABEL_MAX_PERFORMERS: number;
    const TASKSTREE_TASK_LABEL_MAX_LENGTH: number;
    const TASKSTREE_TASK_LABEL_MAX_ROWS: number;
    const TASKSTREE_SELECTED_NODE_BORDER_COLOR: string;
}
declare namespace WebClient {
    interface ITasksTreeNodeResolver {
        resolveNode(treeNodeModel: ITreeNodeModel, props: ITasksTreeContainerProps, state: ITasksTreeContainerState): ITasksTreeNodeContainer[];
        resolveRenderHelpBox(props: ITasksTreeContainerProps, state: ITasksTreeContainerState): JSX.Element;
        selectionAllowed: boolean;
    }
}
declare namespace WebClient {
    interface ITasksTreeNodeResolverMap {
        [cardTypeId: string]: ITasksTreeNodeResolver;
    }
}
declare namespace WebClient {
    class TasksTreeNodeResolveService {
        resolvers: ITasksTreeNodeResolverMap;
        defaultResolver: ITasksTreeNodeResolver;
        register(cardTypeId: string, resolver: ITasksTreeNodeResolver, override?: boolean): void;
        get(cardTypeId: string): ITasksTreeNodeResolver;
    }
}
declare namespace WebClient {
    class DefaultTasksTreeNodeResolver implements ITasksTreeNodeResolver {
        resolveNode(treeNodeModel: ITreeNodeModel, props: ITasksTreeContainerProps, state: ITasksTreeContainerState): ITasksTreeNodeContainer[];
        resolveRenderHelpBox(props: ITasksTreeContainerProps, state: ITasksTreeContainerState): JSX.Element;
        readonly selectionAllowed: boolean;
    }
}
declare namespace WebClient {
    class DocumentTasksTreeNodeResolver implements ITasksTreeNodeResolver {
        resolveNode(treeNodeModel: ITreeNodeModel, props: ITasksTreeContainerProps, state: ITasksTreeContainerState): ITasksTreeNodeContainer[];
        resolveRenderHelpBox(props: ITasksTreeContainerProps, state: ITasksTreeContainerState): JSX.Element;
        readonly selectionAllowed: boolean;
    }
}
declare namespace WebClient {
    class GroupTaskTasksTreeNodeResolver implements ITasksTreeNodeResolver {
        resolveNode(treeNodeModel: ITreeNodeModel, props: ITasksTreeContainerProps, state: ITasksTreeContainerState): ITasksTreeNodeContainer[];
        resolveRenderHelpBox(props: ITasksTreeContainerProps, state: ITasksTreeContainerState): JSX.Element;
        readonly selectionAllowed: boolean;
        protected getIndicatorNodes(nodeModel: ITaskGroupTreeNodeModel): ITasksTreeNodeContainer[];
        protected getGroup(nodeModel: ITaskGroupTreeNodeModel): string;
        protected getHelpBoxHeaderIcon(groupName: any): string;
        protected getLabel(nodeModel: ITaskGroupTreeNodeModel, props: ITasksTreeContainerProps, state: ITasksTreeContainerState): string;
        protected getImage(nodeModel: ITaskGroupTreeNodeModel): string;
        protected prepareView(node: ITasksTreeNodeContainer, nodeModel: ITaskGroupTreeNodeModel, props: ITasksTreeContainerProps): any;
        protected getTitle(node: ITasksTreeNodeContainer, nodeModel: ITaskGroupTreeNodeModel, props: ITasksTreeContainerProps): string;
        private getExecutionTypeResourceKey(executionType);
    }
}
declare namespace WebClient {
    class TaskTasksTreeNodeResolver implements ITasksTreeNodeResolver {
        private readonly moreDots;
        resolveNode(treeNodeModel: ITreeNodeModel, props: ITasksTreeContainerProps, state: ITasksTreeContainerState): ITasksTreeNodeContainer[];
        resolveRenderHelpBox(props: ITasksTreeContainerProps, state: ITasksTreeContainerState): JSX.Element;
        readonly selectionAllowed: boolean;
        protected renderDelegateList(taskNodeHelpModel: ITaskTreeNodeHelpModel, color: ITasksTreeColor, state: ITasksTreeContainerState): JSX.Element;
        protected getIndicatorNodes(nodeModel: ITaskTreeNodeModel): ITasksTreeNodeContainer[];
        protected getGroup(nodeModel: ITaskTreeNodeModel): string;
        protected getHelpBoxHeaderIcon(groupName: any): string;
        protected getLabel(nodeModel: ITaskTreeNodeModel): string;
        protected getImage(nodeModel: ITaskTreeNodeModel): string;
        protected prepareView(node: ITasksTreeNodeContainer, nodeModel: ITaskTreeNodeModel, props: ITasksTreeContainerProps): any;
        protected getTitle(node: ITasksTreeNodeContainer, nodeModel: ITaskTreeNodeModel, props: ITasksTreeContainerProps): string;
        protected getDelegationLabel(delegationRecord: IDelegationRecord): string;
        protected getDelegationHistory(delegationRecords: IDelegationRecord[]): string[];
        protected showFilePreview(linkItemData: ILinkItemData): void;
    }
}
declare namespace WebClient {
    interface IDelegationRecord {
        fromPerformer: string;
        toPerformer: string;
    }
}
declare namespace WebClient {
    interface IDocumentTreeNodeModel extends ITreeNodeModel {
        name: string;
    }
}
declare namespace WebClient {
    interface ITaskCurrentPerformer {
        displayName: string;
        employeeModel: IBasicEmployeeInfo;
    }
}
declare namespace WebClient {
    interface ITaskGroupSelectedPerformer {
        displayName: string;
        isResponsiblePerformer: boolean;
        employeeModel: IBasicEmployeeInfo;
    }
}
declare namespace WebClient {
    interface ITaskGroupTreeNodeHelpModel extends ITreeNodeHelpModel {
        executionType: ExecutionType;
        author: IBasicEmployeeInfo;
        selectedPerformers: ITaskGroupSelectedPerformer[];
        name: string;
        content: string;
        endDate: Date;
        controller: IBasicEmployeeInfo;
        controlDate: Date;
    }
}
declare namespace WebClient {
    interface ITaskGroupTreeNodeHintModel extends ITreeNodeHintModel {
        name: string;
        endDate?: Date;
        executionType: ExecutionType;
        stateDisplayName: string;
        stateClassName: string;
        stateType: number;
        selectedPerformers: ITaskGroupSelectedPerformer[];
    }
}
declare namespace WebClient {
    interface ITaskGroupTreeNodeModel extends ITreeNodeModel {
        executionType: ExecutionType;
        isOverdue: boolean;
        priority: Priority;
        stateCategory: TaskGroupStateCategory;
        onControl: boolean;
    }
}
declare namespace WebClient {
    interface ITasksTreeModel {
        nodes: ITreeNodeModel[];
        edges: ITaskTreeEdge[];
    }
}
declare namespace WebClient {
    interface ITasksTreeNodeHelpRequestModel {
        cardId: string;
        cardTypeId: string;
    }
}
declare namespace WebClient {
    interface ITasksTreeRequestModel {
        cardId: string;
        taskListId: string;
        kindIds: string[];
        fullTree: boolean;
    }
}
declare namespace WebClient {
    interface ITaskTreeEdge {
        fromNode: string;
        toNode: string;
    }
}
declare namespace WebClient {
    interface ITaskTreeNodeHelpModel extends ITreeNodeHelpModel {
        author: IBasicEmployeeInfo;
        currentPerformers: ITaskCurrentPerformer[];
        delegationHint: IDelegationRecord;
        name: string;
        content: string;
        endDate: Date;
        controller: IBasicEmployeeInfo;
        controlDate: Date;
        isOverdue: boolean;
        endDateActual: Date;
        report: string;
        delegationHistory: IDelegationRecord[];
        creationDate: Date;
        reportFiles: ILinkItemData[];
    }
}
declare namespace WebClient {
    interface ITaskTreeNodeHintModel extends ITreeNodeHintModel {
        name: string;
        endDate?: Date;
        stateDisplayName: string;
        stateClassName: string;
        stateType: number;
        delegationHint: IDelegationRecord;
    }
}
declare namespace WebClient {
    interface ITaskTreeNodeModel extends ITreeNodeModel {
        hasDelegates: boolean;
        hasReport: boolean;
        hasFileReport: boolean;
        onControl: boolean;
        isResponsiblePerformerTask: boolean;
        gender: PerformerGender;
        isOverdue: boolean;
        priority: Priority;
        stateCategory: TaskStateCategory;
        currentPerformers: ITaskCurrentPerformer[];
    }
}
declare namespace WebClient {
    interface ITreeNodeHelpModel {
    }
}
declare namespace WebClient {
    interface ITreeNodeHintModel {
    }
}
declare namespace WebClient {
    interface ITreeNodeModel {
        nodeId: string;
        cardTypeId: string;
        kindId: string;
        hint: ITreeNodeHintModel;
        accessAllowed: boolean;
    }
}
declare namespace WebClient {
    enum ExecutionType {
        Serial = 0,
        Parallel = 1,
    }
}
declare namespace WebClient {
    enum IndicatorType {
        None = 0,
        Overdue = 1,
        Priority = 2,
        OnControl = 3,
        ResponsibleTask = 4,
        Report = 5,
        Expand = 6,
        Collapse = 7,
    }
}
declare namespace WebClient {
    enum PerformerGender {
        NotSpecified = 0,
        Male = 1,
        Female = 2,
    }
}
declare namespace WebClient {
    enum Priority {
        Low = 0,
        Normal = 1,
        High = 2,
    }
}
declare namespace WebClient {
    enum TaskGroupStateCategory {
        Preparing = 0,
        Performing = 1,
        Completed = 2,
        Other = 3,
    }
}
declare namespace WebClient {
    enum TaskGroupWithOneTaskDisplayMode {
        Both = 0,
        Group = 1,
        Task = 2,
    }
}
declare namespace WebClient {
    enum TaskStateCategory {
        Preparing = 0,
        InWork = 1,
        Rejected = 2,
        OnRework = 3,
        Completed = 4,
        Other = 5,
    }
}
declare namespace WebClient {
    enum TasksTreeDisplayMode {
        Button = 0,
        Layout = 1,
    }
}
declare namespace WebClient {
    interface IHiddenNode {
        nodeId: vis.IdType;
        linkedWithNodeId: vis.IdType;
    }
}
declare namespace WebClient {
    interface ITasksTreeColor {
        color: string;
        background: string;
        border: string;
    }
}
declare namespace WebClient {
    interface ITasksTreeColorMap {
        [aliasName: string]: ITasksTreeColor;
    }
}
declare namespace WebClient {
    interface ITasksTreeEdgeContainer extends vis.Edge {
    }
}
declare namespace WebClient {
    interface ITasksTreeGroup {
        colorAlias: string;
    }
}
declare namespace WebClient {
    interface ITasksTreeGroupMap {
        [aliasName: string]: ITasksTreeGroup | any;
    }
}
declare namespace WebClient {
    interface ITasksTreeNodeContainer extends vis.Node {
        isIndicator?: boolean;
        parentNodeId?: vis.IdType;
        indicatorType?: IndicatorType;
        borderWidth?: number;
        title?: HTMLElement | string;
        nodeModel: ITreeNodeModel;
        collapsed?: boolean;
        collapsedBySetting?: boolean;
    }
}
declare namespace WebClient {
    interface IVisClickParams {
        nodes?: vis.IdType[];
        edges?: vis.IdType[];
        event?: MouseEvent;
    }
}
declare namespace WebClient {
    interface ICollapsedTextProps {
        className?: string;
        text: string;
        maxLength: number;
    }
    interface ICollapsedTextState {
        expanded: boolean;
    }
    class CollapsedText extends React.Component<ICollapsedTextProps, ICollapsedTextState> {
        constructor(props: ICollapsedTextProps);
        componentWillUnmount(): void;
        componentWillReceiveProps(nextProps: ICollapsedTextProps, nextContext: any): void;
        onClick(): void;
        private isShowFullText();
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IColorTextProps {
        className?: string;
        children?: JSX.Element;
        color?: string;
        background?: string;
        onClick?: () => void;
    }
    const ColorText: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & IColorTextProps & {
        className: string;
    }, any, React.HTMLProps<HTMLDivElement> & IColorTextProps>;
}
declare namespace WebClient {
    interface IEmployeeInfoProps {
        className?: string;
        employeeName: string;
        position?: string;
        employeeId: string;
    }
    const EmployeeInfo: (props: IEmployeeInfoProps) => JSX.Element;
}
declare namespace WebClient {
    interface IGroupEmployeeInfoProps {
        className?: string;
        responsibleEmployees: ITaskGroupSelectedPerformer[];
        otherEmployees: ITaskGroupSelectedPerformer[];
        executionType: ExecutionType;
    }
    const GroupEmployeeInfo: (props: IGroupEmployeeInfoProps) => JSX.Element;
}
declare namespace WebClient {
    interface IImageWithDescriptionProps {
        className?: string;
        image: string;
        color?: string;
        children?: JSX.Element;
        onClick?: () => void;
    }
    const ImageWithDescription: (props: IImageWithDescriptionProps) => JSX.Element;
}
declare namespace WebClient {
    const LineSpacer: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement> & {
        className: string;
    }, any, React.HTMLProps<HTMLDivElement>>;
}
declare namespace WebClient {
    const PreloadHelpBoxContent: string;
}
declare namespace WebClient {
    interface IValueWithDescriptionProps {
        className?: string;
        description: string;
        value: string;
        color?: string;
        background?: string;
    }
    const ValueWithDescription: (props: IValueWithDescriptionProps) => JSX.Element;
}
declare namespace WebClient {
    class TasksParams extends BaseControlParams {
        standardCssClass?: string;
        tasks: ITaskListItem[];
        viewKinds?: any;
        tasksCreateInfo?: ITaskCreateInfo[];
        canCreateTask?: boolean;
        canCreateTaskGroup?: boolean;
        header?: string;
        digestView?: boolean;
        isExpanded: boolean;
        addTaskAllowed?: boolean;
        tasksLoaded: boolean;
        cardId: string;
        mode: TasksMode;
        collapsing?: CancelableApiEvent<IEventArgs>;
        collapsed?: BasicApiEvent<IEventArgs>;
        expanding?: CancelableApiEvent<IEventArgs>;
        expanded?: BasicApiEvent<IEventArgs>;
        taskCreating?: CancelableApiEvent<ITaskCreatingEventArgs>;
    }
    interface TasksState extends TasksParams, BaseControlState {
        availableKinds: string[];
        taskID: string;
    }
    class Tasks extends BaseControl<TasksParams, TasksState> {
        constructor(params: any);
        protected createParams(): TasksParams;
        private readonly tasksImpl;
        private binding;
        private createKindsBinding;
        addTask(taskCreateInfoId: string): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface TasksImplState extends BaseControlImplState, TasksState {
        tasksLoadingHelper: RequestHelper;
    }
    class TasksImpl extends BaseControlImpl<TasksParams, TasksImplState> {
        protected taskList: TaskListComponent;
        constructor(props: TasksParams);
        componentDidMount(): void;
        canAddTask(): boolean;
        addTask(taskCreateInfoId: string): void;
        protected handleHeaderClick(): void;
        protected handleCreateTask(item: ITaskCreateInfo): void;
        renderControl(): JSX.Element;
        isExpanded: boolean;
    }
}
declare namespace WebClient {
    interface ITaskListItemProps {
        taskListItem: ITaskListItem;
        digestView: boolean;
        tabStop: boolean;
    }
}
declare namespace WebClient {
    interface ITaskListItemState {
        endDate: Date;
    }
}
declare namespace WebClient {
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
    interface ITaskListProps {
        digestView: boolean;
        tabStop: boolean;
        items: ITaskListItem[];
        itemsLoading?: boolean;
    }
}
declare namespace WebClient {
    interface ITaskListState {
        taskListItems: ITaskListItem[];
    }
}
declare namespace WebClient {
    class TaskListComponent extends React.Component<ITaskListProps, ITaskListState> {
        protected refItems: HTMLElement;
        constructor(props: any);
        componentWillReceiveProps(newProps: any): void;
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
    interface ITasksDataModel {
        tasks: ITaskListItem[];
        tasksLoaded: boolean;
        availableKinds: string[];
        taskID: string;
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
    enum TasksMode {
        ListAndCreation = 0,
        CreationOnly = 1,
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
    class CommandMenuComponent extends React.Component<ICommandMenuProps, ICommandMenuState> {
        constructor(props: any);
        componentWillUnmount(): void;
        protected handleComponentClick(event?: Event): void;
        protected handleCommandMenuClick(event?: React.MouseEvent): void;
        protected toggleMenu(): void;
        protected onMenuItemClick(item: ITaskCreateInfo, ev: React.MouseEvent): void;
        protected getCommandMenuItems(filter: (ICommandMenuItem) => boolean): JSX.Element[];
        protected getKindItems(): JSX.Element[];
        protected getTemplates(): JSX.Element[];
        protected attachCommandBarButton(elem: any): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ICommandMenuProps {
        createKinds: ITaskCreateInfo[];
        isVisible: boolean;
        createTask: (item: ITaskCreateInfo) => void;
    }
}
declare namespace WebClient {
    interface ICommandMenuState {
        expanded: boolean;
        commandMenuItems: ITaskCreateInfo[];
        commandBarBtn: any;
        popoverOpen: boolean;
    }
}
declare namespace WebClient {
    class PanelParams extends BaseControlParams {
        standardCssClass?: string;
        width?: number;
        minWidth?: number;
        order?: number;
        childControls?: LayoutControl[];
    }
    interface PanelState extends PanelParams, BaseControlState {
        mountedChildren: BaseControl<any, any>[];
        childControlsModels: ILayoutModel[];
    }
    abstract class Panel<P extends PanelParams, S extends PanelState> extends BaseControl<P, S> {
        constructor(props: P);
        isPanel(): boolean;
        protected childrenHandler: any;
        private readonly childControls;
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected unregisterChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        init(): void;
        getBindingsWriteRequests(withChildren?: boolean): IBindingsWriteRequest[];
        validate(params: any): IValidationResult[];
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
    interface TableState extends TableParams, PanelState {
        binding: IBindingResult<ILayoutTableBindingModel>;
        model: ILayoutTableBindingModel;
        saveAndReloadTable: () => JQueryDeferred<any>;
        saveTable: () => JQueryDeferred<any>;
    }
    class Table extends Panel<TableParams, TableState> {
        constructor(props: TableParams);
        protected createParams(): TableParams;
        componentDidMount(): void;
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
        addRow(): JQueryDeferred<any>;
        removeRow(rowId: string): JQueryDeferred<any>;
        protected onCardSaving(sender: any, args: ICancelableEventArgs<ISaveControlData>): void;
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
        protected checkRowIsEmpty(rowIndex: number): boolean;
        removeRowIntenral(rowIndex: number): JQueryDeferred<any>;
        protected onRemoveRowClick(row: IRowInfo): void;
        protected getCssClass(): string;
        renderControl(): JSX.Element;
        getRowIndex(rowId: string): number;
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
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface TableColumnImplState extends PanelState, TableColumnState {
    }
    class TableColumnImpl extends PanelImpl<TableColumnParams, TableColumnImplState> {
        constructor(props: TableColumnParams);
        protected prepareChildren(): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
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
    interface TabState extends TabParams, PanelState {
    }
    class Tab extends Panel<TabParams, TabState> {
        protected createParams(): TabParams;
        private readonly tabImpl;
        protected childrenHandler: any[];
        setTabPageHeader(tab: TabPageInfo, header: string): void;
        loadTabPage(tab: TabPageInfo): JQueryDeferred<TabPageInfo>;
        openTabPage(tabNumber: number): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface TabImplProps extends TabState {
    }
    interface TabImplState extends PanelImplState, TabState {
        requestHelper: RequestHelper;
    }
    class TabImpl extends PanelImpl<TabImplProps, TabImplState> {
        constructor(props: TabImplProps);
        openTab(tab: TabPageInfo): void;
        loadTab(tab: TabPageInfo): JQueryDeferred<TabPageInfo>;
        protected parseTabs(props: TabImplProps): void;
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
    interface TabPageState extends TabPageParams, PanelState {
    }
    class TabPage extends Panel<TabPageParams, TabPageState> {
        protected createParams(): TabPageParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface TabPageImplState extends PanelImplState, TabPageState {
    }
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
        verticalOrientation?: boolean;
        buttonsLimit?: number;
    }
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
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface StateButtonsImplState extends BaseControlImplState, StateButtonsState {
    }
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
    interface StateState extends StateParams, BaseControlState {
    }
    class State extends BaseControl<StateParams, StateState> {
        protected createParams(): StateParams;
        private binding;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface StateImplState extends BaseControlImplState, StateState {
    }
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
        clicking?: CancelableApiEvent<ISavingButtonClickEventArgs>;
    }
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
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface SavingButtonsImplState extends BaseControlImplState, SavingButtonsState {
        savingHelper: RequestHelper;
        cardIsSaving: boolean;
    }
    class SavingButtonsImpl extends BaseControlImpl<SavingButtonsParams, SavingButtonsImplState> {
        constructor(props: SavingButtonsParams);
        protected handleClick(event: React.MouseEvent): void;
        onSave(): void;
        onCancel(): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ISavingButtonClickEventArgs {
        button: SavingButton;
    }
}
declare namespace WebClient {
    enum SavingButton {
        Save = 0,
        Cancel = 1,
    }
}
declare namespace WebClient {
    class RadioGroupParams extends InputBasedControlParams<string> {
        standardCssClass?: string;
        labelPlacement: RadioGroupLabelPlacement;
        columnCount: number;
        items: ElementDataModel[];
    }
    interface RadioGroupState extends RadioGroupParams, InputBasedControlState<string> {
        binding: IBindingResult<string>;
    }
    class RadioGroup extends InputBasedControl<string, RadioGroupParams, RadioGroupState> {
        protected createParams(): RadioGroupParams;
        private setRadioGroupElements;
        private setBinding;
        private setDefault;
        protected getBindings(): IBindingResult<any>[];
        protected getDefault(): string;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface RadioGroupImplState extends InputBasedControlImplState<string>, RadioGroupState {
    }
    class RadioGroupImpl extends InputBasedControlImpl<string, RadioGroupParams, RadioGroupImplState> {
        constructor(props: any);
        protected getTextValue(): string;
        protected renderInto(props: RadioGroupParams, container: HTMLElement): RadioGroup;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
        protected onElementChange(element: ElementDataModel, ev: React.FormEvent): void;
        protected renderPlaceholder(): JSX.Element;
        protected renderLabel(element: ElementDataModel): JSX.Element;
        protected getColumns(): Array<Array<ElementDataModel>>;
        protected renderInput(): JSX.Element;
    }
}
declare namespace WebClient {
    class ElementDataModel {
        value: string;
        key: any;
    }
}
declare namespace WebClient {
    class ElementsDataModel {
        elements: ElementDataModel[];
        isEmptyKeyAllowed: boolean;
    }
}
declare namespace WebClient {
    enum RadioGroupLabelPlacement {
        Right = 0,
        Left = 1,
    }
}
declare namespace WebClient {
    class PartnerParams extends InputBasedControlParams<IBasicEmployeeInfo> {
        standardCssClass?: string;
        partnerViewMode?: EmployeeViewMode;
        partnerTipMode?: EmployeeTooltipMode;
        predefinedFilter?: IDepartmentInfo;
        selectedFilterPath?: IDepartmentInfo[];
        currentFilterPath?: IDepartmentInfo[];
        searchDelay?: number;
        isDirectoryWindowShown?: boolean;
        directoryWindow?: PartnerSelectDialog;
        directoryWindowOpening?: CancelableApiEvent<void>;
        directoryWindowOpened?: BasicApiEvent<void>;
        directoryWindowClosing?: CancelableApiEvent<void>;
        directoryWindowClosed?: BasicApiEvent<void>;
        searchResultsLoading?: CancelableApiEvent<IPartnerDataLoadingEventArgs>;
        searchResultsLoaded?: BasicApiEvent<IPartnerDataLoadingEventArgs>;
        currentFilterChanging?: CancelableApiEvent<IPartnerFilterChangeEventArgs>;
        currentFilterChanged?: BasicApiEvent<IPartnerFilterChangeEventArgs>;
    }
    interface PartnerState extends PartnerParams, InputBasedControlState<IBasicEmployeeInfo> {
        binding: IBindingResult<IBasicEmployeeInfo>;
    }
    class Partner extends InputBasedControl<IBasicEmployeeInfo, PartnerParams, PartnerState> {
        private isSelectedFilterPathInitialized;
        private isBindingInitialized;
        private isParentOrganizationBindingInitialized;
        protected createParams(): PartnerParams;
        protected readonly partnerImpl: PartnerImpl;
        private binding;
        private parentOrganizationBinding;
        private readonly currentFilterPath;
        private selectedFilterPath;
        private predefinedFilter;
        protected getParamsToKeep(params: any): {
            selectedFilterPath: any;
            value: IBasicEmployeeInfo;
        };
        static filterSelectedPath(selectedPath: IDepartmentInfo[], predefinedFilter: IDepartmentInfo): IDepartmentInfo[];
        static isFilterInSelectedPath(selectedPath: IDepartmentInfo[], predefinedFilter: IDepartmentInfo): boolean;
        canShowDictionary(): boolean;
        showDictionary(): void;
        hideDictionary(): void;
        protected getBindings(): IBindingResult<any>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    namespace PartnerHelpers {
        class PartnerDirectoryItemVisualiser {
            employeeVisualiser: EmployeeVisualizer;
            constructor(employeeVisualiser: EmployeeVisualizer);
            getDisplayName(item: IPartnerDirectoryItem): string;
            getTooltip(item: IPartnerDirectoryItem): string;
            getIconClassName(item: IPartnerDirectoryItem): string;
        }
    }
}
declare namespace WebClient {
    interface ISimpleItemViewContentProps {
        className?: string;
        tabIndex?: number;
        id: string;
        focusedId: string;
        getNodeEl?: (el: HTMLElement) => HTMLElement;
        findElInNode?: (node: HTMLElement) => HTMLElement;
        onMoveForward?: () => void;
        onSelectSibling?: (mode: 'prev' | 'next') => void;
        onSelect?: () => void;
        onClick?: (ev: React.MouseEvent) => void;
    }
    class SimpleItemViewContent extends React.Component<ISimpleItemViewContentProps, undefined> {
        protected el: HTMLElement;
        protected getNodeEl: () => HTMLElement;
        protected findElInNode: (node: HTMLElement) => HTMLElement;
        protected onKeyDown: (ev: any) => void;
        componentDidMount(): void;
        componentWillReceiveProps(nextProps: ISimpleItemViewContentProps): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IPartnerSelectDialogSearchPathOptions {
        path: IDepartmentInfo[];
        notAppendToSelectedFilterPath?: boolean;
    }
    interface IPartnerSelectDialogProps {
        partnerSelected: (node: IBasicEmployeeInfo) => void;
        searchDelay: number;
        onSelect?: () => void;
        predefinedFilter: IDepartmentInfo;
        selectedFilterPath: IDepartmentInfo[];
        onSelectedFilterPathChange?: (newPath: IDepartmentInfo[]) => void;
        onSearchFilterPathChange?: (newPath: IDepartmentInfo[]) => void;
        itemVisualiser: PartnerHelpers.PartnerDirectoryItemVisualiser;
        searchResultsLoading: CancelableApiEvent<IPartnerDataLoadingEventArgs>;
        searchResultsLoaded: BasicApiEvent<IPartnerDataLoadingEventArgs>;
    }
    interface IPartnerChildrenCacheItem {
        items: IPartnerDirectoryItem[];
        totalItemsCount: number;
        accessTimestamp: Date;
    }
    interface IPartnerChildrenCache {
        [id: string]: IPartnerChildrenCacheItem;
    }
    interface IPartnerSelectedNodesPath {
        [departmentId: string]: IPartnerDirectoryItem;
    }
    interface IPartnerSelectDialogState {
        selectedEmployee: IBasicEmployeeInfo;
        selectedNode: IBasicEmployeeInfo;
        selectedNodesPath: IPartnerSelectedNodesPath;
        searchRequestHelper: RequestHelper;
        showingSearchResults: boolean;
        searchText: string;
        searchItems: IPartnerDirectorySearchItem[];
        hasMoreSearchItems: boolean;
        searchDebouncer: QuickSearchLogic;
        searchMode: PartnerDirectorySearchMode;
        selectedNodeFocused: boolean;
        loadChildrenHelper: RequestHelper;
        childrenListCache: IPartnerChildrenCache;
        initialLoading: boolean;
        initialLoadingState: LoadingState;
        directoryTimestamp: number;
    }
    class PartnerSelectDialog extends React.Component<IPartnerSelectDialogProps, IPartnerSelectDialogState> {
        static ChildrenPageSize: number;
        static SearchPageSize: number;
        static SimpleItemView: styled.StyledComponentClass<React.HTMLProps<any>, any, React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps>;
        static SimpleItemViewCompact: styled.StyledComponentClass<React.HTMLProps<any>, any, React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps>;
        searchInput: HTMLInputElement;
        protected readonly rootId: string;
        constructor(props: IPartnerSelectDialogProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentWillReceiveProps(newProps: IPartnerSelectDialogProps): void;
        readonly selectedPartner: IBasicEmployeeInfo;
        protected onModalKeyDown: (ev: any) => void;
        protected onNavigateToFolder(departmentId: string): JQueryPromise<{}>;
        protected onSelectedFilterPathChange: (newPath: IDepartmentInfo[]) => void;
        protected onSelectedFilterMoveBack: () => void;
        protected readonly currentDepartmentId: string;
        protected readonly currentDepartmentName: string;
        protected readonly currentChildren: IPartnerDirectoryItem[];
        protected readonly currentChildrenCache: IPartnerChildrenCacheItem;
        protected getDepartmentCache(id: string): IPartnerChildrenCacheItem;
        protected clearCache(): void;
        protected loadChildrenList(departmentId: string, from: number, to: number): JQueryDeferred<IPartnerDirectoryTreeItem[]>;
        protected onChildrenLoaded(response: IPartnerDirectoryTreeLoadResponse, departmentId: string, from: number): void;
        protected onReactListLoadRequest: (indexes: number[]) => void;
        protected search(query: IPartnerDirectorySearchRequest, reset: boolean): JQueryDeferred<{}>;
        protected onSearchResultLoaded(response: IPartnerDirectorySearchResponse, reset: boolean): void;
        attachSearchInput: (elem: HTMLInputElement) => void;
        protected onInputKeyUp(ev: React.KeyboardEvent): void;
        protected onInputChange(event: any): void;
        protected onSearchFilterPathChange(newPath: IDepartmentInfo[]): void;
        private resetSearchMode;
        protected onSelectEmployee(item: IBasicEmployeeInfo, searchPathOptions?: IPartnerSelectDialogSearchPathOptions): void;
        protected shouldShowOpenButton(item: IPartnerDirectoryTreeLoadItem): boolean;
        protected onChildrenListItemClick: (item: IPartnerDirectoryItem) => void;
        protected onSearchItemClick: (item: IPartnerDirectorySearchItem) => void;
        protected onChildrenListItemDoubleClick: (item: IPartnerDirectoryItem) => void;
        protected onSearchItemDoubleClick: (item: IPartnerDirectorySearchItem) => void;
        protected onChildrenListItemSelectSibling: (mode: "next" | "prev", index: number, getCollectionData: () => IPartnerDirectoryItem[] | IPartnerDirectorySearchItem[]) => void;
        protected onSearchPathItemClick: (department: IDepartmentInfo, item: IPartnerDirectorySearchItem) => void;
        protected onToggleSearchMode: () => void;
        protected onLoadNextSearchPage: () => JQueryDeferred<{}>;
        protected onLoadNewSearchResults: () => JQueryDeferred<{}>;
        protected renderGoToButton(item: IPartnerDirectoryItem): JSX.Element;
        renderSearchItem: (index: number, key: string) => JSX.Element;
        renderChildrenListItem: (key: string | number, item: IPartnerDirectoryTreeLoadItem, index: number) => JSX.Element;
        renderLoadingItem: (index: number, key: string | number) => JSX.Element;
        renderEmptyItem: (index: number, key: string | number) => JSX.Element;
        renderChildrenListItems(): JSX.Element;
        renderSearchItems(): JSX.Element;
        renderItems(): JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface PartnerImplProps extends PartnerParams {
    }
    interface PartnerImplState extends InputBasedControlImplState<IBasicEmployeeInfo>, PartnerState {
        requestHelper: RequestHelper;
        directoryDialogOpen: boolean;
        directoryDialogSelectedValue: IBasicEmployeeInfo;
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
        employeeVisualiser: EmployeeVisualizer;
        itemVisualiser: PartnerHelpers.PartnerDirectoryItemVisualiser;
        typeahead: Typeahead;
        beforeModalSelectedFilterPath: IDepartmentInfo[];
        searchFilterPath: IDepartmentInfo[];
    }
    class PartnerImpl extends InputBasedControlImpl<IBasicEmployeeInfo, PartnerImplProps, PartnerImplState> {
        static FirstPageSize: number;
        static NextPageSize: number;
        static SearchTimeout: number;
        private readonly EmptySelectedPath;
        constructor(props: PartnerImplProps);
        private selectedFilterPath;
        protected getTextValue(): string;
        protected getValueTitle(): string;
        protected getInputTitle(): string;
        protected renderInto(props: PartnerParams, container: HTMLElement): Partner;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
        readonly currentFilterPath: IDepartmentInfo[];
        readonly currentFilter: string | undefined;
        readonly currentFilterName: string | undefined;
        protected attachTypeahead(typeahead: Typeahead): void;
        protected findItems(typeaheadQuery: ITypeaheadSearchQuery): JQueryDeferred<ITypeaheadSearchResult>;
        protected onTypeaheadSelected(variant: ITypeaheadVariant): void;
        protected onDropdownStateChanged(): void;
        attachDialogComponent: (dialog: PartnerSelectDialog) => void;
        showDictionary(): void;
        hideDictionary(): void;
        protected cancelModal: () => void;
        readonly isDictionaryShown: boolean;
        protected partnerTipMode: EmployeeTooltipMode;
        protected partnerViewMode: EmployeeViewMode;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected onDirectoryDialogNodeSelected(node: IBasicEmployeeInfo): void;
        protected onDirectoryDialogSelectButtonClick(): Promise<void>;
        protected onFilterSelected: (items: IDepartmentInfo[]) => void;
        protected onSelectedFilterPathChange: (newSelected: IDepartmentInfo[]) => void;
        protected onDialogSelectedFilterPathChange: (newSelected: IDepartmentInfo[]) => void;
        setSelectedFilterPath(newValue: IDepartmentInfo[]): JQueryDeferred<IPartnerFilterChangeEventArgs>;
        setSearchFilterPath: (newValue: IDepartmentInfo[]) => void;
        setPredefinedFilter(newValue: IDepartmentInfo): JQueryDeferred<IPartnerFilterChangeEventArgs>;
        protected onInputChange(event: any): void;
        protected renderFilter(): JSX.Element;
        protected renderPlaceholder(): JSX.Element;
        protected renderInputWithPlaceholder(): JSX.Element;
    }
}
declare namespace WebClient {
    namespace PartnerHelpers {
        const SearchIcon: ({}: {}) => JSX.Element;
    }
}
declare namespace WebClient {
    enum PartnerQueryTypes {
        QuickSearch = 0,
        LoadTree = 1,
        DirectorySearch = 2,
    }
    class IPartnerDataLoadingEventArgs {
        queryType: PartnerQueryTypes;
        query: IPartnerDirectoryRequest;
        result?: IPartnerDirectoryResponse;
    }
}
declare namespace WebClient {
    class IPartnerFilterChangeEventArgs {
        oldValue: IDepartmentInfo[];
        newValue: IDepartmentInfo[];
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryTreeItem extends IPartnerDirectoryItem {
        expanded?: boolean;
        loadingState?: LoadingState;
        displayName?: string | JSX.Element;
        visible?: boolean;
        parentId?: string;
        level?: number;
    }
}
declare namespace WebClient {
    class PartnerTypeaheadVariant implements ITypeaheadVariant {
        item: IPartnerDirectoryItem;
        visualiser: PartnerHelpers.PartnerDirectoryItemVisualiser;
        constructor(item: IPartnerDirectoryItem, visualiser: PartnerHelpers.PartnerDirectoryItemVisualiser);
        readonly name: string;
        readonly value: string;
        readonly iconCssClass: string;
        readonly title: string;
    }
}
declare namespace WebClient {
    class NumeratorParams extends InputBasedControlParams<INumberInfo> {
        standardCssClass?: string;
        generationRule: string;
        allowManualEdit: boolean;
    }
    interface NumeratorState extends NumeratorParams, InputBasedControlState<INumberInfo> {
        numeratorBinding: IBindingResult<INumberInfo>;
        bindingInfo: IBindingInfoExt;
    }
    class Numerator extends InputBasedControl<INumberInfo, NumeratorParams, NumeratorState> {
        protected createParams(): NumeratorParams;
        private readonly numeratorImpl;
        private numeratorBinding;
        setNumberText(number: string): void;
        generateNewNumber(saveToTheCard?: boolean, saveCardBefore?: boolean): JQueryDeferred<INumberInfo>;
        clearNumber(): JQueryDeferred<any>;
        protected getBindings(): IBindingResult<any>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface NumeratorImplState extends InputBasedControlImplState<INumberInfo>, NumeratorState {
        requestHelper: RequestHelper;
        currentValueGeneratedNumber: string;
        disableRequiredCheck: boolean;
    }
    class NumeratorImpl extends InputBasedControlImpl<INumberInfo, NumeratorParams, NumeratorImplState> {
        constructor(props: NumeratorParams);
        generateNewNumber(saveToTheCard: boolean, prepareAction: () => JQueryDeferred<any>): JQueryDeferred<INumberInfo>;
        componentDidMount(): void;
        protected getTextValue(): string;
        protected onInputChange(event: any): void;
        validate(params: any): IValidationResult;
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
    interface NumberState extends NumberParams, InputBasedControlState<number> {
        binding: IBindingResult<number>;
    }
    class NumberControl extends InputBasedControl<number, NumberParams, NumberState> {
        protected createParams(): NumberParams;
        private readonly RealNumberImpl;
        private RealNumberBinding;
        protected getBindings(): IBindingResult<any>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface NumberImplState extends InputBasedControlImplState<number>, NumberState {
    }
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
    class ConnectUserFoldersButtonScriptParams extends LayoutScriptParams {
        userFoldersName: string;
        configurationButtonName: string;
    }
    class ConnectUserFoldersButtonScript extends LayoutScript<ConnectUserFoldersButtonScriptParams> {
        private userFolders;
        private button;
        protected createParams(): ConnectUserFoldersButtonScriptParams;
        init(): void;
        protected onFoldersAttached: (folders: string[]) => void;
        protected onAttachFolderClick: () => void;
    }
}
declare namespace WebClient {
    class ConnectUserFoldersToConfigurableContainerScriptParams extends LayoutScriptParams {
        userFoldersName: string;
        configurableContainerName: string;
    }
    class ConnectUserFoldersToConfigurableContainerScript extends LayoutScript<ConnectUserFoldersToConfigurableContainerScriptParams> {
        private userFolders;
        private container;
        protected createParams(): ConnectUserFoldersToConfigurableContainerScriptParams;
        init(): void;
        protected onConfigurationSaving: (sender: any, args: CancelableEventArgs<IMainMenuSettings>) => void;
    }
}
declare namespace WebClient {
    interface IUserFolderItemWrapperProps {
        children?: JSX.Element;
        onRemoveClick?: (ev: React.MouseEvent) => void;
    }
    const UserFolderItemWrapper: (props: IUserFolderItemWrapperProps) => JSX.Element;
}
declare namespace WebClient {
    class BaseMainMenuItemParams extends PanelParams {
        text: string;
        standardCssClass?: string;
        iconClass?: string;
        compact?: boolean;
        isSelected?: boolean;
        level?: number;
        expandChildrenLevel?: number;
        isExpanded?: boolean;
        configurable?: boolean;
        isConfigurationModeEnabled?: boolean;
        isConfiguredToHide?: boolean;
        expandedToggling?: CancelableApiEvent<boolean>;
        expandedToggled?: BasicApiEvent<boolean>;
        selecting?: CancelableApiEvent<boolean>;
        selected?: BasicApiEvent<boolean>;
        configuredToHideToggled?: BasicApiEvent<boolean>;
    }
    interface BaseMainMenuItemState extends BaseMainMenuItemParams, PanelState {
    }
    abstract class BaseMainMenuItem<PropsT extends BaseMainMenuItemParams, StateT extends BaseMainMenuItemState> extends Panel<PropsT, StateT> {
        private baseMainMenuItemImpl();
        private textResourceKey;
        private compact;
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected level: number | string;
        protected expanded: string | boolean;
        protected isConfigurationModeEnabled: boolean;
        protected isConfiguredToHide: boolean | string;
        protected configurable: boolean | string;
        protected expandChildrenLevel: string;
        readonly isMainMenuItem: boolean;
        protected readonly baseItemImpl: BaseMainMenuItemImpl<BaseMainMenuItemParams, any>;
        protected selected: boolean;
        expandAllParents(): void;
    }
}
declare namespace WebClient {
    class UserFoldersMainMenuItemParams extends BaseMainMenuItemParams {
        standardCssClass?: string;
        showRoot?: boolean;
        foldersPreloadLevel?: number;
        compactFolders?: boolean;
        showIcons?: boolean;
        folders?: string[];
        isExpanded?: boolean;
    }
    interface UserFoldersMainMenuItemState extends UserFoldersMainMenuItemParams, BaseMainMenuItemState {
        detachFolders: (folderIds: string[]) => JQueryDeferred<{}>;
    }
    class UserFoldersMainMenuItem extends BaseMainMenuItem<UserFoldersMainMenuItemParams, UserFoldersMainMenuItemState> implements IProxyControl {
        constructor(props: any);
        protected createParams(): UserFoldersMainMenuItemParams;
        protected showRoot: string | boolean;
        protected expanded: string | boolean;
        readonly isProxyControl: boolean;
        renderProxyChildren(): JSX.Element[];
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected level: number | string;
        reload(): JQueryDeferred<{}>;
        detachFolders(folderIds: string[]): Promise<void>;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface BaseMainMenuItemImplState extends PanelImplState, BaseMainMenuItemState {
    }
    class BaseMainMenuItemImpl<PropsT extends BaseMainMenuItemParams, StateT extends BaseMainMenuItemImplState> extends PanelImpl<PropsT, StateT> {
        constructor(props: PropsT);
        componentWillMount(): void;
        onSelecting(): CancelableEventArgs<boolean>;
        onSelected(): void;
        onToggling(): CancelableEventArgs<boolean>;
        onToggled(): void;
        protected onClick(event: React.MouseEvent): void;
        protected getCssClass(): string;
        protected onConfiguredToHideToggled: () => void;
        protected getAutoExpandLevelsCount: () => number;
        protected getChildrenAutoExpandLevelsCount: () => number;
        protected canAutoExpand: () => boolean;
        protected autoExpand(): void;
        protected renderChildren(children?: ILayoutModel[]): JSX.Element[];
        renderSelfContentItems(): (JSX.Element | JSX.Element[])[];
        renderSelfContent(): JSX.Element;
        renderSelf(): JSX.Element;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface UserFoldersMainMenuItemImplState extends BaseMainMenuItemImplState, UserFoldersMainMenuItemState {
        detachHelper: RequestHelper;
    }
    class UserFoldersMainMenuItemImpl extends BaseMainMenuItemImpl<UserFoldersMainMenuItemParams, UserFoldersMainMenuItemImplState> {
        constructor(props: UserFoldersMainMenuItemParams);
        protected onClick(event: React.MouseEvent): void;
        onDetachClick(index: number): void;
        protected getChildrenAutoExpandLevelsCount: () => number;
        protected canAutoExpand: () => boolean;
        renderProxyChildren(): JSX.Element[];
        protected getCssClass(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class BaseNavigationMainMenuItemParams extends BaseMainMenuItemParams {
        lastActivationTimestamp?: Date;
        navigationHref?: string;
    }
    interface BaseNavigationMainMenuItemState extends BaseNavigationMainMenuItemParams, BaseMainMenuItemState {
    }
    abstract class BaseNavigationMainMenuItem<PropsT extends BaseNavigationMainMenuItemParams, StateT extends BaseNavigationMainMenuItemState> extends BaseMainMenuItem<PropsT, StateT> {
        constructor(props: PropsT);
        init(): void;
        readonly navigationHref: string;
    }
}
declare namespace WebClient {
    class FolderMainMenuItemParams extends BaseNavigationMainMenuItemParams {
        standardCssClass?: string;
        folderInfo?: IFolderItemNodeData;
        color?: string;
        folderId?: string;
        showSubfolders?: boolean;
        showRoot?: boolean;
        subfoldersPreloadLevel?: number;
        compactChildren?: boolean;
        showIcon?: boolean;
        showChildrenIcons?: boolean;
        forceToggleIdent?: boolean;
        isExpanded?: boolean;
        unreadCount?: number;
        forceVirtualFolderSearch?: boolean;
    }
    interface FolderMainMenuItemState extends FolderMainMenuItemParams, BaseNavigationMainMenuItemState {
        loadWithChildren(levelCount?: number): JQueryDeferred<IFolderItemNodeData>;
        generateControlName(folderId: string): string;
    }
    class FolderMainMenuItem extends BaseNavigationMainMenuItem<FolderMainMenuItemParams, FolderMainMenuItemState> implements IProxyControl {
        constructor(props: any);
        readonly isFolderMainMenuItem: boolean;
        init(): void;
        deinit(): void;
        protected createParams(): FolderMainMenuItemParams;
        protected showSubfolders: string | boolean;
        protected showRoot: string | boolean;
        protected subfoldersPreloadLevel: string | number;
        protected expanded: string | boolean;
        protected compactChildren: string | boolean;
        protected showIcon: string | boolean;
        protected showChildrenIcons: string | boolean;
        protected forceToggleIdent: string | boolean;
        protected forceVirtualFolderSearch: string | boolean;
        protected folderInfo: IFolderItemNodeData;
        readonly isProxyControl: boolean;
        renderProxyChildren(): JSX.Element[];
        loadSubfoldersDownTo(levelsCount: number): Promise<void>;
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected level: number | string;
        protected isConfiguredToHide: boolean;
        componentDidUpdate(): void;
        subscribeToUnreadCount(): void;
        unsubscribeFromUnreadCount(): void;
        onUnreadCountChanged(): void;
        addUnreadCountRequest(): void;
        private generateControlName;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
}
declare namespace WebClient {
    class StandardMainMenuContainerParams extends BaseMainMenuItemParams {
    }
    interface StandardMainMenuContainerState extends StandardMainMenuContainerParams, BaseMainMenuItemState {
    }
    class StandardMainMenuContainer extends BaseMainMenuItem<StandardMainMenuContainerParams, StandardMainMenuContainerState> {
        protected createParams(): StandardMainMenuContainerParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface StandardMainMenuContainerImplState extends BaseMainMenuItemImplState, StandardMainMenuContainerState {
    }
    class StandardMainMenuContainerImpl extends BaseMainMenuItemImpl<StandardMainMenuContainerParams, StandardMainMenuContainerImplState> {
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class LinkMainMenuItemParams extends BaseNavigationMainMenuItemParams {
        standardCssClass?: string;
        href: string;
        hreflang?: string;
        target?: string;
        accesskey?: string;
        download?: boolean;
        type?: string;
    }
    interface LinkMainMenuItemState extends LinkMainMenuItemParams, BaseNavigationMainMenuItemState {
    }
    class LinkMainMenuItem extends BaseNavigationMainMenuItem<LinkMainMenuItemParams, LinkMainMenuItemState> {
        protected createParams(): LinkMainMenuItemParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class SearchResultsMainMenuItemParams extends LinkMainMenuItemParams {
        href: string;
        iconClass: string;
    }
    interface SearchResultsMainMenuItemState extends LinkMainMenuItemState {
    }
    class SearchResultsMainMenuItem extends LinkMainMenuItem {
        constructor(props: any);
        protected createParams(): SearchResultsMainMenuItemParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class RightMainMenuItemPanelParams extends PanelParams {
        standardCssClass?: string;
        location?: RightMainMenuItemPanelLocation;
    }
    interface RightMainMenuItemPanelState extends RightMainMenuItemPanelParams, PanelState {
    }
    class RightMainMenuItemPanel extends Panel<RightMainMenuItemPanelParams, RightMainMenuItemPanelState> {
        protected createParams(): RightMainMenuItemPanelParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface RightMainMenuItemPanelImplState extends PanelImplState, RightMainMenuItemPanelState {
    }
    class RightMainMenuItemPanelImpl extends PanelImpl<RightMainMenuItemPanelParams, RightMainMenuItemPanelImplState> {
        constructor(props: RightMainMenuItemPanelParams);
        getLocation(location: string): MainMenuHelpers.OverlapPanelLocation;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    type RightMainMenuItemPanelLocation = "above" | "below";
    class RightMainMenuItemPanelLocations {
        static Above: string;
        static Below: string;
    }
}
declare namespace WebClient {
    class MasterGroupMainMenuItemParams extends BaseMainMenuItemParams {
        standardCssClass?: string;
        isExpanded?: boolean;
        enableMobileMode?: boolean;
        showRoot?: boolean;
    }
    interface MasterGroupMainMenuItemState extends MasterGroupMainMenuItemParams, BaseMainMenuItemState {
    }
    class MasterGroupMainMenuItem extends BaseMainMenuItem<MasterGroupMainMenuItemParams, MasterGroupMainMenuItemState> implements IProxyControl {
        constructor(props: any);
        protected createParams(): MasterGroupMainMenuItemParams;
        init(): void;
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected level: number | string;
        readonly isProxyControl: boolean;
        renderProxyChildren(): JSX.Element[];
        protected onChildToggled(child: LayoutControl): void;
        protected showRoot: string | boolean;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface MasterGroupMainMenuItemImplState extends BaseMainMenuItemImplState, MasterGroupMainMenuItemState {
    }
    class MasterGroupMainMenuItemImpl extends BaseMainMenuItemImpl<MasterGroupMainMenuItemParams, MasterGroupMainMenuItemImplState> {
        constructor(props: MasterGroupMainMenuItemParams);
        protected onClick(event: React.MouseEvent): void;
        protected getCssClass(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class ConnectPinButtonToMainMenuScriptParams extends LayoutScriptParams {
        mainMenuName: string;
        pinButtonName: string;
        pinIconClassName?: string;
        unpinIconClassName?: string;
    }
    class ConnectPinButtonToMainMenuScript extends LayoutScript<ConnectPinButtonToMainMenuScriptParams> {
        private mainMenu;
        private pinButton;
        protected createParams(): ConnectPinButtonToMainMenuScriptParams;
        init(): void;
        onPinButtonClick(): void;
        onMenuToggle: (sender: BaseControl<BaseControlParams, BaseControlState>, data: boolean) => void;
        updateIcon(): void;
    }
}
declare namespace WebClient {
    class MainMenuParams extends PanelParams {
        standardCssClass?: string;
        isPinned?: boolean;
        toggle?: BasicApiEvent<boolean>;
    }
    interface MainMenuState extends MainMenuParams, PanelState {
    }
    class MainMenu extends Panel<MainMenuParams, MainMenuState> {
        protected createParams(): MainMenuParams;
        protected isPinned: boolean;
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface MainMenuState extends PanelState, BaseControlState {
    }
    class MainMenuImpl extends PanelImpl<MainMenuParams, MainMenuState> {
        constructor(props: MainMenuParams);
        componentDidMount(): void;
        private onSidebarToggle;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class MainMenuRouteHandler implements IRouteHandler<any> {
        name: string;
        mountRoute?(data: any, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute(data: any, routeType: RouteType): JQueryDeferred<{}>;
    }
}
declare namespace WebClient {
    interface BaseNavigationMainMenuItemImplState extends BaseMainMenuItemImplState, BaseNavigationMainMenuItemState {
    }
    abstract class BaseNavigationMainMenuItemImpl<PropsT extends BaseNavigationMainMenuItemParams, StateT extends BaseNavigationMainMenuItemImplState> extends BaseMainMenuItemImpl<PropsT, StateT> {
        constructor(props: PropsT);
        onContentClick(): void;
        protected getCssClass(): string;
        abstract getNavigationHref(): string;
        renderSelfContent(): JSX.Element;
    }
}
declare namespace WebClient {
    interface LinkMainMenuItemImplState extends BaseNavigationMainMenuItemImplState, LinkMainMenuItemState {
    }
    class LinkMainMenuItemImpl extends BaseNavigationMainMenuItemImpl<LinkMainMenuItemParams, LinkMainMenuItemImplState> {
        constructor(props: LinkMainMenuItemParams);
        getNavigationHref(): string;
        renderSelfContent(): JSX.Element;
    }
}
declare namespace WebClient {
    class LayoutPageMainMenuItemParams extends BaseMainMenuItemParams {
        standardCssClass?: string;
        position: string;
        header: string;
        color: string;
    }
    interface LayoutPageMainMenuItemState extends LayoutPageMainMenuItemParams, BaseMainMenuItemState {
    }
    class LayoutPageMainMenuItem extends BaseMainMenuItem<LayoutPageMainMenuItemParams, LayoutPageMainMenuItemState> {
        protected createParams(): LayoutPageMainMenuItemParams;
        private headerResourceKey;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface LayoutPageMainMenuItemImplState extends BaseMainMenuItemImplState, LayoutPageMainMenuItemState {
    }
    class LayoutPageMainMenuItemImpl extends BaseMainMenuItemImpl<LayoutPageMainMenuItemParams, LayoutPageMainMenuItemImplState> {
        constructor(props: LayoutPageMainMenuItemParams);
        renderSelfContent(): JSX.Element;
    }
}
declare namespace WebClient {
    class GroupMainMenuItemParams extends BaseMainMenuItemParams {
        standardCssClass?: string;
        isExpanded?: boolean;
        showRoot?: boolean;
    }
    interface GroupMainMenuItemState extends GroupMainMenuItemParams, BaseMainMenuItemState {
    }
    class GroupMainMenuItem extends BaseMainMenuItem<GroupMainMenuItemParams, GroupMainMenuItemState> implements IProxyControl {
        protected showRoot: string | boolean;
        protected level: number | string;
        readonly isProxyControl: boolean;
        renderProxyChildren(): JSX.Element[];
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        protected createParams(): GroupMainMenuItemParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface GroupMainMenuItemImplState extends BaseMainMenuItemImplState, GroupMainMenuItemState {
    }
    class GroupMainMenuItemImpl extends BaseMainMenuItemImpl<GroupMainMenuItemParams, GroupMainMenuItemImplState> {
        constructor(props: GroupMainMenuItemParams);
        protected onClick(event: React.MouseEvent): void;
        protected canAutoExpand: () => boolean;
        protected getChildrenAutoExpandLevelsCount: () => number;
        renderProxyChildren(): JSX.Element[];
        protected getCssClass(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class GroupFoldersMainMenuItemParams extends BaseMainMenuItemParams {
        standardCssClass?: string;
        isExpanded?: boolean;
        showRoot?: boolean;
        foldersPreloadLevel?: number;
        compactFolders?: boolean;
        showIcons?: boolean;
    }
    interface GroupFoldersMainMenuItemState extends GroupFoldersMainMenuItemParams, BaseMainMenuItemState {
    }
    class GroupFoldersMainMenuItem extends BaseMainMenuItem<GroupFoldersMainMenuItemParams, GroupFoldersMainMenuItemState> implements IProxyControl {
        protected createParams(): GroupFoldersMainMenuItemParams;
        protected showRoot: string | boolean;
        protected expanded: string | boolean;
        protected level: number | string;
        readonly isProxyControl: boolean;
        renderProxyChildren(): JSX.Element[];
        protected registerChild(child: BaseControl<BaseControlParams, BaseControlState>): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface GroupFoldersMainMenuItemImplState extends BaseMainMenuItemImplState, GroupFoldersMainMenuItemState {
    }
    class GroupFoldersMainMenuItemImpl extends BaseMainMenuItemImpl<GroupFoldersMainMenuItemParams, GroupFoldersMainMenuItemImplState> {
        constructor(props: GroupFoldersMainMenuItemParams);
        protected onClick(event: React.MouseEvent): void;
        protected canAutoExpand: () => boolean;
        protected getChildrenAutoExpandLevelsCount: () => number;
        renderProxyChildren(): JSX.Element[];
        protected getCssClass(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface FolderMainMenuItemImplState extends BaseNavigationMainMenuItemImplState, FolderMainMenuItemState {
        loader: RequestHelper;
        controlNames: {
            [folderId: string]: string;
        };
    }
    class FolderMainMenuItemImpl extends BaseNavigationMainMenuItemImpl<FolderMainMenuItemParams, FolderMainMenuItemImplState> {
        constructor(props: FolderMainMenuItemParams);
        generateControlName(folderId: string): void;
        protected getAutoExpandLevelsCount: () => number;
        protected getChildrenAutoExpandLevelsCount: () => number;
        protected canAutoExpand: () => boolean;
        protected autoExpand(): Promise<void>;
        renderChildren(): JSX.Element[];
        protected hasSubfolders(): boolean;
        loadChildren(levelsDown?: number): JQueryDeferred<IFolderItemNodeData>;
        onToggleClick(ev: React.MouseEvent): void;
        toggleInternal(): Promise<void>;
        getNavigationHref(): string;
        onContentClick(): void;
        protected getIconClass(): string;
        protected getUnreadCount(): string | undefined;
        renderSelfContent(): JSX.Element;
        protected getCssClass(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class FolderMainMenuItemRouteHandler implements IRouteHandler<IFolderRouteData> {
        static Components: {
            [folderId: string]: FolderMainMenuItem[];
        };
        name: string;
        prepareRouteDataLoad?(routeData: Partial<IFolderRouteData>, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        static loadSelectedFolder(parentNodes: string[]): void;
        static register(folderId: string, control: FolderMainMenuItem): void;
    }
}
declare namespace WebClient {
    enum FolderNodeStyle {
        FolderView = 1,
        FolderCard = 2,
        FolderURL = 4,
        FolderDigest = 8,
    }
}
declare namespace WebClient {
    class CustomHtmlPageMainMenuItemParams extends BaseNavigationMainMenuItemParams {
        standardCssClass?: string;
        url: string;
        header: string;
        color: string;
    }
    interface CustomHtmlPageMainMenuItemState extends CustomHtmlPageMainMenuItemParams, BaseNavigationMainMenuItemState {
    }
    class CustomHtmlPageMainMenuItem extends BaseNavigationMainMenuItem<CustomHtmlPageMainMenuItemParams, CustomHtmlPageMainMenuItemState> {
        protected createParams(): CustomHtmlPageMainMenuItemParams;
        private headerResourceKey;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface CustomHtmlPageMainMenuItemImplState extends BaseNavigationMainMenuItemImplState, CustomHtmlPageMainMenuItemState {
    }
    class CustomHtmlPageMainMenuItemImpl extends BaseNavigationMainMenuItemImpl<CustomHtmlPageMainMenuItemParams, CustomHtmlPageMainMenuItemImplState> {
        constructor(props: CustomHtmlPageMainMenuItemParams);
        getNavigationHref(): string;
    }
}
declare namespace WebClient {
    class ConfigurableMainMenuContainerParams extends BaseMainMenuItemParams {
        standardCssClass?: string;
        mainMenuSettings: IMainMenuSettings;
        isConfigurationStarted?: boolean;
        configurationStarting?: CancelableApiEvent<void>;
        configurationStared?: BasicApiEvent<void>;
        configurationSaving?: CancelableApiEvent<IMainMenuSettings>;
        configurationSaved?: BasicApiEvent<IMainMenuSettings>;
        configurationFinishing?: CancelableApiEvent<boolean>;
        configurationFinished?: BasicApiEvent<boolean>;
    }
    interface ConfigurableMainMenuContainerState extends ConfigurableMainMenuContainerParams, BaseMainMenuItemState {
        controlsToHide: BaseMainMenuItem<BaseMainMenuItemParams, any>[];
        acceptChanges: () => void;
        cancelChanges: () => void;
    }
    class ConfigurableMainMenuContainer extends BaseMainMenuItem<ConfigurableMainMenuContainerParams, ConfigurableMainMenuContainerState> {
        constructor(props: any);
        protected createParams(): ConfigurableMainMenuContainerParams;
        protected mainMenuSettings: IMainMenuSettings;
        protected childrenHandler: ILayoutModel[];
        hideItemModels(current: ILayoutModel): void;
        beginConfiguration(): void;
        resetSettings(): Promise<void>;
        protected toggleConfigurationMode(current: LayoutControl, enabled: boolean): void;
        finishConfigurationMode(accepted: boolean): Promise<void>;
        protected applyMainMenuSettings(settings: IMainMenuSettings): void;
        protected onControlConfigredToHide: (sender: BaseMainMenuItem<BaseMainMenuItemParams, any>, configuredToHide: boolean) => void;
        protected saveSettings(settings: IMainMenuSettings): JQueryDeferred<void>;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ConfigurableMainMenuContainerImplState extends BaseMainMenuItemImplState, ConfigurableMainMenuContainerState {
    }
    class ConfigurableMainMenuContainerImpl extends BaseMainMenuItemImpl<ConfigurableMainMenuContainerParams, ConfigurableMainMenuContainerImplState> {
        constructor(props: ConfigurableMainMenuContainerParams);
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class ConnectConfigurableMainMenuContainerButtonScriptParams extends LayoutScriptParams {
        configurableContainerName: string;
        buttonName: string;
    }
    class ConnectConfigurableMainMenuContainerButtonScript extends LayoutScript<ConnectConfigurableMainMenuContainerButtonScriptParams> {
        private container;
        private pinButton;
        protected createParams(): ConnectConfigurableMainMenuContainerButtonScriptParams;
        init(): void;
    }
}
declare namespace WebClient {
    class ConfigurableMainMenuContainerButtonParams extends BaseControlParams {
        standardCssClass?: string;
        tip?: string;
        iconClass?: string;
        menuExpanded?: boolean;
        showBeginConfigurationItem?: boolean;
        showRestoreItem?: boolean;
        showAttachFolderItem?: boolean;
        beginConfigurationClicked?: BasicApiEvent<void>;
        restoreClicked?: BasicApiEvent<void>;
        attachFolderClicked?: BasicApiEvent<void>;
    }
    interface ConfigurableMainMenuContainerButtonState extends ConfigurableMainMenuContainerButtonParams, BaseControlState {
    }
    class ConfigurableMainMenuContainerButton extends BaseControl<ConfigurableMainMenuContainerButtonParams, ConfigurableMainMenuContainerButtonState> {
        constructor(props: ConfigurableMainMenuContainerButtonParams);
        protected createParams(): ConfigurableMainMenuContainerButtonParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ConfigurableMainMenuContainerButtonImplState extends BaseControlImplState, ConfigurableMainMenuContainerButtonState {
    }
    class ConfigurableMainMenuContainerButtonImpl extends BaseControlImpl<ConfigurableMainMenuContainerButtonParams, ConfigurableMainMenuContainerButtonImplState> {
        constructor(props: ConfigurableMainMenuContainerButtonParams);
        protected handleClick(event: React.MouseEvent): void;
        protected onToggleMenuClick: () => void;
        protected onCloseMenu: () => void;
        protected onBeginConfigurationClick: () => void;
        protected onRestoreClick: () => void;
        protected onAttachFolderClick: () => void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    type BaseNavigationItem = BaseNavigationMainMenuItem<BaseNavigationMainMenuItemParams, any>;
    class BaseNavigationMenuItemRouteHandler implements IRouteHandler<any> {
        private static Components;
        name: string;
        mountRoute?(routedata: any, routeType: RouteType): JQueryDeferred<RouteHandleResult>;
        unmountRoute?(data: any, routeType: RouteType): JQueryDeferred<{}>;
        private static unselectAllComponents();
        private static select(route);
        static register(control: BaseNavigationItem): void;
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
        addLinkTypes?: IAllowedCardType[];
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
    interface LinksState extends LinksParams, BaseControlState {
        model: ILinksDataModel;
        bindingInfo: ISimpleBindingInfo;
        createLinkOperationBinding: string;
        addLinkOperationBinding: string;
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
        private addLinkTypes;
        private showOpened;
        openAddExitingCardDialog(): void;
        openAddNewCardDialog(): void;
        openFilePreview(linkItem: LinkItem): void;
        getLinkUrl(linkItem: LinkItem): string;
        deleteLink(linkItem: LinkItem): void;
        protected setParamValues(props: BaseControlParams, initial: boolean): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface LinksImplState extends BaseControlImplState, LinksState {
        addExistingCardLinkDialog: ExistingCardLinkDialog;
    }
    class LinksImpl extends BaseControlImpl<LinksParams, LinksImplState> {
        requestHelper: RequestHelper;
        constructor(props: LinksParams);
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected closeAllMenus(): void;
        protected loadLinksModel(model: ILinksDataModel): void;
        protected model: ILinksDataModel;
        protected getCardCreateLink(cardTypeId: string, kindId: string, linkTypeId: string): string;
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
        protected hideInfoPopover(linkItem: LinkItem): void;
        protected showInfoPopover(linkItem: LinkItem): void;
        protected onLinkInfoEdited(linkItem: LinkItem): void;
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
    interface INewCardLinkDialogProps {
        kinds: IKindModel[];
        linkTypes: ILinkType[];
        onKindSelected?: (sender: NewCardLinkDialog, args: NewCardLinkDialogArgs) => void;
        onLinkTypeSelect?: (sender: NewCardLinkDialog, args: NewCardLinkDialogArgs) => void;
    }
}
declare namespace WebClient {
    interface INewCardLinkDialogState {
        selectedKind: IKindModel;
        selectedLinkType: ILinkType;
        treeNodes: KindTreeNodeData[];
        tree: Tree;
        root: HTMLElement;
    }
}
declare namespace WebClient {
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
    class LinkInfoPopover extends React.Component<ILinkInfoPopoverProps, ILinkInfoPopoverState> {
        constructor(props: ILinkInfoPopoverProps);
        onTextClick(event: React.MouseEvent): void;
        beginEdit(): void;
        saveComment(): void;
        onSaveClick(): void;
        onCommentChange(event: React.SyntheticEvent): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ILinkInfoPopoverProps {
        linkItem: LinkItem;
        bindingInfo: ISimpleBindingInfo;
        iconClass: string;
        editAvailable: boolean;
        onSaved: (model: ILinksDataModel) => void;
        maxCommentLength?: number;
        linkInfoEditing: CancelableEvent<ILinkEventArgs>;
        linkInfoEdited: (item: LinkItem) => void;
        ownedLayout: Layout;
    }
}
declare namespace WebClient {
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
    class ExistingCardLinkDialog {
        ownedLayout: Layout;
        bindingInfo: ISimpleBindingInfo;
        editOperation: string;
        saveHardLink: boolean;
        allowedLinkTypes: string[];
        allowedCardTypes: string[];
        constructor(ownedLayout: Layout, bindingInfo: ISimpleBindingInfo, saveHardLink: boolean, allowedLinkTypes: string[], allowedCardTypes: string[], editOperation: string);
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
        infoPopoverOpen: boolean;
    }
}
declare namespace WebClient {
    class LinkTypeComboBoxVariant implements IComboBoxVariant {
        data: ILinkType;
        constructor(val: ILinkType);
        readonly displayName: any;
        readonly uniqueId: string;
    }
}
declare namespace WebClient {
    class LayoutIconButtonParams extends BaseControlParams {
        standardCssClass?: string;
        tip?: string;
        iconClass?: string;
        canClick?: boolean;
    }
    interface LayoutIconButtonState extends LayoutIconButtonParams, BaseControlState {
    }
    class LayoutIconButton extends BaseControl<LayoutIconButtonParams, LayoutIconButtonState> {
        constructor(props: LayoutIconButtonParams);
        protected createParams(): LayoutIconButtonParams;
        private readonly myControlImpl;
        private bindingEditOperation;
        performClick(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface LayoutIconButtonImplState extends BaseControlImplState, LayoutIconButtonState {
        loading: boolean;
    }
    class LayoutIconButtonImpl extends BaseControlImpl<LayoutIconButtonParams, LayoutIconButtonImplState> {
        constructor(props: LayoutIconButtonParams);
        performClick(event?: React.MouseEvent): void;
        protected handleClick(event: React.MouseEvent): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class LayoutParams extends PanelParams {
        standardCssClass?: string;
        cardOpening?: CancelableApiEvent<IEventArgs>;
        cardOpened?: BasicApiEvent<IEventArgs>;
        cardSaving?: CancelableApiEvent<ISaveControlData>;
        cardSaved?: BasicApiEvent<IEventArgs>;
        cardSaveFailed?: BasicApiEvent<IEventArgs>;
        cardStateChanging?: CancelableApiEvent<ICardStateChangingEventArgs>;
        cardLayoutSwitching?: CancelableApiEvent<IEventArgs>;
        mapLayout?: (layoutResolver: () => Layout) => void;
    }
    interface LayoutState extends LayoutParams, PanelState {
        isInitialized: boolean;
        controlStore: ControlStore;
        cardInfo: ICardInfoModel;
        layoutInfo: ILayoutInfoModel;
        layoutContainer: LayoutContainer;
        editOperations: IEditOperationStore;
        saved: boolean;
    }
    class Layout extends Panel<LayoutParams, LayoutState> {
        constructor(props: LayoutParams);
        protected createParams(): LayoutParams;
        componentDidMount(): void;
        readonly controls: ControlWrapperMap;
        private cardInfoHandler;
        readonly cardInfo: ICardInfoModel;
        private layoutInfoHandler;
        readonly layoutInfo: ILayoutInfoModel;
        private layoutContainerHandler;
        readonly layoutContainer: LayoutContainer;
        private editOperationsrHandler;
        readonly editOperations: IEditOperationStore;
        readonly layout: Layout;
        readonly cardTypeName: string;
        protected readonly control: LayoutImpl;
        protected registerControl(control: BaseControl<BaseControlParams, BaseControlState>): void;
        protected unregisterControl(control: BaseControl<BaseControlParams, BaseControlState>): void;
        saveCard(control?: BaseControl<BaseControlParams, BaseControlState>, doNotMarkAsSaved?: boolean): JQueryDeferred<any>;
        changeState(operationId: string): void;
        checkLockAndModified(): JQueryDeferred<any>;
        protected handleCardOpening(): void;
        protected handleCardOpened(): void;
        protected handleCardSaving(saveControlData: ISaveControlData): JQueryDeferred<any>;
        protected handleCardSaved(): void;
        protected handleCardSaveFailed(): void;
        protected handleCardStateChanging(operationId: string, callback: () => void): void;
        protected handleCardLayoutSwitching(callback: () => void): void;
        readonly saved: boolean;
        componentWillMount(): void;
        deinit(): void;
        destroy(): JQueryDeferred<any>;
        render(): JSX.Element;
        protected setParamValues(props: BaseControlParams, initial: boolean): void;
    }
}
declare namespace WebClient {
    interface LayoutImplProps extends LayoutParams {
        cardTypeName: string;
    }
    interface LayoutImplState extends PanelImplState, LayoutState, LayoutImplProps {
    }
    class LayoutImpl extends PanelImpl<LayoutImplProps, LayoutImplState> {
        constructor(props: LayoutImplProps);
        protected readonly wrapper: Layout;
        protected prepareChildren(): void;
        protected getCssClass(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class LabelParams extends BaseControlParams {
        text: string;
        standardCssClass?: string;
    }
    interface LabelState extends LabelParams, BaseControlState {
    }
    class Label extends BaseControl<LabelParams, LabelState> {
        protected createParams(): LabelParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface LabelImplState extends BaseControlImplState, LabelState {
    }
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
    interface IDataChangedEventArgsEx<T> extends IDataChangedEventArgs {
        oldValue: T;
        newValue: T;
    }
}
declare namespace WebClient {
    class HistoryParams extends BaseControlParams {
        standardCssClass?: string;
        buttonText?: string;
        tip?: string;
        canViewHistory?: boolean;
        showPreview?: boolean;
        recordsOnPage?: number;
        records?: HistoryRecord[];
        authorFilterValue?: IEmployeeData;
        dateFilterValue?: string;
        eventFilterValue?: string;
        showMoreButtonInPreview?: boolean;
        showOpenButton?: boolean;
        showFiltersInPreview?: boolean;
        cardId?: string;
        operationsToHide: string[];
        recordsChanged?: BasicApiEvent<IRecordsChangedEventArgs>;
        windowOpeninig?: CancelableApiEvent<IEventArgs>;
        windowOpened?: BasicApiEvent<IEventArgs>;
        windowClosing?: CancelableApiEvent<IEventArgs>;
        windowClosed?: BasicApiEvent<IEventArgs>;
    }
    interface HistoryState extends HistoryParams, BaseControlState {
        external: HistoryExternalRelations;
        previewRecords: HistoryRecord[];
        previewRecordsContainsAllRecords: boolean;
        cacheId: string;
        editOperation: string;
    }
    class History extends BaseControl<HistoryParams, HistoryState> {
        constructor(props: HistoryParams);
        protected createParams(): HistoryParams;
        private readonly myControlImpl;
        private operationsToHideBinding;
        private binding;
        openHistoryWindow(): void;
        closeHistoryWindow(): void;
        loadNextPage(pageSize?: number): JQueryDeferred<HistoryResponse>;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class HistoryExternalRelations {
        private cardId;
        private historyController;
        constructor(cardId: string, historyController: LayoutHistoryController);
        getHistoryRecords(skip: number, maxCount: number, cacheId: string, editOperation: string, hideOperations?: string[], employeeName?: string, date?: Date, eventSearch?: string): JQueryDeferred<HistoryResponse>;
    }
}
declare namespace WebClient {
    interface HistoryImplState extends BaseControlImplState, HistoryState {
        employeeVisualiser: EmployeeVisualizer;
        modalHost: ModalHost;
        modalView: HistoryView;
        previewView: HistoryView;
    }
    class HistoryImpl extends BaseControlImpl<HistoryParams, HistoryImplState> {
        static ModalPageSize: number;
        constructor(props: HistoryParams);
        openHistoryWindow(): void;
        closeHistoryWindow(): void;
        onRecordsChanged(records: HistoryRecord[]): void;
        renderModalWindow(): JSX.Element;
        onButtonClick(event?: React.MouseEvent): void;
        onShowMoreClick(): void;
        renderControl(): JSX.Element;
        attachModalView(view: HistoryView): void;
        attachPreviewView(view: HistoryView): void;
        protected readonly currentView: HistoryView;
        records: HistoryRecord[];
        recordsOnPage: number;
        authorFilterValue: IEmployeeData;
        dateFilterValue: Date;
        eventFilterValue: string;
        loadNextPage(pageSize?: number): JQueryDeferred<HistoryResponse>;
    }
}
declare namespace WebClient {
    interface HistoryRecordViewProps {
        record: HistoryRecord;
        employeeVisualiser: EmployeeVisualizer;
        eventSearch?: string;
        columnsWidth?: string[];
        mobile: boolean;
    }
    const HistoryRecordView: (props: HistoryRecordViewProps) => JSX.Element;
}
declare namespace WebClient {
    interface HistoryViewProps {
        previewRecords: HistoryRecord[];
        employeeVisualiser: EmployeeVisualizer;
        external: HistoryExternalRelations;
        pageSize: number;
        autoLoadScrollGap?: number;
        onRecordsChanged?: (records: HistoryRecord[]) => void;
        modalMode: boolean;
        showFilters: boolean;
        autoLoadOnScroll: boolean;
        useTableMode?: boolean;
        operationsToHide: string[];
        cacheId: string;
        editOperation: string;
    }
    interface HistoryViewState {
        loader: RequestHelper;
        records: HistoryRecord[];
        cacheId: string;
        authorNameFilter: Employee;
        dateFilter: DateTimePicker;
        eventSearch: TextBox;
        hasMore: boolean;
        bodyScrollContainer: HTMLElement;
        quickSearchLogic: QuickSearchLogic;
    }
    class HistoryView extends React.Component<HistoryViewProps, HistoryViewState> {
        constructor(props: HistoryViewProps);
        componentDidMount(): void;
        loadRecords(authorNameFilter?: string, dateFilter?: Date, eventSearch?: string, pageSize?: number): JQueryDeferred<HistoryResponse>;
        loadNextPage(pageSize?: number): JQueryDeferred<HistoryResponse>;
        reload(): void;
        onRecordsChanged(): void;
        isScrolledDown(elem: HTMLElement): boolean;
        loadIfScrollDown(): void;
        onBodyScroll(ev: React.UIEvent): void;
        attachTableBodyContainer(elem: HTMLElement): void;
        onEmployeeChanged(sender: any, args: IDataChangedEventArgs): void;
        onDateChanged(sender: any, args: IDataChangedEventArgs): void;
        onEventSearchChanged(sender: any, args: IDataChangedEventArgs): void;
        renderTableHeader(): JSX.Element;
        renderTableBody(): JSX.Element;
        render(): JSX.Element;
        attachAuthorFilter(control: Employee): void;
        attachDateFilter(control: DateTimePicker): void;
        attachEventFilter(control: TextBox): void;
        records: HistoryRecord[];
        authorFilterValue: IEmployeeData;
        dateFilterValue: Date;
        eventFilterValue: string;
    }
}
declare namespace WebClient {
    interface IRecordsChangedEventArgs {
        records: HistoryRecord[];
    }
}
declare namespace WebClient {
    class FolderParams extends BaseControlParams {
        standardCssClass?: string;
        tip?: string;
        placeHolder?: string;
        labelText?: string;
        showEmptyLabel?: boolean;
        required?: boolean;
        folderMode?: FolderMode;
        currentFolderForbidden?: boolean;
        currentFolder?: string;
        value?: IFolderInfo;
        cardId?: string;
        dataChanged?: BasicApiEvent<IDataChangedEventArgs>;
    }
    interface FolderState extends FolderParams, BaseControlState {
        checkFolderForAvailable: (folderId: string) => JQueryDeferred<ICheckResult>;
    }
    class Folder extends BaseControl<FolderParams, FolderState> {
        constructor(props: FolderParams);
        protected createParams(): FolderParams;
        private readonly folderImpl;
        private visibility;
        hide(): void;
        clear(): void;
        show(): void;
        onSaving(): JQueryDeferred<any>;
        validate(params: IValidationParams): IValidationResult[];
        protected checkFolderForAvailable(folderId: string): JQueryDeferred<ICheckResult>;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface FolderImplState extends BaseControlImplState, FolderState {
        dialog: WebClient.ModalWindow;
        validationMessage: string;
    }
    class FolderImpl extends BaseControlImpl<FolderParams, FolderImplState> {
        constructor(props: FolderParams);
        show(): void;
        hide(): void;
        clear(): void;
        validate(params: IValidationParams): IValidationResult;
        protected handleDataChanged(eventArgs: IDataChangedEventArgs): void;
        protected renderValidationMessage(): JSX.Element;
        protected updateValidationMessage(): void;
        protected changeFolder(newFolder: IFolderInfo): void;
        protected onFolderSelected(controlInModal: FolderModal, window: WebClient.ModalWindow): void;
        protected selectFolder(folderId: string): Promise<void>;
        protected getFolderInfo(folderId: string): JQueryDeferred<IFolderInfo>;
        protected renderLabel(): JSX.Element;
        protected renderValue(): JSX.Element;
        protected renderClearButton(): JSX.Element;
        protected getCssClass(): string;
        renderControl(): JSX.Element;
        value: IFolderInfo;
    }
}
declare namespace WebClient {
    class FolderModal extends React.Component<any, IFolderModalState> {
        folderSelectedEvent: SimpleEvent<IFolderInfo>;
        recursive: RecursiveVisitor<IFolderInfo>;
        level: IAccessor<IFolderInfo, number>;
        expanded: IAccessor<IFolderInfo, boolean>;
        visible: IAccessor<IFolderInfo, boolean>;
        childrenLoaded: IAccessor<IFolderInfo, boolean>;
        childrenLoading: IAccessor<IFolderInfo, LoadingState>;
        constructor(props: any);
        componentDidMount(): void;
        readonly selectedFolder: IFolderInfo;
        readonly folderSelected: IBasicEvent<IFolderInfo>;
        protected onToggleFolder: (folder: IFolderInfo) => void;
        protected onFolderSelected: (folder: IFolderInfo) => void;
        protected updateFoldersMeta(folders: IFolderInfo[], parentFolder?: IFolderInfo): void;
        protected getFlatFolders(treeFolders?: IFolderInfo[]): IFolderInfo[];
        protected getFolderIconClass(folder: IFolderInfo): string;
        renderFolder: (index: any, key: any) => JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IFolderModalState {
        initialLoading: LoadingState;
        tree: Tree;
        folders: IFolderInfo[];
        flatFolders: IFolderInfo[];
        selectedFolderID: string;
    }
}
declare namespace WebClient {
    class FileListControlParams extends BaseControlParams {
        standardCssClass?: string;
        totalCount: number;
        files: FileListItem[];
        hasAnySignature: boolean;
        mainFilesExpanded: boolean;
        extraFilesExpanded: boolean;
        fileCommandBarExpanded: boolean;
        signCommandBarExpanded: boolean;
        editMode: EditMode;
        canAddMain: boolean;
        canAddExtra: boolean;
        canSign: boolean;
        canViewSign: boolean;
        mainFileAdding: CancelableApiEvent<IMainFileAddingArgs>;
        extraFileAdding: CancelableApiEvent<IExtraFileAddingArgs>;
        mainFileDeleting: CancelableApiEvent<IMainFileDeletingArgs>;
        extraFileDeleting: CancelableApiEvent<IExtraFileDeletingArgs>;
        fileVersionDownloading: CancelableApiEvent<IFileVersionDownloadingArgs>;
        fileVersionUploading: CancelableApiEvent<IFileVersionUploadingArgs>;
        fileOpening: CancelableApiEvent<IFileOpeningArgs>;
        signatureListViewing: CancelableApiEvent<ISignatureListViewingArgs>;
        signatureCreating: CancelableApiEvent<ISignatureCreatingArgs>;
        fileVersionCommentAdding: CancelableApiEvent<IFileVersionCommentAddingArgs>;
        fileVersionCommentDeleting: CancelableApiEvent<IFileVersionCommentDeletingArgs>;
        filePreviewing: CancelableApiEvent<IFilePreviewingArgs>;
        mainFileDeleted: BasicApiEvent<IMainFileDeletedArgs>;
        extraFileDeleted: BasicApiEvent<IExtraFileDeletedArgs>;
        fileVersionDownloaded: BasicApiEvent<IFileVersionDownloadedArgs>;
        fileVersionUploaded: BasicApiEvent<IFileVersionUploadedArgs>;
        fileOpened: BasicApiEvent<IFileOpenedArgs>;
        signatureListViewed: BasicApiEvent<ISignatureListViewedArgs>;
        signatureCreated: BasicApiEvent<ISignatureCreatedArgs>;
        fileVersionCommentAdded: BasicApiEvent<IFileVersionCommentAddedArgs>;
        fileVersionCommentDeleted: BasicApiEvent<IFileVersionCommentDeletedArgs>;
        mainFileAdded: BasicApiEvent<IMainFileAddedArgs>;
        extraFileAdded: BasicApiEvent<IExtraFileAddedArgs>;
        filePreviewed: BasicApiEvent<IFilePreviewedArgs>;
    }
    interface FileListControlState extends FileListControlParams, BaseControlState {
        logic: FileListControlLogic;
        autoUpload: boolean;
    }
    class FileListControl extends BaseControl<FileListControlParams, FileListControlState> {
        constructor(props: FileListControlParams);
        protected createParams(): FileListControlParams;
        private readonly fileListImpl;
        private bindingEditOperation;
        openAddMainFileDialog(): void;
        openAddExtraFileDialog(): void;
        openSignListDialog(): void;
        openSignDialog(): void;
        canRead(fileItem: FileListItem): boolean;
        canEdit(fileItem: FileListItem): boolean;
        canDelete(fileItem: FileListItem): boolean;
        canLock(fileItem: FileListItem): boolean;
        canComment(fileItem: FileListItem): boolean;
        removeFile(fileItem: FileListItem): JQueryDeferred<any>;
        lockFile(fileItem: FileListItem): void;
        unlockFile(fileItem: FileListItem): void;
        openCommentsDialog(fileItem: FileListItem, fileVersion?: IFileVersion): void;
        getVersionsListExpanded(fileItem: FileListItem): boolean;
        toggleVersionsList(fileItem: FileListItem): void;
        openPreview(fileItem: FileListItem, fileVersion?: IFileVersion): void;
        download(fileItem: FileListItem, fileVersion?: IFileVersion): void;
        openWebDav(fileItem: FileListItem): void;
        onSaved(): JQueryDeferred<any>;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface FileListImplState extends BaseControlImplState, FileListControlState {
        showPlaceholders?: boolean;
    }
    class FileListControlImpl extends BaseControlImpl<FileListControlParams, FileListImplState> {
        mainAttach: FileListAttachedElements;
        extraAttach: FileListAttachedElements;
        signButton: HTMLElement;
        viewSignButton: HTMLElement;
        fileSignLogic: WebClient.FileSign;
        isLeftFilesLoading: boolean;
        isLeftFilesLoaded: boolean;
        readonly logic: FileListControlLogic;
        constructor(props: FileListControlParams);
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected getCssClass(): string;
        protected getFilesSignInfo(): WebClient.IFileSignInfo[];
        renderUploadForm(attach: FileListAttachedElements, action: string, main: boolean, fileItem?: FileListItem): JSX.Element;
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
    class FileListControlLogic {
        mainAttach: FileListAttachedElements;
        extraAttach: FileListAttachedElements;
        initialized: boolean;
        lastSaveDeferred: JQueryDeferred<any>;
        parent: FileListControlImpl;
        filesToRemove: FileListItem[];
        constructor();
        init(_mainAttach: FileListAttachedElements, _extraAttach: FileListAttachedElements, _parent: FileListControlImpl): void;
        loadFilesFromModel(model: IFileListDataModel, oldFiles?: FileListItem[]): FileListItem[];
        loadFileModel(model: IFileListDataModel, appendFiles?: boolean): void;
        onSaved(): JQueryDeferred<any>;
        uploadNewFiles(): JQueryDeferred<any>;
        sendRequest(sendFunc: () => JQueryDeferred<IFileListDataModel>, savingItems: FileListItem[]): JQueryDeferred<any>;
        getFiles(mainFiles: boolean): FileListItem[];
        initJQueryUploaderForAddFiles(attach: FileListAttachedElements, main: boolean): void;
        initJQueryUploaderForAddFileVersions(attach: FileListAttachedElements, fileItem: FileListItem): void;
        download(fileItem: FileListItem, fileVersion: IFileVersion, action: string): void;
        webDav(fileItem: FileListItem, canEdit: boolean): void;
        removeFile(fileItem: FileListItem, immediately: boolean): JQueryDeferred<any>;
        protected removeFileFromServer(fileItem: FileListItem): JQueryDeferred<any>;
        showPreviewIfSupported(fileItem: FileListItem, version?: IFileVersion): void;
        lockFile(fileItem: FileListItem): void;
        unlockFile(fileItem: FileListItem): void;
        showCommentsDialog(fileItem: FileListItem, versionId: string, enableAddComments: boolean): void;
        loadFilesPart(skipCount: number, maxCount?: number): JQueryDeferred<void>;
        protected updateVersionsOnLoad(): void;
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
        protected sendFiles(attach: FileListAttachedElements, items: FileListItem[], areVersions?: boolean): JQueryDeferred<any>;
        protected processResponse(responseData: IFileListDataModel, deferred: JQueryDeferred<any>, uploadingItems: FileListItem[], areVersions?: boolean): void;
        protected getItemsToUpload(): FileListItem[];
    }
}
declare namespace WebClient {
    class FileListItemComponent extends React.Component<FileListItemProps, any> {
        logic: FileListControlLogic;
        downloadAction: string;
        versionsRequestHelper: RequestHelper;
        childVersionsLoaded: boolean;
        constructor(props: FileListItemProps);
        canRead(fileItem: FileListItem): boolean;
        canEdit(fileItem: FileListItem): boolean;
        canDelete(fileItem: FileListItem): boolean;
        canLock(fileItem: FileListItem): boolean;
        canComment(fileItem: FileListItem): boolean;
        protected onMenuClose(fileItem: FileListItem): void;
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
    const FileListItemPlaceholderWrapper: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    const FileListItemPlaceholderIcon: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    const FileListItemPlaceholderName: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    const FileListItemPlaceholderVersion: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    const FileListItemPlaceholderSettings: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    interface FileListItemPlaceholderComponentProps {
        hidden?: boolean;
    }
    const FileListItemPlaceholderComponent: (props: FileListItemPlaceholderComponentProps) => JSX.Element;
}
declare namespace WebClient {
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
    enum FileListItemState {
        New = 0,
        Saving = 1,
        Saved = 2,
    }
}
declare namespace WebClient {
    const FileListVersionPlaceholderVersion: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    const FileListVersionPlaceholderAuthor: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    const FileListVersionPlaceholderDate: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    const FileListVersionPlaceholderComments: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    const FileListVersionPlaceholderDownload: styled.StyledComponentClass<React.HTMLProps<HTMLDivElement>, any, React.HTMLProps<HTMLDivElement>>;
    interface IFileListVersionPlaceholder {
        canRead?: boolean;
        hidden?: boolean;
    }
    const FileListVersionPlaceholder: (props: IFileListVersionPlaceholder) => JSX.Element;
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
    class FileListItem implements IFileListItem {
        data: ILayoutFileModel;
        settingsMenuExpaned: boolean;
        versionsListExanded: boolean;
        versionsListAnimating: boolean;
        comentsDialogOpen: boolean;
        uploadVersionAttachedElements: FileListAttachedElements;
        versionListElement: HTMLElement;
        itemComponent: FileListItemComponent;
        file: File;
        state: FileListItemState;
    }
}
declare namespace WebClient {
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
    class EmployeeVisualizer {
        tipMode: EmployeeTooltipMode;
        viewMode: EmployeeViewMode;
        constructor(tipMode: EmployeeTooltipMode, viewMode?: EmployeeViewMode);
        getTooltip(employeeData: IBasicEmployeeInfo): string;
        getDisplayName(employee: IBasicEmployeeInfo): string;
    }
}
declare namespace WebClient {
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
    class MultipleEmployeesParams extends InputBasedControlParams<IEmployeeData[]> {
        standardCssClass?: string;
        value?: IEmployeeData[];
        tipMode?: EmployeeTooltipMode;
        supportFavourites?: boolean;
        restrictUnitId?: string;
        favoriteMultipleEmployeess?: IEmployeeData[];
        verticalOrientation?: boolean;
        fieldPath?: string;
        addingEmployee?: CancelableApiEvent<IEmployeeData>;
        addedEmployee?: BasicApiEvent<IEmployeeData>;
        removingEmployee?: CancelableApiEvent<IEmployeeData>;
        removedEmployee?: BasicApiEvent<IEmployeeData>;
    }
    interface MultipleEmployeesState extends MultipleEmployeesParams, InputBasedControlState<IEmployeeData[]> {
        binding: IBindingResult<IMultipleEmployeeData>;
    }
    class MultipleEmployees extends InputBasedControl<IEmployeeData[], MultipleEmployeesParams, MultipleEmployeesState> {
        protected createParams(): MultipleEmployeesParams;
        private readonly multipleEmployeeImpl;
        private employeeBinding;
        private defaultMultipleEmployeesBinding;
        addToFavorite(item: IEmployeeData): void;
        protected getBindings(): IBindingResult<any>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface MultipleEmployeesImplState extends InputBasedControlImplState<IEmployeeData[]>, MultipleEmployeesState {
        lastEmployees: IEmployeeData[];
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
        favoritesStorage: FavoriteEmployeesStorage;
        employeeVisualizer: EmployeeVisualizer;
        employeeLoader: EmployeeLoader;
    }
    class MultipleEmployeesImpl extends InputBasedControlImpl<IEmployeeData[], MultipleEmployeesParams, MultipleEmployeesImplState> {
        constructor(props: MultipleEmployeesParams);
        protected setValue(value: IEmployeeData[], redraw: boolean): void;
        protected initHelpers(props: MultipleEmployeesParams): void;
        protected getTextValue(): string;
        hasValue(): boolean;
        protected renderInto(props: MultipleEmployeesParams, container: HTMLElement): MultipleEmployees;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
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
        restrictUnitId: string;
        tipMode: any;
        supportFavourites: any;
        favoriteEmployees: IEmployeeData[];
    }
}
declare namespace WebClient {
    class EmployeeParams extends InputBasedControlParams<IEmployeeData> {
        standardCssClass?: string;
        tipMode?: EmployeeTooltipMode;
        supportFavourites?: boolean;
        restrictUnitId?: string;
        favoriteEmployees?: IEmployeeData[];
    }
    interface EmployeeState extends EmployeeParams, InputBasedControlState<IEmployeeData> {
        binding: IBindingResult<IEmployeeData>;
    }
    class Employee extends InputBasedControl<IEmployeeData, EmployeeParams, EmployeeState> {
        protected createParams(): EmployeeParams;
        private readonly employeeImpl;
        private employeeBinding;
        private defaultEmployeeBinding;
        addToFavorite(item: IEmployeeData): void;
        protected getBindings(): IBindingResult<any>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface EmployeeImplState extends InputBasedControlImplState<IEmployeeData>, EmployeeState {
        lastEmployees: IEmployeeData[];
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
        favoritesStorage: FavoriteEmployeesStorage;
        employeeVisualizer: EmployeeVisualizer;
        employeeLoader: EmployeeLoader;
    }
    class EmployeeImpl extends InputBasedControlImpl<IEmployeeData, EmployeeParams, EmployeeImplState> {
        constructor(props: EmployeeParams);
        protected setValue(value: IEmployeeData, redraw: boolean): void;
        protected initHelpers(props: EmployeeParams): void;
        static validValue(value: IEmployeeData): boolean;
        protected getTextValue(): string;
        protected renderInto(props: EmployeeParams, container: HTMLElement): Employee;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected onInputChange(event: any): void;
        protected getValueTitle(): string;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
        protected getFavoritesStorageName(props: EmployeeParams): string;
        protected onSelected(typeaheadVariant: ITypeaheadVariant): void;
        protected renderInputWithPlaceholder(): JSX.Element;
        restrictUnitId: string;
        tipMode: any;
        supportFavourites: any;
        favoriteEmployees: IEmployeeData[];
        addToFavorite(item: IEmployeeData): void;
    }
}
declare namespace WebClient {
    interface IEmployeeData extends IBasicEmployeeInfo {
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
    enum EmployeeTooltipMode {
        Fio = 0,
        FioAndPosition = 1,
        None = 2,
    }
}
declare namespace WebClient {
    enum EmployeeViewMode {
        LastNameAndInitials = 0,
        DisplayName = 1,
        Auto = 2,
    }
}
declare namespace WebClient {
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
    class DropdownParams extends InputBasedControlParams<string> {
        standardCssClass?: string;
        elements: ElementDataModel[];
        isCollapsed: boolean;
        collapsing?: CancelableApiEvent<IEventArgs>;
        collapsed?: BasicApiEvent<IEventArgs>;
        expanding?: CancelableApiEvent<IEventArgs>;
        expanded?: BasicApiEvent<IEventArgs>;
    }
    interface DropdownState extends DropdownParams, InputBasedControlState<string> {
        binding: IBindingResult<string>;
        isEmptyKeyAllowed: boolean;
    }
    class Dropdown extends InputBasedControl<string, DropdownParams, DropdownState> {
        protected createParams(): DropdownParams;
        private setElements;
        private setBinding;
        private setDefault;
        protected getBindings(): IBindingResult<any>[];
        protected getDefault(): string;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface DropdownImplState extends InputBasedControlImplState<string>, DropdownState {
    }
    class DropdownImpl extends InputBasedControlImpl<string, DropdownParams, DropdownImplState> {
        protected el: HTMLElement;
        protected focusedElement: ElementDataModel;
        protected comboboxTitle: ComboBoxTitle;
        protected prevActiveElement: HTMLElement;
        protected prevActiveElementEvent: (event: FocusEvent) => void;
        static readonly EMPTY_ELEMENT: ElementDataModel;
        constructor(props: any);
        componentWillMount(): void;
        componentWillUnmount(): void;
        protected handleDocumentClick: (event?: Event) => void;
        protected handleDocumentFocus: (event: FocusEvent) => void;
        protected setValue(value: string, redraw: boolean): void;
        protected getTextValue(): string;
        protected onDropdownContainerClick(e?: any): void;
        protected onElementClick(element: ElementDataModel): void;
        protected onClearValueClick(e: React.MouseEvent): void;
        protected onPlaceholderClick(event: any): void;
        protected toggleCollapsed: () => CancelableEventArgs<IEventArgs>;
        protected expandDropdown: () => CancelableEventArgs<IEventArgs>;
        protected collapseDropdown: () => CancelableEventArgs<IEventArgs>;
        protected isNotSameDropdown: (target: HTMLElement) => boolean;
        protected onInputFocus(event: React.FocusEvent): void;
        protected onInputBlur(event: React.FocusEvent): void;
        protected onFocusElement: (event: __React.FocusEvent, element: ElementDataModel) => void;
        protected onBlurElement: (event: __React.FocusEvent, element: ElementDataModel) => void;
        protected onFocusSiblingElement: (element: ElementDataModel, mode: "next" | "prev") => void;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
        protected renderInto(props: DropdownParams, container: HTMLElement): Dropdown;
        protected renderInput(): JSX.Element;
        protected renderPlaceholder(): any;
    }
}
declare namespace WebClient {
    class DirectoryDesignerRowParams extends InputBasedControlParams<IDirectoryDesignerRowInfo> {
        standardCssClass?: string;
        isDictionaryShown?: boolean;
        itemType?: string;
        selectionArea?: DirectoryDesignerAreas;
        searchDelay?: number;
    }
    interface DirectoryDesignerRowState extends DirectoryDesignerRowParams, InputBasedControlState<IDirectoryDesignerRowInfo> {
        binding: IBindingResult<IDirectoryDesignerRowInfo>;
    }
    class DirectoryDesignerRow extends InputBasedControl<IDirectoryDesignerRowInfo, DirectoryDesignerRowParams, DirectoryDesignerRowState> {
        private readonly departmentImpl;
        protected createParams(): DirectoryDesignerRowParams;
        private DirectoryDesignerRowBinding;
        private DefaultBindingHandler;
        private DefaultHandler;
        canShowDictionary(): boolean;
        showDictionary(): void;
        hideDictionary(): void;
        protected getBindings(): IBindingResult<any>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface DirectoryDesignerRowImplState extends InputBasedControlImplState<IDirectoryDesignerRowInfo>, DirectoryDesignerRowState {
        dialog: WebClient.ModalWindow;
        requestHelper: RequestHelper;
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
    }
    class DirectoryDesignerRowImpl extends InputBasedControlImpl<IDirectoryDesignerRowInfo, DirectoryDesignerRowParams, DirectoryDesignerRowImplState> {
        static FirstPageSize: number;
        static NextPageSize: number;
        constructor(props: DirectoryDesignerRowParams);
        protected getTextValue(): string;
        protected renderInto(props: DirectoryDesignerRowParams, container: HTMLElement): DirectoryDesignerRow;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
        protected findItems(typeaheadQuery: ITypeaheadSearchQuery): JQueryDeferred<ITypeaheadSearchResult>;
        protected onSelected(variant: ITypeaheadVariant): void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected renderInputWithPlaceholder(): JSX.Element;
        showDictionary(): void;
        canShowDictionary(): boolean;
        hideDictionary(): void;
        protected onInputChange(event: any): void;
        readonly isDictionaryShown: boolean;
    }
}
declare namespace WebClient {
    interface IDirectoryDesignerRowSelectDialogProps {
        nodeSelected: (node: DirectoryDesignerTreeNode) => void;
        searchDelay: number;
        node: string;
        selectionArea: DirectoryDesignerAreas;
    }
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
    class DepartmentParams extends InputBasedControlParams<IDepartmentInfo> {
        standardCssClass?: string;
        selectOrganisations?: boolean;
        selectDepartments?: boolean;
        source?: DepartmentSource;
        isDictionaryShown?: boolean;
        dialogMode?: DepartmentDialogMode;
        searchDelay?: number;
    }
    interface DepartmentState extends DepartmentParams, InputBasedControlState<IDepartmentInfo> {
        binding: IBindingResult<IDepartmentInfo>;
    }
    class Department extends InputBasedControl<IDepartmentInfo, DepartmentParams, DepartmentState> {
        protected createParams(): DepartmentParams;
        private readonly departmentImpl;
        private DepartmentBinding;
        canShowDictionary(): boolean;
        showDictionary(): void;
        hideDictionary(): void;
        protected getBindings(): IBindingResult<any>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    namespace DepartmentHelpers {
        interface IDepartmentFilterProps {
            predefinedFilter?: IDepartmentInfo;
            selectedFilterPath: IDepartmentInfo[];
            readonly?: boolean;
            rootLabel: string;
            rootTip?: string;
            onSelectedFilterPathChange: (newPath: IDepartmentInfo[]) => void;
        }
        interface IDepartmentFilterState {
        }
        class DepartmentFilter extends React.Component<IDepartmentFilterProps, IDepartmentFilterState> {
            protected onFilterItemClick: (item: IDepartmentInfo) => void;
            render(): JSX.Element;
        }
        function getFilterPath(predefinedFilter: IDepartmentInfo, selectedFilterPath: IDepartmentInfo[]): IDepartmentInfo[];
        function getFilterId(predefinedFilter: IDepartmentInfo, selectedFilterPath: IDepartmentInfo[]): string | undefined;
        function getFilter(predefinedFilter: IDepartmentInfo, selectedFilterPath: IDepartmentInfo[]): IDepartmentInfo | undefined;
    }
}
declare namespace WebClient {
    namespace DepartmentHelpers {
        interface IDepartmentFilterViewProps {
            predefinedFilter?: IDepartmentInfo;
            selectedFilterPath: IDepartmentInfo[];
            readonly?: boolean;
            rootLabel: string;
            rootTip?: string;
            onFilterItemClick?: (item: IDepartmentInfo | null) => void;
        }
        const DepartmentFilterView: (props: IDepartmentFilterViewProps) => JSX.Element;
    }
}
declare namespace WebClient {
    interface DepartmentImplState extends InputBasedControlImplState<IDepartmentInfo>, DepartmentState {
        requestHelper: RequestHelper;
        directoryDialogOpen: boolean;
        directoryDialogSelectedValue: IDepartmentInfo;
        inputKeyDown: SimpleEvent<React.KeyboardEvent>;
    }
    class DepartmentImpl extends InputBasedControlImpl<IDepartmentInfo, DepartmentParams, DepartmentImplState> {
        static FirstPageSize: number;
        static NextPageSize: number;
        constructor(props: DepartmentParams);
        protected readonly source: DepartmentSource;
        protected getTextValue(): string;
        protected getValueTitle(): string;
        protected getInputTitle(): string;
        protected renderInto(props: DepartmentParams, container: HTMLElement): Department;
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
        protected readonly itemTypes: SearchDepartmentType;
        protected findItems(typeaheadQuery: ITypeaheadSearchQuery): JQueryDeferred<ITypeaheadSearchResult>;
        protected onSelected(variant: ITypeaheadVariant): void;
        showDictionary(): void;
        hideDictionary(): void;
        readonly isDictionaryShown: boolean;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected onDirectoryDialogNodeSelected(node: IDepartmentInfo): void;
        protected onDirectoryDialogSelectButtonClick(): void;
        protected onInputChange(event: any): void;
        protected renderInputWithPlaceholder(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IDepartmentSelectedNodesPath {
        [departmentId: string]: IDepartmentInfo;
    }
    interface IDepartmentSelectDialogFlatProps {
        itemTypes: SearchDepartmentType;
        departmentSelected: (node: IDepartmentInfo) => void;
        source: DepartmentSource;
        controlType?: string;
        searchDelay?: number;
        onSelect?: () => void;
    }
    interface IDepartmentSelectDialogFlatState {
        requestHelper: RequestHelper;
        searchRequestHelper: RequestHelper;
        selectedNode: IDepartmentInfo;
        selectedNodeFocused: boolean;
        selectedNodesPath: IDepartmentSelectedNodesPath;
        searchResultCount: number;
        showingSearchResults: boolean;
        initialLoading: boolean;
        initialLoadingState: LoadingState;
        breadcrumbsNodes: IDepartmentInfo[];
        childrenListCache: IDepartmentNodeCache;
        searchText: string;
        searchItems: IDepartmentsSearchItemFlat[];
        searchTimerHandle: number;
        searchDebouncer: QuickSearchLogic;
        directoryTimestamp: number;
        hasMoreSearchItems: boolean;
    }
    interface IDepartmentNodeCacheItem {
        items: IDepartmentFlatDigest[];
        totalItemsCount: number;
        accessTimestamp: Date;
    }
    interface IDepartmentNodeCache {
        [id: string]: IDepartmentNodeCacheItem;
    }
    class DepartmentSelectDialogFlat extends React.Component<IDepartmentSelectDialogFlatProps, IDepartmentSelectDialogFlatState> {
        static ItemHeight: number;
        static ChildrenPageSize: number;
        static SearchPageSize: number;
        static SimpleItemView: styled.StyledComponentClass<React.HTMLProps<any>, any, React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps>;
        static SimpleItemViewCompact: styled.StyledComponentClass<React.HTMLProps<any>, any, React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps>;
        static LoadingNode: styled.StyledComponentClass<React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps & {
            className: string;
        }, any, React.HTMLProps<HTMLButtonElement> & ICustomTreeNodeContentDefaultProps>;
        static LoadTreeLevelDown: number;
        static LevelsToExapndByDefault: number;
        reactList: ReactListDynamic;
        recursive: RecursiveVisitor<IDepartmentFlatDigest>;
        searchInput: HTMLInputElement;
        protected readonly rootId: string;
        constructor(props: IDepartmentSelectDialogFlatProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentWillReceiveProps(newProps: IDepartmentSelectDialogFlatProps): void;
        protected getNodeIconClass: (node: IDepartmentsSearchItemFlat | IDepartmentFlatDigest) => "dv-ico dv-ico-department" | "dv-ico dv-ico-organisation";
        protected readonly currentDepartment: IDepartmentInfo;
        protected readonly currentDepartmentId: string;
        protected readonly rootLabel: string;
        protected readonly currentChildrenCache: IDepartmentNodeCacheItem;
        protected attachSearchInput: (elem: HTMLInputElement) => void;
        protected clearCache(): void;
        protected getDepartmentCache(id?: string): IDepartmentNodeCacheItem;
        protected onModalKeyDown: (ev: any) => void;
        protected onNavigateToFolder: (parentNode?: IDepartmentInfo) => void;
        protected loadChildrenListByIndexes: (indexes: number[]) => void;
        protected loadChildrenList: (parentNodeId: string, start: number, end: number) => JQueryPromise<ILoadDepartmentsFlatResponse>;
        protected onChildrenLoaded(response: ILoadDepartmentsFlatResponse, parentId: string, from: number): void;
        protected search(query: IDepartmentsFlatSearchQuery, reset: boolean): JQueryDeferred<{}>;
        protected isNodeDisabled(node: IDepartmentTreeDigest | IDepartmentInfo, enabledItemTypes?: SearchDepartmentType): boolean;
        protected onNodeSelected(node: IDepartmentInfo): void;
        protected onNodeExpanded(node: IDepartmentFlatDigest | IDepartmentsSearchItemFlat): void;
        protected onNodeSelectSibling: (mode: "next" | "prev", index: number, getCollectionData: () => IDepartmentsSearchItemFlat[] | IDepartmentFlatDigest[]) => void;
        protected onInputChange(ev: React.KeyboardEvent): void;
        protected onInputKeyUp: (ev: __React.KeyboardEvent) => void;
        protected onLoadNewSearchResults: () => void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected getSearchResultLabel(): string;
        protected breadcrumbsOnChange: (nodes: IDepartmentInfo[]) => void;
        protected onSelectedFilterMoveBack: () => void;
        private resetSearchMode;
        protected renderLoadingItem: (index: number, key: string | number) => JSX.Element;
        protected renderEmptyItem: (index: number, key: string | number) => JSX.Element;
        protected onLoadNextSearchPage: (page: any) => JQueryDeferred<{}>;
        protected onSearchPathItemClick: (department: IDepartmentInfo, item: IDepartmentsSearchItemFlat) => void;
        protected renderSearchItem: (index: number, key: string) => JSX.Element;
        protected renderNode: (key: string | number, node: IDepartmentFlatDigest, index: number) => JSX.Element;
        protected renderGoToButton(node: IDepartmentFlatDigest | IDepartmentsSearchItemFlat): JSX.Element;
        protected renderItems(): JSX.Element;
        protected renderFlatItems(): JSX.Element;
        protected renderSearchItems(): JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IDepartmentSelectDialogProps {
        itemTypes: SearchDepartmentType;
        departmentSelected: (node: IDepartmentTreeDigest) => void;
        source: DepartmentSource;
        searchDelay?: number;
    }
    interface IDepartmentSelectDialogState {
        requestHelper: RequestHelper;
        searchRequestHelper: RequestHelper;
        selectedNode: IDepartmentTreeDigest;
        treeWrapper: HTMLElement;
        searchResultCount: number;
        showingSearchResults: boolean;
        searchText: string;
        initialLoading: LoadingState;
        nodes: IDepartmentTreeDigest[];
        flatNodes: IDepartmentTreeDigest[];
        searchTimerHandle: number;
    }
    class DepartmentSelectDialog extends React.Component<IDepartmentSelectDialogProps, IDepartmentSelectDialogState> {
        static LoadTreeLevelDown: number;
        static LevelsToExapndByDefault: number;
        recursive: RecursiveVisitor<IDepartmentTreeDigest>;
        levels: IAccessor<IDepartmentTreeDigest, number>;
        expanded: IAccessor<IDepartmentTreeDigest, boolean>;
        visible: IAccessor<IDepartmentTreeDigest, boolean>;
        childrenLoading: IAccessor<IDepartmentTreeDigest, LoadingState>;
        childrenLoaded: IAccessor<IDepartmentTreeDigest, boolean>;
        displayNames: IAccessor<IDepartmentTreeDigest, string | JSX.Element>;
        parentIDs: IAccessor<IDepartmentTreeDigest, string>;
        disabled: IAccessor<IDepartmentTreeDigest, boolean>;
        constructor(props: IDepartmentSelectDialogProps);
        componentDidMount(): void;
        protected getNodeID: (node: IDepartmentTreeDigest) => string;
        protected getNodeIconClass: (node: IDepartmentTreeDigest) => "dv-ico dv-ico-department" | "dv-ico dv-ico-organisation";
        protected resetStores: () => void;
        readonly selectedDepartment: IDepartmentTreeDigest;
        protected loadTree(parentNode?: IDepartmentTreeDigest): JQueryDeferred<IDepartmentTreeDigest[]>;
        protected loadNodeChild(node: IDepartmentTreeDigest): JQueryPromise<IDepartmentTreeDigest[]>;
        protected searchTree(searchText: string, resultNumber: number): JQueryDeferred<ISearchDepartmentsTreeResult>;
        protected updateNodesVisibility(visibility: boolean, nodes: IDepartmentTreeDigest[], parentNode?: IDepartmentTreeDigest): void;
        protected updateNodesMeta(nodes: IDepartmentTreeDigest[], parentNode?: IDepartmentTreeDigest, enabledItemTypes?: SearchDepartmentType): void;
        protected onNodeSelected(node: IDepartmentTreeDigest): void;
        protected onNodeToggle(node: IDepartmentTreeDigest): void;
        protected onInputChange(ev: React.KeyboardEvent): void;
        protected onInputKeyDown(ev: React.KeyboardEvent): void;
        protected getSearchResultLabel(): string;
        private resetSearchMode();
        renderSearchResult(nodeName: string, searchText: string, matchedPropertyName: string, matchedPropertyValue: string): JSX.Element;
        renderNode: (index: any, key: any) => JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    enum DepartmentDialogMode {
        Tree = 0,
        List = 1,
    }
}
declare namespace WebClient {
    interface IDepartmentTreeNodeData {
        childrenLoaded: boolean;
        displayName: string | JSX.Element;
        uniqueId: string;
        parentUniqueId?: string;
        iconClass: string;
        level: number;
        visible: boolean;
        children: IDepartmentTreeNodeData[];
        nodeClass?: string;
        disabled?: boolean;
        title?: string;
        loading?: LoadingState;
    }
    class DepartmentTreeNodeData implements IDepartmentTreeNodeData {
        private mData;
        private mChildren;
        private mName;
        private mExpanded;
        level: number;
        visible: boolean;
        parentUniqueId: string;
        loading: LoadingState;
        static Create(data: IDepartmentTreeDigest, enabledItemTypes: SearchDepartmentType): DepartmentTreeNodeData;
        static CreateMany(dataArray: IDepartmentTreeDigest[], enabledItemTypes: SearchDepartmentType): DepartmentTreeNodeData[];
        disabled: boolean;
        readonly data: IDepartmentTreeDigest;
        displayName: string | JSX.Element;
        readonly uniqueId: string;
        readonly title: string;
        readonly iconClass: string;
        children: DepartmentTreeNodeData[];
        expanded: boolean;
        childrenLoaded: boolean;
    }
}
declare namespace WebClient {
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
    class DateTimePickerParams extends InputBasedControlParams<Date> {
        standardCssClass?: string;
        dateTimePickerMode?: DateTimePickerMode;
        defaultCurrentDateTime?: boolean;
        defaultDateTime?: string;
        defaultDateTimeShift?: number;
        minDate?: Date;
        maxDate?: Date;
    }
    interface DateTimePickerState extends DateTimePickerParams, InputBasedControlState<Date> {
        binding: IBindingResult<Date>;
        showClearButton: boolean;
    }
    class DateTimePicker extends InputBasedControl<Date, DateTimePickerParams, DateTimePickerState> {
        protected createParams(): DateTimePickerParams;
        private readonly dateTimePickerImpl;
        private dateTimePickerBinding;
        private dateTimePickerMode;
        canClear(): boolean;
        clear(): void;
        protected getBindings(): IBindingResult<any>[];
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface DateTimePickerImplState extends InputBasedControlImplState<Date>, DateTimePickerState {
        timeInput: HTMLInputElement;
        dateTimeFormat: DateTimeFormat;
        timeInputText: string;
        clearButton: HTMLElement;
    }
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
        protected showEditPopover(popoverOptions?: IEditPopoverProps): void;
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
    enum DateTimePickerMode {
        DateTime = 0,
        Date = 1,
    }
}
declare namespace WebClient {
    class RecentCardsDashboardWidgetParams extends PanelParams {
        header: string;
        standardCssClass?: string;
    }
    interface RecentCardsDashboardWidgetState extends RecentCardsDashboardWidgetParams, PanelState {
    }
    class RecentCardsDashboardWidget extends Panel<RecentCardsDashboardWidgetParams, RecentCardsDashboardWidgetState> {
        constructor(props: RecentCardsDashboardWidgetParams);
        createParams(): RecentCardsDashboardWidgetParams;
        private textResourceKey;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface RecentCardsDashboardWidgetImplState extends PanelImplState, RecentCardsDashboardWidgetState {
        gridModel: any;
        loader: RequestHelper;
        gridContainer: HTMLElement;
    }
    class RecentCardsDashboardWidgetImpl<PropsT extends RecentCardsDashboardWidgetParams, StateT extends RecentCardsDashboardWidgetImplState> extends PanelImpl<PropsT, StateT> {
        static readonly size: number;
        constructor(props: PropsT);
        componentDidMount(): void;
        loadGridModel(): void;
        protected gridDataLoader(requestData: any, isMobile: boolean): JQueryDeferred<any>;
        protected gridModelLoader: (requestData: any, isMobile: boolean) => JQueryDeferred<any>;
        mountGrid(): void;
        attachGridContainer: (elem: HTMLElement) => void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class FolderGroupDashboardWidgetParams extends PanelParams {
        text: string;
        standardCssClass?: string;
        headerFolderId?: string;
        headerFolderInfo?: IFolderItemNodeData;
        headerFolderUnreadCount?: number;
        color?: string;
        unreadCount?: number;
        forceVirtualFolderSearch?: boolean;
    }
    interface FolderGroupDashboardWidgetState extends FolderGroupDashboardWidgetParams, PanelState {
    }
    class FolderGroupDashboardWidget extends Panel<FolderGroupDashboardWidgetParams, FolderGroupDashboardWidgetState> {
        constructor(props: FolderGroupDashboardWidgetParams);
        createParams(): FolderGroupDashboardWidgetParams;
        init(): void;
        deinit(): void;
        protected headerFolderInfo: IFolderItemNodeData;
        private textResourceKey;
        protected forceVirtualFolderSearch: string | boolean;
        onUnreadCountChanged: () => void;
        addUnreadCountRequest(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface FolderGroupDashboardWidgetImplState extends PanelImplState, FolderGroupDashboardWidgetState {
    }
    class FolderGroupDashboardWidgetImpl<PropsT extends FolderGroupDashboardWidgetParams, StateT extends FolderGroupDashboardWidgetImplState> extends PanelImpl<PropsT, StateT> {
        constructor(props: PropsT);
        getHeader(): string;
        getNavigationHref(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class FolderDashboardWidgetParams extends PanelParams {
        text: string;
        standardCssClass?: string;
        folderId?: string;
        folderInfo?: IFolderItemNodeData;
        folderUnreadCount?: number;
        color?: string;
        unreadCount?: number;
        forceVirtualFolderSearch?: boolean;
    }
    interface FolderDashboardWidgetState extends FolderDashboardWidgetParams, PanelState {
    }
    class FolderDashboardWidget extends Panel<FolderDashboardWidgetParams, FolderDashboardWidgetState> {
        constructor(props: FolderDashboardWidgetParams);
        createParams(): FolderDashboardWidgetParams;
        init(): void;
        deinit(): void;
        protected headerFolderInfo: IFolderItemNodeData;
        private textResourceKey;
        protected forceVirtualFolderSearch: string | boolean;
        onUnreadCountChanged: () => void;
        addUnreadCountRequest(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface FolderDashboardWidgetImplState extends PanelImplState, FolderDashboardWidgetState {
    }
    class FolderDashboardWidgetImpl<PropsT extends FolderDashboardWidgetParams, StateT extends FolderDashboardWidgetImplState> extends PanelImpl<PropsT, StateT> {
        constructor(props: PropsT);
        getHeader(): string;
        getNavigationHref(): string;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class DashboardContainerParams extends PanelParams {
        standardCssClass?: string;
    }
    interface DashboardContainerState extends DashboardContainerParams, PanelState {
    }
    class DashboardContainer extends Panel<DashboardContainerParams, DashboardContainerState> {
        constructor(props: DashboardContainerParams);
        createParams(): DashboardContainerParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface DashboardContainerImplState extends PanelImplState, DashboardContainerState {
    }
    class DashboardContainerImpl<PropsT extends DashboardContainerParams, StateT extends DashboardContainerImplState> extends PanelImpl<PropsT, StateT> {
        constructor(props: PropsT);
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class CustomButtonParams extends BaseControlParams {
        standardCssClass?: string;
        text?: string;
        tip?: string;
        iconClass?: string;
        canClick?: boolean;
        primary?: boolean;
        stretchWidth?: boolean;
    }
    interface CustomButtonState extends CustomButtonParams, BaseControlState {
    }
    class CustomButton extends BaseControl<CustomButtonParams, CustomButtonState> {
        constructor(props: CustomButtonParams);
        protected createParams(): CustomButtonParams;
        private readonly myControlImpl;
        private bindingEditOperation;
        performClick(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface CustomButtonImplState extends BaseControlImplState, CustomButtonState {
        loading: boolean;
    }
    class CustomButtonImpl extends BaseControlImpl<CustomButtonParams, CustomButtonImplState> {
        constructor(props: CustomButtonParams);
        loading: boolean;
        performClick(event?: React.MouseEvent): void;
        protected handleClick(event: React.MouseEvent): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class ComboBoxParams extends InputBasedControlParams<IComboBoxVariant> {
        standardCssClass?: string;
        selectedValue: IComboBoxVariant;
        variants: IComboBoxVariant[];
        expanded: boolean;
        onSelect?: (variant: IComboBoxVariant) => void;
        className?: string;
    }
    interface ComboBoxState extends ComboBoxParams, InputBasedControlState<IComboBoxVariant> {
        items: IComboBoxItem[];
    }
    class ComboBox extends InputBasedControl<IComboBoxVariant, ComboBoxParams, ComboBoxState> {
        protected createParams(): ComboBoxParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ComboBoxImplState extends InputBasedControlImplState<IComboBoxVariant>, ComboBoxState {
    }
    class ComboBoxImpl extends InputBasedControlImpl<IComboBoxVariant, ComboBoxParams, ComboBoxImplState> {
        constructor(props: ComboBoxParams);
        protected loadItems(variants: IComboBoxVariant[]): void;
        variants: IComboBoxVariant[];
        protected getCssClass(): string;
        protected initEditPopover(popover: EditPopover): void;
        protected onValueBoxClick(): void;
        protected renderEditPopover(popover: EditPopover): any;
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
    class CheckBoxParams extends InputBasedControlParams<boolean> {
        standardCssClass?: string;
        yesText?: string;
        noText?: string;
    }
    interface CheckBoxState extends CheckBoxParams, InputBasedControlState<boolean> {
        binding: IBindingResult<boolean>;
    }
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
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface CheckBoxImplState extends InputBasedControlImplState<boolean>, CheckBoxState {
        saveHelper: RequestHelper;
        yesText: string;
        noText: string;
    }
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
    class CardManagementParams extends BaseControlParams {
        standardCssClass?: string;
        canEdit?: boolean;
        canDelete?: boolean;
    }
    interface CardManagementState extends CardManagementParams, BaseControlState {
        refresh: Function;
        deleteAndRedirect: Function;
        goToEdit: Function;
    }
    class CardManagement extends BaseControl<CardManagementParams, CardManagementState> {
        constructor(props: CardManagementParams);
        protected createParams(): CardManagementParams;
        refresh(): void;
        delete(): void;
        edit(): void;
        private bindingEditOperation;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface CardManagementImplState extends BaseControlImplState, CardManagementState {
    }
    class CardManagementImpl extends BaseControlImpl<CardManagementParams, CardManagementImplState> {
        constructor(props: CardManagementParams);
        onEdit(): void;
        onDelete(): void;
        onRefresh(): void;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    class CardLinkParams extends BaseControlParams {
        standardCssClass?: string;
        value?: ICardLinkData;
        canEdit?: boolean;
        labelText?: string;
        showEmptyLabel?: boolean;
        emptyText?: string;
        tip?: string;
        editMode?: EditMode;
        cardTypes?: IAllowedCardType[];
        cardId?: string;
        menuExpanded?: boolean;
        required?: boolean;
        linkDeleting?: CancelableApiEvent<IEventArgs>;
        linkDeleted?: BasicApiEvent<IEventArgs>;
        windowOpening?: CancelableApiEvent<IEventArgs>;
        windowOpened?: BasicApiEvent<IEventArgs>;
        windowClosing?: CancelableApiEvent<IEventArgs>;
        windowClosed?: BasicApiEvent<IEventArgs>;
        dataChanged?: BasicApiEvent<IDataChangedEventArgsEx<ICardLinkData>>;
        linkFilePreviewing?: CancelableApiEvent<IEventArgs>;
        linkFilePreviewed?: BasicApiEvent<IEventArgs>;
        linkCardOpening?: CancelableApiEvent<IEventArgs>;
    }
    interface CardLinkState extends CardLinkParams, BaseControlState {
        bindingInfo: IBindingResult<ICardLinkData>;
    }
    class CardLink extends BaseControl<CardLinkParams, CardLinkState> {
        constructor(props: CardLinkParams);
        componentDidMount(): void;
        protected createParams(): CardLinkParams;
        private binding;
        private cardTypes;
        protected getBindings(): IBindingResult<any>[];
        private onDataChanged;
        private readonly cardLinkImpl;
        validate(params: any): IValidationResult[];
        openLinkedCard: () => void;
        openFilePreview: () => void;
        openSelectCardDialog: () => void;
        deleteLinkedCard: () => void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface CardLinkImplState extends BaseControlImplState, CardLinkState {
        addExistingCardLinkDialog: ExistingCardLinkDialog;
        saveHelper: RequestHelper;
        validationMessage: string;
    }
    class CardLinkImpl extends BaseControlImpl<CardLinkParams, CardLinkImplState> {
        constructor(props: CardLinkParams);
        value: ICardLinkData;
        setValue(value: ICardLinkData, forceUpdate?: boolean): JQueryDeferred<any>;
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected onDocumentClick: (e: MouseEvent) => void;
        getLinkUrl(cardId: string): string;
        openMenu: () => void;
        closeMenu: () => void;
        toggleMenu: () => void;
        openLinkedCard: () => void;
        openFilePreview: () => void;
        openSelectCardDialog: () => void;
        deleteLinkedCard: () => void;
        onOpenLinkedCardMenuClick: () => void;
        onViewFileMenuClick: () => void;
        onOpenSelectCardDialogMenuClick: () => void;
        onDeleteLinkedCardMenuClick: () => void;
        onTextClick: () => void;
        onMenuClick: () => void;
        readonly hasValue: boolean;
        readonly isLoading: boolean;
        readonly isMenuAvailable: boolean;
        readonly cardViewAllowed: boolean;
        readonly mainFileReadAllowed: boolean;
        readonly isTextClickable: boolean;
        validate(params: any): IValidationResult;
        protected renderValidationMessage(): JSX.Element;
        protected getCssClass(): string;
        protected getTextTabIndex(): 0 | -1;
        protected onTextKeyDown: (event: __React.KeyboardEvent) => void;
        protected onMenuKeyDown: (event: __React.KeyboardEvent) => void;
        protected renderLabel(): JSX.Element;
        protected renderSettingsMenu(): JSX.Element;
        protected renderValue(): JSX.Element;
        renderControl(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ICardLinkData {
        cardId: string;
        cardDigest: string;
        cardViewAllowed: boolean;
        mainFileReadAllowed: boolean;
    }
}
declare namespace WebClient {
    interface ILinkItem {
        data: ILinkItemData;
        state: LinkItemState;
    }
}
declare namespace WebClient {
    class CardKindParams extends BaseControlParams {
        value: ICardKindDataModel;
        tip?: string;
        labelText?: string;
        standardCssClass?: string;
    }
    interface CardKindState extends CardKindParams, BaseControlState {
    }
    class CardKind extends BaseControl<CardKindParams, CardKindState> {
        protected createParams(): CardKindParams;
        private cardKindData;
        private value;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ICardKindDataModel {
        cardKindName: string;
        cardKindFullName: string;
        cardKindId: string;
        loadingError: string;
    }
}
declare namespace WebClient {
    class BlockParams extends PanelParams {
        standardCssClass?: string;
        header?: string;
        collapsible: boolean;
        alignment: boolean;
        paddings: boolean;
        isCollapsed: boolean;
        collapsing?: CancelableApiEvent<IEventArgs>;
        collapsed?: BasicApiEvent<IEventArgs>;
        expanding?: CancelableApiEvent<IEventArgs>;
        expanded?: BasicApiEvent<IEventArgs>;
    }
    interface BlockState extends BlockParams, PanelState {
    }
    class Block extends Panel<BlockParams, BlockState> {
        protected createParams(): BlockParams;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface BlockState extends PanelState, BaseControlState {
    }
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
    class AgreementManagementParams extends BaseControlParams {
        standardCssClass?: string;
        startAllowed?: boolean;
        manageAllowed?: boolean;
        canStart?: boolean;
        canManage?: boolean;
        abortStageAllowed: boolean;
        confirmationRequestOnStart?: boolean;
        buttonNames: AgreementManagementButtonModel[];
        approverViewType?: ApproverViewType;
        agreementMode?: AgreementMode;
        approvingPathChanging?: CancelableApiEvent<IApprovingPathEventArgs>;
        approvingPanelOpening?: CancelableApiEvent<IEventArgs>;
        approvingStarting?: CancelableApiEvent<IAgreementEventArgs>;
        approvingPausing?: CancelableApiEvent<IEventArgs>;
        approvingCancelling?: CancelableApiEvent<IEventArgs>;
        approverAdding?: CancelableApiEvent<IApproverEventArgs>;
        approverDeleting?: CancelableApiEvent<IApproverDeletionEventArgs>;
        approvingStartCancelling?: CancelableApiEvent<IEventArgs>;
        approvingCompleting?: CancelableApiEvent<IEventArgs>;
        approvingResuming?: CancelableApiEvent<IEventArgs>;
        approvingPathChanged?: BasicApiEvent<IApprovingPathEventArgs>;
        approvingPanelOpened?: BasicApiEvent<IEventArgs>;
        approverAdded?: BasicApiEvent<IApproverEventArgs>;
        approverDeleted?: BasicApiEvent<IApproverDeletionEventArgs>;
        approvingStartCancelled?: BasicApiEvent<IEventArgs>;
        approvingStageAborting?: CancelableApiEvent<IEventArgs>;
        approvingStageAborted?: BasicApiEvent<IEventArgs>;
    }
    interface AgreementManagementState extends AgreementManagementParams, BaseControlState {
        agreementManagementModel: IAgreementManagementModel;
        refresh: Function;
    }
    class AgreementManagement extends BaseControl<AgreementManagementParams, AgreementManagementState> {
        constructor(props: AgreementManagementParams);
        protected createParams(): AgreementManagementParams;
        private readonly myControlImpl;
        private agreementManagementData;
        private agreementManagementOperationBinding;
        private agreementStartOperationBinding;
        private abortStageOperationBinding;
        private agreementManagementButtonNames;
        refresh(): void;
        getAvailableOperations(): ApprovalOperationKind[];
        resume(): void;
        pause(): void;
        complete(): void;
        cancel(): void;
        start(): void;
        hideStartSidebar(): void;
        edit(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface AgreementManagementImplState extends BaseControlState, AgreementManagementState {
        IsTemplateDataReceived: boolean;
        startLoading: boolean;
        startDisabled: boolean;
        startSidebarShown: boolean;
        managementLoaging: boolean;
        managementSidebarShown: boolean;
        agreementManagementStartModel: IAgreementManagementStartModel;
        editModel: IAgreementManagementEditModel;
        templates: AgreementTemplateModel[];
        selectedTemplate: AgreementTemplateModel;
        stageLoading: LoadingState;
        showInterruptBtn: boolean;
        currentStageId: string;
    }
    class AgreementManagementImpl extends BaseControlImpl<AgreementManagementParams, AgreementManagementImplState> {
        approvalOperationButtonNames: any;
        constructor(props: AgreementManagementParams);
        componentWillReceiveProps(nextProps: any, nextContext: any): void;
        readonly canStart: boolean;
        readonly ApprovalOperationButtonNames: any;
        protected onTemplateSelect(val: IComboBoxElement): Promise<void>;
        protected onCancelClick(start: boolean): void;
        protected onSendClick(): Promise<void>;
        protected onSaveClick(): void;
        protected onInterruptClick(): Promise<void>;
        protected onOperationButtonClick(operation: AgreementOperationKind): Promise<void>;
        start(): void;
        protected handleLoadingErrorOnSidebarOpen(loadingTimer: any): void;
        hideStartSidebar(cancel?: boolean): Promise<void>;
        readonly canManage: boolean;
        edit(): void;
        hideManagementSidebar(): void;
        protected handleClick(event: React.MouseEvent): void;
        protected handleMouseOver(event: React.MouseEvent): void;
        protected handleMouseOut(event: React.MouseEvent): void;
        protected handleStartAgreement: (e: __React.MouseEvent) => void;
        protected handleEditAgreement: (e: Event) => void;
        getAvailableOperations(): ApprovalOperationKind[];
        onManageButtonClick(buttonKind: ApprovalOperationKind): void;
        protected getCssClass(): string;
        protected getButtonName: (operationKind: ApprovalOperationKind) => string;
        protected getTemplateComboBoxProps(): any;
        protected getTemplateComboBoxElements(): any;
        renderControl(): JSX.Element;
        protected renderCreateView(): JSX.Element;
        protected renderCreateSidebar(): JSX.Element;
        protected renderManageView(): JSX.Element;
        protected renderManagementSidebar(): JSX.Element;
    }
}
declare namespace WebClient {
    interface AgreementManagementButtonModel {
        agreementManagementOperation: ApprovalOperationKind;
        displayName: string;
    }
}
declare namespace WebClient {
    enum AgreementOperationKind {
        Resume = 0,
        Finish = 1,
        Pause = 2,
        Cancel = 3,
    }
}
declare namespace WebClient {
    interface IApproverInfo {
        employee: IBasicEmployeeInfo;
        excluded: boolean;
    }
    interface StageInfo {
        stageSemantics: StageSemantic;
        currentStage: boolean;
    }
    interface AgreementStageModel {
        stageId: string;
        name: string;
        order: number;
        approvalType: ApprovalType;
        duration: number;
        specificDuration: boolean;
        approvers: IApproverInfo[];
        allowEdit: boolean;
        hasBusinessProcess: boolean;
        excluded: boolean;
        approversChanged: boolean;
        stageInstanceInfo: StageInfo;
    }
}
declare namespace WebClient {
    interface AgreementTemplateModel {
        templateId: string;
        creationSettingId: string;
        name: string;
        startNoEdit: boolean;
        startNoFiles: boolean;
        stages: AgreementStageModel[];
        loaded: boolean;
    }
}
declare namespace WebClient {
    class StageChangeModel {
        constructor(stage: AgreementStageModel);
        stageId: string;
        order: number;
        approvalType: ApprovalType;
        duration: number;
        specificDuration: boolean;
        approversChanged: boolean;
        approvers: IApproverInfo[];
        excluded: boolean;
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
    enum AgreementMode {
        StartAndManagement = 0,
        StartOnly = 1,
        ManagementOnly = 2,
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
    enum ApprovalOperationKind {
        Resume = 0,
        Complete = 1,
        Pause = 2,
        Cancel = 3,
        ToApprove = 4,
        AbortStage = 5,
        Management = 6,
    }
}
declare namespace WebClient {
    enum ApproverViewType {
        Fio = 0,
        FioAndPosition = 1,
        DisplayString = 2,
    }
}
declare namespace WebClient {
    enum ReconcileDurationType {
        PerTask = 0,
        PerStage = 1,
    }
}
declare namespace WebClient {
    enum ApprovalType {
        Sequential = 0,
        Parallel = 1,
        Alternative = 3,
    }
}
declare namespace WebClient {
    enum StageSemantic {
        Positive = 1,
        Negative = 2,
        Neutral = 3,
        Other = 4,
    }
}
declare namespace WebClient {
    class TemplateComboVariant implements IComboBoxVariant {
        template: AgreementTemplateModel;
        constructor(val: AgreementTemplateModel);
        readonly displayName: any;
        readonly uniqueId: string;
    }
}
declare namespace WebClient {
    class AgreementStage extends React.Component<AgreementStageProps, AgreementStageState> {
        approvalTypeIcons: {
            [x: number]: string;
        };
        approvalStageSemanticStyle: {
            [x: number]: string;
        };
        constructor(props: AgreementStageProps);
        onToggleClick(ev: React.MouseEvent): void;
        onStageCheckChange(val: boolean): void;
        onDeleteApproverClick(id: string): Promise<void>;
        onExcludeCheckChange(event: any, id: string): void;
        onEmployeeChanged(sender: any, args: IDataChangedEventArgs): Promise<void>;
        onDurationChanged(sender: any, args: IDataChangedEventArgs): void;
        onDurationTypeSelect(selectedType: IComboBoxElement): void;
        onReconcileTypeSelect(selectedType: IComboBoxElement): void;
        onInterruptStageClick(event: any): void;
        attachApprover(control: Employee): void;
        getButtonName(operationKind: ApprovalOperationKind): string;
        getReconcileTypeElements(): {
            elements: IComboBoxElement[];
        };
        getReconcileDurationTypeElements(): {
            elements: IComboBoxElement[];
        };
        getSematicStyle(stage: AgreementStageModel): string;
        renderComboboxTitleWithIcon: (element: IComboBoxElement) => JSX.Element;
        renderComboboxElementWithIcon: (element: IComboBoxElement, selected: boolean) => JSX.Element;
        renderApprover(approver: IBasicEmployeeInfo): JSX.Element;
        renderApproversList(approvers: IApproverInfo[], editable: any, hasBusinessProc: any, excluded: any): JSX.Element;
        renderOtherSettings(stage: AgreementStageModel): JSX.Element;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class AgreementStageProps {
        stage: AgreementStageModel;
        approverViewType: ApproverViewType;
        className?: string;
        editMode?: boolean;
        getButtonName?: (operationKind: ApprovalOperationKind) => string;
        canIterruptCurrent?: boolean;
        onInterruptClick?: Function;
        approverAdding: CancelableApiEvent<IApproverEventArgs>;
        approverDeleting: CancelableApiEvent<IApproverDeletionEventArgs>;
        approverAdded: BasicApiEvent<IApproverEventArgs>;
        approverDeleted: BasicApiEvent<IApproverDeletionEventArgs>;
    }
}
declare namespace WebClient {
    class AgreementStageState {
        stageExpanded: boolean;
        approversOrder: string[];
        approverSelect: Employee;
        durationType: ReconcileDurationType;
        stage: AgreementStageModel;
    }
}
declare namespace WebClient {
    class AgreementListParams extends BaseControlParams {
        standardCssClass?: string;
        data?: IAgreementListDataModel;
        buttonText?: string;
        canShowReport?: boolean;
        cardId?: string;
        tip?: string;
        agreementReportOpening?: CancelableApiEvent<IAgreementListReportOpeningEventArgs>;
        agreementReportClosing?: CancelableApiEvent<IEventArgs>;
        agreementReportOpened?: BasicApiEvent<IAgreementListReportOpenedEventArgs>;
        agreementReportClosed?: BasicApiEvent<IEventArgs>;
    }
    interface AgreementListState extends AgreementListParams, BaseControlState {
        getAgreementList: () => JQueryDeferred<IAgreementListDataModel>;
    }
    class AgreementList extends BaseControl<AgreementListParams, AgreementListState> {
        constructor(props: AgreementListParams);
        protected createParams(): AgreementListParams;
        protected readonly myControlImpl: AgreementListImpl;
        readonly isReportShown: boolean;
        hideReport(): void;
        showReport(): void;
        private bindingEditOperation;
        protected getAgreementList(): JQueryDeferred<IAgreementListDataModel>;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface AgreementListImplState extends AgreementListState, BaseControlImplState {
        loading: boolean;
        dialog: ModalWindow;
        lastLoadedData: IAgreementListDataModel;
    }
    interface AgreementListImplProps extends AgreementListState {
    }
    class AgreementListImpl extends BaseControlImpl<AgreementListImplProps, AgreementListImplState> {
        constructor(props: AgreementListImplProps);
        getCssClass(): string;
        showReport(): void;
        hideReport(): void;
        showModalWindow(data: IAgreementListDataModel): void;
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
    interface IAgreementListContentProps {
        data: IAgreementListDataModel;
        documentNumber: string;
        documentName: string;
        title: string;
    }
}
declare namespace WebClient {
    interface IAgreementListContentState {
        columns: IAgreementListTableColumn[];
        commentColumn: IAgreementListTableColumn;
        onRender: IBasicEvent<IAgreementListRenderEventArgs>;
    }
}
declare namespace WebClient {
    class AgreementHistoryParams extends BaseControlParams {
        buttonText: string;
        standardCssClass?: string;
        isReportShown?: boolean;
        showReportAllowed?: boolean;
        agreementHistoryMode?: AgreementHistoryMode;
        tip?: string;
        approvingReportOpening?: CancelableApiEvent<IApprovingReportOpeningEventArgs>;
        approvingReportClosing?: CancelableApiEvent<IEventArgs>;
        approvingReportRefreshing?: CancelableApiEvent<IApprovingReportRefreshingEventArgs>;
        approvingReportOpened?: BasicApiEvent<IApprovingReportOpenedEventArgs>;
        approvingReportClosed?: BasicApiEvent<IEventArgs>;
        approvingReportRefreshed?: BasicApiEvent<IApprovingReportRefreshedEventArgs>;
    }
    interface AgreementHistoryState extends BaseControlState, AgreementHistoryParams {
        model: IAgreementHistoryDataModel;
        rows?: ApprovalHistoryViewModel;
    }
    class AgreementHistory extends BaseControl<AgreementHistoryParams, AgreementHistoryState> {
        protected createParams(): AgreementHistoryParams;
        private readonly myControlImpl;
        private agreementHistoryData;
        private agreementHistoryRows;
        private binding;
        showReport(): void;
        hideReport(): void;
        canShowReport(): void;
        refreshReport(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface AgreementHistoryImplState extends BaseControlImplState, AgreementHistoryState {
        dialog: WebClient.ModalWindow;
        isHistoryDataReceived: boolean;
        loading: boolean;
        lastLoadedData: ApprovalHistoryViewModel;
    }
    interface AgreementHistoryImplProps extends AgreementHistoryState {
    }
    class AgreementHistoryImpl extends BaseControlImpl<AgreementHistoryImplProps, AgreementHistoryImplState> {
        constructor(props: AgreementHistoryImplProps);
        showReport(): void;
        hideReport(): void;
        canShowReport(): boolean;
        loadData(): JQueryDeferred<ApprovalHistoryViewModel>;
        renderDialogContent(dialog: ModalWindow, data: ApprovalHistoryViewModel): void;
        refreshReport(): void;
        renderControl(): JSX.Element;
        renderButton(): JSX.Element;
        renderInlineTable(): JSX.Element;
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
        employeeId: string;
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
        stageId: string;
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
    enum AgreementHistoryMode {
        Button = 0,
        Layout = 1,
    }
}
declare namespace WebClient {
    class ApprovalStageItemRow extends React.Component<IApprovalStageItemRowProps, any> {
        constructor(props: any);
        private readonly decisionText;
        private readonly decisionClass;
        private readonly waitingForDecision;
        handleCommentClick(): void;
        handleCorrectionFileClick(file: any): void;
        handleStageRowClick(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IApprovalStageItemRowProps {
        stageItem: ApprovalHistoryStageItemModel;
        ownerCardId: string;
    }
}
declare namespace WebClient {
    class ApprovalStageItemComment extends React.Component<ApprovalHistoryStageItemModel, any> {
        constructor(props: any);
        hanldeCommentFileClick(e: any): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class ApprovalStageInfo extends React.Component<any, any> {
        constructor(props: any);
        protected handleHeaderClick(event: React.MouseEvent): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    class ApprovalHistoryTable extends React.Component<IApprovalHistoryTableProps, IApprovalHistoryTableState> {
        constructor(props: IApprovalHistoryTableProps);
        componentWillReceiveProps(nextProps: IApprovalHistoryTableProps, nextContext: any): void;
        handleCycleClick(cycleNumber: any): void;
        loadCycleData(cycleNumber: any): void;
        onRefreshClick(): void;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface IApprovalHistoryTableProps {
        data: ApprovalHistoryViewModel;
        approvingReportRefreshing: CancelableEvent<IApprovingReportRefreshingEventArgs>;
        approvingReportRefreshed: SimpleEvent<IApprovingReportRefreshedEventArgs>;
        refreshRequested: Function;
        inline?: boolean;
    }
}
declare namespace WebClient {
    interface IApprovalHistoryTableState {
        currentCycle: number;
        cycleData: ApprovalHistoryCycleModel;
    }
}
declare namespace WebClient {
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
    class ApprovalCycleList extends React.Component<ApprovalCycleListProps, any> {
        constructor(props: ApprovalCycleListProps);
        private renderItem(item);
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface ApprovalCycleListProps {
        cycles: ApprovalHistorySimpleCycleModel[];
        currentCycle: any;
        onCycleClick: Function;
    }
}
declare namespace WebClient {
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
        private Binding;
        render(): JSX.Element;
    }
}
declare namespace WebClient {
    interface AcquaintanceManagementImplState extends PanelState, AcquaintanceManagementState {
        loading: boolean;
    }
    interface AcquaintanceManagementImplProps extends AcquaintanceManagementState {
    }
    class AcquaintanceManagementImpl extends PanelImpl<AcquaintanceManagementImplProps, AcquaintanceManagementImplState> {
        constructor(props: AcquaintanceManagementImplProps);
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
declare namespace WebClient {
    class LayoutUserSettingsController extends ServerController {
        GetMainMenuSettings(): JQueryDeferred<IMainMenuSettings>;
        SaveMainMenuSettings(settings?: IMainMenuSettings): JQueryDeferred<void>;
    }
    var layoutUserSettingsController: LayoutUserSettingsController;
}
declare namespace WebClient {
    interface IMainMenuItemSetting {
        id: string;
        hidden: boolean;
    }
}
declare namespace WebClient {
    interface IMainMenuSettings {
        items?: IMainMenuItemSetting[];
    }
}
declare namespace WebClient {
    class LayoutTasksController extends ServerController {
        GetTasks(cardId: string, availableKinds: string[]): JQueryDeferred<ITaskListItem[]>;
    }
    var layoutTasksController: LayoutTasksController;
}
declare namespace WebClient {
    class LayoutStaffController extends ServerController {
        FindDepartments(query: IDepartmentsSearchQuery): JQueryDeferred<IDepartmentsSearchResult>;
        LoadDepartmentsTree(query: ILoadDepartmentsTreeQuery): JQueryDeferred<IDepartmentTreeDigest[]>;
        FindInDepartmentsTree(query: ISearchDepartmentsTreeQuery): JQueryDeferred<ISearchDepartmentsTreeResult>;
        LoadDepartmentsFlat(query: ILoadDepartmentsFlatQuery): JQueryDeferred<ILoadDepartmentsFlatResponse>;
        FindInDepartmentsFlat(query: IDepartmentsFlatSearchQuery): JQueryDeferred<ISearchDepartmentsFlatResult>;
        GetDepartmentsInfo(departmentIds: string[], source?: DepartmentSource): JQueryDeferred<IDepartmentExtendedInfo[]>;
        GetDepartmentPath(departmentId: string, source?: DepartmentSource): JQueryDeferred<IDepartmentExtendedInfo[]>;
        GetStaffInfo(request: IStaffInfoRequestModel): JQueryDeferred<IStaffInfoResponseModel>;
    }
    var layoutStaffController: LayoutStaffController;
}
declare namespace WebClient {
    enum DepartmentSource {
        StaffDirectory = 0,
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
    }
}
declare namespace WebClient {
    interface IDepartmentExtendedInfo extends IDepartmentInfo {
        email: string;
        phone: string;
    }
}
declare namespace WebClient {
    interface IDepartmentFlatDigest {
        data: IDepartmentInfo;
        hasChildren?: boolean;
    }
}
declare namespace WebClient {
    interface IDepartmentInfo {
        id: string;
        name: string;
        fullName: string;
        departmentType?: DepartmentType;
        hasEmployee?: boolean;
        hasChildren?: boolean;
    }
}
declare namespace WebClient {
    interface IDepartmentsFlatSearchQuery {
        itemTypes: SearchDepartmentType;
        searchText?: string;
        departmentId?: string;
        skip: number;
        maxCount: number;
        source: DepartmentSource;
    }
}
declare namespace WebClient {
    interface IDepartmentsItemSearchInfo {
        matched: boolean;
        matchedFieldName: string;
        matchedFieldValue: string;
    }
}
declare namespace WebClient {
    interface IDepartmentsSearchItemFlat {
        data: IDepartmentInfo;
        searchInfo?: IDepartmentsItemSearchInfo;
        path?: IDepartmentInfo[];
        hasChildren?: boolean;
    }
}
declare namespace WebClient {
    interface IDepartmentsSearchQuery {
        itemTypes: SearchDepartmentType;
        searchText?: string;
        skipCount: number;
        maxCount: number;
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
        children?: IDepartmentTreeDigest[];
        childrenLoaded?: boolean;
    }
}
declare namespace WebClient {
    interface IDepartmentTreeSearchDigest extends IDepartmentTreeDigest {
        matched: boolean;
        matchedFieldName: string;
        matchedFieldValue: string;
    }
}
declare namespace WebClient {
    interface IEmloyeeInfoWithPhoneAndEmail extends IBasicEmployeeInfo {
        phone: string;
        email: string;
        unitId: string;
    }
}
declare namespace WebClient {
    interface ILoadDepartmentsFlatQuery {
        departmentId?: string;
        source: DepartmentSource;
        skip: number;
        itemTypes: SearchDepartmentType;
        maxCount: number;
    }
}
declare namespace WebClient {
    interface ILoadDepartmentsFlatResponse {
        directoryTimestamp: number;
        totalItemsCount: number;
        items: IDepartmentFlatDigest[];
    }
}
declare namespace WebClient {
    interface ILoadDepartmentsTreeQuery {
        parentNodeId?: string;
        treeLevelDown: number;
        itemTypes: SearchDepartmentType;
        source: DepartmentSource;
    }
}
declare namespace WebClient {
    interface ISearchDepartmentsFlatResult {
        items: IDepartmentsSearchItemFlat[];
        hasMore: boolean;
        directoryTimestamp: number;
    }
}
declare namespace WebClient {
    interface ISearchDepartmentsTreeQuery {
        itemTypes: SearchDepartmentType;
        searchQuery?: string;
        source: DepartmentSource;
    }
}
declare namespace WebClient {
    interface ISearchDepartmentsTreeResult {
        items: IDepartmentTreeDigest[];
        totalResultsCount: number;
    }
}
declare namespace WebClient {
    interface IStaffInfoRequestModel {
        employeeIds: string[];
        departmentIds: string[];
        source: DepartmentSource;
    }
}
declare namespace WebClient {
    interface IStaffInfoResponseModel {
        employeesInfo: IEmloyeeInfoWithPhoneAndEmail[];
        departmentsInfo: IDepartmentExtendedInfo[];
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
    class LayoutPartnerController extends ServerController {
        DirectorySearch(query: IPartnerDirectorySearchRequest): JQueryDeferred<IPartnerDirectorySearchResponse>;
        LoadTree(query: IPartnerDirectoryTreeLoadRequest): JQueryDeferred<IPartnerDirectoryTreeLoadResponse>;
    }
    var layoutPartnerController: LayoutPartnerController;
}
declare namespace WebClient {
    interface IDepartmentTreeSearchDigest extends IDepartmentTreeDigest {
        matched: boolean;
        matchedFieldName: string;
        matchedFieldValue: string;
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryItem {
        itemType: PartnerDirectoryItemType;
        data: IDepartmentInfo | IBasicEmployeeInfo;
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryItemSearchInfo {
        matched: boolean;
        matchedFieldName: string;
        matchedFieldValue: string;
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryQuickSearchResponse extends IPartnerDirectoryResponse {
        hasMore: boolean;
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryRequest {
        departmentId?: string;
        skip: number;
        maxCount: number;
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryResponse {
        items: IPartnerDirectoryItem[];
    }
}
declare namespace WebClient {
    interface IPartnerDirectorySearchItem extends IPartnerDirectoryItem {
        searchInfo?: IPartnerDirectoryItemSearchInfo;
        path?: IDepartmentInfo[];
    }
}
declare namespace WebClient {
    interface IPartnerDirectorySearchRequest {
        searchMode: PartnerDirectorySearchMode;
        searchText?: string;
        departmentId?: string;
        skip: number;
        skipDepartments: number;
        maxCount: number;
    }
}
declare namespace WebClient {
    interface IPartnerDirectorySearchResponse extends IPartnerDirectoryResponse {
        items: IPartnerDirectorySearchItem[];
        hasMore: boolean;
        directoryTimestamp: number;
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryTreeLoadItem extends IPartnerDirectoryItem {
        hasChildren?: boolean;
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryTreeLoadRequest extends IPartnerDirectoryRequest {
        departmentId?: string;
    }
}
declare namespace WebClient {
    interface IPartnerDirectoryTreeLoadResponse extends IPartnerDirectoryResponse {
        items: IPartnerDirectoryTreeLoadItem[];
        totalItemsCount: number;
        directoryTimestamp: number;
    }
}
declare namespace WebClient {
    enum PartnerDirectoryItemType {
        Organization = 0,
        Department = 1,
        Employee = 2,
    }
}
declare namespace WebClient {
    enum PartnerDirectorySearchMode {
        SearchDepartments = 0,
        SearchEmployees = 1,
        SearchAll = 2,
    }
}
declare namespace WebClient {
    class LayoutLinksController extends ServerController {
        DeleteLink(cardId: string, info: ISimpleBindingInfo, linkId: string, timestamp: number): JQueryDeferred<ILinksDataModel>;
        PreviewCard(previewCardId: string): JQueryDeferred<string>;
        CardCreateLinks(allowedKinds: IAllowedCardKind[]): JQueryDeferred<IKindModel[]>;
        AddExistingCardLink(linkParams: ILayoutLinkCreateParams): JQueryDeferred<ILinksDataModel>;
        SetLinkDescription(data: ILayoutSetLinkDescriptionParams): JQueryDeferred<ILinksDataModel>;
        GetLinks(cardId: string, bindingInfo: ISimpleBindingInfo): JQueryDeferred<ILinksDataModel>;
        CheckReadMainFileAvailable(cardId: string): JQueryDeferred<boolean>;
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
    interface IAllowedCardType {
        CardTypeId: string;
    }
}
declare namespace WebClient {
    interface IKindModel {
        cardTypeId: string;
        kindId: string;
        name: string;
        kinds: IKindModel[];
        notAvailable: boolean;
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
        editOperation: string;
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
        linksLoaded: boolean;
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
    class LayoutHistoryController extends ServerController {
        testData: HistoryRecord[];
        GetHistoryRecords(request: HistoryRequest): JQueryDeferred<HistoryResponse>;
    }
    var layoutHistoryController: LayoutHistoryController;
}
declare namespace WebClient {
    interface HistoryRecord {
        id: string;
        author: IBasicEmployeeInfo;
        date: Date;
        event: string;
    }
}
declare namespace WebClient {
    class HistoryRequest {
        cardId: string;
        employeeName?: string;
        date?: Date;
        eventSearch?: string;
        skip: number;
        maxCount: number;
        operationsToHide: string[];
        cacheId: string;
        editOperation: string;
    }
}
declare namespace WebClient {
    class HistoryResponse {
        records: HistoryRecord[];
        hasMore: boolean;
        cacheId: string;
        renew: boolean;
    }
}
declare namespace WebClient {
    class LayoutFolderController extends ServerController {
        CheckFolderForAvailableCardKind(folderId: string, cardId: string): JQueryDeferred<ICheckResult>;
        GetUserFoldersTreeData(folderId?: string): JQueryDeferred<IFolderInfo[]>;
        GetFolderInfo(folderId: string, loadSubfoldersLevel: number): JQueryDeferred<IFolderItemNodeData>;
        GetFolderInfoWithParents(folderId: string): JQueryDeferred<IFolderItemNodeDataWithParents>;
        DetachUserFolders(folderIds: string[]): JQueryDeferred<void>;
        private GetFolderInfoInternal(url, data);
        protected parseFoldersTreeData(data: any): IFolderInfo[];
        protected parseServerFolderInfo(src: any, folderInfo: IFolderInfo): void;
    }
    var layoutFolderController: LayoutFolderController;
}
declare namespace WebClient {
    enum FolderMode {
        NoDefaultValue = 0,
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
    interface IFolderInfo {
        name: string;
        folderId: string;
        additionalId: string;
        folderType: FolderType;
        disabled: boolean;
        refreshTimeout: number;
        hasUnloadedSubfolders: boolean;
        children: IFolderInfo[];
    }
}
declare namespace WebClient {
    interface IFolderItemNodeData {
        id: string;
        name: string;
        type: FolderType;
        defaultStyle: FolderNodeStyle;
        hasUnloadedSubfolders: boolean;
        url: string;
        defaultViewId: string;
        searchId: string;
        targetFolderId: string;
        searchHasParameters: boolean;
        refreshTimeout: number;
        showUnreadCounter: boolean;
        folders: IFolderItemNodeData[];
    }
}
declare namespace WebClient {
    interface IFolderItemNodeDataWithParents {
        folderNode: IFolderItemNodeData;
        parentNodes: string[];
    }
}
declare namespace WebClient {
    class LayoutFileController extends ServerController {
        GetFiles(cardId: string, options?: IGetFilesOptions): JQueryDeferred<IFileListDataModel>;
        GetVersions(fileId: string): JQueryDeferred<FileListVersionsDataModel>;
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
        totalCount: number;
    }
}
declare namespace WebClient {
    interface FileListVersionsDataModel {
        versions: IFileVersion[];
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
    interface IGetFilesOptions {
        skipCount: number;
        maxCount: number;
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
        versionsCount: number;
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
        GenerateNumber(cardId: string, generationRuleId: string, info: IBindingInfoExt, save: boolean): JQueryDeferred<any>;
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
        FindRows(query: IDirectoryDesignerSearchQuery): JQueryDeferred<IDirectoryDesignerSearchResult>;
        LoadTree(query: IDirectoryDesignerLoadTreeQuery): JQueryDeferred<IDirectoryDesignerTreeNodeDigest[]>;
        FindInTree(query: IDirectoryDesignerSearchTreeQuery): JQueryDeferred<IDirectoryDesignerSearchTreeResult>;
        findNodeRec(current: IDirectoryDesignerTreeNodeDigest[], idToFind: string): IDirectoryDesignerTreeNodeDigest;
    }
    var layoutUnversalDirectoryController: LayoutDirectoryDesignerController;
}
declare namespace WebClient {
    enum DirectoryDesignerAreas {
        OnlyNode = 0,
        OnlyChildren = 1,
        NodeWithChildren = 2,
    }
}
declare namespace WebClient {
    enum DirectoryDesignerNodeType {
        Node = 0,
        Row = 1,
    }
}
declare namespace WebClient {
    interface IDirectoryDesignerLoadTreeQuery {
        rootNodeId?: string;
        searchArea?: DirectoryDesignerAreas;
        currentNodeId?: string;
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
    interface IDirectoryDesignerSearchQuery {
        rootNodeId?: string;
        searchArea?: DirectoryDesignerAreas;
        searchText: string;
        skipCount: number;
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
    interface IDirectoryDesignerSearchTreeQuery {
        rootNodeId?: string;
        searchArea?: DirectoryDesignerAreas;
        searchQuery?: string;
        searchResultNumber?: number;
    }
}
declare namespace WebClient {
    interface IDirectoryDesignerSearchTreeResult {
        items: IDirectoryDesignerTreeNodeDigest[];
        totalResultsCount: number;
        searchResultNumber: number;
        matchedElementId: string;
        matchedFieldName: string;
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
    class LayoutController extends ServerController {
        Get(cardIlayoutPositionNamed: string): JQueryDeferred<ILayoutViewModel>;
        GetPart(cardIlayoutPositionNamed: string, controlName: string): JQueryDeferred<ILayoutViewModel>;
    }
    var layoutController: LayoutController;
}
declare namespace WebClient {
    class LayoutCardController extends ServerController {
        Save(model: ISaveControlData): JQueryDeferred<any>;
        ChangeState(changeStateDataModel: IChangeStateData): JQueryDeferred<ILayoutCardModel>;
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
        deferred: JQueryDeferred<any>;
    }
}
declare namespace WebClient {
    interface IBindingInfoExt extends ISimpleBindingInfo {
    }
}
declare namespace WebClient {
    interface ICardInfoModel {
        id: string;
        typeId: string;
        lockInfo: ILockInfoModel;
        timestamp: number;
        parentCardId: string;
        createAsLink: ICreateAsLinkParams;
        createInFolder: string;
        createInCurrentFolderForbidden: boolean;
        createDate: Date;
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
    interface ILayoutCardModel extends ILayoutViewModel {
        cardInfo: ICardInfoModel;
    }
}
declare namespace WebClient {
    interface ILayoutInfoModel {
        deviceType: DeviceType;
        localeId: number;
        name: string;
        id: string;
        type: LayoutType;
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
    interface ILayoutViewModel {
        layoutModel: IExtendedLayoutModel;
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
        editOperation: string;
        propertyName: string;
    }
}
declare namespace WebClient {
    enum LayoutType {
        View = 0,
        Edit = 1,
        Create = 2,
    }
}
declare namespace WebClient {
    class LayoutAgreementController extends ServerController {
        testData: AgreementTemplateModel[];
        realData: boolean;
        GetAgreementList(cardId: string): JQueryDeferred<IAgreementListDataModel>;
        GetAgreementManagementModel(cardId: string): JQueryDeferred<ILayoutAgreementManagementModel>;
        GetAgreementManagementStartModel(documentCardId: string): JQueryDeferred<IAgreementManagementStartModel>;
        GetAgreementManagementEditModel(documentCardId: string, reconcileCardId: string): JQueryDeferred<IAgreementManagementEditModel>;
        InterruptCurrentStages(documentCardId: string, reconcileCardId: string): JQueryDeferred<string>;
        AgreementStop(documentCardId: string, reconcileCardId: string): JQueryDeferred<string>;
        AgreementResume(documentCardId: string, reconcileCardId: string): JQueryDeferred<string>;
        AgreementPause(documentCardId: string, reconcileCardId: string): JQueryDeferred<string>;
        AgreementFinish(documentCardId: string, reconcileCardId: string): JQueryDeferred<string>;
        GetTemplates(documentCardId: string): JQueryDeferred<AgreementTemplateModel[]>;
        GetAgreementTemplateStages(documentId: string, templateId: string): JQueryDeferred<AgreementStageModel[]>;
        CreateReconciliation(model: {
            documentId: string;
            creationSettingId: string;
            stages?: StageChangeModel[];
        }): JQueryDeferred<any>;
        ChangeStages(model: {
            documentId: string;
            reconcileCardId: string;
            stages?: StageChangeModel[];
        }): JQueryDeferred<any>;
        StartAgreement(model: {
            cardId: string;
            templateId: string;
        }): JQueryDeferred<any>;
    }
    var layoutAgreementController: LayoutAgreementController;
}
declare namespace WebClient {
    interface IAgreementListDataModel {
        items: IAgreementListItemModel[];
        documentNumber: string;
        documentName: string;
    }
}
declare namespace WebClient {
    interface IAgreementListItemModel {
        date: Date;
        employeeDisplayText: string;
        departmentName: string;
        comment: string;
        decisionText: string;
    }
}
declare namespace WebClient {
    interface IAgreementManagementEditModel {
        agreementManagement: IAgreementManagementModel;
        stages: AgreementStageModel[];
        canInterruptCurrentStages: boolean;
        availableAgreementOperations: AgreementOperationKind[];
    }
}
declare namespace WebClient {
    interface IAgreementManagementModel {
        isMainFileExists: boolean;
        isNew: boolean;
        stateType: AgreementStateType;
        reconciliationCardId: string;
    }
}
declare namespace WebClient {
    interface IAgreementManagementStartModel {
        agreementManagement: IAgreementManagementModel;
        templates: AgreementTemplateModel[];
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
