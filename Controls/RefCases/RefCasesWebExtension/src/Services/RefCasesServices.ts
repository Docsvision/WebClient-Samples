import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { Models } from "../Controls/RefCases/Data/CaseModel";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";

export class RefCasesService {
    constructor(private services: $RequestManager) {
    }

    // Возвращает модель списка лет
    getYears(rootSectionID?: string): Promise<Models.RefCasesYearModel[]> {
        let url = urlStore.urlResolver.resolveApiUrl("GetYears", "RefCasesOperation");
        url = url + "?rootSectionID=" + rootSectionID;

        return this.services.requestManager.post<Models.RefCasesYearModel[]>(url, "");
    }

    // Возвращает модель списка (а точнее дерева) разделов
    getSections(yearID?: string, rootSectionID?: string): Promise<Models.RefCasesSectionModel[]> {
        let url = urlStore.urlResolver.resolveApiUrl("GetSections", "RefCasesOperation");
        url = url + "?yearID=" + yearID + "&rootSectionID=" + rootSectionID;

        return this.services.requestManager.post<Models.RefCasesSectionModel[]>(url, "");
    }

    // Возвращает модель списка дел
    getCases(sectionID?: string): Promise<Models.RefCasesCaseModel[]> {
        let url = urlStore.urlResolver.resolveApiUrl("GetCases", "RefCasesOperation");
        url = url + "?sectionID=" + sectionID;

        return this.services.requestManager.post<Models.RefCasesCaseModel[]>(url, "");
    }

    // Возвращает отображаемое название дела
    getCaseTitleName(caseID?: string): Promise<string> {
        let url = urlStore.urlResolver.resolveApiUrl("GetCaseDisplayName", "RefCasesOperation");
        url = url + "?caseID=" + caseID;

        return this.services.requestManager.post<string>(url, "");
    }

    // Возвращает результат поиска дела по названию
    searchCase(caseName: string, skipCount: number, maxCount: number, rootSectionID?: string): Promise<Models.CaseSearchResult> {
        let url = urlStore.urlResolver.resolveApiUrl("SearchCase", "RefCasesOperation");
        url = url + "?caseName=" + caseName + "&skipCount=" + skipCount + "&maxCount=" + maxCount + "&rootSectionID=" + rootSectionID;

        return this.services.requestManager.post<Models.CaseSearchResult>(url, "");
    }
}

export type $RefCasesService = { refCasesService: RefCasesService };
export const $RefCasesService = serviceName((s: $RefCasesService) => s.refCasesService);