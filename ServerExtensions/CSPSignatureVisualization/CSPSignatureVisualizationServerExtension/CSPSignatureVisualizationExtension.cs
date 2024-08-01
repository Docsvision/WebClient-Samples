using System;
using System.Diagnostics;
using System.Reflection;

using CSPSignatureVisualizationServerExtension.DataVisualization;
using CSPSignatureVisualizationServerExtension.Helpers;

using DocsVision.BackOffice.WebClient.DataVisualization;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClient.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace CSPSignatureVisualizationServerExtension
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class CSPSignatureVisualizationExtension : WebClientExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр класса <see cref="CSPSignatureVisualizationExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public CSPSignatureVisualizationExtension()
        {
        }

        #region Свойства

        /// <summary>
        /// Получает название расширения
        /// </summary>
        public override string ExtensionName
            => Assembly.GetAssembly(typeof(CSPSignatureVisualizationExtension)).GetName().Name;

        /// <summary>
        /// Получает версию расширения
        /// </summary>
        public override Version ExtensionVersion
            => new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion);

        #endregion Свойства

        #region Обработчики событий

        /// <summary>
        /// Регистрация типов в IoC контейнере
        /// </summary>
        /// <param name="containerBuilder"></param>
        public override void InitializeServiceCollection(IServiceCollection services)
        {
            // Регистрируем тип CSPSignatureImageGenerator как реализацию интерфейса IImageGenerator в containerBuilder
            services.AddSingleton<IImageGenerator, CSPSignatureImageGenerator>();

            // Регистрируем тип CSPSignatureImagePositionSelector как реализацию интерфейса IImagePositionSelector в containerBuilder
            services.AddSingleton<IImagePositionSelector, CSPSignatureImagePositionSelector>();
        }

        #endregion Обработчики событий
    }
}