using DocsVision.Platform.ObjectModel;
using SampleWorkerExtension.ObjectModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public interface ISampleManager
    {
        /// <summary>
        /// Initializes instance of <see cref="ISampleManager"/>.
        /// </summary>
        /// <param name="objectContext">Instance of <see cref="ObjectContext"/>.</param>
        void Initialize(ObjectContext objectContext);

        void Process(SampleEventArgs sampleEventArgs);
    }
}
