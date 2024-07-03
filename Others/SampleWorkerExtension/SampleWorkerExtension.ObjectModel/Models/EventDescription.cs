using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Models
{
    public class EventDescription
    {
        public Guid Id { get; set; }

        public bool Concurrent { get; set; }

        public bool AutoSendToSelf { get; set; }
    }
}
