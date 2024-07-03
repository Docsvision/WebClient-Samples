using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public class EventHandlerResult
    {
        public bool Succeeded { get; set; }

        public EventResult? Result { get; set; }

        public IList<Guid> RequiredUnlockedObjects { get; set; }
    }
}
