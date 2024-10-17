using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public interface IEventHandlerService
    {
        Guid Id { get; }

        EventHandlerResult HandleEvent(Guid cardId, Guid eventId, object eventArgs);

        EventHandlerInfo GetHandlerInfo(Guid eventId);
    }
}
