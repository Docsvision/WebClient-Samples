/// <reference path="jquery.d.ts" />
/// <reference path="moment.d.ts" />
/// <reference path="textArea.d.ts" />

interface JQuery {
    colRowResizable(options?: any): JQuery;
    dotdotdot(options?: any): JQuery;
    tipso(options?: any): JQuery;
}

interface HTMLElement {
    grid: WebClient.Grid;
    employeeAutocomplete: WebClient.EmployeeAutoComplete;
    setText(text: string): void;
    getText(): string;
}

interface TaskInterval {
    PerformerId: string;
    PerformerName: string;
    Description: string;
    IsResponsible: boolean;    
    get_startDate(): Date;
    get_endDate(): Date;
    get_duration(): number;
    get_order(): string;
    set_order(order: string): void;
    set_duration(duration: number): void;
    set_startDate(date: Date): void;
    set_endDate(date: Date): void;
}

interface TaskIntervalDatesBounds {
    get_canChangeStartDate(): boolean;
    get_canChangeEndDate(): boolean;
    get_minStart(): Date;
    get_maxStart(): Date;
    get_minEnd(): Date;
    get_maxEnd(): Date;
}

interface ChangeDateInfo {
    get_newDuration(): number; 
    get_newStartDate(): Date;
    get_newEndDate(): Date; 
    get_resetOtherIntervals(): boolean; 
}

interface TaskIntervalManager {
    get_startDate(): Date;
    set_startDate(date: Date): void;
    get_endDate(): Date;
    set_endDate(date: Date): void;
    get_duration(): number;  
    set_duration(duration: number): void;
    get_executionType(): WebClient.GenModels.ExecutionType;
    set_executionType(type: WebClient.GenModels.ExecutionType): void;
    get_taskIntervals(): Array<TaskInterval>;
    getDatesBounds(interval: TaskInterval): TaskIntervalDatesBounds;
    getChangeDurationInfo(interval: TaskInterval, duration: number): ChangeDateInfo;
    getChangeStartDateInfo(interval: TaskInterval, date: Date): ChangeDateInfo;
    getChangeEndDateInfo(interval: TaskInterval, date: Date): ChangeDateInfo;
    changeTaskGroupStartDate(date: Date): void;
    changeTaskGroupEndDate(date: Date): void;
    changeTaskGroupDuration(duration: number): void;
    addInterval(interval: TaskInterval): void;
    recalculateDurations(): void;
    resetOrderAndRecalcDates(): void;
    resetTimeIntervals(): void;
    reorderTaskIntervals(): void;
    $taskIntervals: Array<TaskInterval>;
    moveTaskIntervalUp(interval: TaskInterval): void;
    moveTaskIntervalDown(interval: TaskInterval): void;
} 

interface Array<T> {
    find(predicate: (search: T) => boolean): T;
}

declare var textAr: any;
declare var moment: moment.MomentStatic;