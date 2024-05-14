using System;
using System.IO;
using System.Net;
using System.Net.Http;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.Settings.Navigator;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Configuration;
using DocsVision.Platform.WebClient.Diagnostics;
using DocsVision.ConversionService.Model;
using DocsVision.Platform.WebClient.Models;

namespace DocsVision.ConversionSampleServerExtension.Services
{
	/// <summary>
	/// Задаёт описания примера сервиса для взаимодействия с сервисом конвертации.
	/// </summary>
	public class ConversionSampleService : IConversionSampleService
	{
		// Класс для чтения системных настроек.
		private const string NavigatorExtensionTypeName = "DocsVision.Platform.Settings.Navigator.AddIn.NavigatorExtension, DocsVision.Platform.Settings, Version=5.5.0.0, Culture=neutral, PublicKeyToken=7148afe997f90519";
		private const string NavigatorAdditionalSettingsGroupName = "AdditionalSettings";

		private readonly IConfigurationProvider _configurationProvider;
		private readonly IServiceProvider _serviceProvider;

        /// <summary>
        /// Создаёт новый экземпляр класса <see cref="ConversionSampleService" />.
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер.</param>
		/// <param name="configurationProvider">Провайдер конфигурации.</param>
        public ConversionSampleService(IServiceProvider serviceProvider, IConfigurationProvider configurationProvider)
		{
			_serviceProvider = serviceProvider;
			_configurationProvider = configurationProvider;
		}

        /// <summary>
        /// Проверяет наличие лицензии на сервис конвертации.
        /// </summary>
        /// <param name="sessionContext">>Контекст сессии.</param>
        public CommonResponse CanConvert(SessionContext sessionContext, Guid fileId)
		{
			var response = new CommonResponse();
            var objectContext = sessionContext.ObjectContext;

            // Получаем адрес сервера Р7 из конфигурационного файла Web-клиента.
            var conversionServiceUrl = _configurationProvider.GetSetting<string>(SettingConstants.WebClient.ServerR7ConnectionAddress);
            if (string.IsNullOrEmpty(conversionServiceUrl))
            {
                throw new ArgumentNullException(nameof(conversionServiceUrl));
            }

            // Получаем адрес Web-клиента из Справочника системных настроек.
            var settingsService = objectContext.GetService<ISettingsService>();
            var additionalSettings = settingsService.GetPropertyObject<AdditionalSettings>(NavigatorExtensionTypeName, NavigatorAdditionalSettingsGroupName);
            if (string.IsNullOrWhiteSpace(additionalSettings?.ThinClientServerAddress))
            {
                throw new ArgumentNullException(nameof(additionalSettings.ThinClientServerAddress));
            }

            var uniConversionService = new ConversionService.Services.ConversionService(_serviceProvider, conversionServiceUrl,
                additionalSettings.ThinClientServerAddress, Trace.TraceByLevel);
			var result = uniConversionService.IsConvert(objectContext, fileId);

			if (result.Success)
			{
				response.InitializeSuccess();
			} 
			else
			{
                response.InitializeError(result.Message);
            }
			return response;
        }

        /// <summary>
        /// Конвертирует файл в PDF/A формат и прикладывает его к документу как основной файл.
        /// </summary>
        /// <param name="sessionContext">Контекст сессии.</param>
        /// <param name="documentId">Идентификатор документа.</param>
        /// <param name="fileId">Идентификатор файла.</param>
        public CommonResponse AttachPdfa(SessionContext sessionContext, Guid documentId, Guid fileId)
		{
			var objectContext = sessionContext.ObjectContext;

			// Получаем адрес сервера Р7 из конфигурационного файла Web-клиента.
			var conversionServiceUrl = _configurationProvider.GetSetting<string>(SettingConstants.WebClient.ServerR7ConnectionAddress);
			if (string.IsNullOrEmpty(conversionServiceUrl))
			{
				throw new ArgumentNullException(nameof(conversionServiceUrl));
			}

            // Получаем адрес Web-клиента из Справочника системных настроек.
            var settingsService = objectContext.GetService<ISettingsService>();
			var additionalSettings = settingsService.GetPropertyObject<AdditionalSettings>(NavigatorExtensionTypeName, NavigatorAdditionalSettingsGroupName);
			if (string.IsNullOrWhiteSpace(additionalSettings?.ThinClientServerAddress))
			{
				throw new ArgumentNullException(nameof(additionalSettings.ThinClientServerAddress));
			}

			// Конвертируем файла.
			var uniConversionService = new ConversionService.Services.ConversionService(_serviceProvider, conversionServiceUrl,
				additionalSettings.ThinClientServerAddress, Trace.TraceByLevel);
			var result = uniConversionService.ConvertToStream(objectContext, fileId, ConversionFormat.pdfa);

			var response = new CommonResponse();
			if (result.Success)
			{
				// Копирование результата конвертации во временный файл.
				result.Data.Seek(0, SeekOrigin.Begin);
				var tempDirectory = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString("N"));
				Directory.CreateDirectory(tempDirectory);
				var fileName = RenameFile(uniConversionService.GetFileName(fileId));
				var filePath = Path.Combine(tempDirectory, fileName);
				using (var fileStream = new FileStream(filePath, FileMode.Create))
				{
					result.Data.CopyTo(fileStream);
				}

				// Прикладываем сохраненный файл к документу.
				var documentService = objectContext.GetService<IDocumentService>();
				var document = objectContext.GetObject<Document>(documentId);
				documentService.AddMainFile(document, filePath);
				objectContext.SaveObject(document);

				response.InitializeSuccess();
			}
			else
			{
				response.InitializeError(result.Message);
			}

			return response;
		}

		// Формирует имя сконвертированного файла.
		private static string RenameFile(string fileName)
		{
			fileName = Path.GetFileNameWithoutExtension(fileName);
			if (fileName.Length > 245)
			{
				fileName = fileName.Substring(0, 245);
			}

			return $"{fileName}_pdfa.pdf";
		}
	}
}
