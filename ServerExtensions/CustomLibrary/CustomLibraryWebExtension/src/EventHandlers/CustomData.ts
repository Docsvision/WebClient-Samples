import { Layout } from "@docsvision/webclient/System/Layout";
import { $CustomLibraryController } from "../Services/CustomLibraryController";

export async function getCustomData(sender: Layout) {    
    let data = await sender.getService($CustomLibraryController).getCustomData();   
    alert('Custom data: ' + data);
}