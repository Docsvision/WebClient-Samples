using System;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using Autofac;
using DocsVision.BackOffice.WebClient.FileAccessToken;
using DocsVision.ConversionSampleServerExtension.Services;
using DocsVision.WebClient.Extensibility;

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
            : base(serviceProvider)
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

        /// <summary>
        /// Регистрация типов в IoC контейнере.
        /// </summary>
        /// <param name="containerBuilder">Экземпляр <see cref="ContainerBuilder"/>.</param>
        public override void InitializeContainer(ContainerBuilder containerBuilder)
        {
            // Регистрируем тип FileAccessService как реализацию интерфейса IFileAccessService в containerBuilder.
            containerBuilder.RegisterType<FileAccessService>()
				.As<IFileAccessService>()
				.SingleInstance();

            // Регистрируем тип ConversionSampleService как реализацию интерфейса IConversionSampleService в containerBuilder.
            containerBuilder.RegisterType<ConversionSampleService>()
				.As<IConversionSampleService>()
				.SingleInstance();

            containerBuilder.RegisterInstance(Resources.ResourceManager).As<ResourceManager>();
        }

        protected override WebClientNavigatorExtension GetNavigatorExtension()
        {
            var navigatorExtensionInitInfo = new WebClientNavigatorExtensionInitInfo
            {
                ExtensionName = ExtensionName,
                ExtensionVersion = ExtensionVersion
            };

            return new WebClientNavigatorExtension(navigatorExtensionInitInfo);
        }

        #endregion Обработчики событий
    }
}