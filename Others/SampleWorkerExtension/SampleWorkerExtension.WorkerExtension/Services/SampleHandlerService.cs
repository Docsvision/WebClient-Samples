using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocsVision.Platform.StorageServer;
using DocsVision.Platform;
using System.Diagnostics;
using DocsVision.Platform.ObjectManager;
using SampleWorkerExtension.ObjectModel.Models;
using Docsvision.WorkerService.Interfaces;
using EventDescription = SampleWorkerExtension.ObjectModel.Models.EventDescription;
using DocsVision.Platform.ObjectModel;
using SampleWorkerExtension.ObjectModel.Services;

namespace SampleWorkerExtension.WorkerExtension.Services
{
    public class SampleEventHandlerService : EventHandlerService, ISampleEventHandlerService
    {
        public static readonly Guid ServiceId = new Guid("B363DA98-9580-457F-AAAC-325D036F380A");
        private const string SampleComponentTypeName = "SampleWorkerExtension.Manager.SampleApiManager, DocsVision.SampleWorkerExtension.Manager, Version=1.0.0.0, Culture=neutral, PublicKeyToken=4a2caa47aa5b6b29";

        private IServiceProvider serviceProvider;
        private ISampleManager sampleManager;

        protected override Guid GetId() => ServiceId;

        public static readonly EventDescription ConvertCardFiles = new EventDescription { Id = new Guid("B2C6F070-C7F1-4F07-914F-94652804DD1C"), AutoSendToSelf = true, Concurrent = false };

        private readonly Dictionary<Guid, EventHandlerInfo> handlersInfo = new Dictionary<Guid, EventHandlerInfo>
        {
            {
                ConvertCardFiles.Id,
                new EventHandlerInfo
                    { EventId = ConvertCardFiles.Id, EventArgsType = typeof(SampleEventArgs), EventHandlerName = nameof(ProcessCardFiles) }
            }
        };

        public void Initialize(IServiceProvider serviceProvider)
        {
            if (serviceProvider == null)
                throw new ArgumentNullException(nameof(serviceProvider));

            this.serviceProvider = serviceProvider;
        }

        private ISampleCustomService SampleCustomService
        {
            get
            {
                var sampleService = new SampleCustomService();
                (sampleService as IContextService).SetContext(Context);
                return sampleService;
            }
        }

        private UserSession Session
        {
            get
            {
                return Context.GetService<UserSession>(); ;
            }
        }

        protected override IDictionary<Guid, EventHandlerInfo> GetHandlersInfo()
        {
            return handlersInfo;
        }

        #region Worker
        public EventResult ProcessCardFiles(SampleEventArgs eventArgs)
        {
            try
            {
                SampleManager.Process(eventArgs);
                return EventResult.Handled;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region LoadManager
        public string GetComponentName()
        {
            return SampleComponentTypeName;
        }
        private ISampleManager SampleManager
        {
            get
            {
                if (sampleManager == null)
                {
                    string componentTypeName = GetComponentName();
                    Type managerType = null;
                    try
                    {
                        managerType = Type.GetType(componentTypeName, true);
                    }
                    catch (Exception ex)
                    {
                        StorageServerTrace.Runtime.TraceEvent(TraceEventType.Error, 0, "Unable to load sample component - failed to load type {0}. Error: {1}", componentTypeName, ex);
                        if (ex.InnerException != null)
                        {
                            StorageServerTrace.Runtime.TraceEvent(TraceEventType.Error, 0, "Unable to load sample component - failed to load type {0}. Error: {1}", componentTypeName, ex.InnerException);
                        }
                    }

                    if (managerType == null)
                        throw Error.InvalidOperation("Sample component is not found");

                    sampleManager = (ISampleManager)Activator.CreateInstance(managerType);
                    sampleManager.Initialize(Context);
                }

                return sampleManager;
            }
        }
        #endregion

    }
}
