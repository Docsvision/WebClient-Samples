import { IDynamicTreeNodeData } from "@docsvision/webclient/Helpers/DynamicTree/IDynamicTreeNodeData";
import { ITreeNodeData } from "@docsvision/webclient/Helpers/Tree/Data/ClientModels/ITreeNodeData";
import { Models } from "../CaseModel";


/** @internal */
export class RefCasesCaseTreeNode implements IDynamicTreeNodeData {

    public static Create(data: Models.RefCasesCaseModel[]): RefCasesCaseTreeNode[] {
        
        return data.map((item) => {
            console.log("create node " + item.displayValue);
            let node = new RefCasesCaseTreeNode();
            node.uniqueId = item.id;
            node.displayName = item.displayValue;
            if (item.cases != null && item.cases.length > 0) {
                node.children = this.Create(item.cases);
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
