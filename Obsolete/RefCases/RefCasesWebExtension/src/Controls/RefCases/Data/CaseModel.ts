export declare namespace Models {
        interface RefCasesYearModel{
                id: string;
                displayValue:string;
        }

        interface RefCasesSectionModel{
                id: string;
                displayValue:string;
                sections: Array<RefCasesSectionModel>;
        }

        interface RefCasesCaseModel{
                id: string;
                displayValue: string;
                cases: Array<RefCasesCaseModel>;
        }

        interface RefCasesCaseDisplayModel{
                id: string;
                name: string;
        }      
        
        interface CaseSearchResult{
                items: RefCasesCaseDisplayModel[];
                hasMore: boolean;
        }
}