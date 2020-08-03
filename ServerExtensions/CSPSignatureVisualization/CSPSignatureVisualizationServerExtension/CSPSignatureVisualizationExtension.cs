using System;
using System.Diagnostics;
using System.Reflection;

using CSPSignatureVisualizationServerExtension.DataVisualization;
using CSPSignatureVisualizationServerExtension.Helpers;
using DocsVision.BackOffice.WebClient.Helpers;
using DocsVision.WebClient.Extensibility;
using ServiceHelper = CSPSignatureVisualizationServerExtension.Helpers.ServiceHelper;

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
		public CSPSignatureVisualizationExtension(IServiceProvider serviceProvider)
			: base(serviceProvider)
		{
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
		/// Вызывается при загрузке расширения
		/// </summary>
		/// <param name="serviceProvider">CSPSignatureVisualizationExtension</param>
		public override void OnLoad(IServiceProvider serviceProvider)
		{
			var serviceHelper = new ServiceHelper(serviceProvider);

			serviceHelper.ImageGenerationService.Register(new CSPSignatureImageGenerator(serviceProvider));
			serviceHelper.ImagePositionSelectionService.Register(new CSPSignatureImagePositionSelector());
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
