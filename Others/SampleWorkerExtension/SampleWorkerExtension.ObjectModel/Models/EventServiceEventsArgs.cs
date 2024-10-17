using DocsVision.Platform.ObjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Models
{
    public class EventServiceEventArgs
    {
        public Guid CardId { get; set; }

        public bool IsPaused { get; set; }

        public virtual string GetEventDataDescription(ObjectContext context)
        {
            return null;
        }
    }
}
