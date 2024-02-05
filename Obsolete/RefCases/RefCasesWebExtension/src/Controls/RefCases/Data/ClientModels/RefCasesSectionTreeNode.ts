import { IDynamicTreeNodeData } from "@docsvision/webclient/Helpers/DynamicTree/IDynamicTreeNodeData";
import { ITreeNodeData } from "@docsvision/webclient/Helpers/Tree/Data/ClientModels/ITreeNodeData";
import { Models } from "../CaseModel";


/** @internal */
export class RefCasesSectionTreeNode implements IDynamicTreeNodeData {

    public static Create(data: Models.RefCasesSectionModel[]): RefCasesSectionTreeNode[] {
        
        return data.map((item) => {
            let node = new RefCasesSectionTreeNode();
            node.uniqueId = item.id;
            node.displayName = item.displayValue;
            if (item.sections != null && item.sections.length > 0) {
                node.children = this.Create(item.sections);
            }
            node.childrenLoaded = true;
            return node;
        })
    }

    childrenLoaded: boolean;
    displayName: import("react").ReactNode;
    uniqueId: string;
    iconClass: string;
    children: ITreeNodeData[];
    nodeClass?: string;
    disabled?: boolean;
    expandedByDefault?: boolean;
    title?: string;
}
