import { ITypeaheadVariant } from "@docsvision/webclient/Helpers/Typeahead/Models/ITypeaheadVariant";
import { Models } from "../CaseModel";


/** @internal */
export class CaseTypeaheadVariant implements ITypeaheadVariant {
    data: Models.RefCasesCaseDisplayModel;

    constructor(data: Models.RefCasesCaseDisplayModel) {
        console.log(data);
        
        this.data = data;
    }

    public get name(): string {
        return this.data.name;
    }
    
    public get value(): string {
        return this.data.id;
    }

    public get iconCssClass(): string {
        return "dv-ico dv-ico-row";
    }

    public get title(): string {
        return this.data.name;
    }
}
