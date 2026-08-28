using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClientLibrary.ObjectModel.Services.EntityLifeCycle;
using Microsoft.Extensions.DependencyInjection;
using NetStatSolution.ObjectModel.Mappers;

namespace NetStatSolutionServerExtension
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class NetStatWebClientExtension : WebClientExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="NetStatWebClientExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public NetStatWebClientExtension(IServiceProvider serviceProvider)
            : base()
        {
        }

        /// <summary>
        /// Получить название расширения
        /// </summary>
        public override string ExtensionName
        {
            get { return Assembly.GetAssembly(typeof(NetStatWebClientExtension)).GetName().Name; }
        }

        /// <summary>
        /// Получить версию расширения
        /// </summary>
        public override Version ExtensionVersion
        {
            get { return new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion); }
        }


        #region WebClientExtension Overrides

        public override void OnObjectContextCreate(ObjectContext objectContext)
        {
            base.OnObjectContextCreate(objectContext);

            IObjectMapperFactoryRegistry mapperFactoryRegistry = objectContext.GetService<IObjectMapperFactoryRegistry>();
            mapperFactoryRegistry.RegisterFactory(typeof(NetstatSolutionMapperFactory));
        }

        /// <summary>
        /// Регистрация типов в IoC контейнере
        /// </summary>
        /// <param name="containerBuilder"></param>
        public override void InitializeServiceCollection(IServiceCollection services)
        {
            services.AddTransient<ICardLifeCycleEx, NetStatCardLifeCycle>();
        }

        /// <summary>
        /// Получить менеджеры ресурсов для расширения разметки
        /// </summary>
        protected override List<ResourceManager> GetLayoutExtensionResourceManagers()
        {
            return new List<ResourceManager>
            {
                { Resources.ResourceManager }
            };
        }

        #endregion
    }
}
