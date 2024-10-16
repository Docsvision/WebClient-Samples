using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public enum EventResult
    {
        Unhandled = 0,
        Handled = 1,
        Error = 2,
        Failed = 3,
        Paused = 4,
    }
}
