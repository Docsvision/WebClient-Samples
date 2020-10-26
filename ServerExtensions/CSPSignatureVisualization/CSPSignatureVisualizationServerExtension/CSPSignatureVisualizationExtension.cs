using System;
using System.Diagnostics;
using System.Reflection;

using Autofac;
using Autofac.Extras.Ordering;

using CSPSignatureVisualizationServerExtension.DataVisualization;
using CSPSignatureVisualizationServerExtension.Helpers;

using DocsVision.BackOffice.WebClient.DataVisualization;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClient.Helpers;

namespace CSPSignatureVisualizationServerExtension
{
	/// <summary>
	/// Задаёт описание расширения для WebClient, которое задано в текущей сборке
	/// </summary>
	public class CSPSignatureVisualizationExtension : WebClientExtension
	{
        private readonly IServiceProvider serviceProvider;

		/// <summary>
		/// Создаёт новый экземпляр класса <see cref="CSPSignatureVisualizationExtension" />
		/// </summary>
		/// <param name="serviceProvider">Сервис-провайдер</param>
		public CSPSignatureVisualizationExtension(IServiceProvider serviceProvider)
			: base(serviceProvider)
		{
            this.serviceProvider = serviceProvider;
		}

		#region Свойства

		/// <summary>
		/// Получает пространство имён расширения
		/// </summary>
		public override string Namespace => Constants.Namespace;

		/// <summary>
		/// Получает название расширения
		/// </summary>
		public override string ExtensionName => Assembly.GetAssembly(typeof(CSPSignatureVisualizationExtension)).GetName().Name;

		/// <summary>
		/// Получает версию расширения
		/// </summary>
		public override Version ExtensionVersion => new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion);

		#endregion Свойства

		#region Обработчики событий

        /// <summary>
        /// Регистрация типов в IoC контейнере
        /// </summary>
        /// <param name="containerBuilder"></param>
        public override void InitializeContainer(ContainerBuilder containerBuilder)
        {
            // Регистрируем тип CSPSignatureImageGenerator как реализацию интерфейса IImageGenerator в containerBuilder
            containerBuilder.RegisterType<CSPSignatureImageGenerator>()
                .As<IImageGenerator>()
                .OrderBy(OrderCounterHelper.OrderCounter)
                .SingleInstance();

            // Регистрируем тип CSPSignatureImagePositionSelector как реализацию интерфейса IImagePositionSelector в containerBuilder
            containerBuilder.RegisterType<CSPSignatureImagePositionSelector>()
                .As<IImagePositionSelector>()
                .OrderBy(OrderCounterHelper.OrderCounter)
                .SingleInstance();
        }

		#endregion Обработчики событий

		protected override WebClientNavigatorExtension GetNavigatorExtension()
		{
			var navigatorExtensionInitInfo = new WebClientNavigatorExtensionInitInfo
			{
				ExtensionName = ExtensionName,
				ExtensionVersion = ExtensionVersion
			};

			return new WebClientNavigatorExtension(navigatorExtensionInitInfo);
		}
	}
}
