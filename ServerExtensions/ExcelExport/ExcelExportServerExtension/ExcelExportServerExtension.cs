using System;
using System.Diagnostics;
using System.Reflection;
using Autofac;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClient.Services.ExcelExport;
using ExcelExportServerExtension.ExcelExport;

namespace ExcelExportServerExtension
{
	/// <summary>
	/// Задаёт описание расширения для WebClient, которое задано в текущей сборке
	/// </summary>
	public class ExcelExportServerExtension : WebClientExtension
	{
        private readonly IServiceProvider _serviceProvider;

		/// <summary>
		/// Создаёт новый экземпляр класса <see cref="ExcelExportServerExtension" />
		/// </summary>
		/// <param name="serviceProvider">Сервис-провайдер</param>
		public ExcelExportServerExtension(IServiceProvider serviceProvider)
			: base(serviceProvider)
		{
            this._serviceProvider = serviceProvider;
		}

		#region Свойства

        /// <summary>
		/// Получает название расширения
		/// </summary>
		public override string ExtensionName => Assembly.GetAssembly(typeof(ExcelExportServerExtension)).GetName().Name;

		/// <summary>
		/// Получает версию расширения
		/// </summary>
		public override Version ExtensionVersion => new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion);

		#endregion Свойства

		#region Обработчики событий

        /// <summary>
        /// Регистрирует типы в IoC контейнере
        /// </summary>
        /// <param name="containerBuilder"></param>
        public override void InitializeContainer(ContainerBuilder containerBuilder)
        {
			// Регистрируем тип ExcelExportExampleService как реализацию интерфейса IExcelExportService в containerBuilder
			containerBuilder.RegisterType<ExcelExportExampleService>()
                .As<IExcelExportService>()
                .SingleInstance();
        }

		#endregion Обработчики событий
    }
}
