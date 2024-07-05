using Autofac;
using DocsVision.WebClient.Extensibility;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Resources;

namespace ServerExtension
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class ServerExtension : WebClientExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="ServerExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public ServerExtension(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        /// <summary>
        /// Получить название расширения
        /// </summary>
        public override string ExtensionName
        {
            get { return Assembly.GetAssembly(typeof(ServerExtension)).GetName().Name; }
        }

        /// <summary>
        /// Получить версию расширения
        /// </summary>
        public override Version ExtensionVersion
        {
            get { return new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion); }
        }

        /// <summary>
        /// Регистрация типов в IoC контейнере
        /// </summary>
        /// <param name="containerBuilder"></param>
        public override void InitializeContainer(ContainerBuilder containerBuilder)
        {
            // Примеры регистрации различных типов ВК 
            // containerBuilder.RegisterType<YourServiceClass>().As<YourServiceInterface>().SingleInstance();
            // containerBuilder.RegisterOrderedType<YourBindingConverterType, IBindingConverter>();
            // containerBuilder.RegisterOrderedType<YourBindingResolverType, IBindingResolver>();            
            // containerBuilder.RegisterOrderedType<YourControlResolverType, IControlResolver>();
            // containerBuilder.RegisterOrderedType<YourPropertyResolverType, IPropertyResolver>();  
            // containerBuilder.RegisterType<YourCardLifeCycle>().Keyed<ICardLifeCycle>(CardTypeID).SingleInstance();
            // containerBuilder.RegisterType<YourRowLifeCycle>().Keyed<IRowLifeCycle>(SectionID).SingleInstance(); 
        }

        /// <summary>
        /// Gets resource managers for layout extension
        /// </summary>
        /// <returns></returns>
        protected override List<ResourceManager> GetLayoutExtensionResourceManagers()
        {
            return new List<ResourceManager>
            {

            };
        }
    }
}