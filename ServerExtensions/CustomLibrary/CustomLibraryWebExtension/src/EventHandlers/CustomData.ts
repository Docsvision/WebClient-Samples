import { Layout } from "@docsvision/webclient/System/Layout";
import { $CustomLibraryController } from "../Services/CustomLibraryController";

export async function getCustomData(sender: Layout) {   
    let service =  sender.getService($CustomLibraryController);
    let data = await service.getCustomData();   
    alert('Custom data: ' + data);
}