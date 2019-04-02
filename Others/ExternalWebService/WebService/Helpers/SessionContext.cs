using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Mapping;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;
using DocsVision.Platform.ObjectModel.Persistence;
using DocsVision.Platform.SystemCards.ObjectModel.Mapping;
using DocsVision.Platform.SystemCards.ObjectModel.Services;
using System;

namespace WebService.Helpers
{
    public class SessionContext: IServiceProvider
    {
        public SessionContext(UserSession userSession)
        {
            Session = userSession;
        }

        public UserSession Session { get; }

        public ObjectContext CreateObjectContext()
        {
            var objectContext = new ObjectContext(this);

            var mapperFactoryRegistry = objectContext.GetService<IObjectMapperFactoryRegistry>();

            mapperFactoryRegistry.RegisterFactory(typeof(SystemCardsMapperFactory));
            mapperFactoryRegistry.RegisterFactory(typeof(BackOfficeMapperFactory));

            var serviceFactoryRegistry = objectContext.GetService<IServiceFactoryRegistry>();

            serviceFactoryRegistry.RegisterFactory(typeof(SystemCardsServiceFactory));
            serviceFactoryRegistry.RegisterFactory(typeof(BackOfficeServiceFactory));

            objectContext.AddService(DocsVisionObjectFactory.CreatePersistentStore(Session));

            var metadataProvider = DocsVisionObjectFactory.CreateMetadataProvider(new SessionProvider(Session));
            objectContext.AddService(metadataProvider);
            objectContext.AddService(DocsVisionObjectFactory.CreateMetadataManager(metadataProvider, Session));

            objectContext.GetService<IAccessCheckingService>().EditMode = true;
            return objectContext;
        }

        /// <summary>
        /// Get service by type
        /// </summary>
        /// <param name="serviceType">service type</param>
        /// <returns>specified service instance</returns>
		public object GetService(Type serviceType)
        {
            return serviceType == typeof(UserSession) ? Session : null;
        }
    }
}