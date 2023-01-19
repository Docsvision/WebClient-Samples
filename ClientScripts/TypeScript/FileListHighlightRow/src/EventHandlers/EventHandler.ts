import { FileListControl } from "@docsvision/webclient/BackOffice/FileListControl";
import { IRowClickArgs } from "@docsvision/webclient/BackOffice/IRowClickArgs";

export async function fileListHighlightRow(sender: FileListControl, event) {
    const fileItem = event.fileItem;
	const customClass = "file-list-row_red-border";
    
    if (!event.fileItem?.cssClasses?.includes(customClass)) {
        sender.toggleRowClass(fileItem, customClass);
    }
}