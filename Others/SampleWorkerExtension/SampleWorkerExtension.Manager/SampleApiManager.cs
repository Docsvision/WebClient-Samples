using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using DocsVision.Platform.ObjectModel;
using SampleWorkerExtension.ObjectModel.Models;
using SampleWorkerExtension.ObjectModel.Services;

namespace SampleWorkerExtension.Manager
{
    public class SampleApiManager : ISampleManager
    {
        private ObjectContext context;

        /// <summary>
        /// Initializes instance of <see cref="ISampleManager"/>.
        /// </summary>
        /// <param name="objectContext">Instance of <see cref="ObjectContext"/>.</param>
        public void Initialize(ObjectContext objectContext)
        {
            context = objectContext;
        }
    }
}
