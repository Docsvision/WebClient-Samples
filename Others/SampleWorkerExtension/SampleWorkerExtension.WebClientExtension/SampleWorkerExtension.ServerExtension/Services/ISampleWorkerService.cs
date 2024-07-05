using DocsVision.Platform.ObjectModel;
using ServerExtension.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerExtension.Services
{
    public interface ISampleWorkerService
    {
        Guid CreateMessageToWorker(ObjectContext context, WorkerMessageArgs args, Guid eventId);
    }
}
