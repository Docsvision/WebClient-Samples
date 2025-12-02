using Autofac;
using DocsVision.WebClient.Extensibility;
using Microsoft.Extensions.DependencyInjection;
using ServerExtension.Services;
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
        public ServerExtension()
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
        /// Initialized container
        /// </summary>
        public override void InitializeServiceCollection(IServiceCollection services)
        {
            services.AddSingleton<ISampleWorkerService, SampleWorkerService>();
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