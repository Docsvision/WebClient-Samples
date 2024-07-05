using System;
using System.ComponentModel.Design;
using System.Diagnostics;
using System.Linq;
using System.Xml;
using System.Xml.Serialization;

using Docsvision.WorkerService.Interfaces;
using DocsVision.Platform.Data.Metadata;
using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;
using DocsVision.Platform.ObjectModel.Persistence;
using DocsVision.Platform.StorageServer;
using DocsVision.Platform.SystemCards.ObjectModel.Mapping;
using DocsVision.Platform.SystemCards.ObjectModel.Services;
using SampleWorkerExtension.ObjectModel.Services;
using SampleWorkerExtension.ObjectModel.Models;

namespace SampleWorkerExtension.WorkerService
{
    public class SampleTaskFactory : IWorkerTaskFactory, IInitializeWithServiceProvider, IMessageDescriptionProvider
    {
        IServiceProvider serviceProvider;
        ObjectContext objectContext;

        public SampleTaskFactory()
        {
            Id = Constants.SampleTaskFactoryId;

            MessageTypes = new Guid[] { Constants.SampleManagerTypeId };
        }

        /// <summary>
        /// Task Factory ID
        /// </summary>
		public Guid Id { get; }

        /// <summary>
        /// Supported Message Types
        /// </summary>
		public Guid[] MessageTypes { get; }

        public void Initialize(IServiceProvider serviceProvider)
        {
            if (serviceProvider == null)
                throw new ArgumentNullException(nameof(serviceProvider));

            this.serviceProvider = serviceProvider;
        }

        /// <summary>
        /// Create Worker Task
        /// </summary>
		public IWorkerTask CreateWorkerTask(IMessage message)
        {
            return CreateWorkerTask(message, null);
        }

        /// <summary>
        /// Create Worker Task
        /// </summary>
		public IWorkerTask CreateWorkerTask(IMessage message, IWorkerTask previousTask)
        {
            if (message == null)
                throw new ArgumentNullException(nameof(message));

            if (message.TypeId == Constants.SampleManagerTypeId)
            {
                return new SampleWorkerTask(message, GetObjectContext(), ServiceProvider);
            }

            return null;
        }

        public IMessageDescription GetMessageDescription(IMessage message)
        {
            if (!MessageTypes.Contains(message.TypeId))
                return null;

            return new MessageDescriptionImpl
            {
                TypeIdDescription = Resource.SampleExtension_Name,
                SubTypeIdDescription = GetTypeDescription(message.SubTypeId),
                DataDescription = GetDataDescription(message.Data)
            };
        }

        private string GetTypeDescription(Guid subTypeId)
        {
            if (subTypeId == Constants.SampleSomeEvent1Id)
                return Resource.SampleSomeEvent1Id;

            return String.Format(Resource.SampleUnknownEvent_Name, subTypeId);
        }

        private string GetDataDescription(object data)
        {
            string serialized = data?.ToString();

            if (string.IsNullOrEmpty(serialized))
                return null;

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(SampleEventArgs));

            XmlReader reader = XmlReader.Create(new System.IO.StringReader(serialized));
            SampleEventArgs args = (SampleEventArgs)xmlSerializer.Deserialize(reader);
            UserSession session = (ServiceProvider.GetService(typeof(IConnectionPool)) as IConnectionPool).GetConnection<UserSession>();
            var cardData = session.CardManager.GetCardData(args.CardId);
            return $"{Resource.SampleEventDescription} {cardData.Description}({args.CardId})";

        }
        private ObjectContext GetObjectContext()
        {
            return Context;
        }

        private ObjectContext CreateObjectContext()
        {
            UserSession session = (ServiceProvider.GetService(typeof(IConnectionPool)) as IConnectionPool).GetConnection<UserSession>();

            ServiceContainer sessionContainer = new ServiceContainer();
            Type type = null;
            string typeName = "DocsVision.Platform.ObjectManager.UserSession, DocsVision.Platform.ObjectManager, Version=5.5.0.0, Culture=neutral, PublicKeyToken=7148afe997f90519";
            try
            {
                type = Type.GetType(typeName, true);
            }
            catch (Exception ex)
            {
                StorageServerTrace.Runtime.TraceEvent(TraceEventType.Error, 0, "Unable to add service - failed to load type {0}. Error: {1}", typeName, ex);
                if (ex.InnerException != null)
                    StorageServerTrace.Runtime.TraceEvent(TraceEventType.Error, 0, "Unable to add service - failed to load type {0}. Error: {1}", typeName, ex.InnerException);
            }

            if (type != null)
                sessionContainer.AddService(type, session);

            var connectionPool = ServiceProvider.GetService(typeof(IConnectionPool)) as IConnectionPool;
            if (connectionPool != null)
                sessionContainer.AddService(typeof(IConnectionPool), connectionPool);

            ObjectContext objectContext = new ObjectContext(sessionContainer);
            IObjectMapperFactoryRegistry mapperFactoryRegistry = objectContext.GetService<IObjectMapperFactoryRegistry>();
            mapperFactoryRegistry.RegisterFactory(typeof(SystemCardsMapperFactory));
            mapperFactoryRegistry.RegisterFactory(typeof(DocsVision.BackOffice.ObjectModel.Mapping.BackOfficeMapperFactory));
            mapperFactoryRegistry.RegisterFactory(typeof(Docsvision.WorkerService.ObjectModel.Mapping.WorkerServiceMapperFactory));

            IServiceFactoryRegistry serviceFactoryRegistry = objectContext.GetService<IServiceFactoryRegistry>();
            serviceFactoryRegistry.RegisterFactory(typeof(SystemCardsServiceFactory));
            serviceFactoryRegistry.RegisterFactory(typeof(DocsVision.BackOffice.ObjectModel.Services.BackOfficeServiceFactory));
            serviceFactoryRegistry.RegisterFactory(typeof(Docsvision.WorkerService.ObjectModel.Services.WorkerServiceServiceFactory));
            serviceFactoryRegistry.RegisterFactory(typeof(SampleServiceFactory));

            objectContext.AddService(DocsVisionObjectFactory.CreatePersistentStore(new SessionProvider(session)));
            IMetadataProvider metadataProvider = DocsVisionObjectFactory.CreateMetadataProvider(session);
            objectContext.AddService(DocsVisionObjectFactory.CreateMetadataManager(metadataProvider, session));
            objectContext.AddService(metadataProvider);


            return objectContext;
        }

        private ObjectContext Context
        {
            get
            {
                if (objectContext == null || objectContext.IsClosed)
                    objectContext = CreateObjectContext();

                return objectContext;
            }
        }
        private IServiceProvider ServiceProvider => serviceProvider;
    }
}
