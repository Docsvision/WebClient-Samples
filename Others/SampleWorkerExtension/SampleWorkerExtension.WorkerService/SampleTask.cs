using Docsvision.WorkerService.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocsVision.Platform.ObjectModel;
using SampleWorkerExtension.ObjectModel.Services;

namespace SampleWorkerExtension.WorkerService
{
    public class SampleWorkerTask : IWorkerTask
    {
        private readonly IMessage message;
        private readonly ObjectContext objectContext;
        private readonly IServiceProvider serviceProvider;

        private string WorkerTypeName = "SampleWorkerExtension.WorkerExtension.Services.SampleEventHandlerService, SampleWorkerExtension.WorkerExtension, Version=1.0.0.0, Culture=neutral, PublicKeyToken=7148afe997f90519";
        public SampleWorkerTask(IMessage message, ObjectContext context, IServiceProvider serviceProvider)
        {
            this.message = message;
            this.objectContext = context;
            this.serviceProvider = serviceProvider;
        }

        public bool Work()
        {
            string error = null;

            return Work(out error) == MessageState.Handled;
        }

        public MessageState Work(out string errorDescription)
        {
            errorDescription = null;

            System.Diagnostics.Trace.WriteLine($"{DateTime.Now.ToString(System.Globalization.DateTimeFormatInfo.InvariantInfo)} Running task for message {message.TypeId}, {message.Data}");

            ISampleEventHandlerService targetService = CreateService(WorkerTypeName);

            EventHandlerResult result = targetService.HandleEvent(message.TargetId, message.SubTypeId, message.Data);

            StoreResults(result);

            if (result.Result.HasValue)
                return (MessageState)result.Result.Value;

            return result.Succeeded ? MessageState.Handled : MessageState.Unhandled;
        }

        private void StoreResults(EventHandlerResult result)
        {
            if (message is IMessageWithConditions && result.RequiredUnlockedObjects != null && result.RequiredUnlockedObjects.Count > 0)
            {
                var list = (message as IMessageWithConditions).RequiredUnlockedObjects;

                foreach (var id in result.RequiredUnlockedObjects)
                    list.Add(id);
            }
        }

        private ISampleEventHandlerService CreateService(string typeName, bool throwOnError = true, bool initializeService = true)
        {
            Type eventHandlerType = Type.GetType(typeName, true);
            object eventHandlerObject = Activator.CreateInstance(eventHandlerType);

            if (eventHandlerObject == null)
                throw new Exception($"Unable to create event handler instance by type '{typeName}'");

            ISampleEventHandlerService eventHandlerService = (ISampleEventHandlerService)eventHandlerObject;
            if (eventHandlerService == null)
                throw new Exception($"Handler instance for type '{typeName}' not supports ISampleEventHandlerService interface");

            (eventHandlerService as IContextService)?.SetContext(this.objectContext);
            (eventHandlerService as IInitializeWithServiceProvider)?.Initialize(serviceProvider);

            return eventHandlerService;

        }

        public IServiceProvider ServiceProvider => serviceProvider;
        public IMessage Message => message;
        public ObjectContext ObjectContext => objectContext;
    }
}
