using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using Autofac;
using DocsVision.WebClient.Extensibility;
using Microsoft.Extensions.DependencyInjection;

namespace DownloadFilesBatchOperationSampleServerExtension
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class DownloadFilesBatchOperationSampleServerExtension : WebClientExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="DownloadFilesBatchOperationSampleServerExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public DownloadFilesBatchOperationSampleServerExtension(IServiceProvider serviceProvider)
            : base()
        {
        }

        /// <summary>
        /// Получить название расширения
        /// </summary>
        public override string ExtensionName
        {
            get { return Assembly.GetAssembly(typeof(DownloadFilesBatchOperationSampleServerExtension)).GetName().Name; }
        }

        /// <summary>
        /// Получить версию расширения
        /// </summary>
        public override Version ExtensionVersion
        {
            get { return new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion); }
        }

        #region WebClientExtension Overrides

        /// <summary>
        /// Регистрация типов в IoC контейнере
        /// </summary>
        /// <param name="containerBuilder"></param>
        public override void InitializeServiceCollection(IServiceCollection services)
        {
            
        }
        
        /// <summary>
        /// Gets resource managers for layout extension
        /// </summary>
        /// <returns></returns>
        protected override List<ResourceManager> GetLayoutExtensionResourceManagers()
        {
            return new List<ResourceManager>();
            
        }

        #endregion
    }
}