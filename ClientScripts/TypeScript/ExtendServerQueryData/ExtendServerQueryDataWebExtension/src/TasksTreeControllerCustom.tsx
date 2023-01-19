import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { GenControllers } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";
import { RequestOptions } from "@docsvision/webclient/Legacy/Utils";


export class TasksTreeControllerCustom extends GenControllers.TasksTreeController {
    constructor(services) {
        super(services);
    }
    async getTasksTable(request: GenModels.TasksTableLoadOptions, options?: RequestOptions) {
        var data = await super.getTasksTable(request, options);
        if (data && data.rows) { 
            data.rows.forEach(row => {
                if (row.indicators.includes(GenModels.TasksIndicators.Overdue)) {
                    row.indicators.push(GenModels.TasksIndicators.HighPriority)
                }
            })
        };
        return data;
    }
}