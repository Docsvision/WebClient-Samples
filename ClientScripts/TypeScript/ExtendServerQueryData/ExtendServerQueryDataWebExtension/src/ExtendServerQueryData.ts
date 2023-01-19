import { TasksTreeControllerCustom } from "./TasksTreeControllerCustom";
import { cloneServices, replaceService } from "@docsvision/web/core/services";
import { Layout } from "@docsvision/webclient/System/Layout";

export function extendServerQueryData(sender: Layout) {
    const services = cloneServices(sender.params.services);
    replaceService(services, { tasksTreeController: new TasksTreeControllerCustom(sender.params.services)});
    sender.params.services = services;
}