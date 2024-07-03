using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public class EventHandlerInfo
    {
        public Guid EventId { get; set; }

        public string EventHandlerName { get; set; }

        public Type EventArgsType { get; set; }

        public bool Concurent { get; set; }
    }
}
