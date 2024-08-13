using System;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using Autofac;
using DocsVision.BackOffice.WebClient.R7Office;
using DocsVision.ConversionSampleServerExtension.Services;
using DocsVision.WebClient.Extensibility;
using Microsoft.Extensions.DependencyInjection;

namespace DocsVision.ConversionSampleServerExtension
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке.
    /// </summary>
    public class ConversionSampleServerExtension : WebClientExtension
    {
        private readonly IServiceProvider _serviceProvider;
        /// <summary>
        /// Создаёт новый экземпляр класса <see cref="ConversionSampleServerExtension" />.
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер.</param>
        public ConversionSampleServerExtension(IServiceProvider serviceProvider)
            : base()
        {
            _serviceProvider = serviceProvider;
        }

        #region Свойства

        /// <summary>
        /// Получает название расширения.
        /// </summary>
        public override string ExtensionName
			=> Assembly.GetAssembly(typeof(ConversionSampleServerExtension)).GetName().Name;

        /// <summary>
        /// Получает пространство имён расширения.
        /// </summary>
        public override Version ExtensionVersion
			=> new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion);

        #endregion Свойства

        #region Обработчики событий

        public override void InitializeServiceCollection(IServiceCollection services)
        {
            services.AddSingleton<IR7OfficeService, R7OfficeService>();
            services.AddSingleton<IConversionSampleService, ConversionSampleService>();
        }

        #endregion Обработчики событий
    }
}