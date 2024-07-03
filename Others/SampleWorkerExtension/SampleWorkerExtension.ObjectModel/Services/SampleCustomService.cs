using DocsVision.Platform.ObjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public sealed class SampleCustomService : ContextService, ISampleCustomService
    {
        public void Relax(int seconds)
        {
            System.Threading.Thread.Sleep(1000 * seconds);
        }
    }
}
