using Autofac;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClient.Helpers;
using Microsoft.Extensions.DependencyInjection;
using ServerExtension.Feature1;
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
            : base()
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
        public override void InitializeServiceCollection(IServiceCollection services)
        {
            services.AddSingleton<IFeature1Service, Feature1Service>();

            // Примеры регистрации различных типов ВК 
            // services.AddSingleton<YourServiceInterface, YourServiceClass>();
            // services.AddSingleton<IBindingConverter, YourBindingConverterType>();
            // services.AddSingleton<IBindingResolver, YourBindingResolverType>();            
            // services.AddSingleton<IControlResolver, YourControlResolverType>();
            // services.AddSingleton<IPropertyResolver, YourPropertyResolverType>();  
            // services.AddTransient<ICardLifeCycle, YourCardLifeCycle>();
            // services.AddTransient<IRowLifeCycle, YourRowLifeCycle>(); 
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