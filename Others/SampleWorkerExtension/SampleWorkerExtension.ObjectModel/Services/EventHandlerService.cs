using DocsVision.Platform.ObjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using SampleWorkerExtension.ObjectModel.Models;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public abstract class EventHandlerService : EventBaseService, IEventHandlerService
    {
        private static Dictionary<Guid, EventHandlerInfo> handlersInfo = new Dictionary<Guid, EventHandlerInfo>();
        private List<Guid> requiredUnlockedObjects;

        public Guid Id => GetId();

        protected abstract Guid GetId();

        public virtual EventHandlerResult HandleEvent(Guid cardId, Guid eventId, object eventArgs)
        {
            EventHandlerInfo handlerInfo = GetHandlerInfo(eventId);

            if (handlerInfo == null)
                throw new ArgumentException($"Unknown event: '{eventId}'");

            object deserializedEventArgs = DeserializeEventArgs(handlerInfo.EventArgsType, (string)eventArgs);
            Type type = this.GetType();
            object result = type.InvokeMember(handlerInfo.EventHandlerName, System.Reflection.BindingFlags.InvokeMethod | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public, null, this, new object[] { deserializedEventArgs });

            // Прямой результат от обработчика
            EventResult eventResultFromInvoke = result != null && result is EventResult ? (EventResult)result : EventResult.Handled;
            bool succeeded = requiredUnlockedObjects == null || requiredUnlockedObjects.Count == 0;
            EventResult eventResult = succeeded ? EventResult.Handled : EventResult.Unhandled;
            if (result != null && eventResult == EventResult.Handled)
                eventResult = eventResultFromInvoke;

            EventServiceEventArgs eventServiceEventArgs = deserializedEventArgs as EventServiceEventArgs;
            if (eventServiceEventArgs != null && eventServiceEventArgs.IsPaused && eventResult == EventResult.Handled)
                eventResult = EventResult.Paused;

            return new EventHandlerResult { Succeeded = succeeded, RequiredUnlockedObjects = requiredUnlockedObjects, Result = eventResult };
        }

        public virtual EventHandlerInfo GetHandlerInfo(Guid eventId)
        {
            EventHandlerInfo handlerInfo = null;
            GetHandlersInfo().TryGetValue(eventId, out handlerInfo);

            return handlerInfo;
        }

        public virtual string GetEventDescription(ObjectContext objectContext, Guid eventId, object eventArgs)
        {
            EventHandlerInfo handlerInfo = GetHandlerInfo(eventId);

            if (handlerInfo == null)
                throw new ArgumentException($"Unknown event: '{eventId}'");

            var deserializedEventArgs = (EventServiceEventArgs)DeserializeEventArgs(handlerInfo.EventArgsType, (string)eventArgs);
            return deserializedEventArgs.GetEventDataDescription(objectContext);
        }

        protected void RegisterForUnlock(Guid objectId)
        {
            if (objectId != Guid.Empty)
                RequiredUnlockedObjects.Add(objectId);
        }

        protected virtual IDictionary<Guid, EventHandlerInfo> GetHandlersInfo()
        {
            return handlersInfo;
        }

        protected IList<Guid> RequiredUnlockedObjects => this.requiredUnlockedObjects ?? (this.requiredUnlockedObjects = new List<Guid>());

    }
}
